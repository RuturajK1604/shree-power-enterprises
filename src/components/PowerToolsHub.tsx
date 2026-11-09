import React, { useState, useId } from 'react';
import {
  Calculator,
  FileText,
  Zap,
  ShieldCheck,
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  RefreshCw,
  Tag,
  ChevronDown,
  Award,
  Search,
  Copy,
  Check,
  Printer,
  User,
  Store,
  Percent,
  Plus,
  Minus,
  SlidersHorizontal,
  Info,
  Sparkles,
} from 'lucide-react';
import { businessInfo } from '../data/businessData';
import { PRYCAL_PRICE_LIST, PrycalPriceItem } from '../data/prycalPrices';
import { BackupCalculatorModal, CALCULATION_CONSTANTS } from './BackupCalculatorModal';

interface PowerToolsHubProps {
  isCalculatorModalOpen?: boolean;
  onOpenCalculator?: () => void;
  onCloseCalculator?: () => void;
  initialTab?: 'get-quotation' | 'price-list' | 'calculate-backup';
}

const INVERTER_OPTIONS = [
  { id: 'none', name: 'None (Battery Only)', va: 0, price: 0 },
  { id: 'evo-s-1050', name: 'Luminous EVO S 1050 (Pure Sine Wave · 900VA / 756W)', va: 900, price: 6200 },
  { id: 'evo-s-1250', name: 'Luminous EVO S 1250 (Pure Sine Wave · 1100VA / 924W)', va: 1100, price: 7400 },
  { id: 'evo-d-1050', name: 'Luminous EVO D 1050 (Square Wave · 900VA / 756W)', va: 900, price: 5400 },
  { id: 'evo-d-1250', name: 'Luminous EVO D 1250 (Square Wave · 1100VA / 924W)', va: 1100, price: 6400 },
];

export const PowerToolsHub: React.FC<PowerToolsHubProps> = ({
  isCalculatorModalOpen: propIsModalOpen,
  onOpenCalculator,
  onCloseCalculator,
  initialTab = 'get-quotation',
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'get-quotation' | 'price-list' | 'calculate-backup'>(initialTab);
  const [localIsModalOpen, setLocalIsModalOpen] = useState(false);

  const isModalOpen = propIsModalOpen !== undefined ? propIsModalOpen : localIsModalOpen;
  const handleOpenModal = onOpenCalculator || (() => setLocalIsModalOpen(true));
  const handleCloseModal = onCloseCalculator || (() => setLocalIsModalOpen(false));

  // =========================================================================
  // QUOTATION CALCULATOR STATE (Dealer vs Customer, With/Without Old Battery)
  // =========================================================================
  const [clientType, setClientType] = useState<'dealer' | 'customer'>('customer');
  const [customerDiscountPercent, setCustomerDiscountPercent] = useState<number>(10); // Default 10% for customer as requested
  const [selectedCategory, setSelectedCategory] = useState<PrycalPriceItem['category'] | 'all'>('Inverter Tall Tubular');
  const [selectedModelId, setSelectedModelId] = useState<string>(
    PRYCAL_PRICE_LIST.find((p) => p.category === 'Inverter Tall Tubular' && p.capacityAh === 150)?.id || PRYCAL_PRICE_LIST[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [withOldBattery, setWithOldBattery] = useState<boolean>(true); // With or without old battery toggle
  const [customScrapCredit, setCustomScrapCredit] = useState<number | null>(null);
  const [selectedInverterId, setSelectedInverterId] = useState<string>('none');
  const [customInverterPrice, setCustomInverterPrice] = useState<number | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientLocation, setClientLocation] = useState<string>('Savedi / Ahilyanagar');
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  // =========================================================================
  // PRICE LIST TABLE STATE (Filter, Search & Sorting)
  // =========================================================================
  const [priceListSearch, setPriceListSearch] = useState<string>('');
  const [priceListCategory, setPriceListCategory] = useState<string>('all');

  // Currently selected product
  const selectedProduct = PRYCAL_PRICE_LIST.find((p) => p.id === selectedModelId) || PRYCAL_PRICE_LIST[0];

  // Inverter addition
  const selectedInverter = INVERTER_OPTIONS.find((inv) => inv.id === selectedInverterId) || INVERTER_OPTIONS[0];
  const inverterPrice = customInverterPrice !== null ? customInverterPrice : selectedInverter.price;

  // Scrap credit calculation
  const defaultScrapPerUnit = selectedProduct.typicalScrapCredit || 2000;
  const scrapCreditPerUnit = withOldBattery
    ? customScrapCredit !== null
      ? customScrapCredit
      : defaultScrapPerUnit
    : 0;
  const totalScrapCredit = scrapCreditPerUnit * quantity;

  // Base price per battery unit
  const mrpPerUnit = selectedProduct.mrp;
  const dpPerUnit = selectedProduct.dealerPrice;

  // Rate calculation according to Client Type:
  // - Dealer: Dealer Price (DP)
  // - Customer: MRP - Customer Discount % (default 10%, freely adjustable)
  const customerDiscountAmountPerUnit = Math.round(mrpPerUnit * (customerDiscountPercent / 100));
  const customerUnitPrice = mrpPerUnit - customerDiscountAmountPerUnit;

  const unitPriceCharged = clientType === 'dealer' ? dpPerUnit : customerUnitPrice;
  const totalBatteryAmount = unitPriceCharged * quantity;
  const totalInverterAmount = selectedInverter.id !== 'none' ? inverterPrice : 0;
  const subtotalBeforeScrap = totalBatteryAmount + totalInverterAmount;
  const finalTotalAmount = Math.max(0, subtotalBeforeScrap - totalScrapCredit);

  // Generate Quotation Reference
  const quoteRefId = `SPE-${clientType === 'dealer' ? 'DLR' : 'CUST'}-${selectedProduct.model.replace(/\s+/g, '')}`;

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    let msg = `*OFFICIAL QUOTATION - SHREE POWER ENTERPRISES*\n`;
    msg += `_Authorised Prycal Battery Regional Distributor · Ahilyanagar_\n`;
    msg += `Shop No. 5, Adishakti-Kamal Apts, Savedi | Mob: 9422464766\n`;
    msg += `------------------------------------\n`;
    msg += `*Quote Type:* ${clientType === 'dealer' ? '🏪 DEALER WHOLESALE (DP BASIS)' : '👤 CUSTOMER RETAIL'}\n`;
    if (clientName) msg += `*Client / Shop:* ${clientName}\n`;
    if (clientPhone) msg += `*Contact:* ${clientPhone}\n`;
    msg += `*Date:* ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n`;
    msg += `------------------------------------\n`;
    msg += `*BATTERY PARTICULARS:*\n`;
    msg += `• Model: *Prycal ${selectedProduct.model}*\n`;
    msg += `• Category: ${selectedProduct.category}\n`;
    msg += `• Capacity: ${selectedProduct.capacity}\n`;
    msg += `• Warranty: ${selectedProduct.warranty}\n`;
    msg += `• Official MRP: ₹${mrpPerUnit.toLocaleString()}\n`;

    if (clientType === 'dealer') {
      msg += `• *Dealer Price (DP):* ₹${dpPerUnit.toLocaleString()} / unit\n`;
      msg += `• Dealer Margin: ₹${(mrpPerUnit - dpPerUnit).toLocaleString()} (${(((mrpPerUnit - dpPerUnit) / mrpPerUnit) * 100).toFixed(1)}%)\n`;
    } else {
      msg += `• *Discount Applied:* ${customerDiscountPercent}% (-₹${customerDiscountAmountPerUnit.toLocaleString()})\n`;
      msg += `• *Discounted Offer Rate:* ₹${customerUnitPrice.toLocaleString()} / unit\n`;
    }

    msg += `• Quantity: ${quantity} Unit(s)\n`;
    msg += `• Battery Subtotal: ₹${totalBatteryAmount.toLocaleString()}\n`;

    if (selectedInverter.id !== 'none') {
      msg += `------------------------------------\n`;
      msg += `*INVERTER ADD-ON:*\n`;
      msg += `• Inverter: ${selectedInverter.name}\n`;
      msg += `• Inverter Price: ₹${inverterPrice.toLocaleString()}\n`;
    }

    msg += `------------------------------------\n`;
    if (withOldBattery) {
      msg += `*OLD BATTERY SCRAP EXCHANGE:*\n`;
      msg += `• Scrap Exchange Credit: -₹${totalScrapCredit.toLocaleString()} (${quantity} × ₹${scrapCreditPerUnit.toLocaleString()})\n`;
    } else {
      msg += `*Old Battery:* Without Old Battery (Fresh Purchase)\n`;
    }

    msg += `------------------------------------\n`;
    msg += `*FINAL TOTAL AMOUNT PAYABLE: ₹${finalTotalAmount.toLocaleString()}*\n`;
    msg += `------------------------------------\n`;
    msg += `_Terms: Prices inclusive of taxes. 100% genuine Prycal factory fresh stock with official manufacturer warranty card. Ready delivery in Ahilyanagar._\n`;
    msg += `*Contact Sanjay Kulkarni:* +91 94224 64766 / +91 88059 22623`;

    return msg;
  };

  const handleCopyQuote = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  const handlePrintQuote = () => {
    window.print();
  };

  // Category filter for quote selector
  const availableQuoteCategories = [
    'Inverter Tall Tubular',
    'Automotive',
    'Inverter Jumbo Tubular',
    'Solar Royal Tubular',
    'Solar Batteries C10',
    'Lithium Batteries',
  ] as const;

  const quoteCategoryProducts =
    selectedCategory === 'all'
      ? PRYCAL_PRICE_LIST
      : PRYCAL_PRICE_LIST.filter((p) => p.category === selectedCategory);

  // Price List Table Filtered
  const filteredPriceList = PRYCAL_PRICE_LIST.filter((item) => {
    const matchesCategory = priceListCategory === 'all' || item.category === priceListCategory;
    const matchesSearch =
      priceListSearch.trim() === '' ||
      item.model.toLowerCase().includes(priceListSearch.toLowerCase()) ||
      item.capacity.toLowerCase().includes(priceListSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(priceListSearch.toLowerCase()) ||
      item.applications.toLowerCase().includes(priceListSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="calculator" className="py-14 bg-slate-50 border-y border-slate-200 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Distributor Identity */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <Award className="w-4 h-4 text-amber-700" />
            Prycal Batteries Regional Distributor · Ahilyanagar District
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Distributor Pricing &amp; Quotation Engine
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Engineered for dealers, garages, and customers across Ahilyanagar. Check official <strong>Dealer Prices (DP) &amp; MRP</strong>, calculate instant custom quotations with or without scrap exchange, and configure custom discount percentages.
          </p>
        </div>

        {/* 3 Main Segmented Hub Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveMainTab('get-quotation')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeMainTab === 'get-quotation'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>1. Calculate Quote</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
                Dealer / Customer
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('price-list')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeMainTab === 'price-list'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2. Price List (DP &amp; MRP)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {PRYCAL_PRICE_LIST.length} SKUs
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('calculate-backup')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeMainTab === 'calculate-backup'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>3. Backup Sizer</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: CALCULATE QUOTE (DEALER OR CUSTOMER, WITH/WITHOUT OLD BATTERY)
           ========================================================================= */}
        {activeMainTab === 'get-quotation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {/* Top Banner: Client Mode Switcher */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mb-8 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block font-bold">
                      Step 1 · Choose Who You Are Quoting For
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                      {clientType === 'dealer'
                        ? '🏪 Dealer Wholesale Mode (DP Price Applied)'
                        : '👤 Customer Retail Mode (MRP with Configurable Discount)'}
                    </h3>
                  </div>

                  {/* Dealer vs Customer Toggle */}
                  <div className="inline-flex p-1.5 bg-slate-950 rounded-xl border border-slate-700 shrink-0">
                    <button
                      type="button"
                      onClick={() => setClientType('dealer')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        clientType === 'dealer'
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Dealer (Wholesale DP)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setClientType('customer')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        clientType === 'customer'
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Customer (Retail)</span>
                    </button>
                  </div>
                </div>

                {/* Customer Mode Discount Control Bar */}
                {clientType === 'customer' && (
                  <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-300 font-semibold">
                        Customer Discount from MRP:
                      </span>
                      <span className="text-amber-400 font-black font-mono text-sm">
                        {customerDiscountPercent}% OFF
                      </span>
                      <span className="text-[11px] text-slate-400">
                        (Default 10%, customize freely below)
                      </span>
                    </div>

                    {/* Presets and Custom Input */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-400 text-[11px]">Quick Presets:</span>
                      {[10, 12, 15, 18, 20].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setCustomerDiscountPercent(pct)}
                          className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                            customerDiscountPercent === pct
                              ? 'bg-amber-400 text-slate-950 shadow-xs'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}

                      {/* Custom Input */}
                      <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 ml-1">
                        <label htmlFor="customPct" className="text-[10px] text-slate-400 uppercase">
                          Custom:
                        </label>
                        <input
                          id="customPct"
                          type="number"
                          min={0}
                          max={50}
                          value={customerDiscountPercent}
                          onChange={(e) => setCustomerDiscountPercent(Math.max(0, Math.min(60, Number(e.target.value))))}
                          className="w-12 bg-transparent text-amber-300 font-mono font-bold text-xs text-center focus:outline-none"
                        />
                        <span className="text-slate-400 text-xs">%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quotation Builder Layout (2 Columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Controls Column */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Category Pills */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      2. Select Battery Category:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          selectedCategory === 'all'
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        All Categories ({PRYCAL_PRICE_LIST.length})
                      </button>
                      {availableQuoteCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            const first = PRYCAL_PRICE_LIST.find((p) => p.category === cat);
                            if (first) setSelectedModelId(first.id);
                          }}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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

                  {/* Battery Model Selector Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        3. Select Battery Model ({quoteCategoryProducts.length} models):
                      </label>
                      <span className="text-[11px] text-amber-800 font-mono font-semibold">
                        Selected: {selectedProduct.model}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 border border-slate-200 p-2 rounded-xl bg-slate-50/50">
                      {quoteCategoryProducts.map((item) => {
                        const isSelected = selectedModelId === item.id;
                        const itemDiscounted = Math.round(item.mrp * (1 - customerDiscountPercent / 100));
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedModelId(item.id)}
                            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-1 ring-amber-400'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-black text-slate-900">{item.model}</span>
                                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                  {item.capacity}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                {item.warranty} · {item.category}
                              </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                              {clientType === 'dealer' ? (
                                <>
                                  <span className="text-slate-400 text-[11px]">
                                    MRP: ₹{item.mrp.toLocaleString()}
                                  </span>
                                  <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                                    DP: ₹{item.dealerPrice.toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-slate-400 line-through text-[11px]">
                                    ₹{item.mrp.toLocaleString()}
                                  </span>
                                  <span className="font-bold text-emerald-700">
                                    ₹{itemDiscounted.toLocaleString()} ({customerDiscountPercent}%)
                                  </span>
                                </>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity & Old Battery Toggle Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Quantity Selector */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                        4. Quantity:
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="p-2 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                            className="w-14 text-center text-sm font-bold font-mono text-slate-900 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="p-2 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {quantity === 1 ? 'Single Unit' : `${quantity} Units (${clientType === 'dealer' ? 'Bulk Wholesale' : 'Multi-Unit'})`}
                        </span>
                      </div>
                    </div>

                    {/* With or Without Old Battery Toggle */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                        5. Old Battery Scrap Exchange:
                      </label>
                      <div className="inline-flex p-1 bg-white rounded-lg border border-slate-200 w-full">
                        <button
                          type="button"
                          onClick={() => setWithOldBattery(true)}
                          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            withOldBattery
                              ? 'bg-amber-400 text-slate-950 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          With Old Battery
                        </button>
                        <button
                          type="button"
                          onClick={() => setWithOldBattery(false)}
                          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            !withOldBattery
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Without Old Battery
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* If With Old Battery: Configurable Scrap Credit */}
                  {withOldBattery && (
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-amber-700 shrink-0" />
                          <span className="text-xs font-bold text-amber-900">
                            Scrap Deduction per Battery:
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-800">
                            ₹{scrapCreditPerUnit.toLocaleString()} × {quantity} = -₹{totalScrapCredit.toLocaleString()}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCustomScrapCredit(defaultScrapPerUnit)}
                            className="text-[10px] text-amber-700 underline font-medium cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      {/* Custom Scrap input */}
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span className="text-slate-600 text-[11px]">Edit Scrap Credit:</span>
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-amber-300">
                          <span className="text-slate-400">₹</span>
                          <input
                            type="number"
                            step={100}
                            min={0}
                            max={10000}
                            value={scrapCreditPerUnit}
                            onChange={(e) => setCustomScrapCredit(Number(e.target.value))}
                            className="w-20 text-xs font-mono font-bold text-slate-900 focus:outline-none"
                          />
                        </div>
                        <span className="text-[11px] text-slate-500">
                          (Standard for {selectedProduct.capacity}: ₹{defaultScrapPerUnit.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Optional Inverter Add-On Selector */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      6. Add Inverter Combo (Optional):
                    </label>
                    <select
                      value={selectedInverterId}
                      onChange={(e) => {
                        setSelectedInverterId(e.target.value);
                        setCustomInverterPrice(null);
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                    >
                      {INVERTER_OPTIONS.map((inv) => (
                        <option key={inv.id} value={inv.id}>
                          {inv.name} {inv.price > 0 ? `(Est: ₹${inv.price.toLocaleString()})` : ''}
                        </option>
                      ))}
                    </select>

                    {selectedInverterId !== 'none' && (
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span className="text-slate-600">Inverter Price (₹):</span>
                        <input
                          type="number"
                          step={100}
                          value={inverterPrice}
                          onChange={(e) => setCustomInverterPrice(Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                        />
                        <span className="text-[11px] text-slate-500">
                          (Included in final quote amount)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Optional Client Name & Phone for Invoice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        {clientType === 'dealer' ? 'Dealer / Garage Shop Name:' : 'Customer Name:'}
                      </label>
                      <input
                        type="text"
                        placeholder={clientType === 'dealer' ? 'e.g. M/s Omkar Auto, Rahuri' : 'e.g. Sanjay Patil'}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Mobile Number:
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 94224xxxxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Official Quotation Bill Preview */}
                <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
                  <div>
                    {/* Quotation Header */}
                    <div className="pb-4 border-b border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {quoteRefId}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-black text-white">
                          Shree Power Enterprises
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Authorised Prycal Battery Distributor · Ahilyanagar
                        </p>
                      </div>

                      {/* Client Type Badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-slate-800 border border-slate-700">
                        {clientType === 'dealer' ? (
                          <>
                            <Store className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-blue-300">DEALER WHOLESALE (DP BASIS)</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">CUSTOMER RETAIL ({customerDiscountPercent}% OFF)</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Selected Item Detail */}
                    <div className="my-4 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-white text-sm">
                          Prycal {selectedProduct.model}
                        </span>
                        <span className="text-amber-400 font-mono font-bold">
                          {selectedProduct.capacity}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Warranty: {selectedProduct.warranty}</span>
                        <span>Qty: {quantity}</span>
                      </div>
                      {selectedInverter.id !== 'none' && (
                        <div className="text-[11px] text-blue-300 pt-1 border-t border-slate-700/60">
                          + {selectedInverter.name}
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown Calculation */}
                    <div className="space-y-2 text-xs font-mono">
                      {/* Official MRP */}
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Official MRP ({quantity} × ₹{mrpPerUnit.toLocaleString()}):</span>
                        <span className="line-through">₹{(mrpPerUnit * quantity).toLocaleString()}</span>
                      </div>

                      {/* Dealer vs Customer Price Display */}
                      {clientType === 'dealer' ? (
                        <>
                          <div className="flex items-center justify-between text-blue-400">
                            <span>Dealer Price (DP):</span>
                            <span>₹{dpPerUnit.toLocaleString()} / unit</span>
                          </div>
                          <div className="flex items-center justify-between text-emerald-400 text-[11px]">
                            <span>Dealer Gross Margin:</span>
                            <span>₹{((mrpPerUnit - dpPerUnit) * quantity).toLocaleString()}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-emerald-400">
                            <span>Discount Applied ({customerDiscountPercent}%):</span>
                            <span>-₹{(customerDiscountAmountPerUnit * quantity).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span>Discounted Rate:</span>
                            <span>₹{customerUnitPrice.toLocaleString()} / unit</span>
                          </div>
                        </>
                      )}

                      {/* Inverter Subtotal if selected */}
                      {selectedInverter.id !== 'none' && (
                        <div className="flex items-center justify-between text-blue-300 pt-1 border-t border-slate-800">
                          <span>Inverter Combo Price:</span>
                          <span>+₹{inverterPrice.toLocaleString()}</span>
                        </div>
                      )}

                      {/* Subtotal */}
                      <div className="flex items-center justify-between text-white font-bold pt-1 border-t border-slate-800">
                        <span>Subtotal (Before Scrap):</span>
                        <span>₹{subtotalBeforeScrap.toLocaleString()}</span>
                      </div>

                      {/* Old Battery Scrap Exchange Deduction */}
                      {withOldBattery ? (
                        <div className="flex items-center justify-between text-amber-400 font-bold">
                          <span>Scrap Battery Exchange ({quantity}x):</span>
                          <span>-₹{totalScrapCredit.toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span>Old Battery:</span>
                          <span>Without Old Battery (₹0 Scrap)</span>
                        </div>
                      )}

                      {/* FINAL NET TOTAL PAYABLE */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-transparent border-2 border-amber-400/40 text-center">
                        <div className="text-[11px] font-sans text-amber-200 uppercase tracking-wider font-bold">
                          Total Amount Payable
                        </div>
                        <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 mt-1">
                          ₹{finalTotalAmount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-300 mt-1 font-sans">
                          {withOldBattery ? 'Net amount including scrap exchange credit' : 'Net amount without scrap exchange'}
                        </div>
                      </div>
                    </div>

                    {/* Guarantees */}
                    <div className="mt-4 space-y-1.5 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>All prices inclusive of taxes · Payment: Cash &amp; Carry / UPI</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Factory fresh stock with official Prycal manufacturer warranty</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: WhatsApp Share, Copy, Print */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950" />
                      Send Quotation on WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleCopyQuote}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedQuote ? 'Copied!' : 'Copy Text'}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrintQuote}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Quote
                      </button>
                    </div>

                    <a
                      href={`tel:${businessInfo.contacts[0].phone}`}
                      className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Phone className="w-3 h-3 text-amber-400" />
                      Call Sanjay Kulkarni: +91 94224 64766
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: OFFICIAL PRYCAL PRICE LIST (DP & MRP TABLE - ALL 41 MODELS)
           ========================================================================= */}
        {activeMainTab === 'price-list' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                      Official Price List · w.e.f. 1st October 2026
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Ahilyanagar District
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                    Prycal Battery Models: Dealer Price (DP) &amp; MRP
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Complete price directory with dealer margins. Click <strong>"Quote"</strong> on any battery to calculate an instant quote with old battery exchange.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Price List
                  </button>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by model or capacity (e.g. 150, TT, 700, Lithium)..."
                    value={priceListSearch}
                    onChange={(e) => setPriceListSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'Inverter Tall Tubular', label: 'Tall Tubular' },
                    { id: 'Automotive', label: 'Automotive' },
                    { id: 'Inverter Jumbo Tubular', label: 'Jumbo Tubular' },
                    { id: 'Solar Royal Tubular', label: 'Solar Royal' },
                    { id: 'Solar Batteries C10', label: 'Solar C10' },
                    { id: 'Lithium Batteries', label: 'Lithium' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setPriceListCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap cursor-pointer ${
                        priceListCategory === cat.id
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Table with DP and MRP */}
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-black uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-3.5 py-3 text-left">Battery Model</th>
                      <th className="px-3.5 py-3 text-left">Category</th>
                      <th className="px-3.5 py-3 text-left">Capacity (Ah)</th>
                      <th className="px-3.5 py-3 text-left">Warranty</th>
                      <th className="px-3.5 py-3 text-right bg-blue-50/70 text-blue-900 border-x border-blue-100">
                        Dealer Price (DP)
                      </th>
                      <th className="px-3.5 py-3 text-right">Official MRP</th>
                      <th className="px-3.5 py-3 text-right text-emerald-800">
                        Dealer Margin
                      </th>
                      <th className="px-3.5 py-3 text-center">Quote Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white font-mono text-[11px]">
                    {filteredPriceList.map((item) => {
                      const dealerMargin = item.mrp - item.dealerPrice;
                      const dealerMarginPct = ((dealerMargin / item.mrp) * 100).toFixed(1);

                      return (
                        <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                          <td className="px-3.5 py-2.5 font-bold font-sans text-slate-900 whitespace-nowrap">
                            {item.model}
                          </td>
                          <td className="px-3.5 py-2.5 font-sans text-slate-600 whitespace-nowrap">
                            {item.category}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-800">
                            {item.capacity}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-600 font-sans whitespace-nowrap">
                            {item.warranty}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-black text-blue-800 bg-blue-50/40 border-x border-blue-100">
                            ₹{item.dealerPrice.toLocaleString()}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-bold text-slate-900">
                            ₹{item.mrp.toLocaleString()}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-bold text-emerald-700">
                            ₹{dealerMargin.toLocaleString()}{' '}
                            <span className="text-[10px] text-emerald-600 font-normal font-sans">
                              ({dealerMarginPct}%)
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory(item.category);
                                setSelectedModelId(item.id);
                                setActiveMainTab('get-quotation');
                                window.scrollTo({ top: document.getElementById('calculator')?.offsetTop, behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-sans font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg shadow-2xs transition-colors cursor-pointer"
                            >
                              <Calculator className="w-3 h-3" />
                              Quote
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Price List Terms Note from Official Sheet */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                  Terms of Business (Shree Power Enterprises):
                </span>
                <p>1) Price list is inclusive of all taxes as applicable.</p>
                <p>2) Warranty terms will be as per mentioned in the warranty card.</p>
                <p>3) All prices are Ex. Ahilyanagar, transportation will be extra as applicable for outstation deliveries.</p>
                <p>4) PAYMENT TERM: ON CASH &amp; CARRY BASIS.</p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: INVERTER BACKUP SIZER (Popup Modal Trigger & Electrical Standards)
           ========================================================================= */}
        {activeMainTab === 'calculate-backup' && (
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    Open Backup Calculator Pop-Up
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleOpenModal}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-amber-600" />
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
      </div>

      {/* Pop-up Modal for Calculate Backup */}
      <BackupCalculatorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
