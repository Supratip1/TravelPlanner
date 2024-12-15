import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="./src/components/travel.png" 
              alt="Supratip Travel Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-black hover:text-gray-600 transition text-base"
          >
            Home
          </button>
          <button
            onClick={() => {
              document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-black hover:text-gray-600 transition text-base"
          >
            Destinations
          </button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-black hover:text-gray-600 transition text-base"
          >
            Contact
          </button>
          
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black hover:text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg md:hidden">
            <div className="container mx-auto px-4 py-4">
              <button
                onClick={() => {
                  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-black hover:text-gray-600 transition mb-4 text-base"
              >
                Home
              </button>
              <button
                onClick={() => {
                  document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-black hover:text-gray-600 transition mb-4 text-base"
              >
                Destinations
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-black hover:text-gray-600 transition mb-4 text-base"
              >
                Contact
              </button>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;