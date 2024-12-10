import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Slider from 'react-slick';
import { Settings } from 'react-slick';
import { ItineraryPlanner } from '../components/features/ItineraryPlanner';

interface Destination {
  id: number;
  name: string;
  images: string[];
  placeNames: string[];
}

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
  const formRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainCarouselRef.current) {
        const totalSlides = indiaPlaces[0].images.length;
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

  // React Slick settings with adjustments for mobile-first design
  const citySliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768, // Mobile view settings
        settings: {
          slidesToShow: 1,
          centerMode: true,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1024, // Tablet and small desktop view
        settings: {
          slidesToShow: 2,
          centerMode: true,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1440, // Larger desktop view
        settings: {
          slidesToShow: 2, // Reduced number of slides shown
          centerMode: false,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1920, // Extra large screens
        settings: {
          slidesToShow: 3, // More slides shown on very large screens
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  };

  const scrollToForm = () => {
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.section
      id="destinations"
      className="pt-8 pb-8 bg-gray-50 overflow-hidden min-h-screen flex flex-col items-center"
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
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Discover the Magic of India!</h2>
        <p className="text-lg text-gray-600">
          From the serene hills of Shimla to the golden sands of Goa, embark on an adventure that will
          leave you spellbound.
        </p>
      </motion.div>

      {/* India Carousel */}
      <div className="w-full px-4 mb-12">
  {/* Add a container to control the size of the carousel */}
  <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto">
    <Slider {...citySliderSettings} ref={mainCarouselRef}>
      {indiaPlaces[0].images.map((image, cityIndex) => (
        <div key={cityIndex} className="relative p-4 md:p-6">
          <div className="overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src={image}
              alt={`Place ${indiaPlaces[0].placeNames[cityIndex]}`}
              className="w-full h-[300px] md:h-[350px] lg:h-[300px] xl:h-[350px] 2xl:h-[400px] object-cover rounded-lg"
            />
          </div>
          <p className="mt-3 text-center text-lg font-semibold text-gray-800">{indiaPlaces[0].placeNames[cityIndex]}</p>
          <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Book Your Adventure
          </button>
        </div>
      ))}
    </Slider>
  </div>
</div>


      {/* Call-to-Action Section */}
      <div className="w-full px-4 py-8 text-center bg-blue-100 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Dreaming of Your Next Great Adventure?</h3>
        <p className="text-lg text-gray-600 mb-6">
          It’s time to make it happen. Your journey is just one form away. The wonders of India await!
        </p>
        <button
          className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={scrollToForm}
        >
          Plan Your Dream Trip Now
        </button>
      </div>

      {/* Plan Trip Section */}
      <section id="plan-trip" ref={formRef} className="mt-12">
        <ItineraryPlanner />
      </section>
    </motion.section>
  );
}
