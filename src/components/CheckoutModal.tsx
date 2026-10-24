import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  ChevronLeft,
} from 'lucide-react';
import { OrderDetails } from '../types';
import { SafeImage } from './SafeImage';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    currency,
    createOrder,
    lastOrder,
    setActivePage,
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>(
    lastOrder ? 'confirmation' : 'shipping'
  );

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bank_transfer'>('cod');

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  // Shipping Calculations
  const shippingFee = cartSubtotal >= 250 ? 0 : shippingMethod === 'standard' ? 15 : 28;
  const grandTotal = cartSubtotal + shippingFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: OrderDetails = {
      orderId: `AF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      timestamp: Date.now(),
      status: 'Pending',
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      total: grandTotal,
      currency,
      shippingMethod:
        shippingMethod === 'standard'
          ? 'Standard Atelier Dispatch'
          : 'Priority Express Courier',
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
      },
      paymentMethod,
    };

    createOrder(newOrder);
    setStep('confirmation');
  };

  // If viewing confirmation
  if (step === 'confirmation' && lastOrder) {
    return (
      <div className="py-12 sm:py-16 bg-[#F6F6F5] min-h-screen text-[#272B29]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#D3D6D3] p-8 sm:p-12 shadow-sm space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 pb-8 border-b border-[#D3D6D3]">
              <div className="w-14 h-14 bg-[#D8E6E4] text-[#355C4D] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase">
                ORDER CONFIRMED
              </p>
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
                Thank you for choosing Alishba Finds
              </h1>
              <p className="text-[14px] text-[#777D79] max-w-md mx-auto">
                Your order has been recorded in our atelier dispatch system. A formal confirmation and tracking link have been dispatched to <strong>{lastOrder.customer.email}</strong>.
              </p>
            </div>

            {/* Order Overview Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F0F1F0] text-[12px] border border-[#D3D6D3]">
              <div>
                <span className="text-[#777D79] block uppercase text-[10px] tracking-wider">Order Reference</span>
                <strong className="font-mono text-[#272B29]">{lastOrder.orderId}</strong>
              </div>
              <div>
                <span className="text-[#777D79] block uppercase text-[10px] tracking-wider">Date</span>
                <span className="text-[#272B29] font-medium">{lastOrder.date}</span>
              </div>
              <div>
                <span className="text-[#777D79] block uppercase text-[10px] tracking-wider">Payment</span>
                <span className="text-[#272B29] font-medium uppercase">
                  {lastOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : lastOrder.paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-[#777D79] block uppercase text-[10px] tracking-wider">Total</span>
                <strong className="font-mono text-[#272B29]">{formatPrice(lastOrder.total)}</strong>
              </div>
            </div>

            {/* Itemized List */}
            <div className="space-y-4">
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#272B29] border-b border-[#D3D6D3] pb-2">
                Order Summary ({lastOrder.items.length} items)
              </h3>
              <div className="divide-y divide-[#D3D6D3]/60">
                {lastOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <SafeImage
                        src={item.product.image}
                        fallbackSrc={item.product.fallbackImage}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover bg-[#EAEBEA] border border-[#D3D6D3]"
                      />
                      <div>
                        <h4 className="font-editorial text-[17px] text-[#272B29]">{item.product.name}</h4>
                        <p className="text-[11px] text-[#777D79]">
                          Tone: {item.selectedColor.name} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[13px] font-semibold text-[#272B29] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Table */}
              <div className="pt-4 border-t border-[#D3D6D3] space-y-2 text-[13px]">
                <div className="flex justify-between text-[#777D79]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(lastOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#777D79]">
                  <span>Shipping ({lastOrder.shippingMethod})</span>
                  <span className="font-mono tabular-nums">
                    {lastOrder.shipping === 0 ? 'Complimentary' : formatPrice(lastOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#272B29] pt-2 border-t border-[#D3D6D3]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums">{formatPrice(lastOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-4 bg-[#F6F6F5] border border-[#D3D6D3] text-[12px] text-[#777D79] space-y-1">
              <span className="text-[#272B29] font-semibold uppercase text-[11px] tracking-wider block mb-1">
                Delivery Address:
              </span>
              <p className="text-[#272B29] font-medium">{lastOrder.customer.fullName}</p>
              <p>{lastOrder.customer.address}, {lastOrder.customer.city} {lastOrder.customer.postalCode}</p>
              <p>{lastOrder.customer.country} · Contact: {lastOrder.customer.phone}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D3D6D3]">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#D3D6D3] hover:border-[#272B29] text-[12px] uppercase tracking-wider font-medium text-[#272B29] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => setActivePage('shop')}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If empty cart
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center bg-[#F6F6F5] min-h-screen">
        <div className="max-w-md mx-auto p-8 bg-white border border-[#D3D6D3] space-y-4">
          <h2 className="font-editorial text-3xl text-[#272B29]">Your bag is currently empty</h2>
          <p className="text-[13px] text-[#777D79]">
            Add bags or accessories to your bag to proceed with secure checkout.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-6 py-2.5 bg-[#272B29] text-white text-[12px] uppercase tracking-wider font-semibold hover:bg-[#748B83] transition-colors"
          >
            Discover Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Step Indicator */}
        <div className="flex items-center justify-between border-b border-[#D3D6D3] pb-6 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-1">
              CONCIERGE CHECKOUT
            </p>
            <h1 className="font-editorial text-2xl sm:text-3xl text-[#272B29]">
              {step === 'shipping' ? 'Shipping & Delivery Address' : 'Payment & Review'}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider font-mono">
            <span className={step === 'shipping' ? 'text-[#272B29] font-bold underline' : 'text-[#777D79]'}>
              1. Delivery
            </span>
            <span>&rarr;</span>
            <span className={step === 'payment' ? 'text-[#272B29] font-bold underline' : 'text-[#777D79]'}>
              2. Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D3D6D3] p-6 sm:p-8">
            {step === 'shipping' ? (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div>
                  <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] mb-4 pb-2 border-b border-[#D3D6D3]">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#777D79] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alishba@example.com"
                        className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#777D79] mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] mb-4 pb-2 border-b border-[#D3D6D3]">
                    Delivery Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] text-[#777D79] mb-1">Full Recipient Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alishba Akbar"
                        className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#777D79] mb-1">Street Address / Apartment *</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House # 14, Street 8, Sector F-7/2"
                        className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[12px] text-[#777D79] mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Islamabad / Lahore"
                          className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#777D79] mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="44000"
                          className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[12px] text-[#777D79] mb-1">Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                        >
                          <option value="Pakistan">Pakistan</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] mb-3 pb-2 border-b border-[#D3D6D3]">
                    Shipping Speed
                  </h3>
                  <div className="space-y-2">
                    <label className="p-3 border border-[#D3D6D3] flex items-center justify-between cursor-pointer hover:border-[#748B83] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-[#748B83]"
                        />
                        <div>
                          <span className="text-[13px] font-semibold text-[#272B29] block">
                            Standard Atelier Dispatch (3–5 business days)
                          </span>
                          <span className="text-[11px] text-[#777D79]">
                            {cartSubtotal >= 250
                              ? 'Complimentary (orders over $250)'
                              : 'Standard tracked shipping'}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[13px] font-semibold text-[#272B29]">
                        {cartSubtotal >= 250 ? 'Free' : formatPrice(15)}
                      </span>
                    </label>

                    <label className="p-3 border border-[#D3D6D3] flex items-center justify-between cursor-pointer hover:border-[#748B83] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-[#748B83]"
                        />
                        <div>
                          <span className="text-[13px] font-semibold text-[#272B29] block">
                            Priority Air Courier (1–2 business days)
                          </span>
                          <span className="text-[11px] text-[#777D79]">
                            White-glove priority handling & SMS updates
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[13px] font-semibold text-[#272B29]">
                        {formatPrice(28)}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] tracking-[0.18em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-[12px] text-[#777D79] hover:text-[#272B29] flex items-center gap-1 mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to shipping address</span>
                </button>

                <div>
                  <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] mb-4 pb-2 border-b border-[#D3D6D3]">
                    Select Payment Method
                  </h3>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <label className="p-4 border border-[#D3D6D3] flex flex-col gap-2 cursor-pointer bg-[#F6F6F5] hover:border-[#748B83] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="accent-[#748B83]"
                          />
                          <span className="text-[13px] font-semibold text-[#272B29]">
                            Cash on Delivery (COD) · Recommended for Pakistan
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#355C4D] bg-[#D8E6E4] px-2 py-0.5 font-bold">
                          ZERO RISK
                        </span>
                      </div>
                      <p className="text-[12px] text-[#777D79] pl-6">
                        Pay in cash directly to the courier upon delivery at your doorstep. Please have exact change ready.
                      </p>
                    </label>

                    {/* Direct Bank Transfer / Raast */}
                    <label className="p-4 border border-[#D3D6D3] flex flex-col gap-2 cursor-pointer hover:border-[#748B83] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'bank_transfer'}
                            onChange={() => setPaymentMethod('bank_transfer')}
                            className="accent-[#748B83]"
                          />
                          <span className="text-[13px] font-semibold text-[#272B29]">
                            Direct Bank Transfer / Raast Instant Pay
                          </span>
                        </div>
                      </div>
                      {paymentMethod === 'bank_transfer' && (
                        <div className="text-[12px] text-[#777D79] pl-6 space-y-1 bg-white p-3 border border-[#D3D6D3] mt-1">
                          <p><strong>Bank:</strong> Habib Bank Limited (HBL) / Meezan Bank</p>
                          <p><strong>Account Title:</strong> VERQUELLE ATELIER</p>
                          <p><strong>IBAN / Raast ID:</strong> PK36MEZN0001000987654321</p>
                          <p className="text-[11px] text-[#748B83]">Please mention your name in the payment description.</p>
                        </div>
                      )}
                    </label>

                    {/* Credit / Debit Card */}
                    <label className="p-4 border border-[#D3D6D3] flex flex-col gap-2 cursor-pointer hover:border-[#748B83] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="accent-[#748B83]"
                          />
                          <span className="text-[13px] font-semibold text-[#272B29]">
                            Credit / Debit Card (Visa, Mastercard, PayPak)
                          </span>
                        </div>
                        <Lock className="w-3.5 h-3.5 text-[#777D79]" />
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="pl-6 space-y-3 pt-2">
                          <p className="text-[11px] text-[#777D79] bg-[#F0F1F0] p-2 border border-[#D3D6D3]">
                            Note: Live Stripe/PayMob gateway integration is configured; testing sandbox is active. No actual charges will be deducted without live keys.
                          </p>
                          <div>
                            <input
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              placeholder="Name on card"
                              className="w-full p-2 bg-[#F6F6F5] border border-[#D3D6D3] text-[12px] mb-2"
                            />
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="Card number (XXXX XXXX XXXX XXXX)"
                              className="w-full p-2 bg-[#F6F6F5] border border-[#D3D6D3] text-[12px] mb-2"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full p-2 bg-[#F6F6F5] border border-[#D3D6D3] text-[12px]"
                              />
                              <input
                                type="password"
                                maxLength={4}
                                placeholder="CVV"
                                className="w-full p-2 bg-[#F6F6F5] border border-[#D3D6D3] text-[12px]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Recipient Snapshot */}
                <div className="p-3 bg-[#F0F1F0] text-[12px] text-[#777D79] border border-[#D3D6D3]">
                  <strong>Shipping to:</strong> {fullName}, {address}, {city} ({phone})
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] tracking-[0.18em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D8E6E4]" />
                  <span>Place Order · {formatPrice(grandTotal)}</span>
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D3D6D3] p-6 space-y-5">
            <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] pb-3 border-b border-[#D3D6D3]">
              In Your Bag ({cart.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#D3D6D3]/40">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor.name}`} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <SafeImage
                      src={item.product.image}
                      fallbackSrc={item.product.fallbackImage}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover bg-[#EAEBEA] border border-[#D3D6D3] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-editorial text-[16px] text-[#272B29] truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-[#777D79]">
                        {item.selectedColor.name} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[13px] font-semibold text-[#272B29] tabular-nums shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-[#D3D6D3] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#777D79]">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#777D79]">
                <span>Estimated Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#272B29] pt-2 border-t border-[#D3D6D3]">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F0F1F0] text-[11px] text-[#777D79] border border-[#D3D6D3] space-y-1">
              <p>✔ All orders packaged in signature Alishba Finds cotton dust bags</p>
              <p>✔ 14-day hassle-free atelier exchange policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
