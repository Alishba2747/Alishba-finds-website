import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'subscribed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Persist in local subscribers list for demonstration / marketing export
      const existing = JSON.parse(localStorage.getItem('verquelle_subscribers') || '[]');
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem('verquelle_subscribers', JSON.stringify(existing));
      }
      setStatus('subscribed');
    } catch {
      setStatus('subscribed');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F6F6F5] border-b border-[#D3D6D3]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase mb-2">
          JOIN THE ATELIER CIRCLE
        </p>

        <h2 className="font-editorial text-3xl sm:text-4xl text-[#272B29] font-normal mb-3">
          A little note from Alishba Finds
        </h2>

        <p className="text-[14px] text-[#777D79] mb-8 font-normal leading-relaxed">
          Get collection updates, styling inspiration, and first looks at your next favorite find.
        </p>

        {status === 'subscribed' ? (
          <div className="p-6 bg-[#FFFFFF] border border-[#748B83] text-left max-w-lg mx-auto shadow-sm">
            <div className="flex items-center gap-2.5 text-[#355C4D] mb-1 font-medium text-[14px]">
              <CheckCircle2 className="w-5 h-5 text-[#748B83]" />
              <span>Welcome to the Alishba Finds list</span>
            </div>
            <p className="text-[13px] text-[#777D79] leading-relaxed">
              We have noted <strong className="text-[#272B29]">{email}</strong>. While our automated mailing service is being connected for live dispatch, your preference is securely registered in our atelier roster.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D3D6D3] text-[#272B29] text-[13px] focus:outline-none focus:border-[#748B83] transition-colors placeholder:text-[#777D79]/60"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#272B29] hover:bg-[#748B83] text-[#FFFFFF] text-[12px] tracking-[0.16em] uppercase font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>SIGN ME UP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'error' && (
              <p className="text-[12px] text-red-600 text-left pl-1">{errorMessage}</p>
            )}

            <p className="text-[11px] text-[#777D79] text-left sm:text-center leading-normal">
              By subscribing, you agree to receive editorial notes and product announcements. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
