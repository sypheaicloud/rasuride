import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[220px] md:h-[280px] flex items-center justify-center overflow-hidden bg-slate-950">

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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter mb-2 leading-tight drop-shadow-2xl">
          Premium Car Rentals <br className="hidden md:block" />
          <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-300 text-[10px] md:text-xs max-w-xl mx-auto font-medium drop-shadow-md opacity-90 mb-4">
          Raglenn Enterprises: Comfort, style, and unmatched reliability.
        </p>

        <div className="flex flex-row items-center justify-center gap-3">
          <a href="#fleet" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20 text-[10px] uppercase tracking-widest">
            View Fleet
          </a>
          <a href="tel:0723366873" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}