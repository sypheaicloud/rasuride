import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config';
import AddCarModal from './AddCarModal';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'users' | 'fleet'>('users');

  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [stats, setStats] = useState({ total_revenue: 0, total_cars: 0, active_cars: 0 });
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- 💰 PRICE EDITING STATE (Restored) ---
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<number | string>("");

  // --- FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch(`${getApiUrl()}/admin/stats`);
      const statsData = await statsRes.json();
      setStats(statsData);

      let path = '/admin/bookings';
      if (activeTab === 'users') path = '/admin/users';
      if (activeTab === 'fleet') path = '/admin/cars';

      const res = await fetch(`${getApiUrl()}${path}`);
      const data = await res.json();

      if (activeTab === 'bookings') setBookings(data);
      else if (activeTab === 'users') setUsers(data);
      else setCars(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  // 1. BAN USER TOGGLE
  const handleBanUser = async (userId: number, currentBanStatus: boolean) => {
    const newStatus = !currentBanStatus;
    const action = newStatus ? "BAN" : "UNBAN";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      await fetch(`${getApiUrl()}/users/${userId}/ban`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_banned: newStatus }),
      });
      fetchData();
    } catch (e) { alert("Action failed"); }
  };

  // 2. DELETE USER PERMANENTLY
  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("⚠️ DANGER: This will delete the user AND ALL THEIR BOOKING HISTORY.\n\nContinue?")) return;
    try {
      const res = await fetch(`${getApiUrl()}/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        alert("User deleted.");
        fetchData();
      }
    } catch (e) { alert("Delete failed"); }
  };

  // 3. BOOKING ACTIONS
  const handleCancelBooking = async (id: number) => {
    if (!window.confirm("Cancel this booking?")) return;
    try { await fetch(`${getApiUrl()}/bookings/${id}`, { method: 'DELETE' }); fetchData(); } catch (err) { alert("Error"); }
  };

  // 4. CAR STATUS (Updated to 'At Shop')
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await fetch(`${getApiUrl()}/cars/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      fetchData();
    } catch (e) { alert("Error"); }
  };

  // 5. PRICE EDITING (Restored Logic)
  const startEditing = (car: any) => {
    setEditingId(car.id);
    setTempPrice(car.price || car.price_per_day);
  };

  const savePrice = async (id: number) => {
    try {
      await fetch(`${getApiUrl()}/cars/${id}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_price: parseInt(tempPrice.toString()) })
      });
      setEditingId(null);
      fetchData();
    } catch (e) { alert("Error saving price"); }
  };

  const handleDeleteCar = async (id: number) => {
    if (!window.confirm("Delete Car?")) return;
    await fetch(`${getApiUrl()}/cars/${id}`, { method: 'DELETE' }); fetchData();
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-10 pb-20">
      <div className="max-w-7xl mx-auto">

        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Control <span className="text-amber-500">Center</span></h1>
            <p className="text-slate-500 mt-2">Welcome back, Admin.</p>
          </div>
          <button onClick={fetchData} className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">Refresh Data</button>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-3xl border border-amber-500/20 shadow-xl shadow-amber-500/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-white">KES {stats.total_revenue?.toLocaleString()}</h3>
          </div>
          <div className="bg-slate-900 p-6 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Active Fleet</p>
            <h3 className="text-3xl font-black text-white">{stats.active_cars} / {stats.total_cars}</h3>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 bg-slate-900/50 p-1.5 rounded-2xl w-fit border border-white/5">
          {['fleet', 'bookings', 'users'].map((tab: any) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[400px]">
          {loading ? (
            <div className="p-20 text-center text-slate-500 animate-pulse font-bold uppercase tracking-widest">Loading...</div>
          ) : (
            <>
              {/* --- 🚗 FLEET TAB --- */}
              {activeTab === 'fleet' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-white">Fleet <span className="text-amber-500">Inventory</span></h2>
                    <button onClick={() => setIsAddModalOpen(true)} className="px-6 py-2.5 bg-amber-500 text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all">+ Add New Car</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cars.map((car: any) => (
                      <div key={car.id} className={`group relative bg-slate-950 rounded-2xl border transition-all ${car.active ? 'border-white/5' : 'border-red-500/30 opacity-70'}`}>

                        {/* DELETE BTN */}
                        <button onClick={() => handleDeleteCar(car.id)} className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all">🗑️</button>

                        {/* IMAGE */}
                        <div className="relative h-36 overflow-hidden rounded-t-2xl bg-black">
                          <img src={car.image && car.image.startsWith('/uploads') ? `${getApiUrl()}${car.image}` : (car.image || '/hero_luxury_car.png')} className={`w-full h-full object-cover transition-opacity ${car.active ? 'opacity-100' : 'opacity-40 grayscale'}`} alt={car.model} />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4">
                          <div className="mb-3">
                            <p className="text-amber-500 text-[10px] font-bold uppercase">{car.make}</p>
                            <p className="text-white font-bold text-sm truncate">{car.model}</p>
                          </div>

                          <div className="flex flex-col gap-2 border-t border-white/5 pt-3">

                            {/* 1. STATUS BUTTON (FIXED: AT SHOP) */}
                            <button onClick={() => handleToggleStatus(car.id, car.active)} className={`w-full text-[10px] font-black px-3 py-2 rounded-lg border flex items-center justify-center gap-2 transition-all ${car.active ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-slate-700/50 border-slate-600 text-slate-400'}`}>
                              {car.active ? '● ONLINE' : '○ AT SHOP'}
                            </button>

                            {/* 2. PRICE EDITING (RESTORED) */}
                            {editingId === car.id ? (
                              <div className="flex gap-1 items-center bg-slate-800 p-1 rounded-lg">
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                                <button onClick={() => savePrice(car.id)} className="text-green-500 hover:bg-green-500/20 p-1 rounded">✓</button>
                                <button onClick={() => setEditingId(null)} className="text-red-500 hover:bg-red-500/20 p-1 rounded">✕</button>
                              </div>
                            ) : (
                              <button onClick={() => startEditing(car)} className="group/edit flex justify-center items-center w-full py-1 text-slate-400 hover:text-white text-[10px] uppercase font-bold transition-colors">
                                <span className="mr-2">KES {car.price?.toLocaleString()}</span>
                                <span className="opacity-0 group-hover/edit:opacity-100 transition-opacity">✎</span>
                              </button>
                            )}

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 📅 BOOKINGS TAB --- */}
              {activeTab === 'bookings' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                      <tr><th className="p-4">ID</th><th className="p-4">Customer</th><th className="p-4">Dates</th><th className="p-4">Car</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map((b: any) => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 text-slate-500">#{b.id}</td>
                          <td className="p-4"><div className="font-bold text-white">{b.customer}</div><div className="text-xs text-slate-500">{b.email}</div></td>
                          <td className="p-4 text-slate-400 text-xs">{b.dates}</td>
                          <td className="p-4 text-amber-500 font-bold">{b.car}</td>
                          <td className="p-4 text-white font-mono">KES {b.price?.toLocaleString()}</td>
                          <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-[10px] font-bold uppercase">{b.status}</span></td>
                          <td className="p-4 text-right"><button onClick={() => handleCancelBooking(b.id)} className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded border border-red-500/30 text-[10px] font-bold uppercase">Cancel</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* --- 👥 USERS TAB --- */}
              {activeTab === 'users' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                      <tr>
                        <th className="p-4">ID</th><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((u: any) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 text-slate-500 font-mono">#{u.id}</td>
                          <td className="p-4 font-bold text-white">
                            {u.full_name}
                            {u.is_google_user && <span className="ml-2 bg-blue-500/20 text-blue-400 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Google</span>}
                          </td>
                          <td className="p-4 text-slate-400">{u.email}</td>
                          <td className="p-4">
                            {u.is_banned ? <span className="bg-red-600/20 text-red-500 px-2 py-1 rounded text-[10px] font-bold uppercase border border-red-500/20">⛔ BANNED</span> : <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-500/20">✔ ACTIVE</span>}
                          </td>
                          <td className="p-4 text-right flex justify-end gap-2">
                            <button onClick={() => handleBanUser(u.id, u.is_banned)} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase border transition-all ${u.is_banned ? 'border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white' : 'border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black'}`}>
                              {u.is_banned ? "UNBAN" : "BAN"}
                            </button>
                            <button onClick={() => handleDeleteUser(u.id)} className="px-3 py-1.5 rounded text-[10px] font-bold uppercase border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all">DELETE</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <AddCarModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchData} />
    </div>
  );
};

export default AdminDashboard;