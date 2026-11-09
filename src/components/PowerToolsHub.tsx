import React, { useState } from 'react';
import { Calculator, FileText, Zap, ShieldCheck, ArrowRight, Phone, MessageCircle, HelpCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { businessInfo } from '../data/businessData';
import { BackupCalculatorModal, CALCULATION_CONSTANTS } from './BackupCalculatorModal';

export const PowerToolsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculate-backup' | 'get-quotation'>('calculate-backup');
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  // Quick Quotation Form State
  const [quoteCategory, setQuoteCategory] = useState('Inverter Tubular Battery (150Ah - 200Ah)');
  const [quoteBrand, setQuoteBrand] = useState('Prycal (Authorised Distributor)');
  const [hasScrapExchange, setHasScrapExchange] = useState(true);
  const [deliveryType, setDeliveryType] = useState('Doorstep Delivery & Installation in Savedi/Ahilyanagar');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Shree Power Enterprises, I would like to get a quotation:\n\nRequirement: ${quoteCategory}\nPreferred Brand: ${quoteBrand}\nOld Battery Exchange: ${hasScrapExchange ? 'Yes (Trade-in scrap credit)' : 'No (New installation only)'}\nDelivery: ${deliveryType}${customerPhone ? `\nMy Contact: ${customerPhone}` : ''}\n\nPlease share your best discounted price with warranty terms.`;
    window.open(`https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-14 bg-slate-50 border-y border-slate-200 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            Smart Power Sizing &amp; Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Backup Sizing &amp; Instant Quotation
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Choose whether to calculate your required inverter/battery capacity or request an instant discounted price quote.
          </p>
        </div>

        {/* 2 Tabs Segmented Switcher (§2 / Zero-Pill interactive buttons) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('calculate-backup')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'calculate-backup'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Calculate Backup
            </button>
            <button
              onClick={() => setActiveTab('get-quotation')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'get-quotation'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              2. Get Quotation
            </button>
          </div>
        </div>

        {/* TAB 1: CALCULATE BACKUP (Clean main screen, opens popup) */}
        {activeTab === 'calculate-backup' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  Engineering Sizing Tool (Popup Mode)
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Calculate Your Exact Inverter &amp; Battery Backup Needs
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Avoid buying an undersized inverter that trips or an oversized setup that wastes money. Our popup calculator lets you customize your appliances, view estimated backup hours, and explore our verified electrical formulas.
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Appliance wattages for fans, LED lights, TVs &amp; fridges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Calculates minimum Inverter VA rating with 25% surge buffer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Calculates required Prycal / Exide battery Ah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transparent formulas: 12V / 0.8 PF / 75% Depth of Discharge</span>
                  </div>
                </div>

                {/* Primary Action Button to Open Pop-up */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => setIsCalculatorModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculate Backup (Open Calculator)
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsCalculatorModalOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    View Calculation Formulas &amp; Constants
                  </button>
                </div>
              </div>

              {/* Visual Showcase Card */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="text-amber-400 font-semibold uppercase tracking-wider">
                    Calculation Standard
                  </span>
                  <span className="font-mono text-slate-400">Ahilyanagar Ready</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                    <span className="text-slate-400 font-sans">System Voltage</span>
                    <span className="text-amber-400 font-bold">{CALCULATION_CONSTANTS.systemVoltage} Volts</span>
                  </div>
                  <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                    <span className="text-slate-400 font-sans">Power Factor</span>
                    <span className="text-amber-400 font-bold">{CALCULATION_CONSTANTS.powerFactor}</span>
                  </div>
                  <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                    <span className="text-slate-400 font-sans">Safety Surge Margin</span>
                    <span className="text-amber-400 font-bold">+{((CALCULATION_CONSTANTS.safetySurgeMargin - 1) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                    <span className="text-slate-400 font-sans">Usable DoD Factor</span>
                    <span className="text-amber-400 font-bold">{(CALCULATION_CONSTANTS.depthOfDischarge * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-300 flex items-center gap-2 border-t border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Authorised Prycal Distributor · Shop No. 5, Savedi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GET QUOTATION */}
        {activeTab === 'get-quotation' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Direct Factory Pricing
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Get Instant Quotation with Scrap Exchange Discount
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Select your product and receive a direct price quotation with warranty details from Sanjay Kulkarni (+91 94224 64766).
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      1. Battery / Power Category *
                    </label>
                    <select
                      value={quoteCategory}
                      onChange={(e) => setQuoteCategory(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Inverter Tubular Battery (150Ah - 200Ah)</option>
                      <option>Hatchback / Sedan Car Battery (35Ah - 45Ah)</option>
                      <option>SUV / Diesel MUV Battery (65Ah - 80Ah)</option>
                      <option>Two-Wheeler Motorcycle / Scooter Battery</option>
                      <option>Tractor &amp; Commercial Fleet Battery (88Ah - 130Ah)</option>
                      <option>Pure Sine Wave Home UPS Inverter</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      2. Preferred Brand *
                    </label>
                    <select
                      value={quoteBrand}
                      onChange={(e) => setQuoteBrand(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Prycal (Authorised Distributor - Best Price)</option>
                      <option>Exide Batteries (National Benchmark)</option>
                      <option>Luminous Pure Sine Wave UPS</option>
                      <option>Best Recommendation by Shree Power</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      3. Delivery &amp; Fitment Option *
                    </label>
                    <select
                      value={deliveryType}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Doorstep Delivery &amp; Installation in Savedi/Ahilyanagar</option>
                      <option>Self-Pickup at Savedi Shop (Shop No. 5, Adishakti Apts)</option>
                      <option>Emergency Breakdown Roadside Assistance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      4. Your Mobile / WhatsApp Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98xxxxxxxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Old Battery Exchange Checkbox */}
                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="scrapCheckbox"
                      checked={hasScrapExchange}
                      onChange={(e) => setHasScrapExchange(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="scrapCheckbox" className="text-xs text-slate-800 cursor-pointer">
                      <strong className="text-slate-900">Exchange Old/Dead Battery:</strong> Apply maximum trade-in discount (Up to ₹3,800 off).
                    </label>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 hidden sm:inline">
                    {hasScrapExchange ? 'Exchange Discount Applied' : 'No Exchange'}
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Request Quotation on WhatsApp
                  </button>
                  <a
                    href={`tel:${businessInfo.contacts[0].phone}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                  >
                    <Phone className="w-4 h-4 text-slate-600" />
                    Call Sanjay: +91 94224 64766
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up Modal for Calculate Backup */}
      <BackupCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
      />
    </section>
  );
};
