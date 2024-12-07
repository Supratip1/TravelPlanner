import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { ItineraryPlanner } from './components/features/ItineraryPlanner';
import { BookingSection } from './components/booking/BookingSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <section id="destinations">
          <Destinations />
        </section>
        <section id="plan-trip">
          <ItineraryPlanner />
        </section>
        <section id="booking">
          <BookingSection />
        </section>
        
      </main>
    </div>
  );
}

export default App;