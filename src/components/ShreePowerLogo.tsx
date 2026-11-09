import React from 'react';

interface ShreePowerLogoProps {
  className?: string;
  onClick?: () => void;
}

export const ShreePowerLogo: React.FC<ShreePowerLogoProps> = ({ className = '', onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Shree Power Enterprises - Scroll to top"
      className={`inline-flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 transition-transform hover:scale-[1.02] cursor-pointer ${className}`}
    >
      {/* Emblem SVG Icon */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent" />
          
          {/* Stylized Power Bolt / SPE Emblem */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-amber-400 transform group-hover:scale-110 transition-transform duration-200"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.2" />
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase leading-none group-hover:text-amber-600 transition-colors">
            Shree Power
          </span>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded font-mono hidden sm:inline-block">
            Est. 2014
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500 uppercase leading-tight font-mono">
          Enterprises · Ahilyanagar
        </span>
      </div>
    </button>
  );
};
