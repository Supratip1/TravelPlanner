import React from 'react';
import Slider from 'react-slick';
import { Settings } from 'react-slick';

export function BannerSection(): JSX.Element {
  // Carousel settings for the banner
  const bannerSliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Auto slides change every 5 seconds
    arrows: false,
    centerMode: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768, // Mobile view settings
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet and small desktop view
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1440, // Larger desktop view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-6 bg-gray-100 min-h-[70vh] flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-6">Experience India Like Never Before!</h2>

        {/* Banner Carousel */}
        <div className="w-full px-2 md:px-4 mb-6">
          <div className="max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
            <Slider {...bannerSliderSettings}>
              {/* Slide 1: Budget-Friendly Travel Plans */}
              <div className="relative p-2 md:p-3 bg-white rounded-lg shadow-lg">
                <img
                  src="https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpbWxhfGVufDB8fDB8fHww"
                  alt="Budget-Friendly Shimla"
                  className="w-full h-[150px] md:h-[180px] lg:h-[200px] xl:h-[250px] object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-sm md:text-lg font-semibold">Explore Shimla on a Budget – Packages from ₹10,000!</p>
                </div>
              </div>

              {/* Slide 2: Family-Friendly Vacations */}
              <div className="relative p-2 md:p-3 bg-white rounded-lg shadow-lg">
                <img
                  src="https://plus.unsplash.com/premium_photo-1697729432049-caca66a1dab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtlcmFsYSUyMHRvdXJpc218ZW58MHx8MHx8fDA%3D"
                  alt="Family-Friendly Kerala"
                  className="w-full h-[150px] md:h-[180px] lg:h-[200px] xl:h-[250px] object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-sm md:text-lg font-semibold">Create Memories with Your Family in Kerala!</p>
                </div>
              </div>

              {/* Slide 3: Festival Getaways */}
              <div className="relative p-2 md:p-3 bg-white rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1705952484283-19c31e37e0e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRpd2FsaSUyMHZhcmFuYXNpfGVufDB8fDB8fHww"
                  alt="Festival in Varanasi"
                  className="w-full h-[150px] md:h-[180px] lg:h-[200px] xl:h-[250px] object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-sm md:text-lg font-semibold">Celebrate Diwali in the Heart of Varanasi!</p>
                </div>
              </div>

              {/* Slide 4: Solo Travel Adventures */}
              <div className="relative p-2 md:p-3 bg-white rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1603867106100-0d2039fc8757?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpc2hpa2VzaCUyMGFkdmVudHVyZXN8ZW58MHx8MHx8fDA%3D"
                  alt="Solo Travel in Rishikesh"
                  className="w-full h-[150px] md:h-[180px] lg:h-[200px] xl:h-[250px] object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-sm md:text-lg font-semibold">Solo Adventures Await – Experience the Magic of Rishikesh!</p>
                </div>
              </div>

              {/* Slide 5: Romantic Getaways */}
              <div className="relative p-2 md:p-3 bg-white rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1687372721481-be1fd4fa338d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphaXB1cnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Romantic Jaipur"
                  className="w-full h-[150px] md:h-[180px] lg:h-[200px] xl:h-[250px] object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-sm md:text-lg font-semibold">Romantic Escapes – Discover Jaipur’s Royal Charm!</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
