import React, { useState, useEffect } from 'react';
import { Search, User, Menu, CalendarRange, Map, Users, Plane } from 'lucide-react';
import { Logo } from './navbar/Logo';
import { NavLink } from './navbar/NavLink';
import { NavButton } from './navbar/NavButton';
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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg shadow-purple-900/20' 
          : 'bg-gray-900/70 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Logo />
            
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="#destinations">
                <span className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Destinations
                </span>
              </NavLink>
              <NavLink href="#plan-trip">
                <span className="flex items-center gap-2">
                  <CalendarRange className="w-4 h-4" />
                  Plan Trip
                </span>
              </NavLink>
              <NavLink href="#booking">
                <span className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Book
                </span>
              </NavLink>
              <NavLink href="#community">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Community
                </span>
              </NavLink>
            </div>

            <div className="flex items-center gap-2">
              <div className={`hidden md:flex items-center gap-2 ${
                isScrolled ? 'bg-gray-800/80' : 'bg-gray-800/60'
              } rounded-full px-3 py-2 backdrop-blur-sm`}>
                <NavButton icon={Search} label="Search" />
                <NavButton icon={User} label="Profile" />
              </div>
              <button 
                className="md:hidden relative p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
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