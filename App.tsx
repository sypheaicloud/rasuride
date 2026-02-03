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

      <Hero onSearch={fetchCars} />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 py-8" id="fleet">
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