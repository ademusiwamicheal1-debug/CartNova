import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PromoBanners } from './components/PromoBanners';
import { FlashDropsSection } from './components/FlashDropsSection';
import { TeamSaveSection } from './components/TeamSaveSection';
import { NovaMallSection } from './components/NovaMallSection';
import { LiveShoppingSection } from './components/LiveShoppingSection';
import { AICommercialSection } from './components/AICommercialSection';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

// Modals & Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LuckySpinWheel } from './components/LuckySpinWheel';
import { NovaAIAssistantModal } from './components/NovaAIAssistantModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SellerPortalModal } from './components/SellerPortalModal';
import { SellerStoreModal } from './components/SellerStoreModal';
import { VisualSearchModal } from './components/VisualSearchModal';
import { ShoppingApisModal } from './components/ShoppingApisModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AICommercialAdModal } from './components/AICommercialAdModal';
import { NotificationToast } from './components/NotificationToast';
import { ConfirmationModal } from './components/ConfirmationModal';

const MarketplaceContent: React.FC = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200 pb-16 md:pb-0">
      {/* Top Main Navigation Header */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden space-y-3 sm:space-y-6">
        <HeroBanner />
        <PromoBanners />
        <FlashDropsSection />
        <AICommercialSection />
        <TeamSaveSection />
        <NovaMallSection />
        <LiveShoppingSection />
        <ProductGrid />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <LuckySpinWheel />
      <NovaAIAssistantModal />
      <OrderTrackingModal />
      <SellerPortalModal />
      <SellerStoreModal />
      <VisualSearchModal />
      <ShoppingApisModal />
      <AdminPanelModal />
      <AuthModal />
      <ThemeCustomizerModal />
      <UserProfileModal />
      <AICommercialAdModal />
      <NotificationToast />
      <ConfirmationModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MarketplaceContent />
    </ShopProvider>
  );
}
