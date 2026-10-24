import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const BrandStory: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();

  return (
    <section className="py-20 sm:py-24 bg-[#F6F6F5] border-b border-[#D3D6D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column (approx 55% width) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-3">
              EMBRACING STYLE AND UTILITY
            </p>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-[#272B29] font-normal mb-6 text-balance">
              Style that moves with you.
            </h2>

            <div className="space-y-5 text-[15px] sm:text-[16px] leading-relaxed text-[#777D79] max-w-xl font-normal">
              <p>
                At <span className="text-[#272B29] font-medium">Alishba Finds</span>, we believe the right bag should feel as natural as it looks beautiful. Our collection celebrates considered design, versatile silhouettes, and the little details that make everyday dressing feel special.
              </p>
              <p>
                From busy mornings to spontaneous evenings, discover accessories designed to complement your routine and express your personal style. Each piece is proportioned to carry your world with quiet poise.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActivePage('shop');
                }}
                className="px-6 py-3 border border-[#272B29] text-[#272B29] hover:bg-[#272B29] hover:text-[#FFFFFF] text-[12px] tracking-[0.16em] uppercase font-medium transition-all duration-200 cursor-pointer"
              >
                SHOP THE COLLECTION
              </button>

              <button
                onClick={() => setActivePage('about')}
                className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase font-semibold text-[#272B29] hover:text-[#748B83] transition-colors group cursor-pointer"
              >
                <span className="border-b border-[#272B29] group-hover:border-[#748B83] pb-0.5">
                  OUR PHILOSOPHY
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Oval Photographic Crop (approx 45% width) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4]">
              {/* Elegant Large Oval Crop */}
              <div className="w-full h-full rounded-[140px] sm:rounded-[180px] overflow-hidden border border-[#D3D6D3] bg-[#EAEBEA] shadow-[0_8px_30px_rgba(39,43,41,0.06)] relative group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
                  fallbackSrc="/images/story_lifestyle_duo_1792684795848.jpg"
                  alt="Two stylish women strolling in a European boulevard carrying Alishba Finds leather handbags"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Discreet Editorial Caption Accent */}
              <div className="absolute -bottom-4 right-4 bg-[#FFFFFF] border border-[#D3D6D3] py-2 px-3 text-[11px] text-[#777D79] tracking-wider uppercase shadow-sm">
                Paris Atelier Edit · 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
