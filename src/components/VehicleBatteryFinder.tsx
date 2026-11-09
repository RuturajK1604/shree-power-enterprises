import React, { useState } from 'react';
import { Bike, Car, Truck, Check, Phone, MessageCircle, Shield, Award } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface VehicleOption {
  category: 'two-wheeler' | 'car' | 'suv' | 'tractor';
  brand: string;
  model: string;
  fuel: string;
  recommendedAh: string;
  recommendedModelPrycal: string;
  recommendedModelExide: string;
  warranty: string;
  scrapDiscount: string;
  features: string;
}

const VEHICLE_DATABASE: VehicleOption[] = [
  // Two Wheelers
  {
    category: 'two-wheeler',
    brand: 'Honda',
    model: 'Activa 3G/4G/5G/6G / Dio',
    fuel: 'Petrol',
    recommendedAh: '3Ah / 5Ah (12V)',
    recommendedModelPrycal: 'Prycal Rider Pro PR-4LB / 5LB',
    recommendedModelExide: 'Exide Xplore 12XL5L-B / FXL0-XLTZ4',
    warranty: '48 Months (24+24)',
    scrapDiscount: 'Up to ₹500',
    features: 'High cranking current for instant cold self-start, spill-proof AGM design.',
  },
  {
    category: 'two-wheeler',
    brand: 'Hero',
    model: 'Splendor / HF Deluxe / Passion Pro',
    fuel: 'Petrol',
    recommendedAh: '2.5Ah / 4Ah (12V)',
    recommendedModelPrycal: 'Prycal Rider Pro PR-2.5LC',
    recommendedModelExide: 'Exide Xplore 12XL2.5L-C',
    warranty: '48 Months (24+24)',
    scrapDiscount: 'Up to ₹450',
    features: 'Compact lightweight fitment for commuter bikes with low self-discharge.',
  },
  {
    category: 'two-wheeler',
    brand: 'Bajaj',
    model: 'Pulsar 150/180/220 / Avenger',
    fuel: 'Petrol',
    recommendedAh: '9Ah / 5Ah (12V)',
    recommendedModelPrycal: 'Prycal Rider Pro PR-9B Heavy-Duty',
    recommendedModelExide: 'Exide Xplore 12XL9-B',
    warranty: '48 Months (24+24)',
    scrapDiscount: 'Up to ₹600',
    features: 'Heavy duty cranking for high-displacement twin-spark engines and digital instrument clusters.',
  },
  {
    category: 'two-wheeler',
    brand: 'Royal Enfield',
    model: 'Classic 350 / Bullet / Meteor / Hunter',
    fuel: 'Petrol',
    recommendedAh: '14Ah / 12Ah (12V)',
    recommendedModelPrycal: 'Prycal Bullet Cruiser Pro 14Ah',
    recommendedModelExide: 'Exide Xplore 12XL14L-A2',
    warranty: '48 Months (24+24)',
    scrapDiscount: 'Up to ₹700',
    features: 'High torque cranking power built to handle high vibration and long highway rides.',
  },

  // Hatchback & Small Cars
  {
    category: 'car',
    brand: 'Maruti Suzuki',
    model: 'Swift / Dzire / WagonR / Celerio / Alto K10',
    fuel: 'Petrol / CNG',
    recommendedAh: '35 Ah (12V)',
    recommendedModelPrycal: 'Prycal DriveMax PM-35R (Right/Left terminal)',
    recommendedModelExide: 'Exide Epiq EPIQ35 / Mileage FML0-ML38B20R',
    warranty: '48 – 72 Months',
    scrapDiscount: 'Up to ₹1,800',
    features: 'Calcium-silver alloy plates for long life under frequent city engine starts.',
  },
  {
    category: 'car',
    brand: 'Hyundai',
    model: 'Grand i10 / i20 / Aura / Santro',
    fuel: 'Petrol / Diesel',
    recommendedAh: '35 Ah – 45 Ah (12V)',
    recommendedModelPrycal: 'Prycal DriveMax PM-45L / PM-35R',
    recommendedModelExide: 'Exide Mileage ML40B20L / ML45D21L',
    warranty: '48 – 66 Months',
    scrapDiscount: 'Up to ₹1,900',
    features: 'Exact OEM fitment for Japanese/Korean terminal configurations with magic eye charge indicator.',
  },
  {
    category: 'car',
    brand: 'Tata',
    model: 'Tiago / Tigor / Altroz / Punch',
    fuel: 'Petrol / CNG',
    recommendedAh: '35 Ah – 45 Ah (12V)',
    recommendedModelPrycal: 'Prycal DriveMax PM-45L',
    recommendedModelExide: 'Exide Epiq 45 / Mileage 45L',
    warranty: '48 – 72 Months',
    scrapDiscount: 'Up to ₹1,850',
    features: 'Vibration resistant container for high safety and seamless start-stop operations.',
  },

  // SUV & MUV
  {
    category: 'suv',
    brand: 'Mahindra',
    model: 'Scorpio Classic / Scorpio-N / Bolero / Thar',
    fuel: 'Diesel (mHawk/CRDe)',
    recommendedAh: '65 Ah – 80 Ah (12V)',
    recommendedModelPrycal: 'Prycal UltraTorque PM-65D / PM-80D',
    recommendedModelExide: 'Exide Mileage ML65D26R / Matrix MT70D26R',
    warranty: '60 – 72 Months',
    scrapDiscount: 'Up to ₹2,500',
    features: 'High Cold Cranking Amperes (CCA 580+) ensures quick cold starts on powerful diesel engines.',
  },
  {
    category: 'suv',
    brand: 'Toyota',
    model: 'Innova / Crysta / Fortuner',
    fuel: 'Diesel / Petrol',
    recommendedAh: '65 Ah – 80 Ah (12V)',
    recommendedModelPrycal: 'Prycal UltraTorque PM-80D26L',
    recommendedModelExide: 'Exide Mileage ML80D26L',
    warranty: '60 Months',
    scrapDiscount: 'Up to ₹2,600',
    features: 'High reserve capacity to power automatic transmissions, infotainment, and dual ACs.',
  },
  {
    category: 'suv',
    brand: 'Tata',
    model: 'Harrier / Safari / Nexon Diesel',
    fuel: 'Diesel',
    recommendedAh: '65 Ah – 70 Ah (12V)',
    recommendedModelPrycal: 'Prycal UltraTorque PM-65L DIN',
    recommendedModelExide: 'Exide Epiq DIN65 / Mileage DIN70',
    warranty: '60 – 72 Months',
    scrapDiscount: 'Up to ₹2,400',
    features: 'European DIN standard casing with recessed terminals for modern SUV engine bays.',
  },

  // Commercial & Tractor
  {
    category: 'tractor',
    brand: 'Mahindra / Swaraj',
    model: 'Mahindra 575 DI / 275 DI / Swaraj 744 FE',
    fuel: 'Diesel',
    recommendedAh: '88 Ah – 100 Ah (12V)',
    recommendedModelPrycal: 'Prycal KisanShakti PK-100 Heavy Duty',
    recommendedModelExide: 'Exide Jai Kisan JK88 / JK1000',
    warranty: '36 – 48 Months',
    scrapDiscount: 'Up to ₹3,500',
    features: 'Heavy duty thick plates protected against field mud, engine thrum, and harsh agricultural weather.',
  },
  {
    category: 'tractor',
    brand: 'John Deere / Eicher / Massey',
    model: 'John Deere 5050D / Massey 241 / Eicher 380',
    fuel: 'Diesel',
    recommendedAh: '88 Ah – 100 Ah (12V)',
    recommendedModelPrycal: 'Prycal KisanShakti PK-100',
    recommendedModelExide: 'Exide Jai Kisan Heavy Cranking',
    warranty: '36 – 48 Months',
    scrapDiscount: 'Up to ₹3,500',
    features: 'Reinforced ribbed container with anchor bonded plate elements to withstand extreme farm vibration.',
  },
];

export const VehicleBatteryFinder: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'two-wheeler' | 'car' | 'suv' | 'tractor'>('two-wheeler');
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number>(0);

  const filteredVehicles = VEHICLE_DATABASE.filter((v) => v.category === selectedCategory);
  const currentVehicle = filteredVehicles[selectedVehicleIndex] || filteredVehicles[0];

  const handleCategoryChange = (cat: 'two-wheeler' | 'car' | 'suv' | 'tractor') => {
    setSelectedCategory(cat);
    setSelectedVehicleIndex(0);
  };

  const getWhatsAppFitmentLink = () => {
    const text = `Hello Shree Power Enterprises, I need a replacement battery for my ${currentVehicle.brand} ${currentVehicle.model} (${currentVehicle.fuel}).\nRecommended size: ${currentVehicle.recommendedAh}.\n\nPlease let me know your best price with old battery exchange and availability for installation in Ahilyanagar.`;
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
            Find the Exact Battery for Your Vehicle
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Instant recommendation with Ah rating, authorized Prycal &amp; Exide options, and old battery exchange value in Ahilyanagar.
          </p>
        </div>

        {/* Category Segmented Control */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-xs max-w-full overflow-x-auto">
            <button
              onClick={() => handleCategoryChange('two-wheeler')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'two-wheeler'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bike className="w-4 h-4 text-amber-600" />
              Bikes &amp; Scooters
            </button>
            <button
              onClick={() => handleCategoryChange('car')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'car'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4 text-amber-600" />
              Cars &amp; Hatchbacks
            </button>
            <button
              onClick={() => handleCategoryChange('suv')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'suv'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4 text-amber-600" />
              SUVs &amp; Diesel MUVs
            </button>
            <button
              onClick={() => handleCategoryChange('tractor')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'tractor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              Tractors &amp; Fleets
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
              {filteredVehicles.map((veh, index) => (
                <button
                  key={`${veh.brand}-${veh.model}`}
                  onClick={() => setSelectedVehicleIndex(index)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                    selectedVehicleIndex === index
                      ? 'border-amber-500 bg-white shadow-xs'
                      : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold text-amber-700">{veh.brand}</div>
                    <div className="text-sm font-bold text-slate-900">{veh.model}</div>
                    <div className="text-xs text-slate-500">{veh.fuel}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 text-xs font-mono font-bold text-slate-800 bg-slate-100 rounded border border-slate-200">
                      {veh.recommendedAh}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-50/70 rounded-lg border border-amber-200/60 text-xs text-amber-900">
              <span className="font-semibold">Don’t see your exact model?</span> Call Sanjay Kulkarni (+91 94224 64766) or visit our Savedi shop for an on-the-spot vehicle alternator check and fitment recommendation.
            </div>
          </div>

          {/* Detailed Battery Fitment Recommendation */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                  Recommended Fitment
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {currentVehicle.brand} {currentVehicle.model}
                </h3>
              </div>
              <div className="self-start sm:self-auto px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold rounded border border-emerald-200">
                100% In-Stock at Savedi
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Capacity Needed</div>
                <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                  {currentVehicle.recommendedAh}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Warranty Coverage</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {currentVehicle.warranty}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200">
                <div className="text-xs text-amber-800">Old Battery Scrap Credit</div>
                <div className="text-base font-bold text-amber-900 mt-0.5">
                  {currentVehicle.scrapDiscount}
                </div>
              </div>
            </div>

            {/* Direct Model Recommendations */}
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                      Authorized Brand
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {currentVehicle.recommendedModelPrycal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Direct authorized distributor supply with factory-fresh manufacturing date &amp; priority replacement guarantee.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap">
                  ✓ Best Value
                </span>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                      Authorized Dealer
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {currentVehicle.recommendedModelExide}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Exide national warranty with paperless warranty registration and dealer support.
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                  ✓ OEM Spec
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800">Our Installation Commitment:</strong> We test your vehicle alternator charging output (13.8V – 14.4V) before installation, apply anti-corrosion grease to brass terminals, and securely anchor the mounting bracket.
              </span>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={getWhatsAppFitmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Book Doorstep Fitment (WhatsApp)
              </a>
              <a
                href={`tel:${businessInfo.contacts[0].phone}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                Call +91 94224 64766
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
