import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, CURRENCIES } from '../data/products';
import { ProductCategory, Currency } from '../types';
import { Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActivePage,
    setSelectedCategory,
    currency,
    setCurrency,
    isSingleSlotClaimed,
    isAdminLoggedIn,
  } = useStore();

  const handleCategoryNav = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setActivePage('shop');
  };

  return (
    <footer className="bg-[#272B29] text-white pt-16 pb-12 border-t border-[#373A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Manifesto (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => setActivePage('home')}
              className="text-left group focus:outline-none"
            >
              <div className="flex flex-col">
                <span className="font-editorial text-2xl tracking-[0.16em] font-medium uppercase text-white group-hover:text-[#D8E6E4] transition-colors leading-none">
                  Alishba Finds
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/60 group-hover:text-[#D8E6E4] transition-colors mt-1">
                  Your next favorite find
                </span>
              </div>
            </button>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal max-w-sm">
              Curated quiet luxury handbags and fashion accessories designed for modern everyday sophistication. Handcrafted with vegetable-tanned leathers and architectural restraint.
            </p>
          </div>

          {/* Silhouettes (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#D8E6E4] uppercase">
              Silhouettes
            </h4>
            <ul className="space-y-2 text-[13px] text-white/70 font-normal">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setActivePage('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryNav(cat.id)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier & Story (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#D8E6E4] uppercase">
              Atelier
            </h4>
            <ul className="space-y-2 text-[13px] text-white/70">
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors"
                >
                  Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('wishlist')}
                  className="hover:text-white transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#D8E6E4] uppercase">
              Client Care & Legal
            </h4>
            <ul className="space-y-2 text-[13px] text-white/70">
              <li>
                <button
                  onClick={() => setActivePage('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('shipping')}
                  className="hover:text-white transition-colors"
                >
                  14-Day Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => setActivePage('admin')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-white/90 hover:underline cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-[#D8E6E4]" />
                  <span>
                    {isAdminLoggedIn
                      ? 'Admin Dashboard'
                      : isSingleSlotClaimed
                      ? 'Admin Login'
                      : 'Admin Signup (1 Slot)'}
                  </span>
                </button>
              </li>
            </ul>

            {/* Region & Currency Selector */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2">
              <label htmlFor="footer-currency" className="text-[11px] text-white/50 uppercase tracking-wider cursor-pointer">
                Currency:
              </label>
              <select
                id="footer-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-white border-b border-white/30 text-[11px] py-1 px-1 focus:outline-none focus:border-[#D8E6E4] cursor-pointer"
                aria-label="Select store currency"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c} className="text-[#272B29] bg-white">
                    {c} ({CURRENCIES[c as Currency].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Alishba Finds Atelier. All rights reserved. Quiet luxury handbags & accessories.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/60">
            <span>Cash on Delivery (Pakistan)</span>
            <span>·</span>
            <span>Encrypted PCI Checkout</span>
            <span>·</span>
            <span>Authenticity Guaranteed</span>
            <span>·</span>
            <button
              onClick={() => setActivePage('admin')}
              className="hover:text-[#D8E6E4] text-white/50 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
              title="Admin Portal (Restricted Single Master Slot)"
            >
              <Lock className="w-2.5 h-2.5 text-[#D8E6E4]" />
              <span>
                {isAdminLoggedIn
                  ? 'Admin Portal'
                  : isSingleSlotClaimed
                  ? 'Admin Login'
                  : 'Admin Signup (1 Slot)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
