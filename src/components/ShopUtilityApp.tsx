import React, { useState } from 'react';
import {
  Calculator,
  Zap,
  FileText,
  Phone,
  MessageCircle,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Copy,
  Printer,
  User,
  Store,
  Percent,
  Search,
  ArrowRight,
  Clock,
  Award,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { businessInfo } from '../data/businessData';
import { PRYCAL_PRICE_LIST, PrycalPriceItem } from '../data/prycalPrices';

// Luminous Inverter Models stocked by Shree Power Enterprises
export const LUMINOUS_INVERTERS = [
  { id: 'none', name: 'None (Battery Only)', va: 0, watts: 0, type: 'None', price: 0 },
  { id: 'evo-s-1050', name: 'Luminous EVO S 1050', va: 900, watts: 756, type: 'Pure Sine Wave', price: 6200 },
  { id: 'evo-s-1250', name: 'Luminous EVO S 1250', va: 1100, watts: 924, type: 'Pure Sine Wave', price: 7400 },
  { id: 'evo-d-1050', name: 'Luminous EVO D 1050', va: 900, watts: 756, type: 'Square Wave', price: 5400 },
  { id: 'evo-d-1250', name: 'Luminous EVO D 1250', va: 1100, watts: 924, type: 'Square Wave', price: 6400 },
];

interface Appliance {
  id: string;
  name: string;
  watts: number;
  count: number;
}

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: 'fan', name: 'Ceiling Fans', watts: 75, count: 3 },
  { id: 'bulb', name: 'LED Bulbs / Tubes', watts: 15, count: 4 },
  { id: 'tv', name: 'LED TV (32"–43")', watts: 90, count: 1 },
  { id: 'wifi', name: 'Wi-Fi Router & CCTV', watts: 20, count: 1 },
  { id: 'laptop', name: 'Laptops / Desktop PC', watts: 80, count: 1 },
  { id: 'fridge', name: 'Inverter Refrigerator', watts: 180, count: 0 },
  { id: 'cooler', name: 'Air Cooler', watts: 150, count: 0 },
];

export const ShopUtilityApp: React.FC = () => {
  // Navigation Tabs: Calculate Quote, Calculate Load, Price List
  const [activeTab, setActiveTab] = useState<'quote' | 'load' | 'price-list'>('quote');

  // =========================================================================
  // 1. CALCULATE LOAD STATE (Dynamic Battery & Inverter Selection with Live Backup)
  // =========================================================================
  const [appliances, setAppliances] = useState<Appliance[]>(DEFAULT_APPLIANCES);
  const [customApplianceName, setCustomApplianceName] = useState('');
  const [customApplianceWatts, setCustomApplianceWatts] = useState<number>(100);
  const [loadChosenInverterId, setLoadChosenInverterId] = useState<string>('evo-s-1050');
  const [loadChosenBatteryId, setLoadChosenBatteryId] = useState<string>(
    PRYCAL_PRICE_LIST.find((p) => p.category === 'Inverter Tall Tubular' && p.capacityAh === 150)?.id || PRYCAL_PRICE_LIST[0].id
  );

  // =========================================================================
  // 2. CALCULATE QUOTE STATE
  // =========================================================================
  const [clientType, setClientType] = useState<'dealer' | 'customer'>('customer');
  const [customerDiscountPercent, setCustomerDiscountPercent] = useState<number>(10); // Default 10%
  const [selectedCategory, setSelectedCategory] = useState<PrycalPriceItem['category'] | 'all'>('Inverter Tall Tubular');
  const [selectedModelId, setSelectedModelId] = useState<string>(
    PRYCAL_PRICE_LIST.find((p) => p.category === 'Inverter Tall Tubular' && p.capacityAh === 150)?.id || PRYCAL_PRICE_LIST[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [withOldBattery, setWithOldBattery] = useState<boolean>(true); // With/Without scrap
  const [customScrapCredit, setCustomScrapCredit] = useState<number | null>(null);
  const [selectedInverterId, setSelectedInverterId] = useState<string>('none');
  const [customInverterPrice, setCustomInverterPrice] = useState<number | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // =========================================================================
  // 3. PRICE LIST STATE
  // =========================================================================
  const [priceSearch, setPriceSearch] = useState('');
  const [priceCategory, setPriceCategory] = useState<string>('all');

  // -------------------------------------------------------------------------
  // LOAD & DYNAMIC BACKUP CALCULATIONS
  // -------------------------------------------------------------------------
  const totalWatts = appliances.reduce((sum, item) => sum + item.count * item.watts, 0);

  // Active chosen battery in load tab
  const loadActiveBattery =
    PRYCAL_PRICE_LIST.find((p) => p.id === loadChosenBatteryId) ||
    PRYCAL_PRICE_LIST.find((p) => p.model === 'P 150 TT 60') ||
    PRYCAL_PRICE_LIST[0];

  // Active chosen inverter in load tab
  const loadActiveInverter =
    LUMINOUS_INVERTERS.find((inv) => inv.id === loadChosenInverterId) || LUMINOUS_INVERTERS[1];

  // Inverter overload check
  const isInverterOverloaded = totalWatts > loadActiveInverter.watts && loadActiveInverter.watts > 0;
  const inverterLoadPercentage =
    loadActiveInverter.watts > 0 ? Math.round((totalWatts / loadActiveInverter.watts) * 100) : 0;

  // Battery backup hours calculation (12V system, 75% Depth of Discharge for tubular plates)
  const usableBatteryWattHours = loadActiveBattery.capacityAh * 12 * 0.75;
  const backupHoursFullLoad = totalWatts > 0 ? (usableBatteryWattHours / totalWatts).toFixed(1) : '0';
  const backupHoursTypicalLoad =
    totalWatts > 0 ? (usableBatteryWattHours / (totalWatts * 0.7)).toFixed(1) : '0';

  // Popular backup batteries for quick switching
  const popularBackupBatteries = PRYCAL_PRICE_LIST.filter(
    (p) => p.category === 'Inverter Tall Tubular' || p.category === 'Inverter Jumbo Tubular'
  );

  const updateApplianceCount = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((app) => (app.id === id ? { ...app, count: Math.max(0, app.count + delta) } : app))
    );
  };

  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customApplianceName.trim() || customApplianceWatts <= 0) return;
    const newId = `custom-${Date.now()}`;
    setAppliances((prev) => [
      ...prev,
      { id: newId, name: customApplianceName.trim(), watts: customApplianceWatts, count: 1 },
    ]);
    setCustomApplianceName('');
    setCustomApplianceWatts(100);
  };

  // Move the user's custom chosen battery and inverter directly into Quote Generator
  const handleApplyLoadToQuote = () => {
    setSelectedModelId(loadActiveBattery.id);
    setSelectedCategory(loadActiveBattery.category);
    setSelectedInverterId(loadActiveInverter.id);
    setCustomInverterPrice(null);
    setQuantity(1);
    setActiveTab('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate WhatsApp message specifically for Load & Backup calculation
  const generateLoadBackupWhatsApp = () => {
    const activeApps = appliances
      .filter((a) => a.count > 0)
      .map((a) => `${a.name}: ${a.count} (${a.count * a.watts}W)`)
      .join(', ');

    let msg = `*POWER BACKUP CALCULATION - SHREE POWER ENTERPRISES*\n`;
    msg += `_Authorised Prycal Distributor · Savedi, Ahilyanagar_\n`;
    msg += `------------------------------------\n`;
    msg += `*Total Running Load:* ${totalWatts} Watts\n`;
    if (activeApps) msg += `*Appliances:* ${activeApps}\n`;
    msg += `------------------------------------\n`;
    msg += `*CHOSEN INVERTER:* ${loadActiveInverter.name} (${loadActiveInverter.type})\n`;
    msg += `• Capacity: ${loadActiveInverter.va}VA / ${loadActiveInverter.watts}W\n`;
    msg += `• Load Utilization: ${inverterLoadPercentage}%\n`;
    msg += `------------------------------------\n`;
    msg += `*CHOSEN BATTERY:* Prycal ${loadActiveBattery.model} (${loadActiveBattery.capacity})\n`;
    msg += `• Category: ${loadActiveBattery.category}\n`;
    msg += `• Warranty: ${loadActiveBattery.warranty}\n`;
    msg += `------------------------------------\n`;
    msg += `*ESTIMATED BACKUP DURATION:*\n`;
    msg += `• *Full Load (${totalWatts}W):* ~${backupHoursFullLoad} Hours\n`;
    msg += `• *Average Everyday Load (~70%):* ~${backupHoursTypicalLoad} Hours\n`;
    msg += `------------------------------------\n`;
    msg += `_Tap 'Apply to Quote' in portal for official price & scrap quotation._\n`;
    msg += `*Contact:* Sanjay Kulkarni (+91 94224 64766) / Ruturaj Kulkarni (+91 88059 22623)`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  // -------------------------------------------------------------------------
  // QUOTE CALCULATIONS
  // -------------------------------------------------------------------------
  const selectedProduct = PRYCAL_PRICE_LIST.find((p) => p.id === selectedModelId) || PRYCAL_PRICE_LIST[0];
  const selectedInverter = LUMINOUS_INVERTERS.find((inv) => inv.id === selectedInverterId) || LUMINOUS_INVERTERS[0];
  const inverterPrice = customInverterPrice !== null ? customInverterPrice : selectedInverter.price;

  const defaultScrapPerUnit = selectedProduct.typicalScrapCredit || 2000;
  const scrapCreditPerUnit = withOldBattery
    ? customScrapCredit !== null
      ? customScrapCredit
      : defaultScrapPerUnit
    : 0;
  const totalScrapCredit = scrapCreditPerUnit * quantity;

  const mrpPerUnit = selectedProduct.mrp;
  const dpPerUnit = selectedProduct.dealerPrice;

  const customerDiscountAmountPerUnit = Math.round(mrpPerUnit * (customerDiscountPercent / 100));
  const customerUnitPrice = mrpPerUnit - customerDiscountAmountPerUnit;

  const unitPriceCharged = clientType === 'dealer' ? dpPerUnit : customerUnitPrice;
  const totalBatteryAmount = unitPriceCharged * quantity;
  const totalInverterAmount = selectedInverter.id !== 'none' ? inverterPrice : 0;
  const subtotalBeforeScrap = totalBatteryAmount + totalInverterAmount;
  const finalTotalAmount = Math.max(0, subtotalBeforeScrap - totalScrapCredit);

  const quoteRefId = `SPE-${clientType === 'dealer' ? 'DLR' : 'CUST'}-${selectedProduct.model.replace(/\s+/g, '')}`;

  // WhatsApp Message
  const generateWhatsAppMessage = () => {
    let msg = `*OFFICIAL ESTIMATE - SHREE POWER ENTERPRISES*\n`;
    msg += `_Authorised Prycal Battery Distributor · Ahilyanagar_\n`;
    msg += `Shop No. 5, Adishakti-Kamal Apts, Kushtadham Rd, Savedi\n`;
    msg += `Contact: Sanjay Kulkarni (9422464766 / 8805922623)\n`;
    msg += `------------------------------------\n`;
    msg += `*Quote Type:* ${clientType === 'dealer' ? 'DEALER WHOLESALE (DP BASIS)' : 'CUSTOMER RETAIL'}\n`;
    if (clientName) msg += `*Name / Shop:* ${clientName}\n`;
    if (clientPhone) msg += `*Mobile:* ${clientPhone}\n`;
    msg += `*Date:* ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n`;
    msg += `------------------------------------\n`;
    msg += `*BATTERY:* Prycal ${selectedProduct.model} (${selectedProduct.capacity})\n`;
    msg += `• Warranty: ${selectedProduct.warranty}\n`;
    msg += `• Category: ${selectedProduct.category}\n`;
    msg += `• Official MRP: ₹${mrpPerUnit.toLocaleString()}\n`;

    if (clientType === 'dealer') {
      msg += `• *Dealer Price (DP):* ₹${dpPerUnit.toLocaleString()} / unit\n`;
      msg += `• Dealer Margin: ₹${(mrpPerUnit - dpPerUnit).toLocaleString()} (${(((mrpPerUnit - dpPerUnit) / mrpPerUnit) * 100).toFixed(1)}%)\n`;
    } else {
      msg += `• *Discount:* ${customerDiscountPercent}% (-₹${customerDiscountAmountPerUnit.toLocaleString()})\n`;
      msg += `• *Offer Rate:* ₹${customerUnitPrice.toLocaleString()} / unit\n`;
    }

    msg += `• Quantity: ${quantity} Unit(s)\n`;
    msg += `• Battery Subtotal: ₹${totalBatteryAmount.toLocaleString()}\n`;

    if (selectedInverter.id !== 'none') {
      msg += `------------------------------------\n`;
      msg += `*INVERTER:* ${selectedInverter.name} (${selectedInverter.type})\n`;
      msg += `• Inverter Price: ₹${inverterPrice.toLocaleString()}\n`;
    }

    msg += `------------------------------------\n`;
    if (withOldBattery) {
      msg += `*OLD BATTERY SCRAP:* -₹${totalScrapCredit.toLocaleString()} (${quantity} × ₹${scrapCreditPerUnit.toLocaleString()})\n`;
    } else {
      msg += `*Old Battery:* Without Old Battery (₹0 Scrap)\n`;
    }

    msg += `------------------------------------\n`;
    msg += `*FINAL TOTAL PAYABLE: ₹${finalTotalAmount.toLocaleString()}*\n`;
    msg += `------------------------------------\n`;
    msg += `_Payment: Cash & Carry / UPI. All prices inclusive of taxes. Factory fresh stock with warranty card._`;

    return msg;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  // -------------------------------------------------------------------------
  // PRICE LIST FILTERING
  // -------------------------------------------------------------------------
  const filteredPrices = PRYCAL_PRICE_LIST.filter((item) => {
    const matchesCategory = priceCategory === 'all' || item.category === priceCategory;
    const matchesSearch =
      priceSearch.trim() === '' ||
      item.model.toLowerCase().includes(priceSearch.toLowerCase()) ||
      item.capacity.toLowerCase().includes(priceSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(priceSearch.toLowerCase()) ||
      item.applications.toLowerCase().includes(priceSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const availableCategories = [
    'Inverter Tall Tubular',
    'Automotive',
    'Inverter Jumbo Tubular',
    'Solar Royal Tubular',
    'Solar Batteries C10',
    'Lithium Batteries',
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* =========================================================================
          TOP APP BAR (SIMPLE, CLEAN, NO GRAPHICS/IMAGES)
         ========================================================================= */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-sm">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Shree Power Enterprises
                </h1>
                <span className="text-[10px] font-bold font-mono bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Prycal Distributor
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Savedi, Ahilyanagar · Shop Management &amp; Estimation App
              </p>
            </div>
          </div>

          {/* Quick Contact & WhatsApp for Shop Owner */}
          <div className="flex items-center gap-2 text-xs">
            <a
              href="tel:+919422464766"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>94224 64766</span>
            </a>
            <a
              href={`https://wa.me/919422464766?text=${encodeURIComponent('Hello Shree Power Enterprises, sending query from shop portal.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* PRIMARY TAB NAVIGATION BAR */}
        <div className="bg-slate-950 border-t border-slate-800 px-4">
          <div className="max-w-6xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5">
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'quote'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>1. Calculate Quote</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-amber-300">
                Dealer / Customer
              </span>
            </button>

            <button
              onClick={() => setActiveTab('load')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'load'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>2. Calculate Load</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                Inverter &amp; Battery Sizer
              </span>
            </button>

            <button
              onClick={() => setActiveTab('price-list')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'price-list'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>3. DP &amp; MRP Price List</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {PRYCAL_PRICE_LIST.length} SKUs
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN APPLICATION CONTENT
         ========================================================================= */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {/* =====================================================================
            TAB 1: CALCULATE QUOTE
           ===================================================================== */}
        {activeTab === 'quote' && (
          <div className="space-y-6">
            {/* Mode Switcher Banner: Dealer vs Customer */}
            <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Step 1 · Select Quotation Type
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                    {clientType === 'dealer'
                      ? '🏪 Dealer Wholesale Mode (DP Price Applied)'
                      : '👤 Customer Retail Mode (MRP with Configurable Discount)'}
                  </div>
                </div>

                {/* Toggle Buttons */}
                <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-300 shrink-0">
                  <button
                    type="button"
                    onClick={() => setClientType('dealer')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      clientType === 'dealer'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Dealer (DP Rate)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setClientType('customer')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      clientType === 'customer'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Customer (Retail)</span>
                  </button>
                </div>
              </div>

              {/* Customer Mode Discount Slider / Bar */}
              {clientType === 'customer' && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-amber-700" />
                    <span className="text-slate-700 font-semibold">Customer Discount from MRP:</span>
                    <span className="text-amber-800 font-black font-mono text-sm">
                      {customerDiscountPercent}% OFF
                    </span>
                    <span className="text-[11px] text-slate-500">(Default 10%)</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-500 text-[11px]">Presets:</span>
                    {[5, 10, 12, 15, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setCustomerDiscountPercent(pct)}
                        className={`px-2 py-0.5 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                          customerDiscountPercent === pct
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}

                    <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-300 ml-1">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Custom:</span>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={customerDiscountPercent}
                        onChange={(e) => setCustomerDiscountPercent(Math.max(0, Math.min(50, Number(e.target.value))))}
                        className="w-10 bg-transparent text-slate-900 font-mono font-bold text-xs text-center focus:outline-none"
                      />
                      <span className="text-slate-500 text-xs">%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote Form Layout (2 Columns: Controls on left, Live Bill on right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-7 space-y-4">
                {/* Category Selector */}
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Step 2 · Battery Category:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      All ({PRYCAL_PRICE_LIST.length})
                    </button>
                    {availableCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          const first = PRYCAL_PRICE_LIST.find((p) => p.category === cat);
                          if (first) setSelectedModelId(first.id);
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Battery Dropdown Selector */}
                  <div className="mt-3">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Select Battery Model:
                    </label>
                    <select
                      value={selectedModelId}
                      onChange={(e) => {
                        setSelectedModelId(e.target.value);
                        setCustomScrapCredit(null);
                      }}
                      className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {(selectedCategory === 'all'
                        ? PRYCAL_PRICE_LIST
                        : PRYCAL_PRICE_LIST.filter((p) => p.category === selectedCategory)
                      ).map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.model} ({item.capacity}) — {item.warranty} — MRP: ₹{item.mrp.toLocaleString()} | DP: ₹{item.dealerPrice.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantity and Scrap Exchange Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Quantity */}
                  <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Step 3 · Quantity:
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                          className="w-12 text-center text-sm font-bold font-mono text-slate-900 bg-transparent focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {quantity === 1 ? '1 Battery' : `${quantity} Batteries`}
                      </span>
                    </div>
                  </div>

                  {/* Old Battery Scrap Toggle */}
                  <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Step 4 · Old Battery Exchange:
                    </label>
                    <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 w-full">
                      <button
                        type="button"
                        onClick={() => setWithOldBattery(true)}
                        className={`flex-1 py-1 px-2 rounded text-xs font-bold transition-all cursor-pointer ${
                          withOldBattery
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        With Old Battery
                      </button>
                      <button
                        type="button"
                        onClick={() => setWithOldBattery(false)}
                        className={`flex-1 py-1 px-2 rounded text-xs font-bold transition-all cursor-pointer ${
                          !withOldBattery
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Without Old
                      </button>
                    </div>
                  </div>
                </div>

                {/* If with old battery: Scrap Deduction Editor */}
                {withOldBattery && (
                  <div className="bg-emerald-50 rounded-xl border border-emerald-300 p-3.5 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">
                        Scrap Credit per Unit: ₹{scrapCreditPerUnit.toLocaleString()}
                      </span>
                      <span className="font-mono font-bold text-emerald-800">
                        Total Scrap: -₹{totalScrapCredit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 text-[11px]">Change scrap value: ₹</span>
                      <input
                        type="number"
                        step={100}
                        min={0}
                        value={scrapCreditPerUnit}
                        onChange={(e) => setCustomScrapCredit(Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-white border border-emerald-400 rounded text-xs font-mono font-bold text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setCustomScrapCredit(defaultScrapPerUnit)}
                        className="text-[11px] text-emerald-700 underline font-semibold cursor-pointer"
                      >
                        Reset to default (₹{defaultScrapPerUnit})
                      </button>
                    </div>
                  </div>
                )}

                {/* Optional Inverter Add-on */}
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 5 · Inverter Combo (Optional):
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">Luminous EVO Series</span>
                  </div>
                  <select
                    value={selectedInverterId}
                    onChange={(e) => {
                      setSelectedInverterId(e.target.value);
                      setCustomInverterPrice(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none"
                  >
                    {LUMINOUS_INVERTERS.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.name} {inv.type !== 'None' ? `(${inv.type} · ${inv.va}VA)` : ''} {inv.price > 0 ? `— ₹${inv.price.toLocaleString()}` : ''}
                      </option>
                    ))}
                  </select>

                  {selectedInverterId !== 'none' && (
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="text-slate-600">Inverter Price: ₹</span>
                      <input
                        type="number"
                        step={100}
                        value={inverterPrice}
                        onChange={(e) => setCustomInverterPrice(Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                      />
                      <span className="text-[11px] text-slate-500">(Included in total amount)</span>
                    </div>
                  )}
                </div>

                {/* Client / Dealer Name & Phone */}
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Step 6 · Client / Shop Details (Optional):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        {clientType === 'dealer' ? 'Dealer / Garage Shop Name:' : 'Customer Name:'}
                      </label>
                      <input
                        type="text"
                        placeholder={clientType === 'dealer' ? 'e.g. Omkar Auto, Savedi' : 'e.g. Ramesh Patil'}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        Mobile Number:
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 94224xxxxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Quotation Bill Summary (High-contrast, professional, print-ready) */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-5">
                {/* Bill Header */}
                <div className="pb-3 border-b border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-amber-400 font-bold">{quoteRefId}</span>
                    <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="text-base font-black text-white">Shree Power Enterprises</div>
                  <div className="text-[11px] text-slate-400">Shop No. 5, Savedi, Ahilyanagar · Mob: 9422464766</div>
                  <div className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700">
                    {clientType === 'dealer' ? 'DEALER WHOLESALE (DP BASIS)' : `CUSTOMER RETAIL (${customerDiscountPercent}% OFF)`}
                  </div>
                </div>

                {/* Selected Battery Overview */}
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">Prycal {selectedProduct.model}</span>
                    <span className="font-mono font-bold text-amber-400">{selectedProduct.capacity}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Warranty: {selectedProduct.warranty}</span>
                    <span>Qty: {quantity} unit(s)</span>
                  </div>
                  {selectedInverter.id !== 'none' && (
                    <div className="text-[11px] text-blue-300 pt-1 border-t border-slate-700">
                      + Inverter: {selectedInverter.name} ({selectedInverter.type})
                    </div>
                  )}
                </div>

                {/* Calculations Breakdown */}
                <div className="space-y-2 text-xs font-mono">
                  {/* MRP */}
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Official MRP ({quantity} × ₹{mrpPerUnit.toLocaleString()}):</span>
                    <span className="line-through">₹{(mrpPerUnit * quantity).toLocaleString()}</span>
                  </div>

                  {/* Pricing line */}
                  {clientType === 'dealer' ? (
                    <>
                      <div className="flex items-center justify-between text-blue-400">
                        <span>Dealer Price (DP):</span>
                        <span>₹{dpPerUnit.toLocaleString()} / unit</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 text-[11px]">
                        <span>Dealer Margin:</span>
                        <span>₹{((mrpPerUnit - dpPerUnit) * quantity).toLocaleString()}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-emerald-400">
                        <span>Discount ({customerDiscountPercent}%):</span>
                        <span>-₹{(customerDiscountAmountPerUnit * quantity).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Offer Rate:</span>
                        <span>₹{customerUnitPrice.toLocaleString()} / unit</span>
                      </div>
                    </>
                  )}

                  {/* Inverter Combo */}
                  {selectedInverter.id !== 'none' && (
                    <div className="flex items-center justify-between text-blue-300 pt-1 border-t border-slate-800">
                      <span>Inverter Combo:</span>
                      <span>+₹{inverterPrice.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-white font-bold pt-1 border-t border-slate-800">
                    <span>Subtotal:</span>
                    <span>₹{subtotalBeforeScrap.toLocaleString()}</span>
                  </div>

                  {/* Scrap exchange */}
                  {withOldBattery ? (
                    <div className="flex items-center justify-between text-amber-400 font-bold">
                      <span>Old Battery Scrap ({quantity}x):</span>
                      <span>-₹{totalScrapCredit.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Old Battery:</span>
                      <span>Without Old (₹0 Scrap)</span>
                    </div>
                  )}

                  {/* Final Total Box */}
                  <div className="mt-3 p-3.5 rounded-lg bg-amber-400/10 border border-amber-400/40 text-center">
                    <div className="text-[11px] font-sans text-amber-300 uppercase tracking-wider font-bold">
                      Net Total Payable
                    </div>
                    <div className="text-3xl font-black font-mono text-amber-400 mt-0.5">
                      ₹{finalTotalAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5 font-sans">
                      {withOldBattery ? 'With scrap battery buyback credit' : 'Without scrap battery exchange'}
                    </div>
                  </div>
                </div>

                {/* Actions: WhatsApp, Copy, Print */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Send Estimate on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyQuote}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedQuote ? 'Copied!' : 'Copy Text'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowPrintModal(true)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Slip</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: CALCULATE LOAD (INTERACTIVE BACKUP SIMULATOR)
           ===================================================================== */}
        {activeTab === 'load' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Power Load &amp; Interactive Backup Simulator
                  </h2>
                  <p className="text-xs text-slate-600">
                    Add your appliances to calculate total running load, then <strong>switch between inverters and batteries</strong> to see exactly how many hours of backup you will get on full load!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-300 shrink-0">
                    Total Load: {totalWatts} Watts
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Appliances + Inverter Selector + Battery Selector */}
              <div className="lg:col-span-7 space-y-4">
                {/* Step 1: Appliances Matrix */}
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 1 · Select Running Appliances ({appliances.reduce((s, a) => s + a.count, 0)} Active):
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliances(DEFAULT_APPLIANCES.map((a) => ({ ...a, count: 0 })))}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {appliances.map((app) => (
                      <div
                        key={app.id}
                        className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${
                          app.count > 0 ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{app.name}</div>
                          <div className="text-[11px] font-mono text-slate-500">{app.watts}W each</div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateApplianceCount(app.id, -1)}
                            disabled={app.count === 0}
                            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold font-mono text-slate-900">
                            {app.count}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateApplianceCount(app.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Custom Appliance */}
                  <form onSubmit={handleAddCustomAppliance} className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add custom appliance (e.g. Mixer, Printer)"
                      value={customApplianceName}
                      onChange={(e) => setCustomApplianceName(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                    />
                    <div className="flex items-center gap-1 bg-white px-2 py-1 border border-slate-300 rounded-lg">
                      <input
                        type="number"
                        min={10}
                        max={3000}
                        value={customApplianceWatts}
                        onChange={(e) => setCustomApplianceWatts(Number(e.target.value))}
                        className="w-14 text-xs font-mono font-bold text-slate-900 focus:outline-none"
                      />
                      <span className="text-[11px] text-slate-500">W</span>
                    </div>
                    <button
                      type="submit"
                      disabled={!customApplianceName.trim()}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </form>
                </div>

                {/* Step 2: Choose Inverter Option */}
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Step 2 · Select Luminous Inverter Option:
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Check whether the inverter supports your {totalWatts}W load without tripping
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-700">
                      Selected: {loadActiveInverter.name}
                    </span>
                  </div>

                  {/* Inverter Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {LUMINOUS_INVERTERS.filter((i) => i.id !== 'none').map((inv) => {
                      const isSelected = loadChosenInverterId === inv.id;
                      const isOver = totalWatts > inv.watts && totalWatts > 0;
                      return (
                        <button
                          key={inv.id}
                          type="button"
                          onClick={() => setLoadChosenInverterId(inv.id)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/80 ring-1 ring-amber-400 shadow-xs'
                              : 'border-slate-200 bg-slate-50 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{inv.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                              {inv.type}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Capacity: {inv.va}VA / <strong>{inv.watts} Watts</strong>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60 font-mono text-[11px]">
                            <span className="text-slate-600 font-sans">{inv.type}</span>
                            {isOver ? (
                              <span className="text-red-700 font-bold bg-red-100 px-1 rounded">
                                Overload ({totalWatts}W &gt; {inv.watts}W)
                              </span>
                            ) : (
                              <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                                {totalWatts > 0 ? `${Math.round((totalWatts / inv.watts) * 100)}% Load` : '0% Load'}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Overload Alert or Compatibility Badge */}
                  {totalWatts > 0 && (
                    <div
                      className={`p-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                        isInverterOverloaded
                          ? 'bg-red-50 text-red-800 border border-red-300'
                          : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{isInverterOverloaded ? '⚠️' : '✅'}</span>
                        <span>
                          {isInverterOverloaded
                            ? `Overload Warning: ${totalWatts}W exceeds ${loadActiveInverter.name}'s max capacity of ${loadActiveInverter.watts}W. Choose EVO 1250!`
                            : `Safe: ${loadActiveInverter.name} comfortably supports ${totalWatts}W (${inverterLoadPercentage}% capacity utilized).`}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-[11px]">
                        Max: {loadActiveInverter.watts}W
                      </span>
                    </div>
                  )}
                </div>

                {/* Step 3: Choose Battery Option & Compare Backup on Full Load */}
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Step 3 · Choose Battery &amp; Compare Backup Time:
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Click any battery to see its backup duration on your {totalWatts}W full load
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Selected: {loadActiveBattery.model} ({loadActiveBattery.capacity})
                    </span>
                  </div>

                  {/* Quick Battery Selection Grid with Backup Time on THIS Load */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {popularBackupBatteries.map((battery) => {
                      const isSelected = loadChosenBatteryId === battery.id;
                      const batteryWh = battery.capacityAh * 12 * 0.75;
                      const fullLoadHours = totalWatts > 0 ? (batteryWh / totalWatts).toFixed(1) : '—';
                      const typicalHours = totalWatts > 0 ? (batteryWh / (totalWatts * 0.7)).toFixed(1) : '—';

                      return (
                        <button
                          key={battery.id}
                          type="button"
                          onClick={() => setLoadChosenBatteryId(battery.id)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/80 ring-1 ring-amber-400 shadow-xs'
                              : 'border-slate-200 bg-slate-50 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-slate-900">{battery.model}</span>
                              <span className="font-mono font-bold text-amber-800 bg-amber-200/80 px-1.5 py-0.5 rounded text-[11px]">
                                {battery.capacity}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {battery.warranty} · {battery.category}
                            </div>
                          </div>

                          {/* Calculated Backup Duration on THIS Full Load */}
                          <div className="mt-2.5 pt-2 border-t border-slate-200/80 space-y-1">
                            <div className="flex items-center justify-between font-mono">
                              <span className="text-slate-600 font-sans text-[11px]">Full Load ({totalWatts}W):</span>
                              <span className="font-extrabold text-amber-700 text-xs">
                                {fullLoadHours !== '—' ? `~${fullLoadHours} Hours` : 'Add Load'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                              <span className="font-sans">Avg Load (~70%):</span>
                              <span>{typicalHours !== '—' ? `~${typicalHours}h` : '—'}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500 font-sans">
                              <span>Prycal Tubular</span>
                              <span className="font-semibold text-amber-700">Tap to select</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Backup Results on Full Load & Quotation Link */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-5">
                <div className="pb-3 border-b border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Live Runtime Calculation
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-0.5">
                    Backup Duration on Full Load
                  </h3>
                </div>

                {/* Primary Backup Result Display */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-transparent border border-amber-400/40 text-center">
                  <div className="text-xs text-amber-200 font-semibold uppercase tracking-wider">
                    Full Load Backup ({totalWatts} Watts)
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono text-amber-400 my-1">
                    {totalWatts > 0 ? `${backupHoursFullLoad}` : '0'}{' '}
                    <span className="text-lg font-sans font-normal text-amber-200">Hours</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Continuous 100% full running load of all selected appliances
                  </div>
                  <div className="mt-2 pt-2 border-t border-amber-400/20 flex items-center justify-between text-xs font-mono text-amber-300 px-1">
                    <span>Average (~70% Load):</span>
                    <span className="font-bold">~{backupHoursTypicalLoad} Hours</span>
                  </div>
                </div>

                {/* Chosen Hardware Overview */}
                <div className="space-y-2 text-xs">
                  {/* Inverter */}
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                      <span>Inverter: {loadActiveInverter.name}</span>
                      <span className="font-mono text-slate-300">{loadActiveInverter.type}</span>
                    </div>
                    <div className="text-white font-bold mt-1">
                      Capacity: {loadActiveInverter.va}VA / {loadActiveInverter.watts}W
                    </div>
                    <div className="text-[11px] mt-0.5 flex items-center justify-between">
                      <span className={isInverterOverloaded ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {isInverterOverloaded ? '⚠️ Overloaded' : `✅ Safe (${inverterLoadPercentage}% Load)`}
                      </span>
                      <span className="text-slate-400 font-sans text-[11px]">12V Home Inverter</span>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="p-3 bg-slate-800 rounded-lg border border-amber-500/40">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                      <span>Battery: Prycal {loadActiveBattery.model}</span>
                      <span className="font-mono text-emerald-400">{loadActiveBattery.capacity}</span>
                    </div>
                    <div className="text-white font-bold mt-1">
                      Warranty: {loadActiveBattery.warranty}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Usable Energy: {Math.round(usableBatteryWattHours)} Watt-hours (12V × 0.75 DoD)
                    </div>
                    <div className="text-[11px] text-amber-300/80 pt-1 mt-1 border-t border-slate-700 font-sans">
                      💡 Pricing, dealer discounts &amp; scrap exchange calculated in Quotation tab.
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Apply to Quote or WhatsApp */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <button
                    type="button"
                    onClick={handleApplyLoadToQuote}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <span>👉 Apply this Inverter &amp; Battery to Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={generateLoadBackupWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Share Backup Calculation on WhatsApp</span>
                  </a>

                  <p className="text-[10px] text-slate-400 text-center">
                    Formula: Backup Hours = (Battery Ah × 12V × 0.75 DoD) / Total Running Watts
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: DP & MRP PRICE LIST
           ===================================================================== */}
        {activeTab === 'price-list' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Official Prycal Price List (w.e.f. 1st October 2026)
                  </h2>
                  <p className="text-xs text-slate-600">
                    All 41 models with official Dealer Price (DP), MRP, and Margin details.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search model, Ah, application..."
                    value={priceSearch}
                    onChange={(e) => setPriceSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-slate-50 text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setPriceCategory('all')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                    priceCategory === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  All ({PRYCAL_PRICE_LIST.length})
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPriceCategory(cat)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                      priceCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Table */}
            <div className="bg-white rounded-xl border border-slate-300 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-800 text-white font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-3 py-2.5 text-left">Model</th>
                      <th className="px-3 py-2.5 text-left">Category</th>
                      <th className="px-3 py-2.5 text-left">Capacity</th>
                      <th className="px-3 py-2.5 text-left">Warranty</th>
                      <th className="px-3 py-2.5 text-right bg-blue-900/70 text-blue-200">Dealer Price (DP)</th>
                      <th className="px-3 py-2.5 text-right">MRP</th>
                      <th className="px-3 py-2.5 text-right text-emerald-300">Margin</th>
                      <th className="px-3 py-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {filteredPrices.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-500 font-sans">
                          No battery models match your search.
                        </td>
                      </tr>
                    ) : (
                      filteredPrices.map((item) => {
                        const marginAmount = item.mrp - item.dealerPrice;
                        const marginPercent = ((marginAmount / item.mrp) * 100).toFixed(1);
                        return (
                          <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                            <td className="px-3 py-2 font-bold font-sans text-slate-900">
                              {item.model}
                            </td>
                            <td className="px-3 py-2 text-slate-600 font-sans text-[11px]">
                              {item.category}
                            </td>
                            <td className="px-3 py-2 font-bold text-amber-700">
                              {item.capacity}
                            </td>
                            <td className="px-3 py-2 text-slate-600 font-sans text-[11px]">
                              {item.warranty}
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-blue-700 bg-blue-50/50">
                              ₹{item.dealerPrice.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right text-slate-600">
                              ₹{item.mrp.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-emerald-700">
                              ₹{marginAmount.toLocaleString()} ({marginPercent}%)
                            </td>
                            <td className="px-3 py-2 text-center font-sans">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedModelId(item.id);
                                  setSelectedCategory(item.category);
                                  setActiveTab('quote');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] rounded transition-colors cursor-pointer"
                              >
                                Quote
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          CLEAN SHOP FOOTER (NO GRAPHICS / NO PHOTO ASSETS)
         ========================================================================= */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto py-5 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="font-bold text-white">Shree Power Enterprises</div>
            <div className="text-[11px] text-slate-400">
              Shop No. 5, Adishakti-Kamal Apartments, Kushtadham Road, Sonanagar Chowk, Savedi, Ahilyanagar (Ahmednagar), Maharashtra - 414003
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Authorised Regional Distributor for Prycal Batteries · Dealers across Ahilyanagar District
            </div>
          </div>

          <div className="text-right text-[11px] shrink-0">
            <div className="text-slate-300 font-semibold">
              Sanjay Kulkarni: <a href="tel:+919422464766" className="text-amber-400 hover:underline">+91 94224 64766</a>
            </div>
            <div className="text-slate-300 font-semibold">
              Ruturaj Kulkarni: <a href="tel:+918805922623" className="text-amber-400 hover:underline">+91 88059 22623</a>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          PRINT SLIP MODAL & INVOICE RECEIPT (Captured by @media print)
         ========================================================================= */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-300">
            {/* Modal Control Toolbar (no-print) */}
            <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">Official Quotation Slip</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.print();
                    } catch (e) {
                      console.error('Print trigger error:', e);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt / PDF</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close print preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Receipt Paper Slip */}
            <div id="printable-receipt-slip" className="p-6 sm:p-8 bg-white text-slate-900 text-xs font-sans space-y-4">
              {/* Slip Header */}
              <div className="text-center pb-3 border-b-2 border-slate-900">
                <h2 className="text-xl font-black text-slate-950 tracking-wide uppercase">
                  Shree Power Enterprises
                </h2>
                <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                  Authorised Regional Distributor for Prycal Batteries · Savedi, Ahilyanagar
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Shop No. 5, Adishakti-Kamal Apts, Kushtadham Road, Sonanagar Chowk, Savedi, Ahilyanagar (Ahmednagar) - 414003
                </div>
                <div className="text-[11px] font-mono font-bold text-slate-900 mt-1">
                  Mob: +91 94224 64766 / +91 88059 22623 · UPI / Cash &amp; Carry
                </div>
              </div>

              {/* Estimate Meta & Client Info */}
              <div className="grid grid-cols-2 gap-4 text-xs pb-3 border-b border-slate-200">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Quoted To:</div>
                  <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                    {clientName.trim() || (clientType === 'dealer' ? 'Dealer Partner' : 'Counter Retail Customer')}
                  </div>
                  <div className="text-slate-600 font-mono text-[11px]">
                    {clientPhone.trim() ? `Mobile: ${clientPhone.trim()}` : 'Counter Walk-in / Direct Call'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Estimate Ref:</div>
                  <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                    {quoteRefId}
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-slate-100 text-slate-800 border border-slate-300">
                    {clientType === 'dealer' ? 'DEALER WHOLESALE' : `CUSTOMER RETAIL (${customerDiscountPercent}% OFF)`}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-hidden border border-slate-300 rounded-lg">
                <table className="min-w-full divide-y divide-slate-300 text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-800 text-[11px] uppercase">
                    <tr>
                      <th className="px-3 py-2 text-left">Description</th>
                      <th className="px-3 py-2 text-center">Warranty</th>
                      <th className="px-3 py-2 text-right">MRP</th>
                      <th className="px-3 py-2 text-right">Rate</th>
                      <th className="px-3 py-2 text-center">Qty</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr>
                      <td className="px-3 py-2.5 font-sans">
                        <div className="font-bold text-slate-900">Prycal {selectedProduct.model}</div>
                        <div className="text-[10px] text-slate-500">{selectedProduct.category} · {selectedProduct.capacity}</div>
                      </td>
                      <td className="px-3 py-2.5 text-center text-[10px] font-sans text-slate-600">{selectedProduct.warranty}</td>
                      <td className="px-3 py-2.5 text-right text-slate-400">₹{mrpPerUnit.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-right font-bold text-slate-900">₹{unitPriceCharged.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-center font-bold text-slate-900">{quantity}</td>
                      <td className="px-3 py-2.5 text-right font-bold text-slate-900">₹{totalBatteryAmount.toLocaleString()}</td>
                    </tr>
                    {selectedInverter.id !== 'none' && (
                      <tr>
                        <td className="px-3 py-2.5 font-sans">
                          <div className="font-bold text-slate-900">{selectedInverter.name}</div>
                          <div className="text-[10px] text-slate-500">{selectedInverter.type} · {selectedInverter.va}VA</div>
                        </td>
                        <td className="px-3 py-2.5 text-center text-[10px] font-sans text-slate-600">Standard</td>
                        <td className="px-3 py-2.5 text-right text-slate-400">—</td>
                        <td className="px-3 py-2.5 text-right font-bold text-slate-900">₹{inverterPrice.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-center font-bold text-slate-900">1</td>
                        <td className="px-3 py-2.5 text-right font-bold text-slate-900">₹{totalInverterAmount.toLocaleString()}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation Summary */}
              <div className="flex justify-end pt-1">
                <div className="w-72 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>₹{subtotalBeforeScrap.toLocaleString()}</span>
                  </div>

                  {clientType === 'customer' ? (
                    <div className="flex justify-between text-emerald-700 text-[11px]">
                      <span>Discount ({customerDiscountPercent}%):</span>
                      <span>-₹{(customerDiscountAmountPerUnit * quantity).toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-blue-700 text-[11px]">
                      <span>Pricing Basis:</span>
                      <span>Wholesale DP</span>
                    </div>
                  )}

                  {withOldBattery ? (
                    <div className="flex justify-between text-amber-800 font-semibold border-t border-slate-200 pt-1">
                      <span>Old Battery Scrap ({quantity}x):</span>
                      <span>-₹{totalScrapCredit.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-slate-500 text-[11px] border-t border-slate-200 pt-1">
                      <span>Old Battery Scrap:</span>
                      <span>Without Old (₹0)</span>
                    </div>
                  )}

                  <div className="flex justify-between font-black text-slate-950 text-base pt-2 border-t-2 border-slate-900">
                    <span className="font-sans">NET PAYABLE:</span>
                    <span className="text-amber-800">₹{finalTotalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Signatures */}
              <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-4 text-[10px] text-slate-600">
                <div>
                  <div className="font-bold text-slate-800 uppercase text-[10px]">Terms &amp; Conditions:</div>
                  <ul className="list-disc list-inside space-y-0.5 mt-0.5">
                    <li>Prices are inclusive of all taxes as applicable.</li>
                    <li>100% Genuine factory-fresh stock with official warranty card.</li>
                    <li>Payment Term: On Cash &amp; Carry / UPI basis.</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-end text-right">
                  <div className="font-bold text-slate-900">For Shree Power Enterprises</div>
                  <div className="text-[10px] text-slate-500 mt-6">(Authorised Signatory)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
