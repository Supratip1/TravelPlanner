// components/CityPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import placeholder video or image data for the cities
const cityData = {
  Paris: {
    video: 'https://via.placeholder.com/800x450?text=Paris+Video',
    description: 'Experience the romance and culture of Paris, the City of Light.',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre', 'Sainte-Chapelle'],
  },
  Tokyo: {
    video: 'https://via.placeholder.com/800x450?text=Tokyo+Video',
    description: 'Discover the vibrant life of Tokyo, a city of tradition and modernity.',
    attractions: ['Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing', 'Akihabara', 'Meiji Shrine'],
  },
  NewYork: {
    video: 'https://via.placeholder.com/800x450?text=New+York+Video',
    description: 'Explore the bustling streets of New York City, the city that never sleeps.',
    attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Metropolitan Museum of Art'],
  },
  // Add more city data as needed
};

export const CityPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [cityInfo, setCityInfo] = useState<any | null>(null);

  useEffect(() => {
    if (cityName && cityData[cityName]) {
      setCityInfo(cityData[cityName]);
    } else {
      // If the city is not found, set cityInfo to null or handle accordingly
      setCityInfo(null);
    }
  }, [cityName]);

  if (!cityInfo) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold">City Not Found</h1>
        <p>We couldn't find information for this city. Please check the URL or try a different city.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Discover {cityName}
      </motion.h1>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      >
        <video
          className="w-full h-auto rounded-lg shadow-lg"
          autoPlay
          loop
          muted
          playsInline
          src={cityInfo.video}
          alt={`Video showcasing ${cityName}`}
        />
      </motion.div>
      <motion.p
        className="text-lg mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
      >
        {cityInfo.description}
      </motion.p>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-2xl font-semibold mb-3">Top Attractions:</h2>
        <ul className="list-disc pl-5">
          {cityInfo.attractions.map((attraction, index) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
      </motion.div>
      <motion.button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
        onClick={() => alert(`Booking details for ${cityName}`)}
      >
        Book Now
      </motion.button>
    </div>
  );
};
