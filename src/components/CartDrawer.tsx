import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    formatPrice,
    setActivePage,
  } = useStore();

  const [orderNote, setOrderNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F6F6F5] border-l border-[#D3D6D3] shadow-2xl flex flex-col text-[#272B29] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#D3D6D3] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#748B83]" />
              <h2 className="font-editorial text-xl font-medium tracking-wide">
                Your Shopping Bag
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 hover:text-[#748B83] text-[#272B29] transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Strip */}
          <div className="p-4 bg-[#D8E6E4]/50 border-b border-[#D3D6D3] text-[12px] text-[#272B29]">
            <div className="flex items-center gap-2 mb-1.5 font-medium">
              <Truck className="w-4 h-4 text-[#355C4D]" />
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-mono text-[#355C4D]">{formatPrice(amountToFreeShipping)}</strong> more for complimentary shipping
                </span>
              ) : (
                <span className="text-[#355C4D] font-semibold">
                  You qualify for complimentary atelier shipping!
                </span>
              )}
            </div>
            <div className="w-full bg-[#FFFFFF] h-1.5 rounded-full overflow-hidden border border-[#748B83]/30">
              <div
                className="bg-[#355C4D] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAEBEA] flex items-center justify-center text-[#777D79]">
                  <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-editorial text-2xl text-[#272B29]">Your bag is empty</h3>
                  <p className="text-[13px] text-[#777D79] max-w-xs">
                    Discover hand-assembled leather bags and minimalist accessories made to accompany your days.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 border border-[#272B29] text-[#272B29] hover:bg-[#272B29] hover:text-[#FFFFFF] text-[12px] tracking-[0.16em] uppercase font-semibold transition-colors cursor-pointer"
                >
                  DISCOVER THE SHOP
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  className="p-3 bg-[#FFFFFF] border border-[#D3D6D3] flex gap-3 shadow-xs"
                >
                  {/* Thumbnail */}
                  <SafeImage
                    src={item.product.image}
                    fallbackSrc={item.product.fallbackImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#EAEBEA] border border-[#D3D6D3] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-editorial text-[17px] leading-tight text-[#272B29] truncate font-medium">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#777D79] flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                        className="text-[#777D79] hover:text-red-600 transition-colors p-1"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D3D6D3]/40">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D3D6D3] bg-[#F6F6F5]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 text-[#272B29] hover:bg-[#D3D6D3]/50 focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-mono text-[12px] tabular-nums font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.name,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 text-[#272B29] hover:bg-[#D3D6D3]/50 focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-mono text-[13px] font-semibold text-[#272B29] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#D3D6D3] bg-[#FFFFFF] space-y-3">
              {/* Optional Order Note Toggle */}
              <div className="text-[12px]">
                <button
                  onClick={() => setShowNoteInput(!showNoteInput)}
                  className="text-[#777D79] hover:text-[#272B29] underline decoration-[#777D79]/40"
                >
                  {showNoteInput ? 'Close note' : '+ Add gift note or atelier instruction'}
                </button>
                {showNoteInput && (
                  <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Enter gift message or special handling note..."
                    className="w-full mt-2 p-2 bg-[#F6F6F5] border border-[#D3D6D3] text-[12px] text-[#272B29] h-16 resize-none focus:outline-none focus:border-[#748B83]"
                  />
                )}
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 pt-2 border-t border-[#D3D6D3]">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#777D79]">Subtotal</span>
                  <span className="font-mono text-base font-semibold text-[#272B29] tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[12px] text-[#777D79]">
                  <span>Shipping & Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#272B29] hover:bg-[#748B83] text-[#FFFFFF] text-[12px] tracking-[0.18em] uppercase font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:translate-y-[1px]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#777D79] text-center">
                Taxes, express shipping, and Cash on Delivery options available at next step.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
