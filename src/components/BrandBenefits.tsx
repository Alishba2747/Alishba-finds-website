import React from 'react';
import { Sparkles, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const BrandBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Thoughtfully Curated Styles',
      desc: 'Small-batch designs with intentional silhouettes and quiet luxury details.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      desc: 'Cash on delivery, bank transfer, and encrypted checkout infrastructure.',
    },
    {
      icon: Truck,
      title: 'Clear Shipping Information',
      desc: 'Tracked delivery with complimentary dispatch on qualifying orders.',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      desc: 'Dedicated concierge care for product inquiries and sizing guidance.',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#F0F1F0] border-b border-[#D3D6D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-start p-4 bg-transparent border-t border-[#D3D6D3] sm:border-t-0 sm:border-l sm:border-[#D3D6D3] first:border-0 pl-0 sm:pl-6"
              >
                <div className="w-9 h-9 rounded-sm flex items-center justify-center text-[#748B83] mb-3 bg-[#FFFFFF] border border-[#D3D6D3]">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-[14px] font-semibold tracking-wide text-[#272B29] mb-1">
                  {item.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-[#777D79]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
