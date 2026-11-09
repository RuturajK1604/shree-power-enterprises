import React, { useState } from 'react';
import { servicesData, businessInfo } from '../data/businessData';
import { BatteryCharging, Wrench, Gauge, Zap, Truck, ShieldAlert, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  BatteryCharging: <BatteryCharging className="w-5 h-5 text-amber-600" />,
  Wrench: <Wrench className="w-5 h-5 text-amber-600" />,
  Gauge: <Gauge className="w-5 h-5 text-amber-600" />,
  Zap: <Zap className="w-5 h-5 text-amber-600" />,
  Truck: <Truck className="w-5 h-5 text-amber-600" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-600" />,
};

export const ServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[1].id);

  const selectedService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[1];

  const getWhatsAppServiceLink = (serviceTitle: string) => {
    const text = `Hello Shree Power Enterprises, I would like to book / inquire about your service: "${serviceTitle}" in Ahilyanagar.\nPlease let me know your earliest technician availability.`;
    return `https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
              Certified Technical Care
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Power Services &amp; Workshop Care
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              From free in-shop diagnostic testing to 30-minute doorstep battery replacement and emergency roadside jump-starts across Ahilyanagar and Savedi.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-xs">
            10+ Years of Hands-on Experience
          </div>
        </div>

        {/* 2-Column Split: Services List on Left, Active Service Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Service Selector Tabs */}
          <div className="lg:col-span-5 space-y-2">
            {servicesData.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                  selectedServiceId === service.id
                    ? 'border-amber-500 bg-white shadow-sm'
                    : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/80 shrink-0">
                  {ICON_MAP[service.icon] || <BatteryCharging className="w-5 h-5 text-amber-600" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span>{service.title}</span>
                    {selectedServiceId === service.id && (
                      <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{service.shortDesc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Active Service Showcase Card */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/9 rounded-lg overflow-hidden mb-6 border border-slate-100 bg-slate-100">
                <img
                  src="/src/assets/images/service_battery_testing_1794227823772.jpg"
                  alt="Battery testing service in workshop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="text-xs text-amber-300 font-semibold tracking-wide uppercase">
                      Shree Power Technical Guarantee
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{selectedService.title}</h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              {/* Service Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                    Turnaround Time
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {selectedService.duration}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                    Pricing Transparency
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {selectedService.priceNote}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Inclusions:
                </div>
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Booking Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Available across Savedi, Sonanagar, Pipeline Rd &amp; Ahilyanagar
              </div>
              <a
                href={getWhatsAppServiceLink(selectedService.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Book This Service on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
