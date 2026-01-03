
import React, { useEffect, useState } from 'react';

interface BattleSimProps {
  king: string;
  opponent: string;
}

const BattleSim: React.FC<BattleSimProps> = ({ king, opponent }) => {
  const [frame, setFrame] = useState(0);
  const [impact, setImpact] = useState(false);
  const [cameraZoom, setCameraZoom] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => f + 1);
      
      // Dramatic camera shifts
      if (Math.random() > 0.95) {
        setCameraZoom(1.1 + Math.random() * 0.2);
        setImpact(true);
        setTimeout(() => {
          setCameraZoom(1);
          setImpact(false);
        }, 200);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-[500px] bg-[#0c0a09] overflow-hidden border-2 border-amber-900/40 rounded-2xl shadow-inner transition-all duration-300 ${impact ? 'shake-anim' : ''}`}>
      {/* 3D Battlefield Floor */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ perspective: '1000px' }}
      >
        <div 
          className="w-full h-[200%] bg-[#2a1b0e] origin-top transition-transform duration-100"
          style={{ 
            transform: `rotateX(75deg) translateY(${-(frame * 2 % 100)}px) scale(${cameraZoom})`,
            backgroundImage: `linear-gradient(#3c2a21 1px, transparent 1px), linear-gradient(90deg, #3c2a21 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        >
          {/* Dust & Particle System */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        </div>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-orange-950/20 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none"></div>

      {/* Combatant A: The Raja's Forces */}
      <div 
        className="absolute bottom-20 left-[20%] z-20 flex flex-col items-center transition-all duration-75"
        style={{ transform: `scale(${cameraZoom * 1.5}) translateY(${Math.sin(frame * 0.2) * 10}px)` }}
      >
        <div className="relative">
          <div className="text-9xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] select-none">🐘</div>
          <div className="absolute -top-12 left-0 text-3xl animate-bounce">🚩</div>
          {impact && <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-ping"></div>}
        </div>
        <div className="mt-2 bg-blue-900/60 px-4 py-1 border border-blue-400 rounded-lg cinzel text-[8px] text-white tracking-[0.2em] font-black uppercase">
          {king}'s Vanguard
        </div>
      </div>

      {/* Combatant B: The Enemy */}
      <div 
        className="absolute bottom-20 right-[20%] z-20 flex flex-col items-center transition-all duration-75"
        style={{ transform: `scale(${cameraZoom * 1.5}) scaleX(-1) translateY(${Math.cos(frame * 0.2) * 10}px)` }}
      >
        <div className="relative">
          <div className="text-9xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] select-none">🐎</div>
          <div className="absolute -top-8 -right-8 text-4xl animate-pulse">🏹</div>
          {impact && <div className="absolute inset-0 bg-red-500/30 rounded-full blur-2xl animate-pulse"></div>}
        </div>
        <div className="mt-2 bg-red-950/60 px-4 py-1 border border-red-500 rounded-lg cinzel text-[8px] text-white tracking-[0.2em] font-black uppercase scale-x-[-1]">
          {opponent.toUpperCase()} Host
        </div>
      </div>

      {/* Battle UI HUD */}
      <div className="absolute top-10 left-10 right-10 flex justify-between z-40">
        <div className="w-64 p-3 bg-black/60 backdrop-blur-md rounded-lg border-l-4 border-blue-500">
           <div className="flex justify-between cinzel text-[10px] text-blue-400 mb-1">
             <span>{king}</span>
             <span>HP 8500</span>
           </div>
           <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 w-[85%] transition-all"></div>
           </div>
        </div>

        <div className="w-64 p-3 bg-black/60 backdrop-blur-md rounded-lg border-r-4 border-red-600 text-right">
           <div className="flex justify-between cinzel text-[10px] text-red-500 mb-1">
             <span>HP 6200</span>
             <span>{opponent}</span>
           </div>
           <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
             <div className="h-full bg-red-600 w-[62%] transition-all"></div>
           </div>
        </div>
      </div>

      {/* Tactical Feedback */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-12 z-40">
         <div className="bg-black/90 p-4 border border-amber-900/30 flex flex-col items-center">
            <span className="cinzel text-[8px] text-amber-500/60 uppercase mb-2">Technique in Execution</span>
            <div className="flex gap-4">
               {["Chakravyuha", "Fire Elephants", "Poison Volley"].map((t, i) => (
                 <div key={i} className={`px-4 py-1 border ${i === frame % 3 ? 'border-amber-500 bg-amber-900/40' : 'border-stone-800 text-stone-600'} cinzel text-[10px] transition-all`}>
                   {t}
                 </div>
               ))}
            </div>
         </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
        }
        .shake-anim { animation: shake 0.15s infinite; }
      `}</style>
    </div>
  );
};

export default BattleSim;
