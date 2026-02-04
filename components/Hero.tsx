import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[150px] md:h-[180px] flex items-center justify-center overflow-hidden bg-slate-950">

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
        <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-1 drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi</span>
        </h1>

        <p className="text-slate-300 text-[9px] md:text-[10px] max-w-xl mx-auto font-bold opacity-90 mb-3">
          Comfort, style, and unmatched reliability.
        </p>

        <div className="flex flex-row items-center justify-center gap-2">
          <a href="#fleet" className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg text-[9px] uppercase tracking-widest transition-transform hover:scale-105">
            View Fleet
          </a>
          <a href="tel:0723366873" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}