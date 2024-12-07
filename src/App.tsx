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
        <section id="community" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Section</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;