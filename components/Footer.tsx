import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center text-center">
          
          <div className="mb-8">
             <h4 className="text-white font-black text-xl mb-4">Syphe <span className="text-amber-500">IT</span></h4>
             <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
               For all your IT needs: Full Stack Web Development, Network Security, 
               Devops, Hybrid Cloud, Enterprise Engineering, and AI.
             </p>
          </div>

          <a 
            href="mailto:sypheit@gmail.com" 
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-full font-bold transition-all mb-12 hover:scale-105"
          >
            Email: sypheit@gmail.com
          </a>

          <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              © 2026 RasuRide. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
              Powered by <span className="text-slate-300">Syphe IT Solutions</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;