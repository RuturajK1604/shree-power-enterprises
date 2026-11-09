import React, { useState } from 'react';
import { businessInfo } from '../data/businessData';
import { Award, Building2, Users, Handshake, Check, Send, Phone, MessageCircle } from 'lucide-react';

export const AboutWholesaleSection: React.FC = () => {
  const [wholesaleForm, setWholesaleForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    location: '',
    batteryTypes: 'Automotive & Tractor',
    estimatedMonthlyQty: '10–25 Units',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleWholesaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const text = `Hello Shree Power Enterprises, Wholesale Distribution Inquiry:\n\nBusiness: ${wholesaleForm.businessName}\nContact: ${wholesaleForm.contactPerson} (${wholesaleForm.phone})\nLocation: ${wholesaleForm.location}\nInterested In: ${wholesaleForm.batteryTypes}\nEst. Monthly Volume: ${wholesaleForm.estimatedMonthlyQty}\n\nPlease share your wholesale dealer price list and terms.`;
    window.open(`https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Established in 2014 · Over 10 Years in Ahilyanagar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powering Ahilyanagar with Unwavering Reliability &amp; Expertise
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded in 2014 by <strong>Sanjay Kulkarni</strong> and operated alongside <strong>Ruturaj Kulkarni</strong>, <strong>Shree Power Enterprises</strong> has grown into Ahilyanagar’s premier destination for high-performance batteries and pure sine wave power solutions.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              As the official <strong>Authorised Distributor of Prycal Batteries</strong> in Ahilyanagar district, we bridge the gap between heavy industrial manufacturing precision and everyday customer peace of mind. We also supply certified Luminous inverters, delivering unmatched pricing, swift doorstep installation, and honest warranty fulfillment.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 font-mono text-center">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-amber-600">2014</div>
                <div className="text-[11px] font-sans text-slate-500 mt-0.5">Established In</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-amber-600">10,000+</div>
                <div className="text-[11px] font-sans text-slate-500 mt-0.5">Batteries Fitted</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <div className="text-2xl font-black text-amber-600">100%</div>
                <div className="text-[11px] font-sans text-slate-500 mt-0.5">Genuine Stock</div>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Who We Serve Across Ahilyanagar District:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {businessInfo.audiences.map((aud, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <img
                src="/src/assets/images/hero_power_showroom_1794227821933.jpg"
                alt="Shree Power Enterprises Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 bg-slate-900 text-white">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Authorised Prycal Battery Distributor
                    </h3>
                    <p className="text-xs text-slate-300">
                      Official distribution hub for Ahilyanagar district. Genuine dealer trade pricing and direct manufacturer warranty backstop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wholesale & Dealer Network Section */}
        <div id="wholesale" className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 sm:p-10 shadow-xl border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-md border border-amber-500/30">
                <Handshake className="w-3.5 h-3.5" />
                B2B Trade &amp; Dealer Program
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Wholesale &amp; Bulk Battery Supply for Garages, Mechanics &amp; Sub-Dealers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Are you an automobile workshop owner, electrical shop retailer, tractor dealer, or fleet operator in Ahilyanagar district? Partner with Shree Power Enterprises to get direct distributor pricing on <strong>Prycal</strong> batteries with regular delivery runs and buffer stock protection.
              </p>

              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Attractive wholesale margins &amp; volume purchase rebates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Immediate scrap buyback pickup for workshop dead batteries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Priority fast warranty replacement and technical support</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block font-sans">Contact for Wholesale:</span>
                  <a href={`tel:${businessInfo.contacts[0].phone}`} className="text-amber-400 font-bold hover:underline">
                    Sanjay Kulkarni: +91 94224 64766
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans">Technical &amp; Billing:</span>
                  <a href={`tel:${businessInfo.contacts[1].phone}`} className="text-amber-400 font-bold hover:underline">
                    Ruturaj Kulkarni: +91 88059 22623
                  </a>
                </div>
              </div>
            </div>

            {/* Wholesale Inquiry Form */}
            <div className="lg:col-span-6 bg-slate-800/90 p-6 sm:p-7 rounded-xl border border-slate-700 shadow-md">
              <h4 className="text-base font-bold text-white mb-1">
                Request Wholesale Dealer Price List
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Fill details below for instantaneous WhatsApp quotation &amp; partnership details.
              </p>

              <form onSubmit={handleWholesaleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Business / Shop Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Om Sai Auto Garage"
                      value={wholesaleForm.businessName}
                      onChange={(e) => setWholesaleForm({ ...wholesaleForm, businessName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={wholesaleForm.contactPerson}
                      onChange={(e) => setWholesaleForm({ ...wholesaleForm, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      WhatsApp / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={wholesaleForm.phone}
                      onChange={(e) => setWholesaleForm({ ...wholesaleForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Town / Location in Ahilyanagar *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Savedi / MIDC / Rahuri"
                      value={wholesaleForm.location}
                      onChange={(e) => setWholesaleForm({ ...wholesaleForm, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Primary Interest
                    </label>
                    <select
                      value={wholesaleForm.batteryTypes}
                      onChange={(e) => setWholesaleForm({ ...wholesaleForm, batteryTypes: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>Prycal Inverter Tubular Batteries</option>
                      <option>Automotive &amp; Tractor Batteries</option>
                      <option>Two-Wheeler VRLA Batteries</option>
                      <option>Luminous Pure Sine Wave Inverters</option>
                      <option>All Range / Dealership Setup</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Est. Monthly Volume
                    </label>
                    <select
                      value={wholesaleForm.estimatedMonthlyQty}
                      onChange={(e) => setWholesaleForm({ ...wholesaleForm, estimatedMonthlyQty: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>5 – 10 Units / month</option>
                      <option>10 – 25 Units / month</option>
                      <option>25 – 50 Units / month</option>
                      <option>50+ Units (Bulk Trade)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Wholesale Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
