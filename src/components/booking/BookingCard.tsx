import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BookingCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export function BookingCard({ icon: Icon, title, description, gradient }: BookingCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="relative p-6">
        <div className="mb-4">
          <Icon className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 group-hover:text-white/90 transition-colors">
          {description}
        </p>
        <button className="mt-4 px-4 py-2 bg-white/0 border border-gray-300 rounded-lg text-gray-700 group-hover:bg-white group-hover:text-gray-900 transition-all">
          Explore Options
        </button>
      </div>
    </div>
  );
}