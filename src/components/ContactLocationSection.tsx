import React, { useState } from 'react';
import { businessInfo } from '../data/businessData';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryService, setInquiryService] = useState('New Inverter Battery Purchase');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Hello Shree Power Enterprises, In-App Website Inquiry:\n\nName: ${inquiryName}\nPhone: ${inquiryPhone}\nRequirement: ${inquiryService}\nNotes: ${inquiryMessage || 'Looking for best pricing and availability in Ahilyanagar.'}`;
    window.open(`https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            Visit Our Shop in Savedi
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Connect with Ahilyanagar’s Power Specialists
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Visit our shop for a free battery health test, order doorstep replacement in Savedi, or speak with Sanjay Kulkarni or Ruturaj Kulkarni directly.
          </p>
        </div>

        {/* Emergency Breakdown Helpline Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl bg-amber-500 text-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-amber-600/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-950 text-amber-400 rounded-lg shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Emergency Breakdown Assistance in Ahilyanagar
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-950">
                Car battery dead on the road? Immediate jump-start &amp; replacement.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${businessInfo.contacts[0].phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              Call +91 94224 64766
            </a>
            <a
              href={`https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent('EMERGENCY: My vehicle battery is dead in Ahilyanagar, need roadside jump-start / assistance.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-white hover:bg-amber-50 rounded-lg transition-colors whitespace-nowrap border border-amber-600/20"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp SOS
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Direct Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Shop Address</h3>
                  <address className="not-italic text-xs text-slate-600 mt-1 leading-relaxed">
                    {businessInfo.address.shop}<br />
                    {businessInfo.address.landmark}<br />
                    {businessInfo.address.area}
                  </address>
                  <div className="mt-3">
                    <a
                      href={businessInfo.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      Open in Google Maps
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contacts List */}
            <div className="space-y-3">
              {businessInfo.contacts.map((contact) => (
                <div key={contact.phone} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide">
                      {contact.role}
                    </div>
                    <div className="text-sm font-bold text-slate-900">{contact.name}</div>
                    <div className="text-xs text-slate-500">{contact.designation}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title={`Call ${contact.name}`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hello ${contact.name}, I am contacting you from the Shree Power Enterprises website.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200/60"
                      title={`WhatsApp ${contact.name}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Working Hours */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-xs space-y-1">
                <div className="font-bold text-slate-900">Working Hours</div>
                <div className="text-slate-600">{businessInfo.hours.weekday}</div>
                <div className="text-slate-600">{businessInfo.hours.sunday}</div>
                <div className="text-amber-700 font-medium">{businessInfo.hours.emergency}</div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry & Map View */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Map Frame Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Savedi Location · Near Sonanagar Chowk
                </span>
                <a
                  href={businessInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  Direct GPS Link
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative aspect-16/9 w-full bg-slate-100">
                <iframe
                  title="Shree Power Enterprises Location"
                  src="https://maps.google.com/maps?q=Sonanagar+Chowk,+Kushthdham+Road,+Savedi,+Ahilyanagar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Send a Quick In-Shop or Doorstep Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                We respond within minutes with current stock prices and doorstep arrival timing in Ahilyanagar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Requirement / Service
                    </label>
                    <select
                      value={inquiryService}
                      onChange={(e) => setInquiryService(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option>Prycal Inverter Tubular Battery</option>
                      <option>Car / SUV Battery Replacement</option>
                      <option>Two-Wheeler Battery</option>
                      <option>Tractor Heavy Duty Battery</option>
                      <option>Luminous Pure Sine Wave Inverter</option>
                      <option>Free Battery Health Diagnostic Test</option>
                      <option>Old Battery Scrap Exchange</option>
                      <option>Emergency Jump-Start Roadside</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Notes or Vehicle / Inverter Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Swift 2019 petrol / Need 150Ah"
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs transition-colors mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Instant Inquiry to Sanjay Kulkarni
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
