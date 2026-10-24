import React from 'react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#F6F6F5] border-b border-[#D3D6D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-2">
            CURATED SELECTION
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#272B29] font-normal mb-3">
            Hottest picks
          </h2>
          <p className="text-[14px] text-[#777D79] font-normal">
            Considered designs. Everyday favorites. Hand-finished with architectural proportion.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Editorial Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActivePage('shop');
            }}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase font-semibold text-[#272B29] hover:text-[#748B83] transition-colors group cursor-pointer"
          >
            <span className="border-b border-[#272B29] group-hover:border-[#748B83] pb-0.5">
              EXPLORE ALL SIGNATURE PIECES
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
