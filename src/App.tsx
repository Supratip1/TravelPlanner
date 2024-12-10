import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { ItineraryPlanner } from './components/features/ItineraryPlanner';
import { BookingSection } from './components/booking/BookingSection';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Footer } from './components/Footer';
import { BannerSection } from './components/BannerSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <main>
        <Hero />
        
        <Footer/>
         
{/* 
<section id="booking">
  <BookingSection />
</section>
*/}
 

        
      </main>
    </div>
  );
}

export default App;