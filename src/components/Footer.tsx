import React from 'react';
import { businessInfo } from '../data/businessData';
import { MapPin, Phone, MessageCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                ⚡
              </span>
              <span>{businessInfo.name}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Authorised distributor for <strong>Prycal Batteries</strong> in Ahilyanagar. Genuine sales, on-site installation, computerized testing, and scrap buybacks since {businessInfo.established}.
            </p>
            <div className="pt-1 text-[11px] text-amber-400 font-medium">
              Registered in Ahilyanagar, Maharashtra
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Batteries &amp; Inverters
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Power Backup Sizer
                </a>
              </li>
              <li>
                <a href="#vehicle-finder" className="hover:text-amber-400 transition-colors">
                  Vehicle Battery Finder
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Testing &amp; Fitment Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About &amp; Wholesale Trade
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Savedi Shop &amp; Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Specialist Contacts */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Contact Specialists
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-amber-400 font-semibold">Primary Specialist</div>
                <div className="text-sm font-bold text-white">Sanjay Kulkarni</div>
                <a
                  href={`tel:${businessInfo.contacts[0].phone}`}
                  className="text-xs text-slate-300 hover:text-amber-400 font-mono mt-0.5 inline-block"
                >
                  +91 94224 64766
                </a>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-amber-400 font-semibold">Technical Operations</div>
                <div className="text-sm font-bold text-white">Ruturaj Kulkarni</div>
                <a
                  href={`tel:${businessInfo.contacts[1].phone}`}
                  className="text-xs text-slate-300 hover:text-amber-400 font-mono mt-0.5 inline-block"
                >
                  +91 88059 22623
                </a>
              </div>
            </div>
          </div>

          {/* Shop Location */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Shop Address
            </div>
            <address className="not-italic text-slate-400 text-xs leading-relaxed">
              Shop No. 5, Adishakti Apartment,<br />
              Sonanagar Chowk, Kushthdham Road,<br />
              Savedi, Ahilyanagar - 414003,<br />
              Maharashtra, India.
            </address>
            <div className="pt-2">
              <a
                href={businessInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <MapPin className="w-3.5 h-3.5" />
                Google Maps Location
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Authorised Prycal Distributor</span>
            <span>·</span>
            <span>Exide &amp; Luminous Solutions</span>
            <span>·</span>
            <span>Ahilyanagar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
