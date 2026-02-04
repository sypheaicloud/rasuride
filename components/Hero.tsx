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
    <div className="relative w-full h-[550px] flex items-center justify-center overflow-hidden bg-slate-950">

      {/* 1. Balanced Background GIF (Sky Hidden) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Landingpageimg.gif"
          alt="Landing Page Background"
          className="w-full h-full object-cover object-bottom opacity-70"
        />

        {/* The Blending Layers */}
        {/* Layer 1: Dark Bottom Fade (Blends with page content) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Layer 2: Side Fades (Makes it feel wider) */}
        <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_85%)]"></div>

        {/* Layer 3: Extra Darkening for readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-none drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-200 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium drop-shadow-lg">
          Raglenn Enterprises: The ultimate comfort, style, and reliability for your journey.
        </p>

        {/* 3. Search Bar (Centered and Floating) */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-4 md:p-8 rounded-3xl max-w-5xl mx-auto flex flex-col md:flex-row gap-6 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
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
      </div>
    </div>
  );
}