import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[320px] flex items-end justify-center overflow-hidden bg-slate-950 pb-4">

      {/* 1. Hero Animated Background Area */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Landingpa111geimg.gif"
          alt="Premium Car Landing"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 leading-none drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-300 text-sm md:text-lg max-w-xl mx-auto font-medium drop-shadow-md opacity-80">
          CAR HIRE KENYA: Comfort, style, and reliability.
        </p>
      </div>
    </div>
  );
}