import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface ScrapTier {
  id: string;
  name: string;
  category: string;
  typicalWeight: string;
  estimatedScrapValue: number;
  bestFitNew: string;
  exampleVehicles: string;
}

const SCRAP_TIERS: ScrapTier[] = [
  {
    id: 'bike',
    name: 'Two-Wheeler Battery (2.5Ah – 9Ah)',
    category: 'Motorcycle & Scooter',
    typicalWeight: '1.5 – 3.2 kg',
    estimatedScrapValue: 500,
    bestFitNew: 'Prycal Rider Pro / Exide Xplore',
    exampleVehicles: 'Activa, Splendor, Pulsar, Classic 350',
  },
  {
    id: 'small-car',
    name: 'Small Car Battery (35Ah – 38Ah)',
    category: 'Hatchback & Compact Car',
    typicalWeight: '9.5 – 11.0 kg',
    estimatedScrapValue: 1800,
    bestFitNew: 'Prycal DriveMax 35Ah / Exide Epiq 35',
    exampleVehicles: 'Alto, WagonR, Swift, i10, Kwid, Tiago',
  },
  {
    id: 'mid-car',
    name: 'Mid-Size Car Battery (45Ah – 55Ah)',
    category: 'Sedan & Compact SUV',
    typicalWeight: '12.0 – 14.5 kg',
    estimatedScrapValue: 2100,
    bestFitNew: 'Prycal DriveMax 45Ah / Exide Mileage 45',
    exampleVehicles: 'Dzire, Honda City, Creta, Brezza, Nexon',
  },
  {
    id: 'suv-diesel',
    name: 'Heavy SUV / Diesel Battery (65Ah – 80Ah)',
    category: 'SUV, MUV & Commercial Pickup',
    typicalWeight: '16.0 – 21.0 kg',
    estimatedScrapValue: 2600,
    bestFitNew: 'Prycal UltraTorque 65Ah / Exide 65D26R',
    exampleVehicles: 'Scorpio, Bolero, Innova, Harrier, Thar',
  },
  {
    id: 'tractor-heavy',
    name: 'Tractor / Truck Battery (88Ah – 130Ah)',
    category: 'Agricultural & Commercial Trucks',
    typicalWeight: '24.0 – 35.0 kg',
    estimatedScrapValue: 3500,
    bestFitNew: 'Prycal KisanShakti 100Ah / Exide Jai Kisan',
    exampleVehicles: 'Mahindra 575 DI, Swaraj 744, Eicher, Tata 407',
  },
  {
    id: 'inverter-tubular-150',
    name: 'Inverter Tall Tubular Battery (150Ah)',
    category: 'Household Power Backup',
    typicalWeight: '48.0 – 54.0 kg',
    estimatedScrapValue: 3200,
    bestFitNew: 'Prycal PowerPlus 150Ah (PTT-15060) Tall Tubular',
    exampleVehicles: 'Standard 2–3 BHK Home Backup Inverters',
  },
  {
    id: 'inverter-tubular-200',
    name: 'Heavy Inverter Tall Tubular (200Ah – 220Ah)',
    category: 'Long Backup / Commercial Tubular',
    typicalWeight: '58.0 – 66.0 kg',
    estimatedScrapValue: 3800,
    bestFitNew: 'Prycal MaxDuty 200Ah (PTT-20072) Tall Tubular',
    exampleVehicles: 'Bungalows, Medical Clinics, Commercial Establishments',
  },
];

export const ScrapValueCalculator: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>('small-car');
  const [quantity, setQuantity] = useState<number>(1);

  const selectedTier = SCRAP_TIERS.find((t) => t.id === selectedTierId) || SCRAP_TIERS[1];
  const totalScrapValue = selectedTier.estimatedScrapValue * quantity;

  const getWhatsAppExchangeLink = () => {
    const text = `Hello Shree Power Enterprises, I want to trade in my old battery:\nType: ${selectedTier.name} (Qty: ${quantity}).\nEstimated Trade-in Credit: ₹${totalScrapValue}.\n\nPlease let me know your best exchange quote and delivery/fitment schedule in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-14 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200/80 text-xs font-semibold text-amber-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Guaranteed Instant Trade-in Value
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Exchange Your Dead Battery for Instant Cash Credit
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Don’t discard your old dead battery. At Shree Power Enterprises, we offer maximum government-authorized scrap buyback value deducted directly from your new invoice.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Tier Selector */}
            <div className="lg:col-span-7 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Select Your Existing Old / Dead Battery:
              </div>

              <div className="space-y-2">
                {SCRAP_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                      selectedTierId === tier.id
                        ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs text-amber-700 font-semibold">{tier.category}</div>
                      <div className="text-sm font-bold text-slate-900">{tier.name}</div>
                      <div className="text-xs text-slate-500">{tier.exampleVehicles}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold font-mono text-emerald-700">
                        ₹{tier.estimatedScrapValue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400">Trade-in credit</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700">Quantity of Old Batteries:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold font-mono text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="w-7 h-7 rounded border border-slate-300 bg-white text-slate-700 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Valuation Summary Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                    Trade-In Estimation
                  </span>
                  <span className="text-xs font-mono text-slate-400">Shree Power Savedi</span>
                </div>

                <div className="my-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    Total Estimated Invoice Discount
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 mt-1">
                    ₹{totalScrapValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Calculated for {quantity} × {selectedTier.name}
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Directly subtracted from your new <strong>Prycal or Exide</strong> battery purchase bill.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      100% Eco-friendly recycling in accordance with Central Pollution Control Board (CPCB) lead recovery norms.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Our technician collects your old battery right during doorstep installation in Ahilyanagar.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={getWhatsAppExchangeLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Claim Exchange Discount on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-xs text-slate-400 mt-2">
                  Have multiple commercial or tractor batteries? Call Sanjay Kulkarni for bulk scrap pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
