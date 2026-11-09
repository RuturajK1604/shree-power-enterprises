import React, { useState } from 'react';
import { BatteryProduct, productsData, businessInfo } from '../data/businessData';
import { Shield, Check, Phone, MessageCircle, Info, ExternalLink, X } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<BatteryProduct | null>(null);

  const filteredProducts = productsData.filter((product) => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  const getWhatsAppProductLink = (product: BatteryProduct) => {
    const text = `Hello Shree Power Enterprises, I am interested in ${product.brand} - ${product.name} (${product.capacity}, ${product.voltage}).\nPlease share your best discounted price and delivery/installation time in Ahilyanagar.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
              Genuine Factory-Fresh Stock
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Batteries &amp; Pure Sine Wave Inverters
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Authorised distributor for <strong>Prycal</strong> with direct manufacturer pricing, alongside genuine <strong>Exide</strong> automotive/tubular lines and <strong>Luminous</strong> home UPS systems in Ahilyanagar.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 self-start md:self-auto">
            Showing {filteredProducts.length} of {productsData.length} models
          </div>
        </div>

        {/* Filter Controls (Segmented interactive tabs) */}
        <div className="space-y-3 mb-8">
          {/* Brand Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
              Brand:
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedBrand === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Brands
              </button>
              <button
                onClick={() => setSelectedBrand('prycal')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedBrand === 'prycal'
                    ? 'bg-white text-amber-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Prycal (Authorised Distributor)
              </button>
              <button
                onClick={() => setSelectedBrand('exide')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedBrand === 'exide'
                    ? 'bg-white text-red-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exide Batteries
              </button>
              <button
                onClick={() => setSelectedBrand('luminous')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedBrand === 'luminous'
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Luminous Inverters
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
              Type:
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Categories
              </button>
              <button
                onClick={() => setSelectedCategory('inverter-battery')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'inverter-battery'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inverter Tall Tubular
              </button>
              <button
                onClick={() => setSelectedCategory('four-wheeler')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'four-wheeler'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Car &amp; SUV Batteries
              </button>
              <button
                onClick={() => setSelectedCategory('two-wheeler')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'two-wheeler'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bike &amp; Scooter
              </button>
              <button
                onClick={() => setSelectedCategory('commercial-tractor')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'commercial-tractor'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tractor &amp; Commercial
              </button>
              <button
                onClick={() => setSelectedCategory('inverter-ups')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'inverter-ups'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pure Sine Wave UPS
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Product Image Slot with Fallback */}
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
                  {/* Clean unboxed metadata with dot separators (§1.A) */}
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

                  {/* Highlights Bullet */}
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
                  <div className="text-[11px] text-slate-400">Est. Price Range</div>
                  <div className="text-sm font-extrabold font-mono text-slate-900">
                    {product.estimatedPriceRange}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="p-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    title="View Technical Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <a
                    href={getWhatsAppProductLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-2xs whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Enquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

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

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 relative">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
              <span>{activeModalProduct.brand}</span>
              <span>·</span>
              <span>{activeModalProduct.capacity}</span>
              <span>·</span>
              <span>{activeModalProduct.voltage}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {activeModalProduct.name}
            </h3>

            <p className="text-sm text-slate-600 mb-4">
              {activeModalProduct.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Capacity</span>
                <span className="font-bold text-slate-900">{activeModalProduct.capacity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Voltage</span>
                <span className="font-bold text-slate-900">{activeModalProduct.voltage}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Free Warranty</span>
                <span className="font-bold text-emerald-700">{activeModalProduct.guaranteeMonths} Months</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Pro-rata</span>
                <span className="font-bold text-slate-700">{activeModalProduct.proRataMonths} Months</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Engineering Highlights &amp; Technology
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeModalProduct.highlights.map((h, i) => (
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
                {activeModalProduct.applications.map((app, i) => (
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
                <div className="text-xs text-slate-500">Estimated Price (with scrap exchange)</div>
                <div className="text-lg font-extrabold font-mono text-slate-900">
                  {activeModalProduct.estimatedPriceRange}
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
                  href={getWhatsAppProductLink(activeModalProduct)}
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
    </section>
  );
};
