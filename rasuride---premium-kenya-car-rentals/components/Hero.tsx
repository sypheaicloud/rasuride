import React from 'react';
import SearchBar from './SearchBar'; 

interface HeroProps {
  onSearch: (startDate: string, endDate: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const scrollToFleet = () => {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    /* 🔥 REDUCED HEIGHT: min-h changed from 85vh to 60vh to move everything up */
    <div className="relative w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-start pt-12 pb-6 min-h-[60vh]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/landinpageimage.webp" 
          alt="Luxury Car Background" 
          className="w-full h-full object-cover object-center opacity-40" 
        />
        {/* Darker Gradient to blend perfectly with the slate-950 background below */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-slate-950"></div>
      </div>

      {/* Hero Content - Margins tightened (mb-3, mb-4) to save vertical space */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center">
        
        {/* Badge */}
        <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold tracking-widest uppercase mb-4">
          Premium Car Rentals Kenya
        </span>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
          Drive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Extraordinary</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-slate-400 text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed">
          Experience the thrill of Kenya's finest luxury fleet.
        </p>
        
        {/* Compact Info Section */}
        <div className="flex flex-row items-center justify-center gap-4 bg-white/5 backdrop-blur-md px-5 py-2 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2">
               <div className="text-amber-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
               </div>
               <span className="text-white text-[10px] font-bold uppercase tracking-wider">ID Required</span>
            </div>

            <div className="w-px h-3 bg-white/20"></div>

            <div className="flex items-center gap-2">
               <div className="text-green-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
               </div>
               <span className="text-white text-[10px] font-bold uppercase tracking-wider">M-Pesa / Card</span>
            </div>
        </div>

        {/* Search Bar - This is the last item, Fleet section starts right after this */}
        <SearchBar onSearch={onSearch} />

      </div>
    </div>
  );
};

export default Hero;