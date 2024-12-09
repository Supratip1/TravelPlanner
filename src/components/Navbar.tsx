import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaPlane, FaPlay, FaPause, FaBars } from 'react-icons/fa'; // Import necessary icons
import { NavLink } from './navbar/NavLink';
import { MobileNav } from './navbar/MobileNav';
import backgroundMusic from '../sound/bensound-sunny.mp3';

export function Navbar(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} src={backgroundMusic} loop muted={false} className="hidden" />

      <nav
        className={`relative w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-purple-800 backdrop-blur-md shadow-sm'
            : 'bg-purple-900 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo and Website Name */}
            <div className="flex items-center gap-3">
              <FaGlobe className="text-white w-6 h-6" />
              <span className="text-white text-xl font-bold">DreamTravel</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <NavLink
                href="#destinations"
                className="text-white text-sm border-b-2 border-transparent hover:border-purple-500 hover:text-white transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  Destinations
                </span>
              </NavLink>
              <NavLink
                href="#plan-trip"
                className="text-white text-sm border-b-2 border-transparent hover:border-purple-500 hover:text-white transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  Plan Trip
                </span>
              </NavLink>
              <NavLink
                href="#booking"
                className="text-white text-sm border-b-2 border-transparent hover:border-purple-500 hover:text-white transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaPlane className="w-4 h-4" />
                  Book
                </span>
              </NavLink>

              
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative p-2 text-white hover:text-gray-400 transition-colors"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle mobile menu"
            >
              <FaBars className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
