import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { getApiUrl } from '../config';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  user?: any; // 👈 1. Added 'user' to the interface
}

const BookingModal: React.FC<BookingModalProps> = ({ car, onClose, user }) => {
  // 2. Initialize state using the passed 'user' prop
  const [currentUser, setCurrentUser] = useState<any>(user || null);
  
  // State for form inputs
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // --- 3. ROBUST USER SYNC ---
  useEffect(() => {
    // Priority A: Use the user passed from App.tsx
    if (user) {
      setCurrentUser(user);
      return;
    }

    // Priority B: If no prop, try finding in LocalStorage (Fallback)
    const storedUser = localStorage.getItem('user') || localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Normalize the ID field
        const normalizedUser = {
             ...parsed,
             id: parsed.id || parsed.user_id 
        };
        setCurrentUser(normalizedUser);
      } catch (err) {
        console.error("Login data corrupt:", err);
      }
    }
  }, [user]); // Re-run if the 'user' prop changes

  if (!car) return null;

  // Price Calculation
  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return days > 0 ? days * Number(car.price) : 0;
  };
  const total = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return; 

    setStatus('submitting');

    const bookingPayload = {
      user_id: currentUser.user_id || currentUser.id, // Handle both ID formats
      car_id: car.id,
      start_date: startDate,
      end_date: endDate,
      customer_name: currentUser.name || currentUser.full_name || "Valued Customer",
      customer_email: currentUser.email,
      customer_phone: phoneNumber || "Not Provided",
      total_price: total
    };

    try {
      const response = await fetch(`${getApiUrl()}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(onClose, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-md overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">Book {car.make} {car.model}</h2>
          <p className="text-slate-400 text-sm mb-6">Rate: <span className="text-amber-500">${car.price}/day</span></p>

          {!currentUser ? (
            <div className="text-center py-8">
              <p className="text-slate-300 mb-4">Please login to continue.</p>
              <button onClick={onClose} className="bg-amber-500 text-slate-950 font-bold py-2 px-6 rounded-xl hover:bg-amber-400">
                Close & Login
              </button>
            </div>
          ) : status === 'success' ? (
            <div className="bg-green-500/20 text-green-500 p-4 rounded-xl text-center font-bold animate-pulse">
              ✅ Booking Confirmed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-500 uppercase">Booking as</p>
                <p className="font-bold text-white">{currentUser.name || currentUser.full_name || currentUser.email}</p>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Pickup</label>
                  <input required type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                    onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Return</label>
                  <input required type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                    onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone</label>
                <input required type="tel" placeholder="07XX XXX XXX" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                  onChange={e => setPhoneNumber(e.target.value)} />
              </div>

              <div className="flex justify-between items-center py-4 border-t border-slate-800 mt-4">
                <span className="text-slate-400">Total</span>
                <span className="text-2xl font-bold text-amber-500">${total.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting' || total === 0}
                className="w-full bg-amber-500 text-slate-950 font-bold py-4 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50"
              >
                {status === 'submitting' ? 'Processing...' : `Confirm Booking`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;