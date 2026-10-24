import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActivePage } = useStore();

  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Available unique color tones from dataset
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return Array.from(set);
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'all' && !product.colors.some((c) => c.name === selectedColor)) {
        return false;
      }
      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, maxPrice, selectedColor, inStockOnly, sortOption]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    maxPrice < 500 ||
    selectedColor !== 'all' ||
    inStockOnly;

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(500);
    setSelectedColor('all');
    setInStockOnly(false);
    setSortOption('featured');
  };

  const getCategoryTitle = () => {
    if (selectedCategory === 'all') return 'The Complete Collection';
    const found = CATEGORIES.find((c) => c.id === selectedCategory);
    return found ? found.name : 'Curated Bags';
  };

  const getCategoryDescription = () => {
    if (selectedCategory === 'all') {
      return 'Explore our full repertoire of hand-finished handbags, structural totes, travel backpacks, and compact small leather goods.';
    }
    const found = CATEGORIES.find((c) => c.id === selectedCategory);
    return found ? found.description : 'Refined designs for thoughtful living.';
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-[#777D79] uppercase tracking-wider mb-6">
          <button
            onClick={() => setActivePage('home')}
            className="hover:text-[#272B29] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#272B29] font-medium">{getCategoryTitle()}</span>
        </nav>

        {/* Editorial Heading */}
        <div className="border-b border-[#D3D6D3] pb-8 mb-8">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-2">
            ATELIER CATALOG
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#272B29] mb-3">
            {getCategoryTitle()}
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#777D79] max-w-2xl font-normal leading-relaxed">
            {getCategoryDescription()}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#D3D6D3]/60 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-[12px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === 'all'
                ? 'bg-[#272B29] text-white border-[#272B29]'
                : 'bg-white text-[#272B29] border-[#D3D6D3] hover:border-[#748B83]'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-[12px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#272B29] text-white border-[#272B29]'
                  : 'bg-white text-[#272B29] border-[#D3D6D3] hover:border-[#748B83]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Toolbar: Result count, Mobile Filter Trigger, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 bg-white border border-[#D3D6D3] mb-8">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-mono text-[#777D79] tabular-nums">
              Showing <strong className="text-[#272B29]">{filteredProducts.length}</strong> of {PRODUCTS.length} silhouettes
            </span>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="sm:hidden flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-[#272B29] font-medium border border-[#D3D6D3] px-3 py-1"
            >
              <Filter className="w-3.5 h-3.5 text-[#748B83]" />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="shop-sort" className="text-[12px] uppercase tracking-wider text-[#777D79] shrink-0">
              Sort by:
            </label>
            <select
              id="shop-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-[#F6F6F5] border border-[#D3D6D3] text-[12px] text-[#272B29] py-1.5 px-3 focus:outline-none focus:border-[#748B83] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical: A to Z</option>
            </select>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-[#D3D6D3] p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-[#D3D6D3] pb-3">
                <span className="text-[12px] uppercase tracking-widest font-semibold text-[#272B29] flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#748B83]" />
                  Filter Catalog
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#748B83] hover:text-[#272B29] flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Price Filter Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#777D79] uppercase tracking-wider">Maximum Price</span>
                  <span className="font-mono font-semibold text-[#272B29]">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#748B83] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#777D79] font-mono">
                  <span>$100</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Color Swatch Filter */}
              <div className="space-y-2 pt-3 border-t border-[#D3D6D3]/60">
                <label className="text-[12px] text-[#777D79] uppercase tracking-wider block">
                  Leather Tone
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedColor('all')}
                    className={`px-2.5 py-1 text-[11px] border transition-colors ${
                      selectedColor === 'all'
                        ? 'bg-[#272B29] text-white border-[#272B29]'
                        : 'bg-[#F6F6F5] text-[#272B29] border-[#D3D6D3] hover:border-[#748B83]'
                    }`}
                  >
                    All Tones
                  </button>
                  {availableColors.map((colorName) => (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`px-2.5 py-1 text-[11px] border transition-colors ${
                        selectedColor === colorName
                          ? 'bg-[#272B29] text-white border-[#272B29]'
                          : 'bg-[#F6F6F5] text-[#272B29] border-[#D3D6D3] hover:border-[#748B83]'
                      }`}
                    >
                      {colorName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-3 border-t border-[#D3D6D3]/60">
                <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#272B29] select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#748B83] w-4 h-4 cursor-pointer"
                  />
                  <span>Ready to dispatch only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white border border-[#D3D6D3] p-8 space-y-4">
                <h3 className="font-editorial text-3xl text-[#272B29]">No silhouettes found</h3>
                <p className="text-[14px] text-[#777D79] max-w-md mx-auto">
                  No bags currently match your active filter settings. Try adjusting your price ceiling or leather tone.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#272B29] text-white text-[12px] uppercase tracking-widest font-semibold hover:bg-[#748B83] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
