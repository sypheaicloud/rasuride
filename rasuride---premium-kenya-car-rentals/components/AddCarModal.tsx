import React, { useState, useEffect } from 'react';
// import { getApiUrl } from '../config'; // Bypassing config

interface AddCarModalProps { isOpen: boolean; onClose: () => void; onSuccess: () => void; }

const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const API_URL = "https://rasuride.onrender.com"; // Force Render
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageFile) { setPreview(null); return; }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append('make', make); fd.append('model', model); fd.append('license_plate', plate); fd.append('price_per_day', price); fd.append('image', imageFile!);

    // UPDATED to use API_URL
    const res = await fetch(`${API_URL}/cars/upload`, { method: 'POST', body: fd });
    if (res.ok) { 
        setMake(''); setModel(''); setPlate(''); setPrice(''); setImageFile(null);
        onSuccess(); onClose(); 
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-6 uppercase">Add New <span className="text-amber-500">Car</span></h3>
        {preview && <img src={preview} className="w-full h-32 object-cover rounded-xl mb-4 border border-amber-500/30" />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Make (e.g. Toyota)" value={make} onChange={e => setMake(e.target.value)} className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white outline-none focus:border-amber-500" />
          <input required placeholder="Model" value={model} onChange={e => setModel(e.target.value)} className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white outline-none focus:border-amber-500" />
          <input required placeholder="License Plate" value={plate} onChange={e => setPlate(e.target.value)} className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white outline-none focus:border-amber-500" />
          <input required type="number" placeholder="Price per day (KES)" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white outline-none focus:border-amber-500" />
          <input required type="file" accept="image/*" onChange={e => setImageFile(e.target.files![0])} className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-amber-500 file:text-slate-900 file:font-bold" />
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 text-slate-500 font-bold">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-amber-500 text-slate-900 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">{loading ? 'Uploading...' : 'Confirm'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;