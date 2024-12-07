import React from 'react';
import { MapPin, Star, Users } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 2841,
    arExperiences: 42
  },
  {
    id: 2,
    title: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 2103,
    arExperiences: 35
  },
  {
    id: 3,
    title: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 1957,
    arExperiences: 28
  }
];

export function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Popular AR Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> {dest.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{dest.rating}</span>
                    <span className="text-gray-500">({dest.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Users className="w-5 h-5" />
                    <span>{dest.arExperiences} AR Experiences</span>
                  </div>
                </div>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Preview in AR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}