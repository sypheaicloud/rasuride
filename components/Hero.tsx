import React, { useState, useEffect } from 'react';

const images = [
  "/Landingpageimg.gif",
  "/hero_luxury_car.png",
  "/Land1ingpageimg.gif",
  "/pradaa.png"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[350px] flex items-end justify-center overflow-hidden bg-slate-950 pb-4">

      {/* 1. Hero Image Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Hero Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover object-[center_35%] brightness-125 contrast-110 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-90" : "opacity-0"
              }`}
          />
        ))}
        {/* Subtle Overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-2 leading-none drop-shadow-2xl">
          Premium Car Rentals <span className="text-amber-500">Nairobi Kenya</span>
        </h1>

        <p className="text-slate-300 text-sm md:text-lg max-w-xl mx-auto font-medium drop-shadow-md opacity-80">
          Raglenn Enterprises: Comfort, style, and reliability.
        </p>
      </div>
    </div>
  );
}