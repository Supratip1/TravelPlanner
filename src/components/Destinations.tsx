import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Settings } from 'react-slick';
import { motion, useAnimation } from 'framer-motion';

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
      'https://cdn.pixabay.com/photo/2021/08/27/06/53/houseboat-6577912_640.jpg',
      'https://cdn.pixabay.com/photo/2020/01/16/04/52/munnar-4769654_1280.jpg',
      'https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/06/04/18/00/varanasi-2371751_640.jpg',
      'https://images.unsplash.com/photo-1642498232612-a837df233825?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuZGFtYW58ZW58MHx8MHx8fDA%3D',
      'https://plus.unsplash.com/premium_photo-1661964079694-ccfaf7dc8028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmlzaGlrZXNofGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1697729578645-a9decad10b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGVofGVufDB8fDB8fHww',
    ],
    placeNames: ['Shimla', 'Manali', 'Goa', 'Alleppey', 'Munnar', 'Jaipur', 'Varanasi', 'Andaman', 'Udaipur', 'Rishikesh', 'Leh'],
  },
];

export function Destinations() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const headingControls = useAnimation();
  const subheadingControls = useAnimation();
  const mainCarouselRef = React.useRef<Slider>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (mainCarouselRef.current) {
        mainCarouselRef.current.slickNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
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

  const citySliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
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
        <div className="max-w-[100%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] mx-auto">
          <Slider {...citySliderSettings} ref={mainCarouselRef}>
            {indiaPlaces[0].images.map((image, cityIndex) => (
              <div key={cityIndex} className="relative p-4 md:p-6 flex flex-col justify-between h-full">
                <div className="overflow-hidden rounded-lg shadow-lg bg-white flex-1 flex flex-col justify-between">
                  <img
                    src={image}
                    alt={`Place ${indiaPlaces[0].placeNames[cityIndex]}`}
                    className="w-full h-[300px] md:h-[350px] lg:h-[300px] xl:h-[350px] 2xl:h-[400px] object-cover rounded-lg"
                  />
                  <div className="px-4 py-2">
                    <p className="mt-3 text-center text-lg font-semibold text-gray-800">
                      {indiaPlaces[0].placeNames[cityIndex]}
                      <p className="mt-2 text-center text-md text-gray-600 font-light">
                      {/* Custom descriptions */}
                      {cityIndex === 0 && "Discover the charming cold, perfect for a family getaway in the lap of nature. Packages starting at ₹10,000!"}
                      {cityIndex === 1 && "Adventure seekers will love the thrilling activities and stunning views. All-inclusive packages from ₹12,000!"}
                      {cityIndex === 2 && "Relax on sun-kissed beaches with beachside shacks and lively nightlife. Starting at ₹8,000 per person!"}
                      {cityIndex === 3 && "Sail through picturesque backwaters on traditional houseboats. Experience serenity for ₹15,000 per couple!"}
                      {cityIndex === 4 && "Indulge in peaceful retreats amid lush tea gardens and rolling hills. Find packages from ₹9,000!"}
                      {cityIndex === 5 && "Step into a world of royal architecture and vibrant culture. Explore Rajasthan from ₹11,000 per day!"}
                      {cityIndex === 6 && "Feel the spiritual essence of India with historic temples and sacred rituals. Spiritual tours starting at ₹6,000!"}
                      {cityIndex === 7 && "Immerse yourself in tropical paradise with white sand beaches and adventure sports. Explore Andaman from ₹18,000!"}
                      {cityIndex === 8 && "Explore the City of Lakes, offering romantic vibes, rich history, and cultural treasures. Packages from ₹7,000!"}
                      {cityIndex === 9 && "Dive into yoga, spirituality, and adrenaline-pumping river adventures. Thrilling trips starting at ₹5,000!"}
                      {cityIndex === 10 && "Conquer the mighty Himalayas and embrace the serenity of monasteries. Adventures begin at ₹20,000!"}
                    </p>
                    </p>
                    <button
  onClick={() => {
    const cityPath = `/itinerary/${indiaPlaces[0].placeNames[cityIndex]}`;
    console.log('Navigating to path:', cityPath);  // Debug output
    navigate(cityPath);
  }}
  
  className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  Book Your Trip
</button>

                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.section>
  );
}