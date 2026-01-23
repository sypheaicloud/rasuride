import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelect }) => {
  
  // Logic to handle missing images
  const imageSource = car.image || car.image_url || "/range.png";

  return (
    <div className="group bg-slate-900/50 rounded-3xl p-4 border border-slate-800 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer overflow-hidden relative flex flex-col h-full">
      
      {/* Image Container */}
      <div className="h-48 mb-4 rounded-2xl overflow-hidden relative bg-slate-950">
        <img 
          src={imageSource} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1e293b/white?text=No+Image";
          }}
        />

        {/* Price Tag */}
        <div className="absolute top-3 right-3 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
          <span className="text-amber-500 font-bold text-sm">${car.price}</span>
          <span className="text-slate-400 text-xs"> / day</span>
        </div>
      </div>

      {/* Car Info Section */}
      <div className="flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white">
            {car.make} <span className="text-slate-400 font-normal">{car.model}</span>
          </h3>
          
          <div className="flex items-center space-x-2 mt-2">
            <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {car.category}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Automatic
            </span>
          </div>
        </div>

        {/* ✅ CHANGED BUTTON: "Book Now" in Amber */}
        <button 
          onClick={() => onSelect(car)}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;