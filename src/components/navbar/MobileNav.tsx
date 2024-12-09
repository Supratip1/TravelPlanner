import React from 'react';
import { X, Map, CalendarRange, Plane, Users, Search, User } from 'lucide-react';
import { NavButton } from './NavButton';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="absolute right-0 h-full w-64 bg-gray-900 shadow-xl">
        <div className="p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-6">
            <button 
              onClick={() => handleNavClick('#destinations')}
              className="flex w-full items-center gap-3 text-white/80 hover:text-white py-2 transition-colors"
            >
              <Map className="w-5 h-5" />
              <span>Destinations</span>
            </button>
            <button 
              onClick={() => handleNavClick('#plan-trip')}
              className="flex w-full items-center gap-3 text-white/80 hover:text-white py-2 transition-colors"
            >
              <CalendarRange className="w-5 h-5" />
              <span>Plan Trip</span>
            </button>
            <button 
              onClick={() => handleNavClick('#booking')}
              className="flex w-full items-center gap-3 text-white/80 hover:text-white py-2 transition-colors"
            >
              <Plane className="w-5 h-5" />
              <span>Book</span>
            </button>

            {/* Commented out community button */}
            {/* <button 
              onClick={() => handleNavClick('#community')}
              className="flex w-full items-center gap-3 text-white/80 hover:text-white py-2 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </button> */}
          </nav>

          {/* Action Buttons */}
          {/* Commented out search and profile buttons */}
          {/* <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex gap-4">
              <NavButton icon={Search} label="Search" />
              <NavButton icon={User} label="Profile" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
