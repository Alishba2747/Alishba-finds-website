import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, setActivePage, setSelectedCategory } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 sm:py-16 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#D3D6D3] pb-8 mb-10">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#748B83]" />
            <span>SAVED SILHOUETTES</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#272B29] mb-2">
            Your Wishlist
          </h1>
          <p className="text-[14px] text-[#777D79] font-normal">
            Keep track of your personal favorites and return to them anytime.
          </p>
        </div>

        {/* Content */}
        {savedProducts.length > 0 ? (
          <div>
            <div className="text-[12px] uppercase tracking-wider text-[#777D79] mb-6">
              <span>{savedProducts.length} pieces saved to your personal roster</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-[#D3D6D3] p-8 max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#F0F1F0] text-[#748B83] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#272B29]">
              Your wishlist is currently empty
            </h3>
            <p className="text-[14px] text-[#777D79] leading-relaxed">
              Explore our handcrafted handbags, structured totes, and everyday accessories to save your favorite silhouettes.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActivePage('shop');
                }}
                className="px-6 py-3 bg-[#272B29] text-white text-[12px] uppercase tracking-widest font-semibold hover:bg-[#748B83] transition-colors inline-flex items-center gap-2"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
