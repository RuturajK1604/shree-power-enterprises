import React, { useState } from 'react';
import { Car, Truck, Check, Phone, MessageCircle, Shield, Award } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface VehicleOption {
  category: 'car' | 'suv' | 'commercial' | 'tractor';
  brand: string;
  model: string;
  fuel: string;
  recommendedAh: string;
  recommendedModelPrycal: string;
  warranty: string;
  scrapDiscount: string;
  features: string;
}

const VEHICLE_DATABASE: VehicleOption[] = [
  // 1. Hatchbacks & Small Cars
  {
    category: 'car',
    brand: 'Maruti Suzuki',
    model: 'Swift / Dzire / WagonR / Celerio / Alto K10',
    fuel: 'Petrol / CNG',
    recommendedAh: '35 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 40Z/L (35Ah, MRP ₹4,190)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹1,800',
    features: 'High CCA calcium alloy plates for instant city starts with zero maintenance sealed lid.',
  },
  {
    category: 'car',
    brand: 'Hyundai',
    model: 'Grand i10 / i20 / Aura / Santro',
    fuel: 'Petrol / Diesel',
    recommendedAh: '35 Ah – 45 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 45ZL (45Ah, MRP ₹6,084)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,100',
    features: 'Exact fitment with magic eye charge indicator and high cold cranking amps.',
  },
  {
    category: 'car',
    brand: 'Tata',
    model: 'Tiago / Tigor / Altroz / Punch',
    fuel: 'Petrol / CNG',
    recommendedAh: '35 Ah – 45 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 45ZL (45Ah, MRP ₹6,084)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,100',
    features: 'Engineered for stop-and-go driving with robust flame arrestor for safety.',
  },
  {
    category: 'car',
    brand: 'Skoda & Volkswagen',
    model: 'Slavia / Kushaq / Virtus / Taigun / Polo',
    fuel: 'Petrol TSI',
    recommendedAh: '50 Ah – 60 Ah (12V DIN)',
    recommendedModelPrycal: 'Prycal DIN 60R/L (60Ah, MRP ₹6,996)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,400',
    features: 'European DIN standard recessed terminal profile preventing tray clearance issues.',
  },

  // 2. SUVs & Diesel MUVs
  {
    category: 'suv',
    brand: 'Mahindra',
    model: 'Scorpio / Bolero / Thar / XUV700 Diesel',
    fuel: 'Diesel',
    recommendedAh: '65 Ah – 80 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 700R/L (65Ah, MRP ₹6,976) / PN 80 (80Ah, MRP ₹8,222)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,600',
    features: 'Massive cold cranking current built for high-compression mHawk diesel engines.',
  },
  {
    category: 'suv',
    brand: 'Toyota',
    model: 'Innova Crysta / Fortuner / Hycross',
    fuel: 'Diesel / Petrol',
    recommendedAh: '65 Ah – 80 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 80 (80Ah, MRP ₹8,222) / PN 700R/L (65Ah, MRP ₹6,976)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,800',
    features: 'Heavy duty plate construction built for continuous touring and multi-accessory loads.',
  },
  {
    category: 'suv',
    brand: 'Tata',
    model: 'Harrier / Safari / Nexon Diesel',
    fuel: 'Diesel',
    recommendedAh: '65 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 700R/L (65Ah, MRP ₹6,976)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,600',
    features: 'Vibration resistant container and low internal resistance for instant starting torque.',
  },

  // 3. Commercial Vehicles
  {
    category: 'commercial',
    brand: 'Mahindra & Tata',
    model: 'Bolero Camper / Maxi Truck / Tata Ace / Intra',
    fuel: 'Diesel / CNG',
    recommendedAh: '65 Ah – 80 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 700R/L (65Ah, MRP ₹6,976) / PN 80 (80Ah, MRP ₹8,222)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹2,600',
    features: 'Rugged commercial design built to withstand bumpy rural roads and continuous commercial duty.',
  },
  {
    category: 'commercial',
    brand: 'Tata & Ashok Leyland',
    model: '407 / 709 / Ecomet / 1613 Heavy Truck',
    fuel: 'Diesel',
    recommendedAh: '120 Ah – 150 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 120 (120Ah, MRP ₹11,761) / PN 150 (150Ah, MRP ₹14,151)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹3,800',
    features: 'Extra heavy container with glass mat protection against electrolyte shedding in heavy transport.',
  },

  // 4. Agricultural Tractors
  {
    category: 'tractor',
    brand: 'Mahindra & Swaraj',
    model: 'Mahindra 575 DI / 475 / Swaraj 744 / 855 FE',
    fuel: 'Diesel',
    recommendedAh: '88 Ah – 100 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 100 (100Ah, MRP ₹9,929) / PN 90 (90Ah, MRP ₹9,081)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹3,500',
    features: 'Reinforced polypropylene casing and high vibration resistance for mud plowing and threshing.',
  },
  {
    category: 'tractor',
    brand: 'John Deere & Massey Ferguson',
    model: 'John Deere 5050D / Massey 241 DI / Farmtrac',
    fuel: 'Diesel',
    recommendedAh: '88 Ah – 100 Ah (12V)',
    recommendedModelPrycal: 'Prycal PN 100 (100Ah, MRP ₹9,929)',
    warranty: '36 Months (18 Free + 18 Pro-rata)',
    scrapDiscount: 'Up to ₹3,500',
    features: 'High starting torque on cold winter mornings with thick cast grids.',
  },
];

export const VehicleBatteryFinder: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'car' | 'suv' | 'commercial' | 'tractor'>('car');
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number>(0);

  const filteredVehicles = VEHICLE_DATABASE.filter((v) => v.category === selectedCategory);
  const currentVehicle = filteredVehicles[selectedVehicleIndex] || filteredVehicles[0];

  const handleCategoryChange = (cat: 'car' | 'suv' | 'commercial' | 'tractor') => {
    setSelectedCategory(cat);
    setSelectedVehicleIndex(0);
  };

  const getWhatsAppFitmentLink = () => {
    const text = `Hello Shree Power Enterprises, I need a replacement battery for my ${currentVehicle.brand} ${currentVehicle.model} (${currentVehicle.fuel}).\nRecommended size: ${currentVehicle.recommendedAh}.\nRecommended Prycal battery: ${currentVehicle.recommendedModelPrycal}.\n\nPlease let me know availability and doorstep installation details in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="vehicle-finder" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            Vehicle Battery Lookup
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find the Exact Prycal Battery for Your Vehicle
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Instant recommendation with Ah rating, authorized Prycal options, and old battery exchange value in Ahilyanagar.
          </p>
        </div>

        {/* Category Segmented Control (No 2-Wheelers) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-xs max-w-full overflow-x-auto">
            <button
              onClick={() => handleCategoryChange('car')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'car'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4 text-amber-600" />
              Cars &amp; Hatchbacks
            </button>
            <button
              onClick={() => handleCategoryChange('suv')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'suv'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4 text-amber-600" />
              SUVs &amp; Diesel MUVs
            </button>
            <button
              onClick={() => handleCategoryChange('commercial')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'commercial'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4 text-amber-600" />
              Commercial Trucks &amp; Pickups
            </button>
            <button
              onClick={() => handleCategoryChange('tractor')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'tractor'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              Agricultural Tractors
            </button>
          </div>
        </div>

        {/* Model Selector & Result Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Models List */}
          <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
              Select Your Vehicle Model:
            </div>
            <div className="space-y-2">
              {filteredVehicles.map((vehicle, index) => (
                <button
                  key={`${vehicle.brand}-${vehicle.model}`}
                  onClick={() => setSelectedVehicleIndex(index)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                    selectedVehicleIndex === index
                      ? 'border-amber-500 bg-white shadow-xs font-semibold text-slate-900'
                      : 'border-slate-200 bg-white/60 hover:bg-white text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs text-amber-700 font-bold">{vehicle.brand}</div>
                    <div className="text-sm font-medium">{vehicle.model}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {vehicle.fuel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Showcase Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Recommended For
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentVehicle.brand} {currentVehicle.model}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-sans">Required Rating</span>
                <span className="text-base font-extrabold font-mono text-slate-900">
                  {currentVehicle.recommendedAh}
                </span>
              </div>
            </div>

            {/* Official Prycal Battery Option */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border-2 border-amber-400/80 bg-amber-50/40 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Prycal Automotive (Authorised Distributor Option)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                    Old Battery Exchange: {currentVehicle.scrapDiscount}
                  </span>
                </div>

                <div className="text-base font-bold text-slate-900 mb-1">
                  {currentVehicle.recommendedModelPrycal}
                </div>

                <p className="text-xs text-slate-600 mb-3">
                  {currentVehicle.features}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-2 border-t border-amber-200/60">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    Warranty: {currentVehicle.warranty}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold">
                    Free Doorstep Installation
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Free computerized battery conductance &amp; alternator test included in Savedi &amp; Ahilyanagar.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${businessInfo.contacts[0].phone}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Shop
                </a>
                <a
                  href={getWhatsAppFitmentLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Check Price &amp; Book Fitment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
