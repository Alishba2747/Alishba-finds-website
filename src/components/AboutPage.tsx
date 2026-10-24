import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Feather, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const AboutPage: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();

  return (
    <div className="py-12 sm:py-20 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Hero Banner Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#748B83] uppercase">
            OUR ATELIER HERITAGE
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#272B29] leading-[1.15]">
            Quiet luxury, crafted for the cadence of real life.
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#777D79] leading-relaxed font-normal">
            Alishba Finds was founded on a singular conviction: that modern women deserve accessories that honor both uncompromising beauty and intuitive daily utility. Discover your next favorite find.
          </p>
        </div>

        {/* 2-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-[#EAEBEA] border border-[#D3D6D3] overflow-hidden">
            <SafeImage
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
              fallbackSrc="/images/story_lifestyle_duo_1792684795848.jpg"
              alt="Alishba Finds Artisans & Curations"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 border border-[#D3D6D3] text-[11px] text-[#777D79] uppercase tracking-wider">
              Atelier Archive · 2026
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-[15px] text-[#777D79] leading-relaxed">
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#272B29] font-normal leading-tight">
              The Architecture of Restraint
            </h2>
            <p>
              In an era dominated by transient micro-trends and oversized logos, Alishba Finds chooses quiet intention. We believe the true test of a luxury handbag lies not in overt branding, but in the balance of its proportions, the balance of its handle drop, and the tactile whisper of its grain.
            </p>
            <p>
              Each silhouette is conceived through months of iterative sampling. We examine the exact angle at which a bag sits beneath the arm, how effortlessly a phone slides into an exterior pocket, and how gracefully vegetable-tanned leather patinas over seasons of travel.
            </p>
            <blockquote className="pl-4 border-l-2 border-[#748B83] text-[#272B29] italic font-editorial text-lg">
              “We build bags not merely to be looked at, but to accompany a life lived with curiosity and grace.”
            </blockquote>
          </div>
        </div>

        {/* The 3 Pillars */}
        <div className="bg-white border border-[#D3D6D3] p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-2">
              FOUNDATIONAL PILLARS
            </p>
            <h3 className="font-editorial text-3xl text-[#272B29]">
              How we approach craft
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-4 bg-[#F6F6F5] border border-[#D3D6D3]">
              <div className="w-10 h-10 bg-white border border-[#D3D6D3] flex items-center justify-center text-[#748B83]">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-xl text-[#272B29]">Vegetable-Tanned Leathers</h4>
              <p className="text-[13px] text-[#777D79] leading-relaxed">
                We partner with certified European and regional tanneries utilizing organic tannins extracted from tree bark and mimosa, eliminating harsh chrome salts.
              </p>
            </div>

            <div className="space-y-3 p-4 bg-[#F6F6F5] border border-[#D3D6D3]">
              <div className="w-10 h-10 bg-white border border-[#D3D6D3] flex items-center justify-center text-[#748B83]">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-xl text-[#272B29]">Mindful Batch Quantity</h4>
              <p className="text-[13px] text-[#777D79] leading-relaxed">
                Rather than mass-producing inventories that end up in landfills, every Alishba Finds silhouette is made in limited numbered ateliers runs, ensuring zero waste.
              </p>
            </div>

            <div className="space-y-3 p-4 bg-[#F6F6F5] border border-[#D3D6D3]">
              <div className="w-10 h-10 bg-white border border-[#D3D6D3] flex items-center justify-center text-[#748B83]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-xl text-[#272B29]">Honest Longevity</h4>
              <p className="text-[13px] text-[#777D79] leading-relaxed">
                Reinforced bar-tacking, custom die-cast brass hardware, and hand-painted edges ensure your Alishba Finds piece remains an enduring fixture in your capsule wardrobe.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width quote & call to action */}
        <div className="text-center py-10 space-y-6">
          <p className="font-editorial text-2xl sm:text-3xl text-[#272B29] max-w-xl mx-auto italic">
            “Effortless elegance is simply intentional design that asks for nothing and gives everything.”
          </p>
          <div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActivePage('shop');
              }}
              className="px-8 py-3.5 bg-[#272B29] text-white hover:bg-[#748B83] text-[12px] uppercase tracking-[0.18em] font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>EXPLORE THE CURRENT COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
