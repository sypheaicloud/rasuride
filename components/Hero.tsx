import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[200px] flex items-end justify-center overflow-hidden bg-slate-950 pb-2">

      {/* 1. Hero Mazda Image Area */}
      <div className="absolute inset-0 z-0">
        <img
          src="/HeroMazda.jpg"
          alt="Premium Mazda SUV"
          className="w-full h-full object-cover object-[center_45%] opacity-90 brightness-110 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-lg md:text-xl font-black text-white tracking-tighter mb-1 leading-none drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-300 text-[10px] md:text-xs max-w-xl mx-auto font-medium drop-shadow-md opacity-80">
          Raglenn Enterprises: Comfort, style, and reliability.
        </p>
      </div>
    </div>
  );
}