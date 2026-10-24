import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const Hero: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();

  const handleShopClick = () => {
    setSelectedCategory('all');
    setActivePage('shop');
  };

  const handleStoryClick = () => {
    setActivePage('about');
  };

  return (
    <section className="w-full bg-[#F0F1F0] border-b border-[#D3D6D3] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[360px] lg:min-h-[420px]">
          {/* Dominant Lifestyle Photograph (~58% on desktop) */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[400px] lg:h-full min-h-[340px] overflow-hidden bg-[#E7E9E7]">
            <SafeImage
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85"
              fallbackSrc="/images/hero_editorial_sage_1792684793312.jpg"
              alt="Editorial model in tailored neutral coat carrying the Alishba Finds sage leather structured handbag along a Parisian avenue"
              className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 hover:scale-[1.02]"
            />
            {/* Subtle photographic vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Text Column (~42% on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 lg:py-12 bg-[#F0F1F0]">
            <div className="max-w-md">
              {/* Eyebrow */}
              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-3">
                THE EVERYDAY EDIT
              </p>

              {/* Main Headline */}
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] text-[#272B29] font-normal mb-4 text-balance">
                Carry style in every step.
              </h1>

              {/* Supporting Copy */}
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#777D79] mb-8 font-normal">
                Discover thoughtfully chosen bags that bring effortless elegance to your everyday. Handcrafted silhouettes made for life in motion.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={handleShopClick}
                  className="px-6 py-3 border border-[#272B29] text-[#272B29] hover:bg-[#272B29] hover:text-[#FFFFFF] text-[12px] tracking-[0.16em] uppercase font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#272B29] active:translate-y-[1px]"
                >
                  SHOP THE COLLECTION
                </button>

                <button
                  onClick={handleStoryClick}
                  className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase font-medium text-[#777D79] hover:text-[#272B29] transition-colors py-1 cursor-pointer focus:outline-none"
                >
                  <span className="border-b border-[#777D79]/40 group-hover:border-[#272B29] transition-colors">
                    EXPLORE OUR STORY
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
