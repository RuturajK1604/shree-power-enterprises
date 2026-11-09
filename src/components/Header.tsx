import React, { useState } from 'react';
import { businessInfo } from '../data/businessData';
import { Phone, Menu, X, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenQuickQuote?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuickQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark in display face (§2 Top Bar Contract) */}
          <a
            href="#"
            className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="w-7 h-7 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
              ⚡
            </span>
            <span>Shree Power Enterprises</span>
          </a>

          {/* Zone 2: 4–5 single-line nav links with whitespace-nowrap shrink-0 */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#products" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Products
            </a>
            <a href="#calculator" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Power Calculator
            </a>
            <a href="#vehicle-finder" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Vehicle Finder
            </a>
            <a href="#services" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Services
            </a>
            <a href="#about" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              About &amp; Wholesale
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Location
            </a>
          </nav>

          {/* Zone 3: 1 primary action button (§2) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${businessInfo.contacts[0].phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: +91 94224 64766</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${businessInfo.contacts[0].phone}`}
              aria-label="Call Sanjay Kulkarni"
              className="p-2 text-slate-700 bg-amber-400 rounded-lg"
            >
              <Phone className="w-4 h-4 text-slate-950" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-2">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Products &amp; Inverters
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Inverter Backup Calculator
            </a>
            <a
              href="#vehicle-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Vehicle Battery Finder
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Services &amp; Testing
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              About &amp; Wholesale Supply
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Shop Location &amp; Savedi Map
            </a>
            <div className="pt-2 px-3">
              <a
                href={`https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent('Hello Shree Power Enterprises, I am contacting you from your website.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-2 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg"
              >
                Chat on WhatsApp (+91 94224 64766)
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
