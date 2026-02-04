import React from 'react';

export default function Hero({ onSearch }: { onSearch: (start: string, end: string) => void }) {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleSearch = () => {
    if (startDate && endDate) {
      onSearch(startDate, endDate);
      document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-slate-950 pt-12 pb-16 flex flex-col items-center overflow-hidden">

      {/* 1. Shrinked Background GIF at the Top */}
      <div className="w-full max-w-5xl px-4 h-[300px] md:h-[400px] mb-12 relative">
        <img
          src="/Landingpageimg.gif"
          alt="Landing Page Background"
          className="w-full h-full object-contain opacity-90 rounded-3xl"
        />
        {/* Subtle glow effect behind the image */}
        <div className="absolute inset-0 bg-amber-500/5 blur-[100px] -z-10 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 font-medium">
          Raglenn Enterprises: The ultimate comfort, style, and reliability.
        </p>

        {/* 3. Search Bar (Now below the image) */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex-1 text-left">
            <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-2">Pick-up Date</label>
            <input
              type="date"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 text-left">
            <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-2">Return Date</label>
            <input
              type="date"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-10 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 text-sm h-[48px]"
            >
              Search Fleet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}