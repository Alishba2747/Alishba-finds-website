import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'product-inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#F6F6F5] min-h-screen text-[#272B29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase">
            CLIENT CONCIERGE
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#272B29]">
            We are here to assist you
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#777D79] leading-relaxed">
            Have a question about leather care, custom sizing, delivery timelines, or a pending order? Our client advisory team responds within 24 hours.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Atelier Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#D3D6D3] p-6 sm:p-8 space-y-6">
              <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] border-b border-[#D3D6D3] pb-3">
                Atelier Coordinates
              </h3>

              <div className="space-y-5 text-[13px] text-[#777D79]">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F0F1F0] flex items-center justify-center text-[#748B83] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#272B29] text-[14px] font-normal font-editorial">
                      Direct Concierge
                    </strong>
                    <span className="font-mono text-[12px] text-[#272B29]">concierge@alishbafinds.com</span>
                    <p className="text-[11px] text-[#777D79] mt-0.5">Available for sizing advice & orders</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F0F1F0] flex items-center justify-center text-[#748B83] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#272B29] text-[14px] font-normal font-editorial">
                      Telephone & WhatsApp
                    </strong>
                    <span className="font-mono text-[12px] text-[#272B29]">+92 51 289 4012</span>
                    <p className="text-[11px] text-[#777D79] mt-0.5">Mon–Sat, 10:00 AM – 7:00 PM PKT</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F0F1F0] flex items-center justify-center text-[#748B83] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#272B29] text-[14px] font-normal font-editorial">
                      Atelier & Showroom
                    </strong>
                    <p className="text-[#272B29] leading-snug">
                      Alishba Finds Studio<br />
                      Suite 4B, Kohsar Plaza, Sector F-6/3<br />
                      Islamabad, 44000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F0F1F0] flex items-center justify-center text-[#748B83] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#272B29] text-[14px] font-normal font-editorial">
                      Operating Hours
                    </strong>
                    <p>Monday to Friday: 9:00 AM – 6:00 PM</p>
                    <p>Saturday: 11:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-4 bg-[#D8E6E4]/40 border border-[#748B83]/30 text-[12px] text-[#272B29] leading-relaxed">
              <strong>Private Appointments:</strong> If you are in Islamabad or visiting, private atelier styling appointments may be scheduled 48 hours in advance.
            </div>
          </div>

          {/* Right Column: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D3D6D3] p-6 sm:p-8">
            <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#272B29] mb-4 pb-2 border-b border-[#D3D6D3]">
              Send an Inquiry
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-[#D8E6E4] text-[#355C4D] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-2xl text-[#272B29]">Message Dispatched</h4>
                <p className="text-[13px] text-[#777D79] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your note has reached our concierge team. We will review your inquiry and follow up at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'product-inquiry', message: '' });
                  }}
                  className="mt-4 px-5 py-2 border border-[#272B29] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#272B29] hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#777D79] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alishba"
                      className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#777D79] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alishba@example.com"
                      className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-[#777D79] mb-1">Subject / Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                  >
                    <option value="product-inquiry">Product Inquiries & Silhouette Advice</option>
                    <option value="order-status">Order Status & Tracking</option>
                    <option value="leather-care">Leather Care & Restoration</option>
                    <option value="press">Press, Collaborations & Wholesale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] text-[#777D79] mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the bag you are interested in, your question, or any special requests..."
                    className="w-full p-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] tracking-[0.16em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message to Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Accordion Strip */}
        <div className="bg-white border border-[#D3D6D3] p-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#748B83] uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>FREQUENT INQUIRIES</span>
          </div>
          <h3 className="font-editorial text-2xl text-[#272B29] mb-6">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] text-[#777D79]">
            <div className="space-y-1">
              <strong className="text-[#272B29] block">What is your shipping timeline within Pakistan?</strong>
              <p>Standard delivery takes 3 to 4 business days across major cities via tracked courier. Express air service delivers in 1–2 days.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#272B29] block">Do you offer Cash on Delivery?</strong>
              <p>Yes, Cash on Delivery (COD) is supported across all nationwide destinations with zero additional surcharge.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#272B29] block">How should I care for vegetable-tanned leather?</strong>
              <p>Wipe gently with a soft dry cloth. Keep away from prolonged intense moisture. We recommend applying a natural beeswax balm twice a year.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#272B29] block">Can I exchange a silhouette if the size doesn't suit me?</strong>
              <p>We honor a 14-day exchange period for unused products in their original protective dust bags and tags.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
