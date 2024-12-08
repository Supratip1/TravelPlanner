// Declare modules for video files
declare module '*.mp4' {
  const value: string;
  export default value;
}

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Star, Users } from 'lucide-react';

// Import video files
import TokyoVideo from '../videos/Tokyo.mp4';
import SantoriniVideo from '../videos/Santorini.mp4';
import BaliVideo from '../videos/Bali.mp4';
import USVideo from '../videos/US.mp4';
import DubaiVideo from '../videos/Dubai.mp4';
import SingaporeVideo from '../videos/Singapore.mp4';

const destinations = [
  {
    id: 1,
    title: "Tokyo, Japan",
    video: TokyoVideo,
    rating: 4.9,
    reviews: 2841,
    arExperiences: 42,
  },
  {
    id: 2,
    title: "Santorini, Greece",
    video: SantoriniVideo,
    rating: 4.8,
    reviews: 2103,
    arExperiences: 35,
  },
  {
    id: 3,
    title: "Bali, Indonesia",
    video: BaliVideo,
    rating: 4.9,
    reviews: 1957,
    arExperiences: 28,
  },
  {
    id: 4,
    title: "New York, USA",
    video: USVideo,
    rating: 4.7,
    reviews: 3412,
    arExperiences: 53,
  },
  {
    id: 5,
    title: "Dubai, UAE",
    video: DubaiVideo,
    rating: 4.6,
    reviews: 2895,
    arExperiences: 60,
  },
  {
    id: 6,
    title: "Singapore",
    video: SingaporeVideo,
    rating: 4.8,
    reviews: 2601,
    arExperiences: 45,
  },
];

export function Destinations() {
  const [isVisible, setIsVisible] = useState(false);
  const headingControls = useAnimation();
  const subheadingControls = useAnimation();
  const cardControls = destinations.map(() => useAnimation()); // Create an animation control for each card

  useEffect(() => {
    const sequence = async () => {
      // Animate heading
      await headingControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } });
      playSound(); // Play sound for heading
  
      // Animate subheading
      await subheadingControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 } });
      playSound(); // Play sound for subheading
  
      // Animate cards one by one with shorter delays
      for (let i = 0; i < destinations.length; i++) {
        // Reduce the delay (e.g., 150ms delay between each card)
        await new Promise((resolve) => setTimeout(resolve, i * 150)); // Adjusted delay
        await cardControls[i].start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } });
        playPopSound(); // Play pop sound for each card
      }
    };
  
    sequence();
    setIsVisible(true);
  }, [headingControls, subheadingControls, cardControls]);
  

  // Function to play a simple sound effect for heading and subheading
  const playSound = () => {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Simple beep sound
    audio.play();
  };

  // Function to play a "pop" sound effect for the cards
  const playPopSound = () => {
    const audio = new Audio('https://www.soundjay.com/button/pop-03.wav'); // Simple pop sound
    audio.play();
  };

  return (
    <motion.section
      id="destinations"
      className="pt-8 pb-16 bg-gray-50 overflow-hidden min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Centered Heading */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={headingControls}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight transform hover:scale-105 hover:rotate-2 transition-transform duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={headingControls}
        >
          Discover Amazing Destinations
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-500 text-lg md:text-xl font-medium tracking-normal transform hover:translate-y-1 transition-transform duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={subheadingControls}
        >
          Explore the world’s best places with immersive AR experiences.
        </motion.p>
      </motion.div>

      {/* Destination Cards */}
      <motion.div className="container mx-auto px-6">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 hover:rotate-1"
              initial={{ opacity: 0, y: 20 }}
              animate={cardControls[index]}
            >
              <div className="relative h-64 overflow-hidden">
                <video
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={dest.video}
                  alt={dest.title}
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
                <motion.button
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Preview in AR
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
