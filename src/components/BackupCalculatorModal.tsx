import React, { useState, useId } from 'react';
import { X, Zap, Clock, ShieldCheck, MessageCircle, RotateCcw, ArrowRight, HelpCircle, Calculator, BookOpen, Check } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface Appliance {
  id: string;
  name: string;
  watts: number;
  iconText: string;
  count: number;
  defaultCount: number;
  note?: string;
}

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: 'fan', name: 'Ceiling Fans', watts: 75, iconText: '🌀', count: 3, defaultCount: 3, note: 'Standard 1200mm induction fan (75W)' },
  { id: 'bulb', name: 'LED Bulbs / Tubes', watts: 15, iconText: '💡', count: 4, defaultCount: 4, note: 'Standard residential LED (9W–20W avg 15W)' },
  { id: 'tv', name: 'LED TV (32"–43")', watts: 90, iconText: '📺', count: 1, defaultCount: 1, note: 'Smart LED TV with set-top box' },
  { id: 'wifi', name: 'Wi-Fi Router & CCTV', watts: 20, iconText: '📶', count: 1, defaultCount: 1, note: 'Wi-Fi fiber router or 4-ch DVR' },
  { id: 'laptop', name: 'Laptops / Desktop PC', watts: 80, iconText: '💻', count: 1, defaultCount: 1, note: 'Laptop charger / workstation load' },
  { id: 'fridge', name: 'Inverter Refrigerator', watts: 180, iconText: '🧊', count: 0, defaultCount: 0, note: 'Modern single/double door inverter fridge' },
];

export const CALCULATION_CONSTANTS = {
  systemVoltage: 12, // Volts (Standard 1-battery setup; 24V for twin-battery setup)
  powerFactor: 0.8, // Inductive load displacement factor
  safetySurgeMargin: 1.25, // 25% overhead for motor startup surges
  depthOfDischarge: 0.75, // 75% usable battery capacity (protects lead tubular plates)
  batteryEfficiency: 0.85, // Coulombic energy efficiency factor
};

interface BackupCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackupCalculatorModal: React.FC<BackupCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [appliances, setAppliances] = useState<Appliance[]>(DEFAULT_APPLIANCES);
  const [desiredHours, setDesiredHours] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'calculator' | 'constants'>('calculator');
  const hoursSliderId = useId();

  if (!isOpen) return null;

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

  // Inverter VA: (Total Watts / Power Factor 0.8) * Safety Margin 1.25
  const recommendedVA = totalWatts > 0 ? Math.ceil((totalWatts / CALCULATION_CONSTANTS.powerFactor) * CALCULATION_CONSTANTS.safetySurgeMargin) : 0;

  // Inverter Model Selection
  let recommendedInverter = 'Luminous Zelio+ 1100 Pure Sine Wave (900VA / 756W)';
  if (recommendedVA > 900 && recommendedVA <= 1500) {
    recommendedInverter = 'Luminous Eco Volt Neo 1650 (1500VA / 1260W)';
  } else if (recommendedVA > 1500) {
    recommendedInverter = 'Luminous Cruze 2.5kVA / 24V Heavy Duty Commercial UPS';
  }

  // Energy Needed = Total Watts * Desired Hours
  // Usable battery energy per Ah at 12V = 12V * 0.75 (DoD) = 9 Watt-hours per Ah
  const requiredWattHours = totalWatts * desiredHours;
  const batteryAhNeeded = totalWatts > 0 ? Math.ceil(requiredWattHours / (CALCULATION_CONSTANTS.systemVoltage * CALCULATION_CONSTANTS.depthOfDischarge)) : 0;

  let recommendedBattery = 'Prycal PowerPlus 150Ah Tall Tubular (PTT-15060)';
  let estimatedBackupTime = '4.5 Hours';

  if (batteryAhNeeded <= 120) {
    recommendedBattery = 'Prycal 120Ah or 150Ah Tall Tubular';
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

    const text = `Hello Shree Power Enterprises, I calculated my power backup requirements on your website.\n\nRunning Load: ${totalWatts} Watts (${applianceList || 'Custom Load'}).\nTarget Duration: ${desiredHours} Hours.\nCalculated Inverter: ${recommendedInverter}.\nRecommended Battery: ${recommendedBattery}.\n\nPlease provide your best discounted price with old battery trade-in and installation in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Inverter &amp; Battery Power Backup Calculator
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                Exact electrical sizing for homes &amp; shops in Ahilyanagar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDefaults}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Reset to typical defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close calculation popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-Tabs (Interactive Calculator vs Engineering Constants) */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <div className="inline-flex p-1 bg-white rounded-lg border border-slate-200 shadow-2xs text-xs font-semibold">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Backup Calculator
            </button>
            <button
              onClick={() => setActiveTab('constants')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'constants'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Formulas &amp; Constants
            </button>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            {totalWatts}W Running Load · {desiredHours}h Desired
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'calculator' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Appliance Matrix & Hours Slider */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Step 1: Select Appliances to Run Simultaneously
                    </span>
                    <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {activeAppliancesCount} Items Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {appliances.map((app) => (
                      <div
                        key={app.id}
                        className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                          app.count > 0 ? 'border-amber-300 bg-amber-50/40 shadow-xs' : 'border-slate-200 bg-slate-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl" role="img" aria-label={app.name}>
                            {app.iconText}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{app.name}</div>
                            <div className="text-[11px] font-mono text-slate-500">{app.watts}W each</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateCount(app.id, -1)}
                            disabled={app.count === 0}
                            aria-label={`Decrease ${app.name}`}
                            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold font-mono text-slate-900">
                            {app.count}
                          </span>
                          <button
                            onClick={() => updateCount(app.id, 1)}
                            aria-label={`Increase ${app.name}`}
                            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slider for Hours */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor={hoursSliderId} className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Step 2: Desired Backup Duration
                    </label>
                    <span className="text-sm font-extrabold font-mono text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded">
                      {desiredHours} Hours Required
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
                    className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                    <span>1h (Minimal)</span>
                    <span>4h (Average Loadshedding)</span>
                    <span>8h (Overnight)</span>
                    <span>10h (Heavy)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Calculations & Recommended Package */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-6 rounded-xl border border-slate-800 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-semibold text-amber-400 uppercase tracking-wide">
                      Calculation Results
                    </span>
                    <span className="font-mono text-slate-400">12V System</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        Total Running Load
                      </div>
                      <div className="text-xl font-bold font-mono text-white mt-0.5">
                        {totalWatts} <span className="text-xs font-normal text-slate-400">W</span>
                      </div>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Est. Runtime
                      </div>
                      <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                        {estimatedBackupTime}
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                      <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                        Recommended Inverter (Min {recommendedVA} VA)
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">{recommendedInverter}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Includes 25% surge overhead for fan &amp; motor startup currents.
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                      <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                        Recommended Tubular Battery (Min {batteryAhNeeded} Ah)
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">{recommendedBattery}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Tall tubular plates engineered for deep discharge in Ahilyanagar.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get Best Price on WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] text-slate-400 text-center">
                    Instant quote from Sanjay Kulkarni (+91 94224 64766)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Formulas & Constants View */
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Transparent Engineering Sizing:</span> Here are the exact electrical values, efficiency ratings, and formulas used by Shree Power Enterprises to ensure your inverter and battery never trip or suffer premature battery failure.
              </div>

              {/* Constants Table */}
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-2.5 text-left">Parameter / Constant</th>
                      <th className="px-4 py-2.5 text-left">Value Used</th>
                      <th className="px-4 py-2.5 text-left">Engineering Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white font-mono">
                    <tr>
                      <td className="px-4 py-2.5 font-bold font-sans text-slate-900">System Voltage (V)</td>
                      <td className="px-4 py-2.5 text-amber-700 font-bold">12 Volts</td>
                      <td className="px-4 py-2.5 font-sans text-slate-600">Standard single-battery domestic configuration (24V for &gt;1500VA).</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold font-sans text-slate-900">Power Factor (PF)</td>
                      <td className="px-4 py-2.5 text-amber-700 font-bold">0.8</td>
                      <td className="px-4 py-2.5 font-sans text-slate-600">Household appliances (fans, motors) have inductive reactive components.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold font-sans text-slate-900">Safety &amp; Inrush Factor</td>
                      <td className="px-4 py-2.5 text-amber-700 font-bold">1.25 (+25%)</td>
                      <td className="px-4 py-2.5 font-sans text-slate-600">Prevents inverter overload during initial motor startup surges.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold font-sans text-slate-900">Battery Depth of Discharge (DoD)</td>
                      <td className="px-4 py-2.5 text-amber-700 font-bold">0.75 (75%)</td>
                      <td className="px-4 py-2.5 font-sans text-slate-600">Discharging lead-acid tubular batteries beyond 75–80% degrades plate life.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Appliance Ratings Reference */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Standard Appliance Wattage Ratings Used:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {DEFAULT_APPLIANCES.map((app) => (
                    <div key={app.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{app.iconText}</span>
                        <span>{app.name}</span>
                      </div>
                      <div className="text-amber-700 font-mono font-bold mt-1">{app.watts} Watts</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{app.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Formulas */}
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 font-mono text-xs">
                <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] font-sans">
                  Mathematical Formulas Applied
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans text-[11px]">1. Total Running Load:</span>
                  <span className="text-white font-bold">Total Watts = Σ (Quantity × Appliance Watts)</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans text-[11px]">2. Required Inverter Rating:</span>
                  <span className="text-white font-bold">Inverter VA = (Total Watts / 0.8) × 1.25</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans text-[11px]">3. Required Battery Capacity:</span>
                  <span className="text-white font-bold">Energy (Wh) = Total Watts × Desired Hours</span>
                  <span className="text-amber-300 block mt-1">Battery Ah = Energy (Wh) / (12V × 0.75)</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans text-[11px]">4. Estimated Runtime:</span>
                  <span className="text-white font-bold">Backup Hours = (Battery Ah × 12V × 0.75) / Total Watts</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorised Prycal Distributor · Shop No. 5, Savedi, Ahilyanagar</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
