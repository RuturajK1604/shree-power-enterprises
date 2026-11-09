import React, { useState } from 'react';
import { Calculator, FileText, Zap, ShieldCheck, ArrowRight, Phone, MessageCircle, HelpCircle, CheckCircle2, RefreshCw, Tag, ChevronDown, Award } from 'lucide-react';
import { businessInfo } from '../data/businessData';
import { PRYCAL_PRICE_LIST, PrycalPriceItem } from '../data/prycalPrices';
import { BackupCalculatorModal, CALCULATION_CONSTANTS } from './BackupCalculatorModal';

interface PowerToolsHubProps {
  isCalculatorModalOpen?: boolean;
  onOpenCalculator?: () => void;
  onCloseCalculator?: () => void;
  initialTab?: 'calculate-backup' | 'get-quotation';
}

export const PowerToolsHub: React.FC<PowerToolsHubProps> = ({
  isCalculatorModalOpen: propIsModalOpen,
  onOpenCalculator,
  onCloseCalculator,
  initialTab = 'get-quotation',
}) => {
  const [activeTab, setActiveTab] = useState<'calculate-backup' | 'get-quotation'>(initialTab);
  const [localIsModalOpen, setLocalIsModalOpen] = useState(false);

  const isModalOpen = propIsModalOpen !== undefined ? propIsModalOpen : localIsModalOpen;
  const handleOpenModal = onOpenCalculator || (() => setLocalIsModalOpen(true));
  const handleCloseModal = onCloseCalculator || (() => setLocalIsModalOpen(false));

  // Quotation Engine State
  const [selectedCategory, setSelectedCategory] = useState<PrycalPriceItem['category']>('Inverter Tall Tubular');
  const filteredModels = PRYCAL_PRICE_LIST.filter((p) => p.category === selectedCategory);

  const [selectedModelId, setSelectedModelId] = useState<string>(
    PRYCAL_PRICE_LIST.find((p) => p.category === 'Inverter Tall Tubular' && p.capacityAh === 150)?.id || PRYCAL_PRICE_LIST[0].id
  );

  const [hasScrapExchange, setHasScrapExchange] = useState<boolean>(true);
  const [deliveryType, setDeliveryType] = useState<string>('Free Doorstep Delivery & Installation (Savedi / Ahilyanagar)');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [showFullPriceTable, setShowFullPriceTable] = useState<boolean>(false);

  // Active item
  const selectedProduct = PRYCAL_PRICE_LIST.find((p) => p.id === selectedModelId) || filteredModels[0] || PRYCAL_PRICE_LIST[0];

  const handleCategorySwitch = (cat: PrycalPriceItem['category']) => {
    setSelectedCategory(cat);
    const firstInCat = PRYCAL_PRICE_LIST.find((p) => p.category === cat);
    if (firstInCat) {
      setSelectedModelId(firstInCat.id);
    }
  };

  // Pricing math: 10% off MRP as instructed
  const mrp = selectedProduct.mrp;
  const discount10Percent = Math.round(mrp * 0.10);
  const offerPrice = mrp - discount10Percent;
  const scrapDiscount = hasScrapExchange ? selectedProduct.typicalScrapCredit : 0;
  const netPayablePrice = offerPrice - scrapDiscount;

  const generateWhatsAppQuotationLink = () => {
    const text = `Hello Shree Power Enterprises, I would like an official quotation:\n\n*Product:* Prycal ${selectedProduct.model} (${selectedProduct.capacity})\n*Category:* ${selectedProduct.category}\n*Warranty:* ${selectedProduct.warranty}\n*MRP:* ₹${mrp.toLocaleString()}\n*Special Offer (10% OFF):* ₹${offerPrice.toLocaleString()}\n${hasScrapExchange ? `*Old Battery Exchange Credit:* -₹${scrapDiscount.toLocaleString()}\n*Net Effective Price:* ₹${netPayablePrice.toLocaleString()}` : '*Old Battery Exchange:* No'}\n*Fulfillment:* ${deliveryType}${customerName ? `\n*Customer:* ${customerName}` : ''}${customerPhone ? ` (${customerPhone})` : ''}\n\nPlease confirm availability and delivery slot in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculator" className="py-14 bg-slate-50 border-y border-slate-200 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            Authorised Prycal Pricing &amp; Sizing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Power Sizing &amp; Instant Battery Quotation
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Calculate your power backup requirements or generate an instant official quotation with verified <strong>10% OFF MRP</strong> rates for Ahilyanagar.
          </p>
        </div>

        {/* 2 Tabs Segmented Switcher */}
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
              2. Get Quotation (10% Off MRP)
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: CALCULATE BACKUP (Clean main screen, opens popup modal)
           ========================================================================= */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Appliance wattages for fans, LED lights, TVs &amp; fridges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Calculates minimum Inverter VA with 25% surge buffer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Calculates required Prycal battery capacity (Ah)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transparent formulas: 12V / 0.8 PF / 75% Depth of Discharge</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={handleOpenModal}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculate Backup (Open Calculator)
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleOpenModal}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    View Calculation Formulas &amp; Constants
                  </button>
                </div>
              </div>

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

        {/* =========================================================================
            TAB 2: GET QUOTATION (Loaded with Official October 2026 Prycal Prices)
           ========================================================================= */}
        {activeTab === 'get-quotation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      Official Price List (w.e.f. 1st Oct 2026)
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      10% OFF MRP Applied
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                    Instant Prycal Battery Quotation Engine
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Authorised Distributor</span>
                </div>
              </div>

              {/* Quotation Builder Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
                {/* Left Controls */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Category Filter Pills */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      1. Select Battery Category:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          'Inverter Tall Tubular',
                          'Automotive',
                          'Inverter Jumbo Tubular',
                          'Solar Royal Tubular',
                          'Solar Batteries C10',
                          'Lithium Batteries',
                        ] as PrycalPriceItem['category'][]
                      ).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategorySwitch(cat)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                            selectedCategory === cat
                              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model Selector */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      2. Select Model &amp; Capacity ({filteredModels.length} models available):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {filteredModels.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedModelId(item.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            selectedModelId === item.id
                              ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-extrabold text-slate-900">{item.model}</span>
                              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                                {item.capacity}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {item.applications}
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-400 line-through text-[11px]">
                              MRP ₹{item.mrp.toLocaleString()}
                            </span>
                            <span className="font-mono font-bold text-slate-900">
                              Offer: ₹{item.offerPrice.toLocaleString()}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Old Battery Scrap Checkbox */}
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          id="scrapToggle"
                          checked={hasScrapExchange}
                          onChange={(e) => setHasScrapExchange(e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                        />
                        <label htmlFor="scrapToggle" className="text-xs font-bold text-slate-900 cursor-pointer">
                          Trade In Old Dead Battery for Instant Exchange Discount
                        </label>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        -₹{selectedProduct.typicalScrapCredit.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6.5">
                      Government authorized lead recycling credit deducted directly from your invoice.
                    </p>
                  </div>

                  {/* Delivery & Customer Optional Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Delivery &amp; Installation:
                      </label>
                      <select
                        value={deliveryType}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                      >
                        <option>Free Doorstep Delivery &amp; Fitment (Savedi / Ahilyanagar)</option>
                        <option>Direct Shop Pickup (Shop No. 5, Adishakti Apts)</option>
                        <option>Wholesale Bulk Supply (Dealers / Workshops)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Your Mobile Number (Optional):
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 98xxxxxxxx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Quotation Summary Card */}
                <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-lg flex flex-col justify-between space-y-6">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                          Official Quotation
                        </span>
                        <h4 className="text-base font-bold text-white">
                          Prycal {selectedProduct.model}
                        </h4>
                      </div>
                      <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                        {selectedProduct.capacity}
                      </span>
                    </div>

                    {/* Warranty Tag */}
                    <div className="my-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Manufacturer Warranty:</span>
                      <span className="font-bold text-amber-400">{selectedProduct.warranty}</span>
                    </div>

                    {/* Price Breakdown Calculation */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Original Official MRP:</span>
                        <span className="line-through">₹{mrp.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between text-emerald-400">
                        <span>Special Discount (10% OFF MRP):</span>
                        <span>-₹{discount10Percent.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between text-white font-bold pt-1 border-t border-slate-800">
                        <span>Offer Price (Before Scrap):</span>
                        <span>₹{offerPrice.toLocaleString()}</span>
                      </div>

                      {hasScrapExchange && (
                        <div className="flex items-center justify-between text-amber-400">
                          <span>Old Battery Scrap Exchange:</span>
                          <span>-₹{scrapDiscount.toLocaleString()}</span>
                        </div>
                      )}

                      {/* Final Net Effective Price Highlight */}
                      <div className="mt-4 p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-center">
                        <div className="text-[11px] font-sans text-slate-300 uppercase tracking-wide">
                          {hasScrapExchange ? 'Net Effective Price with Exchange' : 'Offer Price (10% Less in MRP)'}
                        </div>
                        <div className="text-3xl font-black font-mono text-amber-400 mt-1">
                          ₹{netPayablePrice.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-sans">
                          All taxes inclusive · Ready stock in Savedi
                        </div>
                      </div>
                    </div>

                    {/* Key Assurances */}
                    <div className="mt-4 space-y-1.5 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Fresh manufacturing batch with genuine warranty card</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Free alternator output voltage test during fitment</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <a
                      href={generateWhatsAppQuotationLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send Quotation via WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${businessInfo.contacts[0].phone}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      Call Sanjay Kulkarni (+91 94224 64766)
                    </a>
                  </div>
                </div>
              </div>

              {/* Collapsible Full Price Table View */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setShowFullPriceTable(!showFullPriceTable)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    Browse All Official October 2026 Prycal Models &amp; Prices ({PRYCAL_PRICE_LIST.length} Total SKUs)
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${showFullPriceTable ? 'rotate-180' : ''}`}
                  />
                </button>

                {showFullPriceTable && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="px-3 py-2.5 text-left">Battery Model</th>
                          <th className="px-3 py-2.5 text-left">Category</th>
                          <th className="px-3 py-2.5 text-left">Capacity</th>
                          <th className="px-3 py-2.5 text-left">Warranty</th>
                          <th className="px-3 py-2.5 text-right">Official MRP</th>
                          <th className="px-3 py-2.5 text-right font-black text-amber-800">10% Less Offer Price</th>
                          <th className="px-3 py-2.5 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white font-mono text-[11px]">
                        {PRYCAL_PRICE_LIST.map((item) => (
                          <tr key={item.id} className="hover:bg-amber-50/40">
                            <td className="px-3 py-2 font-bold font-sans text-slate-900">{item.model}</td>
                            <td className="px-3 py-2 font-sans text-slate-500">{item.category}</td>
                            <td className="px-3 py-2 text-slate-700">{item.capacity}</td>
                            <td className="px-3 py-2 text-slate-600">{item.warranty}</td>
                            <td className="px-3 py-2 text-right text-slate-400 line-through">₹{item.mrp.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right font-bold text-amber-700">₹{item.offerPrice.toLocaleString()}</td>
                            <td className="px-3 py-2 text-center">
                              <button
                                onClick={() => {
                                  setSelectedCategory(item.category);
                                  setSelectedModelId(item.id);
                                  setShowFullPriceTable(false);
                                  window.scrollTo({ top: document.getElementById('calculator')?.offsetTop, behavior: 'smooth' });
                                }}
                                className="px-2.5 py-1 text-[10px] font-sans font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded transition-colors"
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up Modal for Calculate Backup */}
      <BackupCalculatorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
