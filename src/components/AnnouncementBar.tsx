import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../data/products';
import { Currency } from '../types';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { currency, setCurrency } = useStore();

  if (!isVisible) return null;

  return (
    <aside aria-label="Store announcement" className="bg-[#748B83] text-white text-[11px] tracking-wider py-2 px-4 transition-all duration-300 relative z-40 border-b border-[#63786F]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Region & Currency preview */}
        <div className="hidden sm:flex items-center gap-2">
          <label htmlFor="currency-select" className="text-white/80 uppercase text-[10px] tracking-widest cursor-pointer">
            Currency:
          </label>
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-transparent text-white border-b border-white/40 text-[10px] py-0.5 px-1 focus:outline-none focus:border-white cursor-pointer"
            aria-label="Select store currency"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c} className="text-[#272B29] bg-white">
                {c} ({CURRENCIES[c as Currency].symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Center: Brand announcement */}
        <div className="flex-1 text-center font-normal tracking-wide flex items-center justify-center gap-2">
          <span className="hidden md:inline-block text-white/70">
            <Sparkles className="w-3 h-3 inline-block mr-1 opacity-75" />
          </span>
          <span>Complimentary shipping on qualifying orders · Discover your everyday essential</span>
        </div>

        {/* Right: Dismiss button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:text-white/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-white transition-opacity"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
