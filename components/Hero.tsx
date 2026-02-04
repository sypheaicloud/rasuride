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
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-950">

      {/* 1. Shrunken Background Image Area */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Landingpageimg.gif"
          alt="Landing Page Background"
          className="w-full h-full object-cover object-[center_65%] opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">

        <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-4 leading-none drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        {/* 3. SHRUNKEN SEARCH BAR */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-2 md:p-4 rounded-xl max-w-2xl mx-auto flex flex-col md:flex-row gap-2 shadow-2xl mb-4">
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-bold text-amber-500 uppercase ml-2 mb-0.5 tracking-widest">Pick-up</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-bold text-amber-500 uppercase ml-2 mb-0.5 tracking-widest">Return</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest rounded-lg transition-all shadow-lg active:scale-95 text-[10px] md:text-xs h-[30px]"
            >
              Search
            </button>
          </div>
        </div>

        <p className="text-slate-300 text-[10px] md:text-xs max-w-xl mx-auto font-medium drop-shadow-md opacity-80">
          Raglenn Enterprises: Comfort, style, and reliability.
        </p>
      </div>
    </div>
  );
}