import React, { useState } from 'react';
import {
  X,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    formatPrice,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'dimensions' | 'shipping'>('details');

  const isSaved = isInWishlist(product.id);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative bg-[#F6F6F5] w-full max-w-5xl my-6 border border-[#D3D6D3] shadow-2xl overflow-hidden text-[#272B29]">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#272B29] border border-[#D3D6D3] transition-colors cursor-pointer focus:outline-none"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Main 2-Column Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Gallery Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Active Large Image Display */}
              <div className="relative aspect-[4/3] bg-[#EAEBEA] border border-[#D3D6D3] overflow-hidden">
                <SafeImage
                  src={selectedImage}
                  fallbackSrc={product.fallbackImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 border border-[#D3D6D3] text-[11px] tracking-widest uppercase font-semibold text-[#272B29]">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-16 shrink-0 border overflow-hidden transition-all ${
                        selectedImage === img
                          ? 'border-[#272B29] ring-1 ring-[#272B29]'
                          : 'border-[#D3D6D3] hover:border-[#748B83] opacity-75 hover:opacity-100'
                      }`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <SafeImage
                        src={img}
                        fallbackSrc={product.fallbackImage}
                        alt={`Detail view ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-[12px] text-[#777D79] uppercase tracking-wider mb-2">
                  <span>{product.categoryLabel}</span>
                  <span className="font-mono tabular-nums text-[#272B29]">
                    ★ {product.rating} ({product.reviewCount} notes)
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] leading-tight text-[#272B29] font-normal mb-2">
                  {product.name}
                </h1>

                {/* Subtitle */}
                <p className="text-[14px] text-[#777D79] mb-4 font-normal">
                  {product.subtitle}
                </p>

                {/* Pricing & Stock status */}
                <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#D3D6D3]">
                  <span className="text-2xl font-semibold font-mono text-[#272B29] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-[#777D79] line-through font-mono tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="ml-auto text-[12px] text-[#355C4D] font-medium tracking-wide">
                    {product.inStock
                      ? `In Stock (${product.stockCount} available)`
                      : 'Backorder Only'}
                  </span>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-[12px] uppercase tracking-wider mb-2.5">
                    <span className="text-[#272B29] font-medium">Selected Tone:</span>
                    <span className="text-[#748B83] font-semibold">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        disabled={!color.inStock}
                        className={`group relative p-1 transition-all ${
                          selectedColor.name === color.name
                            ? 'ring-2 ring-[#272B29]'
                            : 'hover:opacity-80'
                        } ${!color.inStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                        aria-label={`Select ${color.name}`}
                      >
                        <span
                          className="w-7 h-7 block border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart Controls */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#D3D6D3] bg-white h-12">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-3.5 h-full text-[#272B29] hover:bg-[#F0F1F0] disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 font-mono font-medium text-[14px] tabular-nums select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                        disabled={quantity >= product.stockCount}
                        className="px-3.5 h-full text-[#272B29] hover:bg-[#F0F1F0] disabled:opacity-30 transition-colors focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-[#272B29] hover:bg-[#748B83] text-[#FFFFFF] text-[12px] tracking-[0.16em] uppercase font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:translate-y-[1px]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`h-12 w-12 border border-[#D3D6D3] bg-white hover:bg-[#F0F1F0] flex items-center justify-center transition-colors focus:outline-none cursor-pointer ${
                        isSaved ? 'text-[#748B83]' : 'text-[#272B29]'
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#748B83]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Trust Badges Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#F0F1F0] text-[11px] text-[#777D79] border border-[#D3D6D3]">
                  <div className="flex items-center gap-1.5 justify-center text-center">
                    <Shield className="w-3.5 h-3.5 text-[#748B83]" />
                    <span>Italian Leathers</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center text-center border-x border-[#D3D6D3]">
                    <Truck className="w-3.5 h-3.5 text-[#748B83]" />
                    <span>Tracked Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center text-center">
                    <RotateCcw className="w-3.5 h-3.5 text-[#748B83]" />
                    <span>14-Day Returns</span>
                  </div>
                </div>
              </div>

              {/* Accordion / Tab Information Panels */}
              <div className="mt-6 border-t border-[#D3D6D3] pt-4 space-y-2">
                {/* Details Tab */}
                <div className="border border-[#D3D6D3] bg-white">
                  <button
                    onClick={() => setActiveTab(activeTab === 'details' ? ('' as any) : 'details')}
                    className="w-full px-4 py-3 text-left text-[12px] uppercase tracking-wider font-semibold flex items-center justify-between text-[#272B29]"
                  >
                    <span>Description & Atelier Story</span>
                    {activeTab === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeTab === 'details' && (
                    <div className="px-4 pb-4 text-[13px] text-[#777D79] leading-relaxed border-t border-[#D3D6D3]/40 pt-3">
                      <p className="mb-2">{product.description}</p>
                      <p>{product.longDescription}</p>
                    </div>
                  )}
                </div>

                {/* Materials & Hardware */}
                <div className="border border-[#D3D6D3] bg-white">
                  <button
                    onClick={() => setActiveTab(activeTab === 'materials' ? ('' as any) : 'materials')}
                    className="w-full px-4 py-3 text-left text-[12px] uppercase tracking-wider font-semibold flex items-center justify-between text-[#272B29]"
                  >
                    <span>Materials & Craft</span>
                    {activeTab === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeTab === 'materials' && (
                    <div className="px-4 pb-4 text-[13px] text-[#777D79] leading-relaxed border-t border-[#D3D6D3]/40 pt-3 space-y-2">
                      <p><strong>Leather & Lining:</strong> {product.materials}</p>
                      <p><strong>Hardware:</strong> {product.hardware}</p>
                    </div>
                  )}
                </div>

                {/* Dimensions */}
                <div className="border border-[#D3D6D3] bg-white">
                  <button
                    onClick={() => setActiveTab(activeTab === 'dimensions' ? ('' as any) : 'dimensions')}
                    className="w-full px-4 py-3 text-left text-[12px] uppercase tracking-wider font-semibold flex items-center justify-between text-[#272B29]"
                  >
                    <span>Dimensions & Fit</span>
                    {activeTab === 'dimensions' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeTab === 'dimensions' && (
                    <div className="px-4 pb-4 text-[13px] text-[#777D79] leading-relaxed border-t border-[#D3D6D3]/40 pt-3">
                      <p>{product.dimensions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Silhouettes Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-14 pt-8 border-t border-[#D3D6D3]">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-editorial text-2xl text-[#272B29]">
                  Pairs beautifully with
                </h3>
                <span className="text-[12px] text-[#777D79] uppercase tracking-wider">
                  Considered recommendations
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
