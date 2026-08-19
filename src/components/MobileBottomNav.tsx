import React from 'react';
import { Home, Grid, Zap, ShoppingBag, Heart, Sparkles, User, Palette, Tv } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const {
    cartTotalItems,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsAIAssistantOpen,
    setIsAICommercialOpen,
    selectedCategory,
    setSelectedCategory,
    currentUser,
    setIsAuthModalOpen,
    setIsUserProfileModalOpen,
    setIsThemeModalOpen
  } = useShop();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 safe-area-pb shadow-[0_-8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => {
            setSelectedCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'text-orange-600 dark:text-orange-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] tracking-tight">Home</span>
        </button>

        {/* Nova AI Shopping Assistant */}
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 mb-0.5 animate-pulse text-cyan-500" />
          <span className="text-[9px] font-bold tracking-tight">Nova AI</span>
        </button>

        {/* AI Commercial Ads */}
        <button
          onClick={() => setIsAICommercialOpen(true)}
          className="flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl text-rose-500 dark:text-rose-400 hover:text-rose-600 transition-all cursor-pointer"
        >
          <Tv className="w-4 h-4 mb-0.5 text-rose-500 animate-pulse" />
          <span className="text-[9px] font-bold tracking-tight">AI Ads</span>
        </button>

        {/* Themes Customizer */}
        <button
          onClick={() => setIsThemeModalOpen(true)}
          className="flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-all cursor-pointer"
        >
          <Palette className="w-4 h-4 mb-0.5 text-purple-500" />
          <span className="text-[9px] font-bold tracking-tight">Themes</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 relative transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-orange-600 text-[8px] font-black text-white flex items-center justify-center shadow-sm animate-bounce">
                {cartTotalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-tight">Cart</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 relative transition-all cursor-pointer"
        >
          <div className="relative">
            <Heart className="w-4 h-4 mb-0.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-rose-500 text-[8px] font-black text-white flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-tight">Saved</span>
        </button>

        {/* User Account / Sign In */}
        <button
          onClick={() => {
            if (currentUser) {
              setIsUserProfileModalOpen(true);
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          className="flex flex-col items-center justify-center p-1 min-w-[48px] rounded-xl text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-all cursor-pointer"
        >
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-4 h-4 rounded-full object-cover ring-1 ring-orange-500 mb-0.5"
            />
          ) : (
            <User className="w-4 h-4 mb-0.5" />
          )}
          <span className="text-[9px] font-medium tracking-tight">
            {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  );
};
