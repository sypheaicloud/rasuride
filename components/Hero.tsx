import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden bg-slate-950">

      {/* 1. Hero Background Area */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lexxy.png"
          alt="Premium Lexus"
          className="w-full h-full object-cover object-center opacity-90 brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center mt-20 md:mt-0">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4 leading-tight drop-shadow-2xl">
          Premium Car Rentals <br className="hidden md:block" />
          <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-200 text-sm md:text-lg max-w-2xl mx-auto font-medium drop-shadow-md opacity-90 mb-8 bg-slate-950/30 p-2 rounded-xl backdrop-blur-sm">
          Raglenn Enterprises: Elevating your journey with comfort, style, and unmatched reliability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#fleet" className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-amber-500/20 text-sm uppercase tracking-widest">
            View Fleet
          </a>
          <a href="tel:0723366873" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-md border border-white/10 text-sm uppercase tracking-widest">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}