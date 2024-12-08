import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 2841,
    arExperiences: 42,
  },
  {
    id: 2,
    title: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 2103,
    arExperiences: 35,
  },
  {
    id: 3,
    title: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 1957,
    arExperiences: 28,
  },
  {
    id: 4,
    title: "Paris, France",
    image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    reviews: 3412,
    arExperiences: 53,
  },
  {
    id: 5,
    title: "New York, USA",
    image: "https://images.unsplash.com/photo-1502293636036-c486b4723f0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG5ldyUyMHlvcmslMjB0b3Vyc2ltfGVufDB8fDB8fHww",
    rating: 4.6,
    reviews: 2895,
    arExperiences: 60,
  },
  {
    id: 6,
    title: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1532186651327-6ac23687d189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhbGl8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    reviews: 2601,
    arExperiences: 45,
  },
];

export function Destinations() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('destinations');
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="destinations"
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-8" // Adjusted margin for heading
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Popular AR Destinations
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
