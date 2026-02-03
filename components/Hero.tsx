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
    // 1. Height reduced to 350px so Fleet shows up immediately below
    <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden bg-slate-950">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Landingpageimg.gif"
          alt="Landing Page Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* 2. Compact Headline */}
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 leading-none drop-shadow-xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya v2</span>
        </h1>

        <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto mb-6 font-medium drop-shadow-md">
          Raglenn Enterprises: The ultimate comfort, style, and reliability.
        </p>

        {/* 3. Slim Search Bar */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-2 rounded-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2 shadow-2xl">
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-bold text-slate-400 uppercase ml-1 mb-0.5">Pick-up</label>
            <input
              type="date"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-bold text-slate-400 uppercase ml-1 mb-0.5">Return</label>
            <input
              type="date"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black uppercase tracking-wider rounded-lg transition-all shadow-lg active:scale-95 text-[10px] md:text-xs h-[34px]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}