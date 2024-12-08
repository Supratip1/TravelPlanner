import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { HeroLogo } from './hero/HeroLogo';
import { Destinations } from './Destinations'; // Import the Destinations component

export function Hero() {
  const [typedText, setTypedText] = useState('');
  const [showSubheading, setShowSubheading] = useState(false);
  const [heroHeight, setHeroHeight] = useState('100vh');

  const heroRef = useRef(null);

  // Heading and subheading text
  const headingText = 'Experience Virtual Escapes';
  const subheadingText = 'Plan with AI, see in AR.';

  // Set the hero card height dynamically
  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(`${heroRef.current.clientHeight}px`);
    }
  }, []); // Removed `tilt` dependency

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

  // Scroll and button click handlers
  useEffect(() => {
    const handleScroll = () => {
      // Removed `tilt` logic
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen py-0">
      {/* Full-Screen Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative w-full h-screen md:h-auto max-w-full md:max-w-sm bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 text-white overflow-hidden"
        style={{
          height: '100vh', // Removed `tilt` conditional style
          overflow: 'hidden',
          borderRadius: '0', // Removed `tilt` conditional style
          boxShadow: 'none', // Removed `tilt` conditional style
          margin: '0',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 py-32 mt-12">
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
              {/* Typing Animation for the Heading */}
              <motion.h1
                className="text-4xl sm:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {typedText.split(' ').map((word, index) => (
                  <span key={index} className={`${index === 1 ? 'block sm:inline' : ''}`}>{word}{' '}</span>
                ))}
              </motion.h1>

              {/* Animate Subheading after Typing is Complete */}
              <AnimatePresence>
                {showSubheading && (
                  <motion.p
                    className="text-lg text-gray-300 max-w-2xl mx-auto"
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
              className="flex flex-wrap justify-center gap-4"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <motion.button
                className="group flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                onClick={scrollToDestinations}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                className="group flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Compass className="w-5 h-5" />
                View Demo
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-900 to-transparent"></div>
      </motion.div>

      {/* Destinations Section */}
      <div className="flex-1 overflow-hidden">
        <Destinations />
      </div>
    </div>
  );
}
