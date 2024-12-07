import React from 'react';
import { Orbit } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <Orbit className="w-8 h-8 text-purple-400 transition-transform group-hover:rotate-180 duration-700" />
        <div className="absolute inset-0 bg-purple-400/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
      </div>
      <span className="text-xl font-bold text-white">
        ARTravel
      </span>
    </div>
  );
}