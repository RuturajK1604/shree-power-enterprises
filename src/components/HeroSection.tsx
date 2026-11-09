import React, { useState, useEffect, useRef } from 'react';
import { businessInfo } from '../data/businessData';
import { Zap, ArrowRight, Phone, ChevronLeft, ChevronRight, Calculator, FileText, Wrench, ShieldCheck, Award } from 'lucide-react';

interface HeroSectionProps {
  onOpenCalculator?: () => void;
}

interface SlideItem {
  id: string;
  image: string;
  kicker: string;
  title: string;
  description: string;
  badge: string;
  primaryAction: {
    label: string;
    action: () => void;
    icon: React.ReactNode;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCalculator }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides: SlideItem[] = [
    {
      id: 'slide-1',
      image: '/src/assets/images/prycal/banner-4.jpg',
      kicker: 'Authorised Prycal Distributor · Ahilyanagar',
      title: 'Powering Ahilyanagar with Authentic Prycal Batteries',
      description:
        'Official regional distributor in Savedi. Direct factory-fresh stock with official manufacturer warranty cards, 10% less in MRP offer rates, and fast doorstep delivery.',
      badge: 'Official Distributor w.e.f. 2014',
      primaryAction: {
        label: 'See Products & Prices',
        action: () => scrollToSection('products'),
        icon: <ArrowRight className="w-4 h-4" />,
      },
      secondaryAction: {
        label: 'Get Quotation (10% Off)',
        href: '#calculator',
      },
    },
    {
      id: 'slide-2',
      image: '/src/assets/images/prycal/banner-5.jpg',
      kicker: 'Smart Electrical Sizing & Transparent Formulas',
      title: 'Calculate Your Exact Inverter & Battery Total Load',
      description:
        'Find the exact inverter capacity (Luminous 1050 or 1250 in Pure Sine Wave & Square Wave) and Prycal tall tubular battery Ah customized for your household appliances or shop in Ahilyanagar.',
      badge: 'Interactive Sizing Pop-Up',
      primaryAction: {
        label: 'Calculate Total Load',
        action: () => {
          if (onOpenCalculator) {
            onOpenCalculator();
          } else {
            scrollToSection('calculator');
          }
        },
        icon: <Calculator className="w-4 h-4" />,
      },
      secondaryAction: {
        label: 'Explore Luminous Inverters',
        href: '#products',
      },
    },
    {
      id: 'slide-3',
      image: '/src/assets/images/prycal/banner-6.jpg',
      kicker: 'Official October 2026 Price List',
      title: 'Instant Battery Quotation with Scrap Exchange',
      description:
        'Calculate your instant price across Inverter Tall Tubular, Automotive, Jumbo, Solar C10, and Lithium batteries with 10% less in MRP plus up to ₹3,800 old battery buyback credit.',
      badge: '10% Less in MRP Applied',
      primaryAction: {
        label: 'Get Instant Quotation',
        action: () => scrollToSection('calculator'),
        icon: <FileText className="w-4 h-4" />,
      },
      secondaryAction: {
        label: 'Vehicle Battery Finder',
        href: '#vehicle-finder',
      },
    },
    {
      id: 'slide-4',
      image: '/src/assets/images/prycal/prycal_tubular_inverter.jpg',
      kicker: 'Doorstep Service in Savedi & Ahilyanagar',
      title: 'Free Digital Battery Health Testing & Doorstep Fitment',
      description:
        'Vehicle battery dead on the road or need UPS wiring? Our certified technicians provide on-site alternator testing (13.8V – 14.4V), terminal greasing, and emergency jump-start breakdown assistance.',
      badge: '30-Min Fast Response',
      primaryAction: {
        label: 'Explore Workshop Services',
        action: () => scrollToSection('services'),
        icon: <Wrench className="w-4 h-4" />,
      },
      secondaryAction: {
        label: 'Savedi Shop Location & Map',
        href: '#contact',
      },
    },
  ];

  // Auto-slide effect (every 5.5s, pauses on user hover)
  useEffect(() => {
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, slides.length]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800 select-none"
    >
      {/* Background Carousel Slides */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image Layer exactly matching pmkprycal.com */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out transform scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* High-Legibility Dark Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/45 sm:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

              {/* Slide Content Box */}
              <div className="relative z-20 max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center">
                <div className="max-w-2xl py-16 sm:py-20 space-y-4">
                  {/* Kicker & Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {slide.kicker}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-400/30 font-mono">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Main Display Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] text-balance">
                    {slide.title}
                  </h1>

                  {/* Subtitle Prose */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Action Redirections Tailored for Each Slide */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={slide.primaryAction.action}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all hover:scale-102 cursor-pointer"
                    >
                      {slide.primaryAction.label}
                      {slide.primaryAction.icon}
                    </button>

                    <a
                      href={slide.secondaryAction.href}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 rounded-xl backdrop-blur-xs transition-colors"
                    >
                      {slide.secondaryAction.label}
                    </a>

                    <a
                      href={`tel:${businessInfo.contacts[0].phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      +91 94224 64766
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Left & Right) */}
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white border border-slate-700/80 backdrop-blur-xs transition-all hover:scale-110 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white border border-slate-700/80 backdrop-blur-xs transition-all hover:scale-110 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Carousel Dots Indicator & Quick Slide Jump */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            className={`transition-all rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-6 h-2 bg-amber-400'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* 4-column KPI strip below hero carousel */}
      <div className="relative z-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">10+ Years</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Established in 2014 in Savedi</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 tracking-tight">Authorised</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Prycal Batteries Regional Distributor</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-tight">10% Off MRP</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Direct Manufacturer Discount</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">30-Min Fast</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Doorstep Fitment in Ahilyanagar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
