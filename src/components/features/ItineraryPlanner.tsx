import React from 'react';
import { Calendar, Clock, Map, Wand2, CalendarRange, PlaneLanding, Hotel, Utensils } from 'lucide-react';

export function ItineraryPlanner() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Dream Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Create your perfect itinerary with our AI-powered planner and preview your entire journey in AR
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Calendar,
              title: "Choose Dates",
              description: "Select your travel dates and duration"
            },
            {
              icon: Map,
              title: "Pick Locations",
              description: "Select destinations and must-visit spots"
            },
            {
              icon: Wand2,
              title: "AI Planning",
              description: "Get AI-optimized travel suggestions"
            },
            {
              icon: PlaneLanding,
              title: "AR Preview",
              description: "Experience your journey in AR before you go"
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-gray-50 rounded-2xl p-6 hover:bg-purple-50 transition-colors">
              <div className="mb-4 inline-block bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}