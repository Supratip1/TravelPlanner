import React from 'react';
import { useParams } from 'react-router-dom';
import { cityDetails } from './CityData';
import { ItineraryPlanner } from '../components/features/ItineraryPlanner'; // Import your form component

export function CityPage() {
  const { cityName } = useParams<{ cityName: string }>();

  // Fetch city details based on the cityName
  const city = cityDetails.find(
    (city) => city.name.toLowerCase() === cityName?.toLowerCase()
  );

  if (!city) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-red-100 to-red-200">
        <h2 className="text-2xl font-bold text-red-800">
          Sorry, no information is available for "{cityName}".
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 flex flex-col items-center space-y-12">
      
      {/* Best Deals Section */}
      <div className="w-full bg-gradient-to-r from-yellow-100 to-yellow-300 py-6 px-4 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Best Shimla Packages</h2>
        <div className="flex overflow-x-auto space-x-4 px-4">
          {/* Example Deals */}
          {city.packages?.map((pkg, index) => (
            <div key={index} className="min-w-[250px] bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <p className="text-gray-600">{pkg.duration}</p>
              <p className="text-lg font-bold text-green-600">{pkg.price}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* City Information Section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{city.name}</h1>
        <img
          src={city.image}
          alt={city.name}
          className="w-full max-w-[600px] mx-auto rounded-lg shadow-lg mb-6 border border-gray-300"
        />
        <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">{city.description}</p>

        {/* Additional Information */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">History</h3>
        <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">{city.history}</p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Best Time to Visit</h3>
        <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">{city.bestTimeToVisit}</p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hidden Gems</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          {city.hiddenGems.map((gem, index) => (
            <li key={index} className="hover:text-blue-600 transition duration-200">
              {gem}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Top Attractions</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          {city.attractions.map((attraction, index) => (
            <li key={index} className="hover:text-blue-600 transition duration-200">
              {attraction}
            </li>
          ))}
        </ul>
      </div>

      {/* Plan Your Visit Form */}
      <div className="w-full bg-yellow-100 shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Plan Your Perfect Trip</h2>
        <div className="flex-grow">
          <ItineraryPlanner /> {/* Render your form component here */}
        </div>
      </div>
    </div>
  );
}
