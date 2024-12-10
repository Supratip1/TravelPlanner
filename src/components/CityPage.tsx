// src/components/CityPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { cityDetails } from './CityData';

export function CityPage() {
  const { cityName } = useParams<{ cityName: string }>();

  // Fetch city details based on the cityName
  const city = cityDetails.find(
    (city) => city.name.toLowerCase() === cityName?.toLowerCase()
  );

  if (!city) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-500">
          Sorry, no information is available for "{cityName}".
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{city.name}</h1>
      <img
        src={city.image}
        alt={city.name}
        className="w-full max-w-[600px] rounded-lg shadow-md mb-6"
      />
      <p className="text-lg text-gray-700 text-center mb-6">{city.description}</p>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top Attractions</h3>
      <ul className="list-disc list-inside text-gray-700">
        {city.attractions.map((attraction, index) => (
          <li key={index} className="mb-2">
            {attraction}
          </li>
        ))}
      </ul>
    </div>
  );
}
