require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from all origins (not recommended for production)
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper Function: Generate Itinerary using Gemini
async function generateItinerary(destination, startDate, endDate, budget, preferences, startingPlace, travelers) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Static preference templates
    const preferenceTemplates = {
      "Family-friendly": `
        - Activities and attractions suitable for kids, like parks, interactive museums, and play areas.
        - Family-oriented accommodations with amenities like pools and play zones, suitable for ${travelers} people.
        - Dining options that cater to families, including kid-friendly menus.
        - Stress-free travel tips from ${startingPlace} to ${destination}.
      `,
      "Romantic": `
        - Scenic and private experiences such as sunset points, intimate tours, or secluded beaches.
        - Boutique accommodations for couples tailored to preferences: ${preferences.join(", ")}.
        - Romantic dining options like candlelit dinners or rooftop meals.
        - Unique couple experiences such as spa treatments, cultural activities, or private excursions.
      `,
      "Adventure": `
        - Outdoor activities like trekking, rafting, or rock climbing, suitable for ${travelers} adventurers.
        - Offbeat adventure spots tailored to preferences: ${preferences.join(", ")}.
        - Safety tips and gear recommendations for adventure activities.
      `,
      "Luxury": `
        - Upscale accommodations such as five-star resorts or boutique luxury hotels.
        - Exclusive activities like private tours and curated experiences based on preferences.
        - Fine dining and premium wellness activities.
      `,
      "Solo": `
        - Independent-friendly activities and hidden gems for solo travelers.
        - Accommodations suitable for solo exploration, like hostels or cozy retreats.
        - Safety tips for seamless and secure solo travel.
      `,
    };

    // Generate preference prompts
    const preferencePrompts = preferences.map((preference) => {
      const template = preferenceTemplates[preference] || `
        - Tailored experiences to suit the preference "${preference}".
        - Accommodations, activities, and dining recommendations aligned with preferences: ${preferences.join(", ")}.
      `;
      return `
        Create a travel itinerary for ${destination} in India based on the preference "${preference}".
        Starting from: ${startingPlace}.
        Focus on:
        ${template}
        Dates: ${startDate} to ${endDate}.
        Budget: ${budget}.
        Structure as a detailed day-by-day plan for ${travelers} traveler(s).
      `;
    }).join('\n\n');

    // Full prompt
    const prompt = `
      Create three distinct travel itineraries for ${destination} in India, starting from ${startingPlace}. Tailor them to the following preferences:
      ${preferencePrompts}
      Requirements:
      - Incorporate the preferences: Ensure activities, accommodations, food options, and experiences reflect the specified preferences.
      - Highlight offbeat places and hidden gems: Include lesser-known attractions, secluded locations, unique dining spots, and hidden stays.
      - Provide clear travel options: Suggest flight and train routes from the starting place to the destination.
      - Include a day-by-day breakdown: Detail daily activities, accommodation suggestions, food options, and travel logistics.
      - Differentiate the itineraries: Ensure that each itinerary offers unique experiences.
      Structure the reply with bold headings for clarity. Avoid special characters like asterisks.
    `;

    const result = await model.generateContent(prompt);
    const itineraryText = result.response?.text ? await result.response.text() : result.text;

    return { itinerary: itineraryText };

  } catch (error) {
    console.error(`Error generating itinerary for ${destination}:`, error.stack || error);
    return { 
      destination, 
      itinerary: `Unable to generate itinerary. Error: ${error.message}` 
    };
  }
}


// Preferences with dynamic prompts

app.post('/api/trips', async (req, res) => {
  console.log('POST Request Received:', req.body);

  const { searchInput, budget, startDate, endDate, preferences, startingPlace, travelers } = req.body;

 

  try {
    // Ensure preferences is parsed correctly (from a comma-separated string in the request)
    const preferencesList = Array.isArray(preferences) ? preferences : preferences.split(",");

    // Fetch destinations based on search input using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const preferencesPrompt = preferencesList.join(", ");
    const prompt = `Suggest top travel destinations in India related to: ${searchInput}. Focus on unique destinations that align with ${preferencesPrompt}. Limit to 3 destinations and 3 itiniaries, ensuring they offer a mix of hidden gems and popular experiences, suitable for ${travelers} travelers starting from ${startingPlace}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestedDestinations = response.text().split(",").map(dest => dest.trim()).slice(0, 3); // Limit to 3 destinations

    // Generate itineraries for suggested destinations
    const itineraries = await Promise.all(
      suggestedDestinations.map(async (dest) => {
        return generateItinerary(dest, startDate, endDate, budget, preferencesList, startingPlace, travelers);
      })
    );

    

    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate trips.' });
  }
});



// Dynamic prompt generation based on user preferences
app.get('/api/trips', async (req, res) => { 
  console.log('GET Request Received:', req.query);
  
  
  // Check if any meaningful search parameters are present
  const { searchInput, startDate,budget, endDate, preferences, startingPlace, travelers } = req.query;
  
  // If no meaningful search parameters are provided, return an initial response
  

  try {
    // Ensure preferences is parsed correctly (from a comma-separated string in the query)
    const preferencesList = preferences ? preferences.split(",") : [];

    // Fetch destinations based on search input using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const preferencesPrompt = preferencesList.join(", ");
    const prompt = `Suggest top travel destination in India related to: ${searchInput}. Focus on unique destination that align with ${preferencesPrompt}. Limit to 1 destination, ensuring it offer a mix of hidden gems and popular experiences, suitable for ${travelers} travelers starting from ${startingPlace}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestedDestinations = response.text().split(",").map(dest => dest.trim()).slice(0, 1); // Limit to 6 destinations

    // Generate itineraries for suggested destinations
    const itineraries = await Promise.all(
      suggestedDestinations.map(async (dest) => {
        return generateItinerary(dest, startDate, endDate, budget, preferencesList, startingPlace, travelers);
      })
    );

    // Sort itineraries by deal cost & hidden gems
    itineraries.sort((a, b) => {
      if (preferencesList.includes('Luxury')) {
        return a.itinerary.luxuryScore - b.itinerary.luxuryScore; // Sort by luxuryScore
      } else {
        return a.itinerary.hiddenGemsScore - b.itidemsScore; // Sort by hidden gems
      }
    });

    res.json({
      initialState: false,
      readyForSearch: true,
      itineraries: itineraries
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Failed to generate trips.',
      initialState: false,
      readyForSearch: false,
      error: error.message 
    });
  }
});


app.listen(port, () => {
  console.log(`Travel backend running at http://localhost:${port}`);
});
