import express from 'express';
import Destination from './Destinations';

const router = express.Router();

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const { searchInput, budget, startDate, endDate, preferences } = req.query;

    // Build dynamic query
    let query: any = {};

    if (searchInput) {
      query.name = new RegExp(searchInput, 'i'); // Case-insensitive regex
    }

    if (budget) {
      query.budget = { $lte: budget };
    }

    if (startDate && endDate) {
      query.travelDates = { $gte: startDate, $lte: endDate };
    }

    if (preferences) {
      query.preferences = preferences;
    }

    // Fetch destinations from DB and sort by bestDeals & bestTimeToVisit
    const destinations = await Destination.find(query)
      .sort({ bestDeals: -1, bestTimeToVisit: 1 }) // Sorting by rank of best deals and best time
      .limit(10); // Limit number of results for better UX

    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new destination (if needed for form submission)
router.post('/', async (req, res) => {
  const { name, budget, travelDates, preferences, bestDeals, bestTimeToVisit, imageUrl, isPopular } = req.body;

  try {
    const newDestination = new Destination({
      name,
      budget,
      travelDates,
      preferences,
      bestDeals,
      bestTimeToVisit,
      imageUrl,
      isPopular,
    });

    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
