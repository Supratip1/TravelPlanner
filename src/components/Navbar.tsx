import React, { useState, useEffect } from 'react';
import { Menu, CalendarRange, Map, Plane } from 'lucide-react';
import { Logo } from './navbar/Logo';
import { NavLink } from './navbar/NavLink';
import { MobileNav } from './navbar/MobileNav';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileNavOpen]);

  return (
    <>
      <nav className={`relative w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-800 backdrop-blur-md shadow-sm' // Darker, more professional background with subtle shadow
          : 'bg-gray-900 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14"> {/* Reduced height */}
            <Logo />

            <div className="hidden md:flex items-center gap-6 ml-auto">
              <NavLink href="#destinations">
                <span className="flex items-center gap-2 text-sm text-white"> {/* Subtle text color */}
                  <Map className="w-4 h-4 text-gray-400" /> {/* Lighter icon color */}
                  Destinations
                </span>
              </NavLink>
              <NavLink href="#plan-trip">
                <span className="flex items-center gap-2 text-sm text-white">
                  <CalendarRange className="w-4 h-4 text-gray-400" />
                  Plan Trip
                </span>
              </NavLink>
              <NavLink href="#booking">
                <span className="flex items-center gap-2 text-sm text-white">
                  <Plane className="w-4 h-4 text-gray-400" />
                  Book
                </span>
              </NavLink>
            </div>

            <button 
              className="md:hidden relative p-2 text-white hover:text-gray-400 transition-colors"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
    </>
  );
}
