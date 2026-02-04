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
    <div className="relative w-full bg-slate-950 pt-10 pb-20 flex flex-col items-center overflow-hidden">

      {/* 1. Premium Luxury Vehicle Image (Full Visibility) */}
      <div className="w-full max-w-6xl px-4 h-[350px] md:h-[550px] mb-8 relative group">
        <img
          src="/hero_luxury_car.png"
          alt="Premium Luxury Car"
          className="w-full h-full object-contain opacity-100 drop-shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
        />
        {/* Subtle glow effect behind the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-500/10 blur-[130px] -z-10 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-none drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        {/* 3. Search Bar (Positioned clearly below the car) */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-4 md:p-8 rounded-3xl max-w-5xl mx-auto flex flex-col md:flex-row gap-6 shadow-[0_25px_80px_rgba(0,0,0,0.6)] mb-10">
          <div className="flex-1 text-left">
            <label className="block text-xs font-bold text-amber-500 uppercase ml-2 mb-2 tracking-widest">Pick-up Date</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-2xl px-5 py-4 text-base text-white focus:outline-none focus:border-amber-500 transition-all hover:border-slate-500"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 text-left">
            <label className="block text-xs font-bold text-amber-500 uppercase ml-2 mb-2 tracking-widest">Return Date</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-2xl px-5 py-4 text-base text-white focus:outline-none focus:border-amber-500 transition-all hover:border-slate-500"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-12 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] active:scale-95 text-base h-[60px]"
            >
              Search Fleet
            </button>
          </div>
        </div>

        <p className="text-slate-200 text-base md:text-xl max-w-3xl mx-auto mb-6 font-medium drop-shadow-lg">
          Raglenn Enterprises: The ultimate comfort, style, and reliability for your journey.
        </p>
      </div>
    </div>
  );
}