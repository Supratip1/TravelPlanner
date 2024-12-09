import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Slider from 'react-slick';
import { Settings } from 'react-slick';

interface Destination {
  id: number;
  name: string;
  images: string[];
  placeNames: string[];
}

// Sample data for countries and their most visited places with images
const countries: Destination[] = [
  {
    id: 1,
    name: 'Japan',
    images: [
      'https://via.placeholder.com/640x360?text=Tokyo',
      'https://via.placeholder.com/640x360?text=Kyoto',
      'https://via.placeholder.com/640x360?text=Osaka',
      'https://via.placeholder.com/640x360?text=Hiroshima',
      'https://via.placeholder.com/640x360?text=Fukuoka',
      'https://via.placeholder.com/640x360?text=Hokkaido',
    ],
    placeNames: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Fukuoka', 'Hokkaido'],
  },
  {
    id: 2,
    name: 'Greece',
    images: [
      'https://via.placeholder.com/640x360?text=Athens',
      'https://via.placeholder.com/640x360?text=Santorini',
      'https://via.placeholder.com/640x360?text=Mykonos',
      'https://via.placeholder.com/640x360?text=Crete',
      'https://via.placeholder.com/640x360?text=Rhodes',
      'https://via.placeholder.com/640x360?text=Thessaloniki',
    ],
    placeNames: ['Athens', 'Santorini', 'Mykonos', 'Crete', 'Rhodes', 'Thessaloniki'],
  },
  {
    id: 3,
    name: 'Indonesia',
    images: [
      'https://via.placeholder.com/640x360?text=Bali',
      'https://via.placeholder.com/640x360?text=Jakarta',
      'https://via.placeholder.com/640x360?text=Yogyakarta',
      'https://via.placeholder.com/640x360?text=Surabaya',
      'https://via.placeholder.com/640x360?text=Bandung',
      'https://via.placeholder.com/640x360?text=Lombok',
    ],
    placeNames: ['Bali', 'Jakarta', 'Yogyakarta', 'Surabaya', 'Bandung', 'Lombok'],
  },
  {
    id: 4,
    name: 'USA',
    images: [
      'https://via.placeholder.com/640x360?text=New York',
      'https://via.placeholder.com/640x360?text=Los Angeles',
      'https://via.placeholder.com/640x360?text=Las Vegas',
      'https://via.placeholder.com/640x360?text=San Francisco',
      'https://via.placeholder.com/640x360?text=Miami',
      'https://via.placeholder.com/640x360?text=Orlando',
    ],
    placeNames: ['New York', 'Los Angeles', 'Las Vegas', 'San Francisco', 'Miami', 'Orlando'],
  },
];

// Sample data for popular places in India
const indiaPlaces: Destination[] = [
  {
    id: 7,
    name: 'India',
    images: [
      'https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2hpbWxhfGVufDB8fDB8fHww',
      'https://cdn.pixabay.com/photo/2024/07/20/15/52/mountains-8908538_640.jpg',
      'https://cdn.pixabay.com/photo/2020/01/20/15/47/nature-4780643_640.jpg',
      'https://via.placeholder.com/640x360?text=Alleppey',
      'https://cdn.pixabay.com/photo/2020/01/16/04/52/munnar-4769654_1280.jpg',
      'https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/06/04/18/00/varanasi-2371751_640.jpg',
      'https://via.placeholder.com/640x360?text=Andaman',
    ],
    placeNames: ['Shimla', 'Manali', 'Goa', 'Alleppey', 'Munnar', 'Jaipur', 'Varanasi', 'Andaman'],
  },
];

export function Destinations() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headingControls = useAnimation();
  const subheadingControls = useAnimation();
  const [mainCarouselIndex, setMainCarouselIndex] = useState<number>(0);
  const mainCarouselRef = React.useRef<Slider>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainCarouselRef.current) {
        const totalSlides = countries.length + indiaPlaces.length;
        const nextIndex = (mainCarouselIndex + 1) % totalSlides;
        setMainCarouselIndex(nextIndex);
        mainCarouselRef.current.slickGoTo(nextIndex);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [mainCarouselIndex]);

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

  // React Slick settings for the main country carousel
  const countrySliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    ref: mainCarouselRef,
  };

  // React Slick settings for sub-carousels of cities
  const citySliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <motion.section
      id="destinations"
      className="pt-8 pb-16 bg-gray-50 overflow-hidden min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore the World & Your Own Backyard</h2>
        <p className="text-lg text-gray-600">
          Discover the best getaways that make every trip memorable, from serene Indian retreats to exotic foreign
          experiences!
        </p>
      </motion.div>

      {/* India Carousel */}
      <div className="w-full px-4 mb-8">
        <Slider {...citySliderSettings}>
          {indiaPlaces[0].images.map((image, cityIndex) => (
            <div key={cityIndex} className="relative p-2">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={image}
                  alt={`Place ${indiaPlaces[0].placeNames[cityIndex]}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="mt-2 text-center text-lg font-semibold text-gray-800">{indiaPlaces[0].placeNames[cityIndex]}</p>
              <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Book Your Adventure
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Foreign Countries Carousel */}
      <div className="w-full px-4">
        <Slider {...countrySliderSettings} ref={mainCarouselRef}>
          {countries.map((country, index) => (
            <div key={country.id} className="relative p-4">
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{country.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {country.images.map((image, cityIndex) => (
                  <div key={cityIndex} className="relative p-2">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={image}
                        alt={`Place ${country.placeNames[cityIndex]}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <p className="mt-2 text-center text-lg font-semibold text-gray-800">{country.placeNames[cityIndex]}</p>
                    <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Plan Your Visit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
}
