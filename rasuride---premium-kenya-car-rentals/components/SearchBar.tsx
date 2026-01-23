import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (startDate: string, endDate: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSearch(startDate, endDate);
    } else {
      alert("Please select both pickup and return dates.");
    }
  };

  return (
    // ✅ REMOVED: The outer 'relative -mt-24' wrapper. Now it is just a clean card.
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-3xl shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          
          <div className="flex-1 w-full">
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1 text-left">Pick-up Date</label>
            <input 
              type="date" 
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1 text-left">Return Date</label>
            <input 
              type="date" 
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            Check Availability
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;