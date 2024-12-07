import React from 'react';
import { Hotel, Plane, Car, Ticket } from 'lucide-react';
import { BookingCard } from './BookingCard';

export function BookingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Book Your Experience
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BookingCard 
            icon={Hotel}
            title="Hotels"
            description="Find the perfect stay with AR room preview"
            gradient="from-blue-500 to-indigo-600"
          />
          <BookingCard 
            icon={Plane}
            title="Flights"
            description="Book flights with virtual cabin tours"
            gradient="from-purple-500 to-pink-600"
          />
          <BookingCard 
            icon={Car}
            title="Transport"
            description="Local transport and car rentals"
            gradient="from-orange-500 to-red-600"
          />
          <BookingCard 
            icon={Ticket}
            title="Activities"
            description="Explore local experiences in AR"
            gradient="from-green-500 to-teal-600"
          />
        </div>
      </div>
    </section>
  );
}