import React, { useState } from 'react';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenBookings: () => void;
  onOpenAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onOpenAuth, onOpenBookings, onOpenAdmin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Rasu<span className="text-amber-500">Ride</span></span>
          </div>

          {/* 🛠️ SYPHE IT BRANDING (Center - Hidden on small mobile) */}
          <div className="hidden lg:flex items-center justify-center flex-1">
             <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <p className="relative text-[9px] uppercase tracking-[0.4em] text-slate-400 font-bold px-6 py-2 rounded-full border border-white/5 bg-slate-900/50 backdrop-blur-sm">
                   Web App Created by <span className="text-amber-500">Syphe IT</span>
                </p>
             </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 min-w-[150px] justify-end">
            <a href="#fleet" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Fleet</a>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white text-sm hidden lg:inline">Hi, <span className="font-bold text-amber-500">{user.name}</span></span>
                
                {user.is_admin && (
                  <button 
                    onClick={onOpenAdmin} 
                    className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-md text-xs font-black hover:bg-amber-500 hover:text-slate-900 transition-all"
                  >
                    ADMIN
                  </button>
                )}

                <button onClick={onOpenBookings} className="text-sm text-slate-300 hover:text-white transition-colors">Bookings</button>
                <button onClick={onLogout} className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={() => onOpenAuth('login')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors">Log In</button>
                <button onClick={() => onOpenAuth('signup')} className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all shadow-lg">Sign Up</button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 py-4 pb-6 px-2 space-y-2">
            {/* Branding for Mobile Dropdown */}
            <div className="px-4 py-2 mb-2">
              <p className="text-[8px] uppercase tracking-[0.2em] text-slate-500">Created by Syphe IT</p>
            </div>

            <a href="#fleet" className="block px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Fleet</a>
            
            {user ? (
              <>
                <div className="px-4 py-3 text-amber-500 font-bold border-t border-slate-800 mt-2">
                  Welcome, {user.name}
                </div>

                {user.is_admin && (
                  <button 
                    onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }} 
                    className="block w-full text-left px-4 py-3 text-amber-500 font-bold bg-amber-500/5 rounded-lg border border-amber-500/10"
                  >
                    🚀 Admin Dashboard
                  </button>
                )}

                <button onClick={() => { onOpenBookings(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                  My Bookings
                </button>
                <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 px-4 mt-4 pt-4 border-t border-slate-800">
                <button onClick={() => { onOpenAuth('login'); setIsMobileMenuOpen(false); }} className="py-3 text-center text-slate-300 hover:text-white font-bold bg-slate-800 rounded-xl transition-colors">Log In</button>
                <button onClick={() => { onOpenAuth('signup'); setIsMobileMenuOpen(false); }} className="py-3 text-center bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-colors">Sign Up</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;