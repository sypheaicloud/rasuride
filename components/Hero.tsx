import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden bg-slate-950">

      {/* 1. Hero Background Area */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lexxy.png"
          alt="Premium Lexus"
          className="w-full h-full object-cover object-[center_40%] opacity-80 brightness-90 shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4 leading-tight drop-shadow-2xl">
          Premium Car Rentals <br className="hidden md:block" />
          <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium drop-shadow-md opacity-90 mb-8">
          Raglenn Enterprises: Elevating your journey with comfort, style, and unmatched reliability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#fleet" className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-amber-500/20 text-sm uppercase tracking-widest">
            View Fleet
          </a>
          <a href="tel:0723366873" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-md border border-white/10 text-sm uppercase tracking-widest">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}