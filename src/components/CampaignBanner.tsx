import React from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';

export const CampaignBanner: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();

  const handleExplore = () => {
    setSelectedCategory('all');
    setActivePage('shop');
  };

  return (
    <section className="w-full relative bg-[#272B29] text-white overflow-hidden border-b border-[#D3D6D3]">
      {/* Background Image with measured scrim */}
      <div className="relative min-h-[360px] sm:min-h-[440px] flex items-center">
        <SafeImage
          src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1600&q=85"
          fallbackSrc="/images/banner_campaign_1792684801629.jpg"
          alt="Alishba Finds bag on natural linen over stone bench in Mediterranean sunlight"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-85"
        />

        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-20 w-full">
          <div className="max-w-lg">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#D8E6E4] uppercase mb-3">
              THE EDITORIAL CAMPAIGN
            </p>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] mb-4 text-balance text-white">
              Made for your kind of everyday.
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#D8E6E4]/90 mb-8 max-w-md">
              Versatile essentials, thoughtful details, and timeless appeal. Crafted with vegetable-tanned leathers that soften gracefully with every journey.
            </p>

            <button
              onClick={handleExplore}
              className="px-7 py-3.5 bg-[#FFFFFF] text-[#272B29] hover:bg-[#D8E6E4] text-[12px] tracking-[0.16em] uppercase font-semibold transition-colors duration-200 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              EXPLORE THE EDIT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
