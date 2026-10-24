import React from 'react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#F6F6F5] border-b border-[#D3D6D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#D3D6D3]">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-2">
              SEASONAL RELEASES
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#272B29] font-normal">
              Just arrived
            </h2>
            <p className="text-[14px] text-[#777D79] mt-1 font-normal">
              Fresh silhouettes for your everyday rotation.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActivePage('shop');
            }}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase font-semibold text-[#272B29] hover:text-[#748B83] transition-colors group cursor-pointer"
          >
            <span className="border-b border-[#272B29] group-hover:border-[#748B83] pb-0.5">
              VIEW ALL NEW ARRIVALS
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
