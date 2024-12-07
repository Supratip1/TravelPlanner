import React from 'react';
import { FaGlobe, FaCompass, FaSatelliteDish } from 'react-icons/fa';
import { MdMap } from 'react-icons/md';

export function HeroLogo() {
  return (
    <div className="relative w-32 h-32">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border-2 border-purple-400/30"></div>
        <FaSatelliteDish className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 text-purple-400" />
        <MdMap className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 text-purple-400" />
        <FaCompass className="absolute top-1/2 -translate-y-1/2 -left-2 w-6 h-6 text-purple-400" />
        <FaGlobe className="absolute top-1/2 -translate-y-1/2 -right-2 w-6 h-6 text-purple-400" />
      </div>

      {/* Center globe with glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-150"></div>
          <FaGlobe className="relative w-16 h-16 text-white animate-pulse" />
        </div>
      </div>

      {/* Decorative dots */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${i * 45}deg) translate(60px, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
