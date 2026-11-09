import React, { useState, useEffect } from 'react';
import { businessInfo } from '../data/businessData';
import { Sparkles, Zap, ShieldCheck, Tag, Truck, RefreshCw, Phone } from 'lucide-react';
import { ShreePowerLogo } from './ShreePowerLogo';

interface TaglineItem {
  id: string;
  badge: string;
  prefix: string;
  highlight: string;
  suffix: string;
  icon: React.ReactNode;
}

const TAGLINES: TaglineItem[] = [
  {
    id: 'distributor',
    badge: 'Authorised',
    prefix: 'Regional Distributor for',
    highlight: 'Prycal Batteries',
    suffix: 'in Ahilyanagar',
    icon: <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />,
  },
  {
    id: 'pricing',
    badge: 'Direct Supply',
    prefix: 'Direct Factory Supply with',
    highlight: 'Official Manufacturer Warranty',
    suffix: 'on Prycal Models',
    icon: <Tag className="w-3.5 h-3.5 text-emerald-500" />,
  },
  {
    id: 'inverters',
    badge: 'Luminous Dealer',
    prefix: 'Official Stockist for',
    highlight: 'Luminous EVO Inverters',
    suffix: '(Sine & Square Wave)',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
  },
  {
    id: 'delivery',
    badge: 'Fast Support',
    prefix: 'Free Doorstep Delivery &',
    highlight: '30-Min Fast Fitment',
    suffix: 'in Savedi & City',
    icon: <Truck className="w-3.5 h-3.5 text-blue-500" />,
  },
  {
    id: 'scrap',
    badge: 'Scrap Exchange',
    prefix: 'Get Maximum Cash Value with',
    highlight: 'Old Battery Buyback',
    suffix: 'Guaranteed',
    icon: <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />,
  },
  {
    id: 'contact-call',
    badge: 'Call On-Demand',
    prefix: 'Connect with Sanjay & Ruturaj Kulkarni at',
    highlight: '+91 94224 64766',
    suffix: '· Savedi, Ahilyanagar',
    icon: <Phone className="w-3.5 h-3.5 text-amber-500" />,
  },
];

export const Header: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<'entering' | 'visible' | 'exiting'>('visible');

  useEffect(() => {
    // Sequence: visible for 3200ms -> exiting for 500ms -> update index and entering for 500ms -> visible
    const displayTimer = setTimeout(() => {
      setStage('exiting');
      
      const changeTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TAGLINES.length);
        setStage('entering');
        
        const enterTimer = setTimeout(() => {
          setStage('visible');
        }, 50);

        return () => clearTimeout(enterTimer);
      }, 400);

      return () => clearTimeout(changeTimer);
    }, 3200);

    return () => clearTimeout(displayTimer);
  }, [currentIndex]);

  const activeTagline = TAGLINES[currentIndex];

  // Visual effects classes according to animation stage
  const getAnimationClasses = () => {
    switch (stage) {
      case 'entering':
        return 'opacity-0 translate-y-3.5 scale-95 blur-xs';
      case 'visible':
        return 'opacity-100 translate-y-0 scale-100 blur-none';
      case 'exiting':
        return 'opacity-0 -translate-y-3.5 scale-95 blur-xs';
      default:
        return 'opacity-100 translate-y-0 scale-100';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-18">
          {/* Logo with smooth scroll to top */}
          <div className="shrink-0">
            <ShreePowerLogo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>

          {/* Continuous Appearing & Disappearing Animated Tagline (Replaces Redirections) */}
          <div className="flex-1 flex items-center justify-end overflow-hidden pl-2">
            <div
              className={`flex items-center gap-2 sm:gap-3 py-1.5 px-3 sm:px-4 rounded-full bg-gradient-to-r from-amber-50/80 via-slate-50 to-amber-50/60 border border-amber-200/70 shadow-xs transition-all duration-400 ease-out select-none cursor-default ${getAnimationClasses()}`}
            >
              {/* Pulsing Accent Glow Icon */}
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-xs border border-amber-300/60 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-25" />
                {activeTagline.icon}
              </div>

              {/* Tagline Content */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300/50">
                  {activeTagline.badge}
                </span>

                <span className="hidden sm:inline text-slate-600">
                  {activeTagline.prefix}
                </span>

                <span className="font-extrabold text-slate-900 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  {activeTagline.highlight}
                </span>

                <span className="text-slate-600 hidden lg:inline">
                  {activeTagline.suffix}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
