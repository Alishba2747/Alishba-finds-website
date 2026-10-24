import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, FileText, ArrowLeft } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="py-12 sm:py-20 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => setActivePage('home')}
          className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-[#777D79] hover:text-[#272B29] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <div className="bg-white border border-[#D3D6D3] p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase">
            <Truck className="w-4 h-4" />
            <span>ATELIER DISPATCH</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
            Shipping & Return Policy
          </h1>

          <div className="space-y-6 text-[14px] text-[#777D79] leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">1. Complimentary Shipping Threshold</h3>
              <p>
                All orders totaling $250 (or equivalent in local currencies) qualify for complimentary standard tracked delivery. Orders below this threshold are subject to a nominal shipping fee calculated at checkout based on destination.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">2. Dispatch & Tracking</h3>
              <p>
                Each piece is carefully inspected and packaged in our signature cotton canvas dust bag. Orders placed Monday through Friday before 2:00 PM are dispatched within 24–48 hours. A tracking code is sent via email and SMS upon carrier handover.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">3. 14-Day Atelier Exchanges & Returns</h3>
              <p>
                We wish for you to be completely satisfied with your Alishba Finds silhouette. If an item does not meet your expectations, you may initiate an exchange or return within 14 days of receipt, provided the handbag is unused, in original condition, and with all protective wrapping intact.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">4. Cash on Delivery (COD) Guidelines</h3>
              <p>
                For orders placed under Cash on Delivery, our courier partner will contact you prior to arrival. Please ensure an authorized recipient is present at the designated address with the exact invoice amount.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="py-12 sm:py-20 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => setActivePage('home')}
          className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-[#777D79] hover:text-[#272B29] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <div className="bg-white border border-[#D3D6D3] p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL & INTEGRITY</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
            Privacy & Data Ethics
          </h1>

          <div className="space-y-6 text-[14px] text-[#777D79] leading-relaxed">
            <p>
              At Alishba Finds, we hold customer privacy with the same meticulous care we apply to our leathercraft. We never sell, monetize, or disclose your personal data to external advertisers.
            </p>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">1. Data We Collect</h3>
              <p>
                We gather only the information strictly required to fulfill your order and maintain concierge communication: your name, contact phone, delivery address, and email for dispatch notifications.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">2. Payment Security</h3>
              <p>
                Payment processing is handled via certified PCI-DSS Level 1 compliant gateways. Alishba Finds does not store full credit card numbers or security CVV credentials on our servers.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">3. Your Data Rights</h3>
              <p>
                You may request an export or complete deletion of your customer record at any time by contacting <span className="font-mono text-[#272B29]">privacy@alishbafinds.com</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="py-12 sm:py-20 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => setActivePage('home')}
          className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-[#777D79] hover:text-[#272B29] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <div className="bg-white border border-[#D3D6D3] p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase">
            <FileText className="w-4 h-4" />
            <span>TERMS OF ENGAGEMENT</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
            Terms & Conditions
          </h1>

          <div className="space-y-6 text-[14px] text-[#777D79] leading-relaxed">
            <p>
              By accessing the Alishba Finds storefront or placing an order, you agree to these terms of service.
            </p>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">1. Product Descriptions & Natural Leathers</h3>
              <p>
                Because full-grain and vegetable-tanned leathers are natural organic materials, subtle grain variations, light pebble irregularities, and natural markings are organic hallmarks of authenticity rather than manufacturing defects.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">2. Order Acceptance & Inventory</h3>
              <p>
                In the rare event that an item is oversold prior to batch stock reconciliation, our concierge will notify you within 24 hours to offer an alternative piece or prompt reimbursement.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">3. Intellectual Property</h3>
              <p>
                All editorial photography, product designs, and Alishba Finds wordmark assets are proprietary and protected under international copyright law.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[#272B29] font-semibold text-base">4. Commercial Image Rights & Licensing Clearance</h3>
              <p>
                All lifestyle lookbooks, catalog photographs, and accessory imagery presented across this storefront are verified 100% royalty-free and copyright-cleared under open commercial licensing. No third-party trademarks, proprietary logos, or restricted commercial likenesses are utilized, ensuring complete legal clearance for client demonstrations and live deployments.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
