import React from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    isInWishlist,
    toggleWishlist,
    formatPrice,
  } = useStore();

  const isSaved = isInWishlist(product.id);
  const defaultColor = product.colors[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, defaultColor, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => openProductDetail(product)}
      className="group flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-[#EAEBEA] overflow-hidden border border-[#D3D6D3] transition-colors group-hover:border-[#748B83]">
        <SafeImage
          src={product.image}
          fallbackSrc={product.fallbackImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          {product.badge ? (
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#272B29] bg-[#FFFFFF]/90 px-2.5 py-1 border border-[#D3D6D3] pointer-events-auto">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={handleWishlistClick}
            aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`pointer-events-auto p-2 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#D3D6D3] transition-colors focus:outline-none ${
              isSaved ? 'text-[#748B83]' : 'text-[#272B29] hover:text-[#748B83]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#748B83]' : ''}`} />
          </button>
        </div>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none sm:block hidden">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#FFFFFF]/95 hover:bg-[#272B29] text-[#272B29] hover:text-[#FFFFFF] border border-[#D3D6D3] text-[11px] tracking-widest uppercase font-semibold transition-colors pointer-events-auto flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Quick Add ({defaultColor.name})
          </button>
        </div>
      </div>

      {/* Product Details Block */}
      <div className="pt-3.5 pb-2 flex flex-col flex-1">
        {/* Category & Color Count */}
        <div className="flex items-center justify-between text-[11px] text-[#777D79] mb-1">
          <span className="uppercase tracking-wider">{product.categoryLabel}</span>
          <span className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-[#777D79]">+{product.colors.length - 3}</span>
            )}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-editorial text-[18px] sm:text-[19px] leading-tight text-[#272B29] group-hover:text-[#748B83] transition-colors mb-1 font-medium">
          {product.name}
        </h3>

        {/* Subtitle / Key Silhouette Note */}
        <p className="text-[12px] leading-relaxed text-[#777D79] line-clamp-1 mb-2 font-normal">
          {product.subtitle}
        </p>

        {/* Price Row */}
        <div className="mt-auto flex items-baseline justify-between pt-1 border-t border-[#D3D6D3]/40">
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-semibold text-[#272B29] font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[12px] text-[#777D79] line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[11px] text-[#748B83] font-medium sm:hidden">
            View &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};
