import React, { useState } from 'react';
import { BatteryProduct, productsData, businessInfo } from '../data/businessData';
import { Shield, Check, Phone, MessageCircle, Info, ExternalLink, X, Zap, BatteryCharging, Sparkles, SlidersHorizontal } from 'lucide-react';

interface InverterProduct {
  id: string;
  name: string;
  modelCode: string;
  series: 'EVO S' | 'EVO D';
  waveform: 'Pure Sine Wave' | 'Square Wave';
  vaRating: number;
  maxLoadWatts: number;
  batterySystem: string;
  voltage: string;
  image: string;
  badge: string;
  tagColor: 'emerald' | 'blue';
  description: string;
  suitableAppliances: string[];
  keyFeatures: string[];
  specs: { label: string; value: string }[];
  recommendedPrycalBatteries: string[];
  warranty: string;
}

const LUMINOUS_INVERTERS: InverterProduct[] = [
  {
    id: 'luminous-evo-s-1050',
    name: 'Luminous EVO S 1050',
    modelCode: 'EVO S 1050',
    series: 'EVO S',
    waveform: 'Pure Sine Wave',
    vaRating: 900,
    maxLoadWatts: 756,
    batterySystem: '12V Single Battery System',
    voltage: '12V',
    image: '/assets/images/inverters/luminous_evo_s_1050.png',
    badge: 'Pure Sine Wave · Noiseless',
    tagColor: 'emerald',
    description:
      'Advanced DSP Pure Sine Wave home inverter delivering silent, hum-free fan operation and 100% protection for sensitive household gadgets and electronics.',
    suitableAppliances: ['LED TVs & Monitors', 'Laptops & Wi-Fi Routers', 'Ceiling Fans & LED Lights', 'Kitchen Mixers & Consoles'],
    keyFeatures: [
      'Pure Sine Wave output ensures zero buzzing noise in fans and lights',
      'Adaptive 3-stage battery charging maximizes battery lifespan',
      'Dual Mode: Eco Mode (wide input 100V–290V) & UPS Mode (regulated 180V–260V)',
      'MCB protection for short circuits, overload, and reverse battery polarity',
    ],
    specs: [
      { label: 'VA Rating', value: '900 VA' },
      { label: 'Max Bulb Load', value: '756 Watts' },
      { label: 'Waveform', value: 'Pure Sine Wave' },
      { label: 'Battery Support', value: '12V (Single Battery)' },
      { label: 'Recommended Battery', value: 'Prycal 110Ah – 150Ah Tubular' },
      { label: 'Warranty', value: '24 Months Official Luminous' },
    ],
    recommendedPrycalBatteries: ['Prycal P 110 TT 60 (110Ah)', 'Prycal P 150 TT 60 (150Ah)'],
    warranty: '24 Months Luminous Warranty',
  },
  {
    id: 'luminous-evo-s-1250',
    name: 'Luminous EVO S 1250',
    modelCode: 'EVO S 1250',
    series: 'EVO S',
    waveform: 'Pure Sine Wave',
    vaRating: 1100,
    maxLoadWatts: 924,
    batterySystem: '12V Single Battery System',
    voltage: '12V',
    image: '/assets/images/inverters/luminous_evo_s_1250.png',
    badge: 'Pure Sine Wave · High Capacity',
    tagColor: 'emerald',
    description:
      'High-capacity Pure Sine Wave UPS engineered for 2–3 BHK homes and professional clinics requiring steady backup for mixed loads including small refrigerators and computers.',
    suitableAppliances: ['Direct-Cool Refrigerators', 'Smart TVs & Soundbars', 'Desktop PCs & Printers', 'Multiple Fans & Lighting Circuits'],
    keyFeatures: [
      'Higher 1100 VA capacity easily handles heavy surge startup currents',
      'Ultra-clean grid-grade Sine Wave power prevents appliance heating',
      'Smart LED status cluster (Mains On, Eco/UPS, Charging, Overload, Low Battery)',
      'Rapid recharge technology performs even during frequent load shedding',
    ],
    specs: [
      { label: 'VA Rating', value: '1100 VA' },
      { label: 'Max Bulb Load', value: '924 Watts' },
      { label: 'Waveform', value: 'Pure Sine Wave' },
      { label: 'Battery Support', value: '12V (Single Battery)' },
      { label: 'Recommended Battery', value: 'Prycal 150Ah – 250Ah Tubular' },
      { label: 'Warranty', value: '24 Months Official Luminous' },
    ],
    recommendedPrycalBatteries: ['Prycal P 150 TT 60 (150Ah)', 'Prycal P 200 TT 60 (200Ah)', 'Prycal P 250 TT 60 (250Ah)'],
    warranty: '24 Months Luminous Warranty',
  },
  {
    id: 'luminous-evo-d-1050',
    name: 'Luminous EVO D 1050',
    modelCode: 'EVO D 1050',
    series: 'EVO D',
    waveform: 'Square Wave',
    vaRating: 900,
    maxLoadWatts: 756,
    batterySystem: '12V Single Battery System',
    voltage: '12V',
    image: '/assets/images/inverters/luminous_evo_d_1050.png',
    badge: 'Square Wave / Digital · Economical',
    tagColor: 'blue',
    description:
      'Rugged, economical power backup solution designed for lights, ceiling fans, and commercial shop displays with low-voltage charging support down to 100V.',
    suitableAppliances: ['Ceiling & Table Fans', 'LED & CFL Bulbs', 'Tube lights', 'Small Shop Cash Counters & Wi-Fi'],
    keyFeatures: [
      'Microcontroller-based digital design ensures prompt power cutover',
      'Low input voltage charging begins smoothly even at 100V AC',
      'Rugged Indian power grid endurance with surge & spike suppression',
      'High compatibility with all tubular, flat plate, and SMF batteries',
    ],
    specs: [
      { label: 'VA Rating', value: '900 VA' },
      { label: 'Max Bulb Load', value: '756 Watts' },
      { label: 'Waveform', value: 'Square Wave / Digital' },
      { label: 'Battery Support', value: '12V (Single Battery)' },
      { label: 'Low Voltage Start', value: 'Down to 100V AC' },
      { label: 'Warranty', value: '24 Months Official Luminous' },
    ],
    recommendedPrycalBatteries: ['Prycal P 100 JT 60 (100Ah)', 'Prycal P 110 TT 60 (110Ah)', 'Prycal P 150 TT 60 (150Ah)'],
    warranty: '24 Months Luminous Warranty',
  },
  {
    id: 'luminous-evo-d-1250',
    name: 'Luminous EVO D 1250',
    modelCode: 'EVO D 1250',
    series: 'EVO D',
    waveform: 'Square Wave',
    vaRating: 1100,
    maxLoadWatts: 924,
    batterySystem: '12V Single Battery System',
    voltage: '12V',
    image: '/assets/images/inverters/luminous_evo_d_1250.png',
    badge: 'Square Wave / Digital · Heavy Duty',
    tagColor: 'blue',
    description:
      'High-power 1100VA digital square wave inverter built for large households, workshops, and commercial retail showrooms requiring maximum illumination backup.',
    suitableAppliances: ['Up to 5–6 Fans & 8+ Lights', 'Shop Display Lights', 'Office Billing Terminals', 'Emergency Lighting Circuits'],
    keyFeatures: [
      'Heavy-duty 1100 VA digital power capability for extensive lighting setups',
      'Fast high-current battery recharge cycle to prepare for consecutive cuts',
      'Thermal overload protection with auto-reset functionality',
      'Durable metallic chassis with efficient heat dissipation vents',
    ],
    specs: [
      { label: 'VA Rating', value: '1100 VA' },
      { label: 'Max Bulb Load', value: '924 Watts' },
      { label: 'Waveform', value: 'Square Wave / Digital' },
      { label: 'Battery Support', value: '12V (Single Battery)' },
      { label: 'Recommended Battery', value: 'Prycal 150Ah – 225Ah Tubular' },
      { label: 'Warranty', value: '24 Months Official Luminous' },
    ],
    recommendedPrycalBatteries: ['Prycal P 150 TT 60 (150Ah)', 'Prycal P 200 TT 60 (200Ah)', 'Prycal P 225 TT 60 (225Ah)'],
    warranty: '24 Months Luminous Warranty',
  },
];

export const ProductCatalog: React.FC = () => {
  // Main 2 Tabs: "batteries" and "inverter" as requested
  const [activeMainTab, setActiveMainTab] = useState<'batteries' | 'inverter'>('batteries');

  // Filters (Only used for Batteries tab)
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [activeModalBattery, setActiveModalBattery] = useState<BatteryProduct | null>(null);
  const [activeModalInverter, setActiveModalInverter] = useState<InverterProduct | null>(null);

  // Filter batteries only (excluding old inverters from battery list)
  const batteryProductsOnly = productsData.filter((p) => p.category !== 'inverter-ups');

  const filteredBatteries = batteryProductsOnly.filter((product) => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  const getWhatsAppBatteryLink = (product: BatteryProduct) => {
    const text = `Hello Shree Power Enterprises, I am interested in ${product.brand} - ${product.name} (${product.capacity}, ${product.voltage}).\nPlease share your best discounted offer price and doorstep delivery time in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppInverterLink = (inverter: InverterProduct) => {
    const text = `Hello Shree Power Enterprises, I want to inquire about Luminous Inverter ${inverter.name} (${inverter.waveform}, ${inverter.vaRating}VA).\nPlease share price and best battery combo recommendation in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="products" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
              Authorised Distribution &amp; Retail
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Products: Batteries &amp; Inverters
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Authorised regional distributor for <strong>Prycal Batteries</strong> with direct factory pricing w.e.f. Oct 2026, alongside genuine <strong>Exide</strong> lines and official <strong>Luminous EVO</strong> inverters in Ahilyanagar.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 self-start md:self-auto">
            {activeMainTab === 'batteries'
              ? `Showing ${filteredBatteries.length} Battery Models`
              : 'Showing 4 Luminous Inverter Models'}
          </div>
        </div>

        {/* 2 Primary Tabs: Batteries & Inverter */}
        <div className="flex items-center gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-8 max-w-md shadow-xs">
          <button
            onClick={() => setActiveMainTab('batteries')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeMainTab === 'batteries'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BatteryCharging className={`w-4 h-4 ${activeMainTab === 'batteries' ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>Batteries</span>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {batteryProductsOnly.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('inverter')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeMainTab === 'inverter'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className={`w-4 h-4 ${activeMainTab === 'inverter' ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>Inverters</span>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              4 Models
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: BATTERIES (Includes Brand & Category Filters)           */}
        {/* ============================================================== */}
        {activeMainTab === 'batteries' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filter Controls for Batteries */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              {/* Brand Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                  Brand:
                </span>
                <div className="inline-flex p-1 bg-white rounded-lg border border-slate-200">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedBrand === 'all'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Brands
                  </button>
                  <button
                    onClick={() => setSelectedBrand('prycal')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedBrand === 'prycal'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Prycal (Authorised Distributor)
                  </button>
                  <button
                    onClick={() => setSelectedBrand('exide')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedBrand === 'exide'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Exide Batteries
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                  Type:
                </span>
                <div className="inline-flex p-1 bg-white rounded-lg border border-slate-200">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Categories
                  </button>
                  <button
                    onClick={() => setSelectedCategory('inverter-battery')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === 'inverter-battery'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Inverter Tall Tubular
                  </button>
                  <button
                    onClick={() => setSelectedCategory('four-wheeler')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === 'four-wheeler'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Car &amp; SUV Batteries
                  </button>
                  <button
                    onClick={() => setSelectedCategory('two-wheeler')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === 'two-wheeler'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bike &amp; Scooter
                  </button>
                  <button
                    onClick={() => setSelectedCategory('commercial-tractor')}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === 'commercial-tractor'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tractor &amp; Commercial
                  </button>
                </div>
              </div>
            </div>

            {/* Battery Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBatteries.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    {/* Product Image Slot */}
                    <div className="relative aspect-4/3 bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {product.tag && (
                        <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded">
                          {product.tag}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                        {product.capacity}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                        <span className="font-semibold text-amber-700 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{product.voltage}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 font-medium">In Stock</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {product.description}
                      </p>

                      <div className="text-xs text-slate-500 space-y-1 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Warranty: <strong className="text-slate-800">{product.warranty}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Exchange Credit: <strong className="text-slate-800">Up to ₹{product.scrapDiscountMax.toLocaleString()}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer with Price and Action */}
                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <div className="text-[11px] text-slate-400">Offer Price (10% Off)</div>
                      <div className="text-sm font-extrabold font-mono text-slate-900">
                        {product.estimatedPriceRange}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalBattery(product)}
                        className="p-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                        title="View Technical Details"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <a
                        href={getWhatsAppBatteryLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Enquire
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: INVERTER (No filter needed, exactly 4 Luminous options)  */}
        {/* ============================================================== */}
        {activeMainTab === 'inverter' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Context Notice: Authorized Dealer & No prices mentioned as requested */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-amber-50/70 border border-blue-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  ⚡
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Luminous EVO Inverters · Authorized Dealer in Ahilyanagar
                  </h3>
                  <p className="text-xs text-slate-600">
                    4 certified models available: EVO S (Pure Sine Wave) &amp; EVO D (Square Wave) in 1050 and 1250 capacities.
                  </p>
                </div>
              </div>
              <div className="text-xs font-semibold text-blue-800 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                No Price Listed · Call / WhatsApp for Special Shop Offer
              </div>
            </div>

            {/* 4 Inverters Cards Grid (2x2 on desktop, responsive) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LUMINOUS_INVERTERS.map((inverter) => (
                <article
                  key={inverter.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-blue-300"
                >
                  <div>
                    {/* Top Header Strip with Series & Waveform Badge */}
                    <div className="p-4 pb-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black tracking-wider uppercase text-blue-900 font-mono">
                          Luminous
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-xs font-bold text-slate-700">
                          {inverter.series} Series
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono border ${
                          inverter.waveform === 'Pure Sine Wave'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-blue-50 text-blue-800 border-blue-300'
                        }`}
                      >
                        {inverter.waveform}
                      </span>
                    </div>

                    {/* Inverter Image cropped from official Luminous website screenshot */}
                    <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/50 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden min-h-[200px]">
                      <img
                        src={inverter.image}
                        alt={inverter.name}
                        className="max-h-36 max-w-[85%] object-contain drop-shadow-md group-hover:scale-104 transition-transform duration-300"
                      />
                      <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded shadow-2xs border border-slate-200">
                        {inverter.vaRating} VA · {inverter.maxLoadWatts}W
                      </span>
                    </div>

                    {/* Body Information */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {inverter.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {inverter.description}
                        </p>
                      </div>

                      {/* Technical Specs Pills */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] text-slate-400 block font-sans">Waveform</span>
                          <span className="font-bold text-slate-800">{inverter.waveform}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] text-slate-400 block font-sans">VA / Watts</span>
                          <span className="font-bold text-slate-800">{inverter.vaRating}VA ({inverter.maxLoadWatts}W)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] text-slate-400 block font-sans">Battery Setup</span>
                          <span className="font-bold text-slate-800">{inverter.voltage} (1 Battery)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] text-slate-400 block font-sans">Official Warranty</span>
                          <span className="font-bold text-emerald-700">24 Months</span>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Key Advantages:
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {inverter.keyFeatures.slice(0, 2).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Prycal Battery Pairing */}
                      <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                          Recommended Prycal Battery Pair:
                        </span>
                        <span className="text-amber-950 font-semibold">
                          {inverter.recommendedPrycalBatteries.join(' or ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: No Price Shown As Requested + Quick Inquiry */}
                  <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                        Price
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        Price on Request
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalInverter(inverter)}
                        className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Specs
                      </button>

                      <a
                        href={getWhatsAppInverterLink(inverter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Inquire Price
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Authorized Distributor Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Direct Distributor Advantage
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Authorised Prycal Battery Distributor in Ahilyanagar
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Buying directly from the authorised regional distributor guarantees fresh factory-filled battery stock, immediate warranty registration, and the lowest wholesale/retail pricing without middleman markups.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${businessInfo.contacts[0].phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Sanjay: +91 94224 64766
            </a>
            <a
              href={businessInfo.brands.prycal.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-amber-900 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg transition-colors whitespace-nowrap"
            >
              Prycal Official Website
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Battery Detail Modal */}
      {activeModalBattery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 relative">
            <button
              onClick={() => setActiveModalBattery(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
              <span>{activeModalBattery.brand}</span>
              <span>·</span>
              <span>{activeModalBattery.capacity}</span>
              <span>·</span>
              <span>{activeModalBattery.voltage}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {activeModalBattery.name}
            </h3>

            <p className="text-sm text-slate-600 mb-4">
              {activeModalBattery.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Capacity</span>
                <span className="font-bold text-slate-900">{activeModalBattery.capacity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Voltage</span>
                <span className="font-bold text-slate-900">{activeModalBattery.voltage}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Free Warranty</span>
                <span className="font-bold text-emerald-700">{activeModalBattery.guaranteeMonths} Months</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Pro-rata</span>
                <span className="font-bold text-slate-700">{activeModalBattery.proRataMonths} Months</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Engineering Highlights &amp; Technology
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeModalBattery.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Recommended Applications
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeModalBattery.applications.map((app, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded border border-slate-200 font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div>
                <div className="text-xs text-slate-500">Offer Price (10% Off MRP)</div>
                <div className="text-lg font-extrabold font-mono text-slate-900">
                  {activeModalBattery.estimatedPriceRange}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${businessInfo.contacts[0].phone}`}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
                >
                  Call Specialist
                </a>
                <a
                  href={getWhatsAppBatteryLink(activeModalBattery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inverter Detail Modal */}
      {activeModalInverter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 relative">
            <button
              onClick={() => setActiveModalInverter(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
              <span>Luminous</span>
              <span>·</span>
              <span>{activeModalInverter.series}</span>
              <span>·</span>
              <span>{activeModalInverter.waveform}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {activeModalInverter.name} ({activeModalInverter.vaRating}VA)
            </h3>

            <p className="text-sm text-slate-600 mb-4">
              {activeModalInverter.description}
            </p>

            {/* Inverter Image in Modal */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5">
              <img
                src={activeModalInverter.image}
                alt={activeModalInverter.name}
                className="max-h-40 object-contain drop-shadow-md"
              />
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5 font-mono text-xs">
              {activeModalInverter.specs.map((spec, i) => (
                <div key={i}>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">{spec.label}</span>
                  <span className="font-bold text-slate-800">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Key Performance Features
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeModalInverter.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended battery pair */}
            <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Recommended Prycal Tall Tubular Battery Pairing:
              </h4>
              <p className="text-xs text-amber-950 font-medium">
                {activeModalInverter.recommendedPrycalBatteries.join(' or ')} for optimal 4–8 hour backup.
              </p>
            </div>

            {/* Modal Footer: Inquiry without displaying price */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div>
                <div className="text-xs text-slate-500">Official Warranty</div>
                <div className="text-sm font-extrabold text-slate-900">
                  {activeModalInverter.warranty}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${businessInfo.contacts[0].phone}`}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
                >
                  Call +91 94224 64766
                </a>
                <a
                  href={getWhatsAppInverterLink(activeModalInverter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire Best Price on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
