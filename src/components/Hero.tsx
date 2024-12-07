import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { HeroLogo } from './hero/HeroLogo';

export function Hero() {
  // Function to scroll to the Destinations section
  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typing state
  const [typedText, setTypedText] = useState('');
  const [showSubheading, setShowSubheading] = useState(false);

  const headingText = 'Experience Virtual Escapes';

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < headingText.length) {
        // Append the next character
        setTypedText(headingText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowSubheading(true), 300); // Show subheading after delay
      }
    }, 100); // Typing speed in ms

    return () => clearInterval(typeInterval);
  }, [headingText]); // Dependency ensures the effect runs correctly

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const buttonHoverEffect = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Enhanced Logo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150"></div>
            <HeroLogo />
          </motion.div>

          {/* Hero Text */}
          <div className="space-y-8">
            {/* Typing Animation for Heading */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight whitespace-nowrap">
              {typedText}
            </h1>

            {/* Animate Subheading after Typing */}
            <AnimatePresence>
              {showSubheading && (
                <motion.p
                  className="text-xl text-gray-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  Explore destinations in immersive AR before you travel. Plan your journey with our AI-powered assistant and see the world like never before.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.button
              className="group flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
              onClick={scrollToDestinations}
              {...buttonHoverEffect}
            >
              Start Exploring
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              className="group flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
              {...buttonHoverEffect}
            >
              <Compass className="w-5 h-5" />
              View Demo
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-900 to-transparent"></div>
    </div>
  );
}
