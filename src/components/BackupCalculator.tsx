import React, { useState, useId } from 'react';
import { Zap, Clock, ShieldCheck, MessageCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface Appliance {
  id: string;
  name: string;
  watts: number;
  iconText: string;
  count: number;
  defaultCount: number;
}

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: 'fan', name: 'Ceiling Fans', watts: 75, iconText: '🌀', count: 3, defaultCount: 3 },
  { id: 'bulb', name: 'LED Bulbs / Tubes', watts: 15, iconText: '💡', count: 4, defaultCount: 4 },
  { id: 'tv', name: 'LED TV (32"–43")', watts: 90, iconText: '📺', count: 1, defaultCount: 1 },
  { id: 'wifi', name: 'Wi-Fi Router & CCTV', watts: 20, iconText: '📶', count: 1, defaultCount: 1 },
  { id: 'laptop', name: 'Laptops / Desktop PC', watts: 80, iconText: '💻', count: 1, defaultCount: 1 },
  { id: 'fridge', name: 'Inverter Refrigerator', watts: 180, iconText: '🧊', count: 0, defaultCount: 0 },
];

export const BackupCalculator: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>(DEFAULT_APPLIANCES);
  const [desiredHours, setDesiredHours] = useState<number>(4);
  const hoursSliderId = useId();

  const updateCount = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: Math.max(0, Math.min(10, item.count + delta)) } : item))
    );
  };

  const resetDefaults = () => {
    setAppliances(DEFAULT_APPLIANCES);
    setDesiredHours(4);
  };

  // Calculations
  const totalWatts = appliances.reduce((sum, item) => sum + item.count * item.watts, 0);
  const activeAppliancesCount = appliances.reduce((sum, item) => sum + item.count, 0);

  // Power factor 0.8 + 20% safety margin for startup currents
  const recommendedVA = totalWatts > 0 ? Math.ceil((totalWatts / 0.8) * 1.25) : 0;

  // Inverter model pick
  let recommendedInverter = 'Luminous Zelio+ 1100 (900VA)';
  if (recommendedVA > 900 && recommendedVA <= 1500) {
    recommendedInverter = 'Luminous Eco Volt Neo 1650 (1500VA)';
  } else if (recommendedVA > 1500) {
    recommendedInverter = 'Luminous Cruze 2.5kVA / 24V Commercial UPS';
  }

  // Energy needed: Watt-hours = Total Watts * desired hours
  // Battery usable capacity: 12V * Ah * 0.75 efficiency / depth-of-discharge factor
  const requiredWattHours = totalWatts * desiredHours;
  const batteryAhNeeded = totalWatts > 0 ? Math.ceil(requiredWattHours / (12 * 0.75)) : 0;

  let recommendedBattery = 'Prycal PowerPlus 150Ah Tall Tubular';
  let estimatedBackupTime = '4 – 5 Hours';

  if (batteryAhNeeded <= 120) {
    recommendedBattery = 'Prycal / Exide 120Ah or 150Ah Tubular';
    estimatedBackupTime = totalWatts > 0 ? `${(150 * 12 * 0.75 / totalWatts).toFixed(1)} Hours` : '0 Hours';
  } else if (batteryAhNeeded <= 170) {
    recommendedBattery = 'Prycal PowerPlus 150Ah Tall Tubular (PTT-15060)';
    estimatedBackupTime = totalWatts > 0 ? `${(150 * 12 * 0.75 / totalWatts).toFixed(1)} Hours` : '0 Hours';
  } else if (batteryAhNeeded <= 230) {
    recommendedBattery = 'Prycal MaxDuty 200Ah Tall Tubular (PTT-20072)';
    estimatedBackupTime = totalWatts > 0 ? `${(200 * 12 * 0.75 / totalWatts).toFixed(1)} Hours` : '0 Hours';
  } else {
    recommendedBattery = 'Twin 150Ah / 200Ah Prycal Tubular Batteries (24V Setup)';
    estimatedBackupTime = totalWatts > 0 ? `${(300 * 12 * 0.75 / totalWatts).toFixed(1)} Hours` : '0 Hours';
  }

  const generateWhatsAppMessage = () => {
    const applianceList = appliances
      .filter((a) => a.count > 0)
      .map((a) => `${a.name}: ${a.count}`)
      .join(', ');

    const text = `Hello Shree Power Enterprises, I used your website backup calculator.\n\nMy load: ${totalWatts} Watts (${applianceList || 'None'}).\nDesired backup: ${desiredHours} hours.\nRecommended System: ${recommendedInverter} with ${recommendedBattery}.\n\nPlease provide your best price quote and installation availability in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculator" className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
              Interactive Sizing Tool
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Inverter &amp; Battery Power Calculator
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Select your essential home or shop appliances to instantly calculate the ideal inverter VA rating and Prycal tubular battery capacity for your backup needs in Ahilyanagar.
            </p>
          </div>
          <button
            onClick={resetDefaults}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Appliance Selection Matrix */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Step 1: Choose Your Connected Appliances</span>
              <span className="text-xs font-mono text-slate-500">{activeAppliancesCount} Items Selected</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {appliances.map((app) => (
                <div
                  key={app.id}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                    app.count > 0 ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" role="img" aria-label={app.name}>
                      {app.iconText}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{app.name}</div>
                      <div className="text-xs font-mono text-slate-500">{app.watts}W each</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCount(app.id, -1)}
                      disabled={app.count === 0}
                      aria-label={`Decrease ${app.name}`}
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold font-mono text-slate-900">
                      {app.count}
                    </span>
                    <button
                      onClick={() => updateCount(app.id, 1)}
                      aria-label={`Increase ${app.name}`}
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desired Backup Hours Slider */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={hoursSliderId} className="text-sm font-bold text-slate-900">
                  Step 2: Desired Backup Duration
                </label>
                <span className="text-sm font-extrabold font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {desiredHours} Hours Backup
                </span>
              </div>
              <input
                id={hoursSliderId}
                type="range"
                min="1"
                max="10"
                step="1"
                value={desiredHours}
                onChange={(e) => setDesiredHours(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                <span>1 hr (Basic)</span>
                <span>4 hrs (Typical)</span>
                <span>8 hrs (Heavy)</span>
                <span>10+ hrs (Long Cut)</span>
              </div>
            </div>
          </div>

          {/* Sizing Results Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 rounded-xl shadow-lg border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Recommended Power Package
              </span>
              <span className="text-xs font-mono text-slate-400">Ahilyanagar Ready</span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700/60">
                <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Total Running Load
                </div>
                <div className="text-xl font-bold font-mono text-white tracking-tight">
                  {totalWatts} <span className="text-xs font-normal text-slate-400">Watts</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700/60">
                <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Backup
                </div>
                <div className="text-xl font-bold font-mono text-amber-400 tracking-tight">
                  {estimatedBackupTime}
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/80">
                <div className="text-xs text-amber-400 font-medium mb-1">Recommended Inverter Rating</div>
                <div className="text-base font-bold text-white">{recommendedInverter}</div>
                <div className="text-xs text-slate-400 mt-1">
                  Required capacity: minimum <span className="font-mono font-medium text-slate-200">{recommendedVA} VA</span> with 25% safety surge margin.
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/80">
                <div className="text-xs text-amber-400 font-medium mb-1">Recommended Tubular Battery</div>
                <div className="text-base font-bold text-white">{recommendedBattery}</div>
                <div className="text-xs text-slate-400 mt-1">
                  Deep discharge tubular battery with up to 60–72 months manufacturer warranty.
                </div>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="pt-2 text-xs text-slate-300 space-y-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Authorised distributor pricing with genuine warranty card</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free doorstep delivery &amp; expert installation in Savedi / Ahilyanagar</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Get Quote on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-center text-xs text-slate-400 mt-2">
                Direct chat with Sanjay Kulkarni (+91 94224 64766)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
