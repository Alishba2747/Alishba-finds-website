/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BrandStory } from './components/BrandStory';
import { CategoryDiscovery } from './components/CategoryDiscovery';
import { NewArrivals } from './components/NewArrivals';
import { CampaignBanner } from './components/CampaignBanner';
import { BrandBenefits } from './components/BrandBenefits';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ShopPage } from './components/ShopPage';
import { WishlistPage } from './components/WishlistPage';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import {
  ShippingPolicyPage,
  PrivacyPolicyPage,
  TermsPage,
} from './components/PolicyModals';
import { AdminPanel } from './components/AdminPanel';
import { Check } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    activePage,
    selectedProduct,
    closeProductDetail,
    toastMessage,
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F5] text-[#272B29]">
      {/* Top Announcement Bar & Consumer Header (hidden on admin portal) */}
      {activePage !== 'admin' && (
        <>
          <AnnouncementBar />
          <Header />
        </>
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <FeaturedProducts />
            <BrandStory />
            <CategoryDiscovery />
            <NewArrivals />
            <CampaignBanner />
            <BrandBenefits />
            <Newsletter />
          </>
        )}

        {activePage === 'shop' && <ShopPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'checkout' && <CheckoutModal />}
        {activePage === 'shipping' && <ShippingPolicyPage />}
        {activePage === 'privacy' && <PrivacyPolicyPage />}
        {activePage === 'terms' && <TermsPage />}
        {activePage === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductDetail}
        />
      )}

      <CartDrawer />
      <SearchModal />

      {/* Discreet Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#272B29] text-white px-4 py-3 rounded-none border border-[#748B83] shadow-lg flex items-center gap-2.5 text-[12px] tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#D8E6E4] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
