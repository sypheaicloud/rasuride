import React, { useState } from 'react';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenBookings: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ user, onLogout, onOpenAuth, onOpenBookings, onOpenAdmin }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-950/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 h-24 md:h-20 transition-all">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 h-full flex items-center justify-between">

        {/* 1. LOGO & BRANDING */}
        <div className="flex items-center gap-3 cursor-pointer py-2" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-black text-slate-900 text-xl shadow-lg shadow-amber-500/20">
            R
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-black text-white leading-none tracking-tight">Raglenn</h1>
            <h1 className="text-lg font-black text-white leading-none tracking-tight">Enterprises</h1>
          </div>
        </div>

        {/* 2. CENTER LINKS (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm font-bold text-white hover:text-amber-500 transition-colors">Home</a>
          <a href="#fleet" className="text-sm font-bold text-slate-400 hover:text-amber-500 transition-colors">Fleet</a>

          {/* 📞 CONTACT MANAGER ALICE */}
          <div className="flex items-center gap-3 pl-8 border-l border-white/10">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Manager Alice</p>
              <a href="tel:0723366873" className="text-amber-500 font-black text-sm hover:text-white transition-colors">
                0723 366 873
              </a>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-500">
              📞
            </div>
          </div>
        </div>

        {/* 3. RIGHT SIDE: AUTH + SYPHEIT CREDIT */}
        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-400">Welcome,</p>
                  <p className="text-sm font-bold text-white">{user.name?.split(' ')[0]}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={onOpenBookings} className="hidden md:block text-sm font-bold text-slate-300 hover:text-white transition-colors">My Bookings</button>
                  {user.is_admin && (
                    <button onClick={onOpenAdmin} className="p-2 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all" title="Admin Dashboard">⚡</button>
                  )}
                  <button onClick={onLogout} className="hidden md:block px-4 py-2 text-xs font-bold text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all">Logout</button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button onClick={() => onOpenAuth('login')} className="text-sm font-bold text-slate-300 hover:text-white px-3 py-2">Log In</button>
                <button onClick={() => onOpenAuth('signup')} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-500/20">Sign Up</button>
              </div>
            )}
            {/* Mobile Toggle */}
            <button className="lg:hidden text-2xl text-white ml-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? '✕' : '☰'}</button>
          </div>

          {/* 💻 SYPHEIT CREDIT (Placed under buttons) */}
          <div className="hidden md:block mt-1">
            <p className="text-[9px] font-bold text-slate-400 hover:text-white cursor-default transition-colors uppercase tracking-widest">
              Powered by SypheIT Services
            </p>
          </div>
        </div>

      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-white/10 p-6 absolute w-full left-0 top-20 flex flex-col gap-4 shadow-2xl z-50">
          <a href="#" className="text-slate-300 font-bold py-3 border-b border-white/5">Home</a>
          <a href="#fleet" className="text-slate-300 font-bold py-3 border-b border-white/5">Our Fleet</a>
          {user && (<><button onClick={onOpenBookings} className="text-left text-slate-300 font-bold py-3 border-b border-white/5">My Bookings</button><button onClick={onLogout} className="text-left text-red-500 font-bold py-3 border-b border-white/5">Logout</button></>)}
          <div className="bg-slate-900 p-4 rounded-xl flex items-center gap-4 mt-2 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 text-xl">📞</div>
            <div><p className="text-[10px] text-slate-400 font-bold uppercase">Call Manager Alice</p><a href="tel:0723366873" className="text-white font-black text-lg">0723 366 873</a></div>
          </div>

          {/* Mobile Credit */}
          <div className="text-center mt-4">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Powered by SypheIT Services</p>
          </div>

          {!user && (<div className="grid grid-cols-2 gap-4 mt-2"><button onClick={() => { onOpenAuth('login'); setIsMobileMenuOpen(false); }} className="py-3 bg-slate-800 text-white font-bold rounded-lg">Log In</button><button onClick={() => { onOpenAuth('signup'); setIsMobileMenuOpen(false); }} className="py-3 bg-amber-500 text-slate-900 font-bold rounded-lg">Sign Up</button></div>)}
        </div>
      )}
    </nav>
  );
}