import React, { useState, useEffect, useRef } from 'react';
import { Menu, CalendarRange, Map, Plane, Play, Pause } from 'lucide-react'; // Import icons
import { Logo } from './navbar/Logo';
import { NavLink } from './navbar/NavLink';
import { MobileNav } from './navbar/MobileNav';
import backgroundMusic from '../sound/bensound-sunny.mp3'; // Adjust path as needed

export function Navbar(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Initially false to not auto-play
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Play or pause audio based on `isPlaying` state
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
      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        muted={false}
        className="hidden"
      />

      <nav className={`relative w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-purple-800 backdrop-blur-md shadow-sm'
          : 'bg-purple-900 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Logo />

            {/* Navigation links container */}
            <div className="flex items-center gap-6 ml-auto">
              {/* Navigation links */}
              <NavLink 
                href="#destinations" 
                className="text-white text-sm border-b-2 border-transparent hover:border-purple-500 hover:text-white transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Destinations
                </span>
              </NavLink>
              <NavLink 
                href="#plan-trip" 
                className="text-white text-sm border-b-2 border-transparent hover:border-purple-500 hover:text-white transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <CalendarRange className="w-4 h-4" />
                  Plan Trip
                </span>
              </NavLink>
              <NavLink 
                href="#booking" 
                className="text-white text-sm border-b-2 border-transparent hover:border-purple-500 hover:text-white transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Book
                </span>
              </NavLink>
              {/* Play/Pause button */}
              <button
                className="text-white text-sm flex items-center"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 mr-1" />
                ) : (
                  <Play className="w-5 h-5 mr-1" />
                )}
                <span>
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
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
