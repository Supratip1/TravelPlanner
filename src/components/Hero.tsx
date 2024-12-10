import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Destinations } from './Destinations'; // Import the Destinations component
import { ItineraryPlanner } from './features/ItineraryPlanner';

export function Hero() {
  const [typedText, setTypedText] = useState('');
  const [showSubheading, setShowSubheading] = useState(false);
  const heroRef = useRef(null);

  // Updated heading and subheading text for an AI-focused travel service
  const headingText = 'Your Dream Indian Vacation, Customized by AI';
  const subheadingText = 'Discover the perfect travel deals personalized for you with the power of AI';

  // Typing animation for the heading
  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < headingText.length) {
        setTypedText(headingText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowSubheading(true);
        }, 300);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [headingText]);

  // Scroll handler for the buttons
  const scrollToItineraryPlanner = () => {
    const itinerarySection = document.getElementById('itinerary-planner');
    if (itinerarySection) {
      itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToDestination = () => {
    const destinationSection = document.getElementById('destinations');
    if (destinationSection) {
      destinationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 text-white overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 max-w-full"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-12 max-w-2xl text-center">
          <div className="space-y-6">
            {/* Typing Animation for the Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {typedText.split(' ').map((word, index) => (
                <span key={index} className={`${index === 1 ? 'block sm:inline' : ''}`}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            {/* Animate Subheading after Typing is Complete */}
            <AnimatePresence>
              {showSubheading && (
                <motion.p
                  className="text-lg text-gray-300 mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {subheadingText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex justify-center gap-4 mt-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.button
  className="group flex items-center gap-2 bg-white text-purple-900 px-4 py-2 text-sm sm:text-base sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
  onClick={scrollToDestination}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Popular Destinations
  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
</motion.button>
<motion.button
  className="group flex items-center gap-2 bg-white text-purple-900 px-4 py-2 text-sm sm:text-base sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
  onClick={scrollToItineraryPlanner}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Compass className="w-5 h-5" />
  Customize your own Trip
</motion.button>

          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-900 to-transparent"></div>
      </motion.div>

      {/* Destinations Section */}
      <div id="destinations" className="flex-1 w-full overflow-y-auto bg-gray-50">
        <Destinations />
      </div>

      {/* Itinerary Planner Section */}
      <div id="itinerary-planner" className="pb-16">
        <ItineraryPlanner />
      </div>
    </div>
  );
}
