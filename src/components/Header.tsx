import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setSelectedCategory,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'shop' | 'about' | 'contact' | 'wishlist') => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setActivePage('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 bg-[#F6F6F5] ${
        isScrolled ? 'shadow-[0_2px_12px_rgba(39,43,41,0.04)] border-b border-[#D3D6D3]' : 'border-b border-[#D3D6D3]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[66px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#748B83]"
            aria-label="Alishba Finds Home"
          >
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-[25px] tracking-[0.14em] font-medium text-[#272B29] uppercase transition-colors group-hover:text-[#748B83] leading-none">
                Alishba Finds
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#777D79] group-hover:text-[#748B83] transition-colors mt-1">
                Your next favorite find
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-widest uppercase font-medium text-[#272B29]">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-[#748B83] relative py-1 focus:outline-none ${
              activePage === 'home' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
            }`}
          >
            Home
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#748B83]" />
            )}
          </button>

          {/* Shop with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => {
                setSelectedCategory('all');
                handleNavClick('shop');
              }}
              className={`flex items-center gap-1 transition-colors hover:text-[#748B83] py-1 focus:outline-none ${
                activePage === 'shop' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
              }`}
            >
              Shop
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
            </button>

            {shopDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-56 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-[#FFFFFF] border border-[#D3D6D3] shadow-md py-2 text-[12px] tracking-wider uppercase font-medium">
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="w-full text-left px-4 py-2 hover:bg-[#F0F1F0] text-[#272B29] hover:text-[#748B83] transition-colors"
                  >
                    All Handbags & Accessories
                  </button>
                  <div className="h-[1px] bg-[#D3D6D3]/60 my-1 mx-3" />
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full text-left px-4 py-2 hover:bg-[#F0F1F0] text-[#777D79] hover:text-[#272B29] transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-[#777D79]/70 font-mono">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-[#748B83] relative py-1 focus:outline-none ${
              activePage === 'about' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
            }`}
          >
            About
            {activePage === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#748B83]" />
            )}
          </button>

          <button
            onClick={() => {
              setSelectedCategory('handbags');
              handleNavClick('shop');
            }}
            className="transition-colors hover:text-[#748B83] py-1 focus:outline-none"
          >
            Collections
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-[#748B83] relative py-1 focus:outline-none ${
              activePage === 'contact' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
            }`}
          >
            Contact
            {activePage === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#748B83]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Search, Wishlist, Cart Drawer Trigger */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-[#272B29] hover:text-[#748B83] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#748B83]"
            aria-label="Open search dialog"
          >
            <Search className="w-[19px] h-[19px]" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className="relative p-1.5 text-[#272B29] hover:text-[#748B83] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#748B83]"
            aria-label={`Wishlist (${wishlist.length} saved items)`}
          >
            <Heart className="w-[19px] h-[19px]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#748B83] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 text-[#272B29] hover:text-[#748B83] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#748B83] flex items-center gap-2"
            aria-label={`Shopping bag (${cartCount} items)`}
          >
            <ShoppingBag className="w-[19px] h-[19px]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#272B29] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#272B29] hover:text-[#748B83] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F6F6F5] border-t border-[#D3D6D3] px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-[13px] uppercase tracking-widest font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 border-b border-[#D3D6D3]/40 ${
                activePage === 'home' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategory('all');
                handleNavClick('shop');
              }}
              className={`text-left py-2 border-b border-[#D3D6D3]/40 ${
                activePage === 'shop' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
              }`}
            >
              Shop All
            </button>
            <div className="pl-3 py-1 space-y-2 text-[12px] text-[#777D79]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="block text-left w-full hover:text-[#272B29] py-1"
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 border-b border-[#D3D6D3]/40 ${
                activePage === 'about' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
              }`}
            >
              About Alishba Finds
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 border-b border-[#D3D6D3]/40 ${
                activePage === 'contact' ? 'text-[#748B83] font-semibold' : 'text-[#272B29]'
              }`}
            >
              Contact Atelier
            </button>
            <button
              onClick={() => handleNavClick('wishlist')}
              className="text-left py-2 flex items-center justify-between text-[#272B29]"
            >
              <span>Saved Wishlist</span>
              <span className="font-mono text-xs text-[#748B83]">{wishlist.length}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
