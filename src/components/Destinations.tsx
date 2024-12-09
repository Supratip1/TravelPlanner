import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Slider from 'react-slick';
import { MapPin, Star, Users } from 'lucide-react';
import { Settings } from 'react-slick';

// Type for the country data
interface Country {
  id: number;
  name: string;
  videos: string[]; // Array of video URLs or file paths for cities
}

// Sample data for countries and cities
const countries: Country[] = [
  {
    id: 1,
    name: 'Japan',
    videos: [
      'https://via.placeholder.com/640x360?text=Tokyo',
      'https://via.placeholder.com/640x360?text=Kyoto',
      'https://via.placeholder.com/640x360?text=Osaka',
      'https://via.placeholder.com/640x360?text=Hiroshima',
      'https://via.placeholder.com/640x360?text=Fukuoka',
      'https://via.placeholder.com/640x360?text=Hokkaido',
    ],
  },
  {
    id: 2,
    name: 'Greece',
    videos: [
      'https://via.placeholder.com/640x360?text=Athens',
      'https://via.placeholder.com/640x360?text=Santorini',
      'https://via.placeholder.com/640x360?text=Mykonos',
      'https://via.placeholder.com/640x360?text=Crete',
      'https://via.placeholder.com/640x360?text=Rhodes',
      'https://via.placeholder.com/640x360?text=Thessaloniki',
    ],
  },
  {
    id: 3,
    name: 'Indonesia',
    videos: [
      'https://via.placeholder.com/640x360?text=Bali',
      'https://via.placeholder.com/640x360?text=Jakarta',
      'https://via.placeholder.com/640x360?text=Yogyakarta',
      'https://via.placeholder.com/640x360?text=Surabaya',
      'https://via.placeholder.com/640x360?text=Bandung',
      'https://via.placeholder.com/640x360?text=Lombok',
    ],
  },
  {
    id: 4,
    name: 'USA',
    videos: [
      'https://via.placeholder.com/640x360?text=New York',
      'https://via.placeholder.com/640x360?text=Los Angeles',
      'https://via.placeholder.com/640x360?text=Las Vegas',
      'https://via.placeholder.com/640x360?text=San Francisco',
      'https://via.placeholder.com/640x360?text=Miami',
      'https://via.placeholder.com/640x360?text=Orlando',
    ],
  },
  {
    id: 5,
    name: 'UAE',
    videos: [
      'https://via.placeholder.com/640x360?text=Dubai',
      'https://via.placeholder.com/640x360?text=Abu Dhabi',
      'https://via.placeholder.com/640x360?text=Sharjah',
      'https://via.placeholder.com/640x360?text=Fujairah',
      'https://via.placeholder.com/640x360?text=Ajman',
      'https://via.placeholder.com/640x360?text=Ras Al Khaimah',
    ],
  },
  {
    id: 6,
    name: 'Singapore',
    videos: [
      'https://via.placeholder.com/640x360?text=Orchard Road',
      'https://via.placeholder.com/640x360?text=Marina Bay',
      'https://via.placeholder.com/640x360?text=Sentosa',
      'https://via.placeholder.com/640x360?text=Little India',
      'https://via.placeholder.com/640x360?text=Chinatown',
      'https://via.placeholder.com/640x360?text=Bugis',
    ],
  },
];

export function Destinations() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headingControls = useAnimation();
  const subheadingControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await headingControls.start({
        opacity: 1,
        y: 0,
        rotateX: 10,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
      await subheadingControls.start({
        opacity: 1,
        y: 0,
        rotateX: 5,
        transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
      });
    };

    sequence();
    setIsVisible(true);
  }, [headingControls, subheadingControls]);

  // React Slick settings for main country carousel
  const countrySliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // React Slick settings for city sub-carousels
  const citySliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
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
          className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight"
        >
          Discover Popular Travel Destinations
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-500 text-lg md:text-xl font-medium"
        >
          Explore the most visited countries and their top cities!
        </motion.p>
      </motion.div>

      {/* Main Carousel for Countries */}
      <motion.div className="container mx-auto px-6">
        <Slider {...countrySliderSettings}>
          {countries.map((country) => (
            <motion.div key={country.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">{country.name}</h3>
              {/* Sub-carousel for cities */}
              <Slider {...citySliderSettings}>
                {country.videos.map((video, index) => (
                  <div key={index} className="relative bg-gray-200 rounded-lg overflow-hidden">
                    <video
                      className="w-full h-60 object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      src={video}
                      alt={`City ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </motion.section>
  );
}
