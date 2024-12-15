import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';

const destinations = [
  { 
    name: 'Golden Triangle Tour', 
    id: 1, 
    description: 'Delhi, Agra, Jaipur',
    image: 'https://images.unsplash.com/photo-1686603707539-8e09d5d53063?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWdyYSUyMGphaXB1ciUyMGRlbGhpfGVufDB8fDB8fHww',
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', details: 'Arrive in Delhi, transfer to hotel, evening city orientation.' },
      { day: 2, title: 'Delhi Exploration', details: 'Visit Red Fort, Jama Masjid, Qutub Minar, and India Gate.' },
      { day: 3, title: 'Delhi to Agra', details: 'Morning drive to Agra, visit Taj Mahal and Agra Fort.' },
      { day: 4, title: 'Agra to Jaipur', details: 'Visit Fatehpur Sikri, drive to Jaipur, evening at leisure.' },
      { day: 5, title: 'Jaipur Sightseeing', details: 'Explore Amber Fort, City Palace, Hawa Mahal, and local markets.' },
      { day: 6, title: 'Return to Delhi', details: 'Morning return to Delhi, departure or onward journey.' }
    ]
  },
  { 
    name: 'Kerala Backwaters', 
    id: 2, 
    description: 'Serene waterways and tropical beauty',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VyZWxhJTIwYmFja3dhdGVyfGVufDB8fDB8fHww',
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', details: 'Arrive in Kochi, transfer to houseboat, welcome drink and orientation.' },
      { day: 2, title: 'Backwaters Cruise', details: 'Full day cruising through scenic backwaters, village visits, local cuisine.' },
      { day: 3, title: 'Alleppey Exploration', details: 'Explore local markets, traditional Kerala cooking class.' },
      { day: 4, title: 'Munnar Journey', details: 'Drive to Munnar, visit tea plantations and scenic viewpoints.' },
      { day: 5, title: 'Munnar Sightseeing', details: 'Explore Eravikulam National Park, tea museums, and local attractions.' },
      { day: 6, title: 'Return to Kochi', details: 'Final day, departure or onward travel arrangements.' }
    ]
  },
  { 
    name: 'Ladakh Adventure', 
    id: 3, 
    description: 'Ladakh mountain expedition',
    image: 'https://images.unsplash.com/photo-1667597916946-74cfcbf7a92d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuZ29uZ3xlbnwwfHwwfHx8MA%3D%3D',
    itinerary: [
      { day: 1, title: 'Arrival in Leh', details: 'Arrive in Leh, acclimatization, rest, and local market visit.' },
      { day: 2, title: 'Leh Palace and Monasteries', details: 'Visit Leh Palace, Shey Monastery, and Thiksey Monastery.' },
      { day: 3, title: 'Pangong Lake Excursion', details: 'Full day trip to stunning Pangong Lake, crossing mountain passes.' },
      { day: 4, title: 'Nubra Valley', details: 'Drive through Khardung La, explore Nubra Valley, camel safari.' },
      { day: 5, title: 'Adventure Activities', details: 'Optional trekking, river rafting, or local cultural experiences.' },
      { day: 6, title: 'Return to Leh', details: 'Final day, departure preparations and local shopping.' }
    ]
  },
  { 
    name: 'Goa Beach Retreat', 
    id: 4, 
    description: 'Beaches, culture, and relaxation',
    image: 'https://plus.unsplash.com/premium_photo-1664304458186-9a67c1330d02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hfGVufDB8fDB8fHww',
    itinerary: [
      { day: 1, title: 'Arrival in Goa', details: 'Arrive in Goa, transfer to beach resort, welcome cocktail.' },
      { day: 2, title: 'North Goa Exploration', details: 'Visit Baga Beach, Anjuna Market, water sports activities.' },
      { day: 3, title: 'Old Goa Heritage', details: 'Explore historic churches, Basilica of Bom Jesus, Portuguese architecture.' },
      { day: 4, title: 'South Goa Beaches', details: 'Visit Palolem and Agonda beaches, sunset cruise.' },
      { day: 5, title: 'Cultural Experiences', details: 'Spice plantation tour, traditional Goan cooking class.' },
      { day: 6, title: 'Departure', details: 'Final morning, beach time, departure or onward travel.' }
    ]
  },
  { 
    name: 'Rajasthan Royal Tour', 
    id: 5, 
    description: 'Palaces, culture, and heritage',
    image: 'https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFqYXN0aGFufGVufDB8fDB8fHww',
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', details: 'Arrive in Jaipur, transfer to heritage hotel, evening cultural show.' },
      { day: 2, title: 'Jaipur Exploration', details: 'Visit Amber Fort, City Palace, Hawa Mahal, local bazaars.' },
      { day: 3, title: 'Jodhpur Journey', details: 'Drive to Jodhpur, visit Mehrangarh Fort, blue city exploration.' },
      { day: 4, title: 'Udaipur Arrival', details: 'Travel to Udaipur, evening boat ride on Lake Pichola.' },
      { day: 5, title: 'Udaipur Sightseeing', details: 'City Palace, Jagdish Temple, local art and craft markets.' },
      { day: 6, title: 'Return', details: 'Final day, departure or extended travel arrangements.' }
    ]
  },
  { 
    name: 'Northeast Tribal Expedition', 
    id: 6, 
    description: 'Tribal cultures of Nagaland',
    image: 'https://images.unsplash.com/photo-1692652567309-5ac9ae7fe6f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFnYWxhbmR8ZW58MHx8MHx8fDA%3D',
    itinerary: [
      { day: 1, title: 'Arrival in Kohima', details: 'Arrive in Kohima, transfer to local accommodation, welcome dinner.' },
      { day: 2, title: 'Tribal Village Visit', details: 'Explore Angami tribal villages, traditional crafts, and customs.' },
      { day: 3, title: 'Hornbill Festival', details: 'Participate in or observe the famous Hornbill Festival.' },
      { day: 4, title: 'Khonoma Green Village', details: 'Visit Khonoma, first green village in India, nature walk.' },
      { day: 5, title: 'Cultural Immersion', details: 'Traditional music, dance performances, local cuisine.' },
      { day: 6, title: 'Return', details: 'Final day, departure or extended travel arrangements.' }
    ]
  },
  { 
    name: 'South India Temple Tour', 
    id: 7, 
    description: 'Ancient temples and architecture',
    image: 'https://plus.unsplash.com/premium_photo-1697729536647-4e23a32dd324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhhbmphdnVyfGVufDB8fDB8fHww',
    itinerary: [
      { day: 1, title: 'Arrival in Chennai', details: 'Arrive in Chennai, transfer to hotel, evening temple visit.' },
      { day: 2, title: 'Mahabalipuram', details: 'Explore UNESCO World Heritage site, rock-cut temples.' },
      { day: 3, title: 'Madurai Temple', details: 'Visit Meenakshi Amman Temple, explore city markets.' },
      { day: 4, title: 'Thanjavur Journey', details: 'Visit Brihadisvara Temple, explore Chola architecture.' },
      { day: 5, title: 'Kanchipuram', details: 'Explore temple city, silk weaving centers, ancient architecture.' },
      { day: 6, title: 'Return to Chennai', details: 'Final day, departure or extended travel arrangements.' }
    ]
  },
  { 
    name: 'Wildlife Safari', 
    id: 8, 
    description: 'Ranthambore and Bandhavgarh National Parks',
    image: 'https://images.unsplash.com/photo-1615474286632-e31ac3633d58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFudGhhbWJvcmUlMjBzYWZhcml8ZW58MHx8MHx8fDA%3D',
    itinerary: [
      { day: 1, title: 'Arrival in Ranthambore', details: 'Arrive near Ranthambore, evening wildlife briefing.' },
      { day: 2, title: 'Ranthambore Safari', details: 'Morning and evening tiger safari, wildlife photography.' },
      { day: 3, title: 'Travel to Bandhavgarh', details: 'Drive to Bandhavgarh National Park, evening nature walk.' },
      { day: 4, title: 'Bandhavgarh Exploration', details: 'Multiple wildlife safaris, potential tiger sightings.' },
      { day: 5, title: 'Forest Experiences', details: 'Guided forest walks, wildlife photography workshops.' },
      { day: 6, title: 'Return', details: 'Final day, departure or extended wildlife experiences.' }
    ]
  },
  { 
    name: 'Andaman Islands Retreat', 
    id: 9, 
    description: 'Tropical islands and marine life',
    image: 'https://images.unsplash.com/photo-1642498232612-a837df233825?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuZGFtYW58ZW58MHx8MHx8fDA%3D',
    itinerary: [
      { day: 1, title: 'Arrival in Port Blair', details: 'Arrive in Port Blair, transfer to resort, beach orientation.' },
      { day: 2, title: 'Cellular Jail', details: 'Visit historical Cellular Jail, light and sound show.' },
      { day: 3, title: 'Havelock Island', details: 'Radhanagar Beach, snorkeling, marine life exploration.' },
      { day: 4, title: 'Neil Island', details: 'Beach hopping, underwater activities, relaxation.' },
      { day: 5, title: 'Water Sports', details: 'Scuba diving, glass-bottom boat ride, island hopping.' },
      { day: 6, title: 'Return to Port Blair', details: 'Final day, departure or extended island experiences.' }
    ]
  },
  { 
    name: 'Spiritual Varanasi Tour', 
    id: 10, 
    description: 'Spiritual journey along the Ganges',
    image: 'https://images.unsplash.com/photo-1599831069477-b2acdc0bcb91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFyYW5hc2klMjBnYW5nYSUyMGFydGl8ZW58MHx8MHx8fDA%3D',
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi', details: 'Arrive in Varanasi, transfer to hotel, evening Ganga Aarti.' },
      { day: 2, title: 'Spiritual Exploration', details: 'Morning boat ride, visit ancient ghats, temples.' },
      { day: 3, title: 'Sarnath Excursion', details: 'Visit Sarnath, Buddhist archaeological site, museum.' },
      { day: 4, title: 'Local Culture', details: 'Silk weaving workshop, local market exploration.' },
      { day: 5, title: 'Spiritual Practices', details: 'Yoga session, meditation, traditional music experience.' },
      { day: 6, title: 'Return', details: 'Final day, departure or extended spiritual journey.' }
    ]
  }
];

// The rest of the component remains the same as in the previous artifact
// (ItineraryModal, DestinationCard, and Destinations components)
// ... [Previous implementation]

const ItineraryModal: React.FC<{
  destination: typeof destinations[0];
  onClose: () => void;
}> = ({ destination, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{destination.name} Itinerary</h2>
        {destination.itinerary.map((day) => (
          <div key={day.day} className="mb-4 pb-4 border-b last:border-b-0">
            <h3 className="font-semibold text-lg text-gray-700">
              Day {day.day}: {day.title}
            </h3>
            <p className="text-gray-600">{day.details}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DestinationCard: React.FC<{
  destination: typeof destinations[0];
  onDetailsClick: () => void;
}> = ({ destination, onDetailsClick }) => (
  <div className="group bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
    <div 
      onClick={onDetailsClick} 
      className="h-48 overflow-hidden cursor-pointer"
    >
      <img 
        src={destination.image} 
        alt={destination.name} 
        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
      />
    </div>
    <div className="p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-1">{destination.name}</h3>
      <p className="text-xs text-gray-600 flex items-center">
        <MapPin className="w-3 h-3 mr-1 text-yellow-500" />
        {destination.description}
      </p>
      <button 
        onClick={onDetailsClick}
        className="mt-2 w-full bg-yellow-500 text-white py-1.5 text-xs rounded-lg hover:bg-yellow-600 transition-all"
      >
        View Itinerary
      </button>
    </div>
  </div>
);

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Popular Itineraries
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {destinations.map((destination) => (
          <DestinationCard 
            key={destination.id} 
            destination={destination}
            onDetailsClick={() => setSelectedDestination(destination)}
          />
        ))}
      </div>

      {selectedDestination && (
        <ItineraryModal 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}
    </div>
  );
};

export default Destinations;