
import React from 'react';
import { Mahajanapada } from '../types';
import { MAHAJANAPADAS } from '../constants';

interface MapProps {
  onSelect: (mj: Mahajanapada) => void;
  selectedId?: string;
}

const MahajanapadaMap: React.FC<MapProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#d2b48c] border-8 border-[#3c2a21] rounded-lg shadow-inner overflow-hidden sepia-bg">
      {/* Decorative Compass Rose */}
      <div className="absolute bottom-4 right-4 text-4xl opacity-40 pointer-events-none select-none">🧭</div>
      
      {/* Stylized Rivers and Outline */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100">
        {/* Indus River System */}
        <path d="M 10,10 Q 15,30 20,40 Q 25,50 20,70" stroke="#4a6fa5" strokeWidth="0.5" fill="none" />
        {/* Ganges River System */}
        <path d="M 40,30 Q 55,45 70,55 Q 85,60 95,65" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <path d="M 45,35 Q 58,48 72,58" stroke="#4a6fa5" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Parchment Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-50 pointer-events-none"></div>

      {/* Map Labels and Markers */}
      <div className="absolute inset-0">
        {MAHAJANAPADAS.map((mj) => (
          <button
            key={mj.id}
            onClick={() => onSelect(mj)}
            style={{
              left: `${mj.mapCoords.x}%`,
              top: `${mj.mapCoords.y}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center transition-all duration-300 ${
              selectedId === mj.id ? 'scale-125 z-20' : 'z-10 hover:scale-110'
            }`}
          >
            {/* Marker */}
            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
              selectedId === mj.id 
                ? 'bg-amber-500 border-white shadow-[0_0_10px_white]' 
                : 'bg-red-800 border-amber-900 group-hover:bg-amber-600'
            }`}></div>
            
            {/* Label */}
            <span className={`mt-1 cinzel text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded transition-all ${
              selectedId === mj.id
                ? 'bg-amber-900 text-amber-50 shadow-md scale-110'
                : 'bg-stone-900/40 text-stone-800 group-hover:bg-stone-900/60 group-hover:text-amber-500'
            }`}>
              {mj.name}
            </span>
            
            {/* Region Detail on Hover */}
            <div className="absolute top-full mt-2 w-32 bg-stone-900 text-white p-2 text-[8px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
               <p className="font-bold border-b border-amber-500/30 mb-1">{mj.region}</p>
               <p className="italic opacity-80">{mj.significance.substring(0, 40)}...</p>
            </div>
          </button>
        ))}
      </div>

      {/* Map Key / Legend */}
      <div className="absolute top-4 left-4 p-2 bg-stone-900/20 border border-amber-900/20 rounded cinzel text-[8px] md:text-[10px] text-amber-900 pointer-events-none">
        <p className="font-bold border-b border-amber-900/30 mb-1">Mappa Mahajanapada</p>
        <p>• Red: Sovereign Capital</p>
        <p>~ Blue: The Great Rivers</p>
      </div>
    </div>
  );
};

export default MahajanapadaMap;
