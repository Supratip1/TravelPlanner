import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
}

export function NavButton({ icon: Icon, label }: NavButtonProps) {
  return (
    <button 
      className="relative p-2 text-white/80 hover:text-white transition-all duration-300 group"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
      <Icon className="relative w-5 h-5" />
    </button>
  );
}