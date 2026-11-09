import React from 'react';
import { businessInfo } from '../data/businessData';
import { ShieldCheck, Zap, Phone, ArrowRight, Award, Clock, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-white pt-10 pb-16 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main 2-column Hero split with items-stretch (§5 Checklist #13) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet trust kicker without pills */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">
              <span>Authorised Prycal Distributor</span>
              <span aria-hidden="true">·</span>
              <span>Savedi, Ahilyanagar</span>
              <span aria-hidden="true">·</span>
              <span>Since 2014</span>
            </div>

            {/* Display headline with balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Reliable Battery &amp; Inverter Power Solutions in Ahilyanagar
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Welcome to <strong>Shree Power Enterprises</strong>. As Ahilyanagar’s authorized distributor for <strong>Prycal Batteries</strong> and dealer for <strong>Exide</strong> &amp; <strong>Luminous</strong> inverters, we provide genuine factory stock, free doorstep installation, accurate computerized health testing, and maximum scrap buyback credits.
            </p>

            {/* Interactive Quick CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <Zap className="w-4 h-4" />
                Calculate Inverter Backup
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#vehicle-finder"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
              >
                Find Vehicle Battery
              </a>

              <a
                href={`tel:${businessInfo.contacts[0].phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                +91 94224 64766
              </a>
            </div>

            {/* Micro assurances */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                100% Genuine with Warranty Card
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                30-Min Fast Doorstep Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                Sonanagar Chowk, Savedi
              </span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Showroom Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 flex-1 min-h-[320px] lg:h-full">
              <img
                src="/src/assets/images/hero_power_showroom_1794227821933.jpg"
                alt="Shree Power Enterprises modern showroom in Ahilyanagar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                  <Award className="w-4 h-4" />
                  <span>Authorised Primary Distributor</span>
                </div>
                <div className="text-base font-bold text-white">Prycal Batteries · Ahilyanagar</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Direct factory supply, tall tubular inverter backups &amp; automotive ranges.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip in full-width row below hero split (§1.C / §5 Checklist #13) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="p-3">
            <div className="text-2xl font-black font-mono text-slate-900 tracking-tight">10+ Years</div>
            <div className="text-xs text-slate-500 mt-0.5">Serving Ahilyanagar (Est. 2014)</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-black font-mono text-amber-600 tracking-tight">Authorised</div>
            <div className="text-xs text-slate-500 mt-0.5">Prycal Regional Distributor</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-black font-mono text-slate-900 tracking-tight">Up to 72 M</div>
            <div className="text-xs text-slate-500 mt-0.5">Comprehensive Brand Warranty</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-black font-mono text-emerald-600 tracking-tight">₹3,800+</div>
            <div className="text-xs text-slate-500 mt-0.5">Max Scrap Battery Buyback</div>
          </div>
        </div>
      </div>
    </section>
  );
};
