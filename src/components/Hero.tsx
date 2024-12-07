import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { HeroLogo } from './hero/HeroLogo';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Enhanced Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150"></div>
            <HeroLogo />
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">
              Experience Travel in
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 mt-2">
                Augmented Reality
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore destinations in immersive AR before you travel. Plan your journey with our AI-powered assistant and see the world like never before.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Start Exploring 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
              <Compass className="w-5 h-5" /> 
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-900 to-transparent"></div>
    </div>
  );
}