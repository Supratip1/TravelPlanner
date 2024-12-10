import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { CityPage } from './components/CityPage'; // Import the CityPage component
import { Footer } from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the main site with Navbar, Hero, and Footer */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <Hero />
                <Routes>
                  <Route path="/destinations" element={<Destinations />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
        {/* Route for CityPage */}
        <Route
          path="/itinerary/:cityName"
          element={
            <div className="min-h-screen bg-white">
              <CityPage />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
