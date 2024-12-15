import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Hero() {
  const [typedText, setTypedText] = useState<string>('');
  const [showSubheading, setShowSubheading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [startingPlace, setStartingPlace] = useState<string>('');
  const [travelers, setTravelers] = useState<{ adults: number; kids: number }>({
    adults: 0,
    kids: 0,
  });

  const heroRef = useRef<HTMLDivElement | null>(null);

  const headingText: string = 'IndiaXplore';
  const subheadingText: string = 'Instantly plan your dream trip with AI-driven recommendations, tailored just for you! Best Deals Guaranteed.';

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

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
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => setBudget(e.target.value);
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setTravelers((prev) => ({ ...prev, adults: value }));
  };
  const handleKidsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setTravelers((prev) => ({ ...prev, kids: value }));
  };

  const handleSearchSubmit = async () => {
    console.log('Search submitted');
    if (!searchInput || !budget || !startDate || !endDate || preferences.length === 0 || !startingPlace || !travelers) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchInput,
          budget,
          startDate,
          endDate,
          preferences,
          startingPlace,
          travelers,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Itineraries:', data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error fetching itineraries:', errorMessage);
      alert('Failed to fetch trips. Please try again.');
    }
  };

  return (
    <div className="form-container flex flex-col min-h-[calc(100vh-300px)] w-full overflow-x-hidden">
      <motion.div
        ref={heroRef}
        className="relative w-full min-h-screen bg-cover bg-center bg-opacity-100"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-opacity-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1645033393602-4f7623917853?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhpbWFsYXlhc3xlbnwwfHwwfHx8MA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.9) contrast(1.2)',
          }}
        ></div>

        <div className="relative container mx-auto px-4 py-12 max-w-5xl text-center flex flex-col justify-center min-h-screen">
          <motion.h1
            className="hero-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 sm:mt-24 md:mt-32"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {typedText.split(' ').map((word, index) => (
              <span key={index} className={index === 1 ? 'block sm:inline' : ''}>
                {word}{' '}
              </span>
            ))}
            <br />
            <span className="text-yellow-500 text-2xl sm:text-3xl lg:text-4xl">Best Deals & Unique Experiences</span>
          </motion.h1>

          <div className="mt-6">
            <AnimatePresence>
              {showSubheading && (
                <motion.p
                  className="text-base sm:text-lg text-gray-300 mx-auto mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  Instantly plan your dream trip with AI-driven recommendations that guarantee both{' '}
                  <span className="text-yellow-500">best deals and unique experiences!</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center items-center mt-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input
              type="text"
              className="flex-1 p-2 border rounded-md text-sm focus:outline-none"
              placeholder="Search Destination"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              className="flex-1 p-2 border rounded-md text-sm focus:outline-none"
              placeholder="Starting Place"
              value={startingPlace}
              onChange={(e) => setStartingPlace(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded-md text-sm focus:outline-none"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              className="p-2 border rounded-md text-sm focus:outline-none"
              value={endDate}
              onChange={handleEndDateChange}
            />
            <input
              type="number"
              className="p-2 border rounded-md text-sm focus:outline-none"
              placeholder="Budget"
              value={budget}
              onChange={handleBudgetChange}
            />
           
            <button
              className="bg-yellow-500 text-black py-2 px-6 rounded-md"
              onClick={handleSearchSubmit}
            >
              Find My Trip
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
