import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import BookingModal from './components/BookingModal';
import MyBookingsModal from './components/MyBookingsModal';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import GeminiAssistant from './components/GeminiAssistant';
import Footer from './components/Footer';
import { Car } from './types';
import { getApiUrl } from './config';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [user, setUser] = useState<any>(null); // This holds your login state

  // --- UI TOGGLES ---
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // --- SEARCH STATE ---
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    if (startDate && endDate) {
      fetchCars(startDate, endDate);
    }
  };

  // --- 1. RESTORE SESSION (The Fix) ---
  useEffect(() => {
    // Check if user data exists in browser storage
    const storedUser = localStorage.getItem('user') || localStorage.getItem('userInfo');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("🔄 Session restored for:", parsedUser.email);
        setUser(parsedUser); // <--- This logs you back in automatically!
      } catch (err) {
        console.error("Session restore failed:", err);
      }
    }
  }, []); // Runs once on page load

  // --- 2. FETCH CARS ---
  const fetchCars = (startDate?: string, endDate?: string) => {
    let url = `${getApiUrl()}/cars`;
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Failed to load cars:", err));
  };

  // --- 3. AUTO-REFRESH ON TAB FOCUS ---
  useEffect(() => {
    fetchCars(); // Initial load

    const onFocus = () => {
      console.log("🔄 Tab active! Refreshing fleet...");
      fetchCars();
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // --- 4. HANDLE LOGIN ---
  const handleLoginSuccess = (userData: any) => {
    // Save to storage so we don't lose it on refresh
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    setUser(null);
    setShowAdmin(false); // Close admin panel if open
  };

  // --- RENDER ADMIN DASHBOARD ---
  if (showAdmin) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <button
          onClick={() => setShowAdmin(false)}
          className="m-4 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-bold text-sm"
        >
          ← Back to Site
        </button>
        <AdminDashboard />
      </div>
    );
  }

  // --- RENDER MAIN SITE ---
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenAuth={(mode) => { setAuthMode(mode); setIsAuthOpen(true); }}
        onOpenBookings={() => setIsMyBookingsOpen(true)}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      <Hero />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 pt-12 pb-4" id="fleet">
        {/* SHRUNKEN SEARCH BAR - NOW HERE */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-2 md:p-3 rounded-xl max-w-2xl mr-auto ml-0 mb-12 flex flex-col md:flex-row gap-2 shadow-xl">
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase ml-2 mb-0.5 tracking-widest">Pick-up</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase ml-2 mb-0.5 tracking-widest">Return</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-6 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest rounded-lg transition-all shadow-lg active:scale-95 text-[10px] h-[30px]"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Premium <span className="text-amber-500">Fleet</span>
            </h2>
            <div className="w-12 h-1 bg-amber-500 mt-2 rounded-full"></div>
            <p className="text-slate-400 mt-4 max-w-md text-sm">
              Luxury vehicles for an unparalleled driving experience in Kenya.
            </p>
          </div>
          <button
            onClick={() => fetchCars()}
            className="text-[10px] font-bold text-slate-500 hover:text-amber-500 uppercase tracking-widest transition-colors"
          >
            Refresh Fleet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map(car => (
            <CarCard key={car.id} car={car} onSelect={setSelectedCar} />
          ))}
          {cars.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <p className="text-slate-500 text-xl font-bold">No active vehicles found.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          user={user} // 👈 PASSING THE USER PROP HERE
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        userId={user?.user_id || user?.id} // Handle both ID types
      />

      <GeminiAssistant />
      <Footer />
    </div>
  );
}

export default App;