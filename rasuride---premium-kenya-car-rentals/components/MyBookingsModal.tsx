import React, { useEffect, useState } from 'react';
// import { getApiUrl } from '../config'; // Bypass config

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number; 
}

const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ isOpen, onClose, userId }) => {
  const API_URL = "https://rasuride.onrender.com"; // Force Render
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const activeUserId = userId || 1; 

  const fetchMyBookings = () => {
    // UPDATED to use API_URL
    fetch(`${API_URL}/my-bookings/${activeUserId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setMyBookings(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isOpen) { fetchMyBookings(); }
  }, [isOpen, activeUserId]);

  const handleCancel = async (bookingId: number) => {
    if (!window.confirm("Are you sure you want to cancel this trip?")) return;
    try {
      // UPDATED to use API_URL
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, { method: 'DELETE' });
      if (response.ok) {
        alert("Booking cancelled.");
        fetchMyBookings();
      }
    } catch (error) { console.error("Error cancelling:", error); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl relative flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">My <span className="text-amber-500">History</span></h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">✕</button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          {myBookings.length === 0 ? (
            <div className="text-center py-10 text-slate-500"><p>You haven't booked any cars yet.</p></div>
          ) : (
            myBookings.map((booking: any) => (
              <div key={booking.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex gap-4 hover:border-amber-500/30 transition-colors group relative">
                <div className="w-24 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                   {/* FIXED IMAGE LOGIC */}
                   <img 
                    src={booking.image_url ? (booking.image_url.startsWith('http') ? booking.image_url : `${API_URL}${booking.image_url}`) : '/range.png'} 
                    className="w-full h-full object-cover" 
                    alt="Car" 
                   />
                </div>
                <div className="flex-grow">
                   <h3 className="font-bold text-white">{booking.make} {booking.model}</h3>
                   <div className="text-xs text-slate-400 mt-1 flex gap-2">
                     <span>📅 {booking.start_date}</span>
                     <span>➜</span>
                     <span>{booking.end_date}</span>
                   </div>
                </div>
                <div className="text-right flex flex-col justify-center">
                   <span className="font-bold text-amber-500">${booking.total_price}</span>
                   <span className="text-[10px] uppercase font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded mt-1 mb-2">{booking.status}</span>
                   <button onClick={() => handleCancel(booking.id)} className="text-xs text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded border border-red-500/20 transition-all">Cancel</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsModal;