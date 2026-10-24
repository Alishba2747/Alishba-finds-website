import React from 'react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const CategoryDiscovery: React.FC = () => {
  const { setSelectedCategory, setActivePage } = useStore();

  const handleCategorySelect = (categoryId: ProductCategory) => {
    setSelectedCategory(categoryId);
    setActivePage('shop');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#D8E6E4] border-b border-[#D3D6D3] text-[#272B29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned editorial heading with spacing */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#748B83]/20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#355C4D] uppercase mb-2">
              BROWSE BY SILHOUETTE
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#272B29] font-normal">
              Find your perfect bag
            </h2>
          </div>
          <p className="text-[13px] text-[#272B29]/70 mt-2 sm:mt-0 font-medium tracking-wide">
            Six distinct silhouettes designed for versatile living
          </p>
        </div>

        {/* 6 Category Tiles: 6 on desktop, 3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group flex flex-col text-left focus:outline-none cursor-pointer"
            >
              {/* Square Image Box with subtle rounded corners and fine border */}
              <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#FFFFFF] border border-[#D3D6D3] group-hover:border-[#355C4D] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <SafeImage
                  src={cat.image}
                  fallbackSrc={cat.fallbackImage}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                />

                {/* Subtle hover gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Right Arrow on hover */}
                <div className="absolute top-2.5 right-2.5 p-1 bg-white/90 text-[#272B29] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 shadow-sm">
                  <ArrowUpRight className="w-3 h-3 text-[#355C4D]" />
                </div>
              </div>

              {/* Clean Category Label below tile */}
              <div className="pt-3 pb-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] sm:text-[14px] font-medium tracking-wide text-[#272B29] group-hover:text-[#355C4D] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-[#777D79] font-mono tabular-nums">
                    ({cat.count})
                  </span>
                </div>
                <div className="h-[1px] w-0 bg-[#355C4D] group-hover:w-full transition-all duration-300 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
