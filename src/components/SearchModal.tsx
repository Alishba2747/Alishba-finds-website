import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative bg-[#F6F6F5] w-full max-w-3xl border border-[#D3D6D3] shadow-2xl overflow-hidden text-[#272B29] mt-8 sm:mt-12">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#D3D6D3] flex items-center gap-3 bg-[#FFFFFF]">
          <Search className="w-5 h-5 text-[#748B83] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bags, leather wallets, backpacks, or materials..."
            className="w-full bg-transparent text-[15px] sm:text-[17px] text-[#272B29] placeholder:text-[#777D79]/60 focus:outline-none"
            aria-label="Search catalog"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#777D79] hover:text-[#272B29] focus:outline-none"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#272B29] hover:text-[#748B83] border border-[#D3D6D3] bg-[#F6F6F5] text-xs font-mono uppercase px-2"
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <p className="text-[11px] font-semibold tracking-widest text-[#748B83] uppercase">
                SUGGESTED DISCOVERIES
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Structured Bag',
                  'Everyday Wallet',
                  'Backpack',
                  'Crossbody',
                  'Italian Calfskin',
                  'Sage Green',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#FFFFFF] border border-[#D3D6D3] hover:border-[#748B83] text-[12px] text-[#272B29] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-[#777D79] uppercase tracking-wider mb-2">
                <span>Matching Silhouettes</span>
                <span>{filteredProducts.length} results</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="p-3 bg-[#FFFFFF] border border-[#D3D6D3] hover:border-[#748B83] flex items-center gap-3 cursor-pointer group transition-colors"
                  >
                    <SafeImage
                      src={p.image}
                      fallbackSrc={p.fallbackImage}
                      alt={p.name}
                      className="w-16 h-16 object-cover bg-[#EAEBEA] border border-[#D3D6D3] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-[#777D79] uppercase tracking-wider block">
                        {p.categoryLabel}
                      </span>
                      <h4 className="font-editorial text-[16px] text-[#272B29] group-hover:text-[#748B83] truncate font-medium">
                        {p.name}
                      </h4>
                      <span className="text-[12px] font-mono font-semibold text-[#272B29] tabular-nums block mt-0.5">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#777D79] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-2">
              <p className="font-editorial text-2xl text-[#272B29]">No silhouettes match “{query}”</p>
              <p className="text-[13px] text-[#777D79] max-w-sm mx-auto">
                Try searching for “handbag”, “wallet”, “backpack”, or check our full collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
