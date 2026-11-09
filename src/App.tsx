/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { PowerToolsHub } from './components/PowerToolsHub';
import { VehicleBatteryFinder } from './components/VehicleBatteryFinder';
import { ScrapValueCalculator } from './components/ScrapValueCalculator';
import { ServicesSection } from './components/ServicesSection';
import { AboutWholesaleSection } from './components/AboutWholesaleSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { businessInfo } from './data/businessData';
import { Phone, MessageCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Header (§2 Top Bar Contract) */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Showroom visual anchor & 4-column KPI metrics */}
        <HeroSection />

        {/* 2. Interactive Power Tools Hub: 2 Tabs (Calculate Backup & Get Quotation) */}
        <PowerToolsHub />

        {/* 3. Interactive Vehicle Battery Lookup Tool */}
        <VehicleBatteryFinder />

        {/* 4. Products & Inverter Catalog with Filters & Modal */}
        <ProductCatalog />

        {/* 5. Scrap & Buyback Value Calculator */}
        <ScrapValueCalculator />

        {/* 6. Technical Services & Workshop Diagnostic Care */}
        <ServicesSection />

        {/* 7. About Us & Wholesale Dealer Trade Program */}
        <AboutWholesaleSection />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />

        {/* 9. Shop Location, Directions & Inquiry */}
        <ContactLocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick WhatsApp & Call Action Button for Mobile / Desktop */}
      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2">
        <a
          href={`https://wa.me/${businessInfo.contacts[0].whatsapp}?text=${encodeURIComponent('Hello Shree Power Enterprises, I have a battery / inverter query.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-transform hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>

        <a
          href={`tel:${businessInfo.contacts[0].phone}`}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-lg transition-transform hover:scale-105"
          aria-label="Call Sanjay Kulkarni"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Call +91 94224 64766</span>
        </a>
      </div>
    </div>
  );
}
