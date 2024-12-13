import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export function Hero() {
  const [typedText, setTypedText] = useState<string>('');
  const [showSubheading, setShowSubheading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [startingPlace, setStartingPlace] = useState<string>('');
  const [travelers, setTravelers] = useState<{ adults: number; kids: number }>({
    adults: 0,
    kids: 0,
  });

  const heroRef = useRef<HTMLDivElement | null>(null);

  const headingText: string = 'IndiaXplore';
  const subheadingText: string = 'Instantly plan your dream trip with AI-driven recommendations, tailored just for you! Best Deals Guaranteed.';

  const preferenceOptions = [
    'Family-friendly',
    'Romantic',
    'Solo',
    'Adventure',
    'Luxury',
    'Spiritual',
    'Eco-friendly',
    'Workations',
    'Honeymoons',
    'Destination Weddings',
    'Couple Getaways',
    'Content Creators',
    'Food & Culinary Explorers',
    'Historical & Heritage Seekers',
    'Wellness & Spiritual Seekers',
    'Nature & Wildlife Enthusiasts',
    'Cultural Immersion & Local Traditions',
    'Adventure & Extreme Sports',
    'Luxury & Boutique Stays',
    'Local Explorer & Hidden Gems',
    'Volunteer & Community Service Travelers',
    'Digital Nomads & Remote Workers',
  ];

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
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => setBudget(e.target.value);
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10); // Convert to number if not empty
    setTravelers((prev) => ({ ...prev, adults: value }));
  };
  
  const handleKidsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10); // Convert to number if not empty
    setTravelers((prev) => ({ ...prev, kids: value }));
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handlePreferenceToggle = (preference: string) => {
    setPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(item => item !== preference)
        : [...prev, preference]
    );
  };

  const handleSearchSubmit = async () => {
    console.log('Search submitted');
    if (!searchInput || !budget || !startDate || !endDate || preferences.length === 0 || !startingPlace || !travelers) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/trips', {
        searchInput,
        budget,
        startDate,
        endDate,
        preferences,
        startingPlace,
        travelers,
      });
  
      if (response.data) {
        console.log('Itineraries:', response.data);
      }
    } catch (error) {
      const errorMessage = error.response?.data || error.message || 'An unknown error occurred';
      console.error('Error fetching itineraries:', errorMessage);
      alert('Failed to fetch trips. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
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
            backgroundImage: `url('https://images.unsplash.com/photo-1446757981584-845b14aa7dd0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjIwfHxpbmRpYSUyMG5vcnRoZWFzdHxlbnwwfHwwfHx8MA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'lighten',
          }}
        ></div>

        <div className="relative container mx-auto px-4 py-12 max-w-3xl text-center flex flex-col justify-center min-h-screen">
          <div className="space-y-6">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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

            <AnimatePresence>
              {showSubheading && (
                <motion.p
                  className="text-base sm:text-lg text-gray-300 mx-auto mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  Instantly plan your dream trip with AI-driven recommendations that guarantee both{' '}
                  <span className="text-yellow-500">best deals and unique experiences!</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-4 rounded-lg text-black focus:outline-none"
              placeholder="Type your ideal trip and select preferences from the dropdown below..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            
            <input
              type="text"
              className="w-full p-4 rounded-lg text-black focus:outline-none"
              placeholder="Starting Place"
              value={startingPlace}
              onChange={(e) => setStartingPlace(e.target.value)}
            />

            <div className="relative">
              <button
                className="w-full bg-white text-black p-4 rounded-lg text-left"
                onClick={toggleDropdown}
              >
                {preferences.length > 0
                  ? `Selected Preferences: ${preferences.join(', ')}`
                  : 'Select Travel Preferences'}
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-2 bg-white text-black shadow-lg rounded-lg p-4 w-full max-h-64 overflow-y-auto">
                  {preferenceOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        checked={preferences.includes(option)}
                        onChange={() => handlePreferenceToggle(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <input
              type="number"
              className="w-full p-4 rounded-lg text-black focus:outline-none"
              placeholder="Your Budget (in INR)"
              value={budget}
              onChange={handleBudgetChange}
            />

            <div className="flex gap-4">
              <div className="w-full">
                <input
                  type="date"
                  className="w-full p-4 rounded-lg text-black focus:outline-none"
                  value={startDate}
                  onChange={handleStartDateChange}
                  placeholder="Start Date"
                />
              </div>
              <div className="w-full">
                <input
                  type="date"
                  className="w-full p-4 rounded-lg text-black focus:outline-none"
                  value={endDate}
                  onChange={handleEndDateChange}
                  placeholder="End Date"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-full">
              <input
  type="number"
  className="w-full p-4 rounded-lg text-black focus:outline-none"
  value={travelers.adults > 0 ? travelers.adults : ''}  // Display the value or empty string
  onChange={handleAdultsChange}
  placeholder="Number of Adults"
/>

              </div>
              <div className="w-full">
              <input
  type="number"
  className="w-full p-4 rounded-lg text-black focus:outline-none"
  value={travelers.kids > 0 ? travelers.kids : ''}  // Display the value or empty string
  onChange={handleKidsChange}
  placeholder="Number of Kids"
/>

              </div>
            </div>

            <button
              className="mt-4 bg-yellow-500 text-black p-4 rounded-lg w-full sm:w-auto sm:px-12"
              onClick={handleSearchSubmit}
            >
              Find My Trip
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
