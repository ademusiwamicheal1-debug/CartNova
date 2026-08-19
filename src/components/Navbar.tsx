import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { THEME_CONFIGS } from '../services/themeService';
import {
  Search,
  ShoppingCart,
  Heart,
  Sparkles,
  MapPin,
  Globe,
  ChevronDown,
  Gift,
  Truck,
  ShieldCheck,
  Store,
  Zap,
  Flame,
  Camera,
  X,
  PackageCheck,
  Sun,
  Moon,
  Code2,
  SlidersHorizontal,
  Palette,
  User as UserIcon,
  LogIn,
  LogOut,
  Settings,
  CreditCard,
  Award,
  Tv
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentCurrency,
    currencies,
    setCurrencyByCode,
    cartTotalItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAIAssistantOpen,
    setIsLuckyWheelOpen,
    setIsTrackingModalOpen,
    setIsAICommercialOpen,
    setIsSellerPortalOpen,
    isAdminUser,
    isAdminOpen,
    setIsAdminOpen,
    setIsVisualSearchOpen,
    setIsShoppingApisModalOpen,
    apiSource,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    userCoins,
    pickupLocation,
    setPickupLocation,
    isDarkMode,
    toggleDarkMode,
    colorTheme,
    setIsThemeModalOpen,
    currentUser,
    setIsAuthModalOpen,
    setIsUserProfileModalOpen,
    signOut
  } = useShop();

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchSuggestionsOpen, setIsSearchSuggestionsOpen] = useState(false);
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeThemeConfig = THEME_CONFIGS.find(t => t.id === colorTheme) || THEME_CONFIGS[0];

  // Mobile smart scroll collapsing listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 70) {
            if (currentScrollY > lastScrollY && currentScrollY > 140) {
              // Scrolling down: collapse utility bar and subcategory ribbon on mobile
              setIsHeaderCollapsed(true);
            } else if (currentScrollY < lastScrollY) {
              // Scrolling up: reveal header smoothly
              setIsHeaderCollapsed(false);
            }
          } else {
            setIsHeaderCollapsed(false);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const LOCATIONS = [
    'Metropolis City Central',
    'Downtown West Coast Plaza',
    'Lagos Mainland Hub',
    'London Greater District',
    'Nairobi Business Center',
    'Toronto Financial Core',
    'Johannesburg Central'
  ];

  const POPULAR_SEARCHES = [
    'Wireless Noise Cancelling Headphones',
    'Portable Solar Power Station',
    'Dual Zone Air Fryer',
    'Mechanical Gaming Keyboard',
    'Titanium Smartwatch',
    'Foldable 4K Drone'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.currency-menu')) setIsCurrencyDropdownOpen(false);
      if (!target.closest('.location-menu')) setIsLocationDropdownOpen(false);
      if (!target.closest('.search-container')) setIsSearchSuggestionsOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchSuggestionsOpen(false);
    if (searchCategoryFilter !== 'all') {
      setSelectedCategory(searchCategoryFilter);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300 w-full max-w-full overflow-x-clip">
      {/* Top Utility Bar - Collapsible on mobile scroll */}
      <div
        className={`bg-slate-900 dark:bg-slate-950 text-slate-300 text-xs px-4 sm:px-6 border-b border-slate-800/80 transition-all duration-300 ${
          isHeaderCollapsed
            ? 'max-h-0 py-0 opacity-0 overflow-hidden border-b-0 -translate-y-full md:translate-y-0 md:max-h-16 md:py-1.5 md:opacity-100'
            : 'max-h-16 py-1.5 opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Left: Shipping location and quick pitch */}
          <div className="flex items-center gap-4">
            <div className="relative location-menu">
              <button
                id="btn-deliver-location"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer py-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="text-slate-400">Deliver to:</span>
                <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-[200px]">{pickupLocation}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 overflow-hidden">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Select Your Region / City
                  </div>
                  {LOCATIONS.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setPickupLocation(loc);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors ${
                        pickupLocation === loc ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-slate-800/50' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{loc}</span>
                      {pickupLocation === loc && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 text-slate-400 pl-3 border-l border-slate-700">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NovaExpress: Free Next-Day on orders over $50</span>
            </div>
          </div>

          {/* Right: Quick actions, tracking, currency, coins, themes, auth */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Modern Themes Customizer Trigger */}
            <button
              id="btn-nav-themes-studio"
              onClick={() => setIsThemeModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer text-[11px] font-bold"
              title="Modern UI Themes: Switch between 7 aesthetic palettes & dark/light mode"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{activeThemeConfig.name}</span>
              <span className="md:hidden">Themes</span>
            </button>

            {/* Dark/Light Mode Toggle Button */}
            <button
              id="btn-toggle-dark-mode"
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-medium hidden lg:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  <span className="text-[10px] font-medium hidden lg:inline">Dark</span>
                </>
              )}
            </button>

            <button
              id="btn-nav-shopping-apis"
              onClick={() => setIsShoppingApisModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer bg-blue-950/60 hover:bg-blue-900/80 px-2.5 py-0.5 rounded-full border border-blue-800/80 text-[11px] font-bold"
              title="Browse and test Public Shopping APIs from publicapis.io"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Shopping APIs</span>
            </button>

            {isAdminUser && (
              <button
                id="btn-nav-admin-studio"
                onClick={() => setIsAdminOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-amber-300 hover:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-bold text-[11px]"
                title="Admin Studio: Manage Catalog & Extractor (Master Administrator)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Studio</span>
              </button>
            )}

            <button
              id="btn-nav-track-order"
              onClick={() => setIsTrackingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Track</span>
            </button>

            {/* Currency Selector */}
            <div className="relative currency-menu">
              <button
                id="btn-currency-selector"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer py-0.5"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-white">{currentCurrency.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 overflow-hidden">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Select Currency
                  </div>
                  {currencies.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrencyByCode(curr.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors ${
                        currentCurrency.code === curr.code ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-slate-800/50' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{curr.name}</span>
                      <span className="font-mono font-semibold">{curr.code} ({curr.symbol})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nova Coins Reward Wallet */}
            <button
              id="btn-nova-coins-wallet"
              onClick={() => setIsLuckyWheelOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/40 px-2.5 py-0.5 rounded-full cursor-pointer transition-all hover:scale-105"
            >
              <Gift className="w-3 h-3 text-amber-400 animate-bounce" />
              <span className="font-bold text-xs">{userCoins}</span>
              <span className="text-[10px] text-amber-400 font-semibold uppercase hidden sm:inline">Coins</span>
            </button>

            {/* User Account / Sign In / Sign Out Top Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="btn-nav-user-profile-top"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded-full border border-slate-700 cursor-pointer transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className="text-white font-bold text-xs truncate max-w-[90px] sm:max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-black text-slate-900 dark:text-white truncate">{currentUser.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        {currentUser.tier}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setIsUserProfileModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-orange-500" />
                      <span>My Account & Addresses</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setIsTrackingModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      <PackageCheck className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Track Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setIsThemeModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      <Palette className="w-3.5 h-3.5 text-purple-500" />
                      <span>Theme Studio ({activeThemeConfig.name})</span>
                    </button>

                    {isAdminUser && (
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsAdminOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold border-y border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                        <span>👑 Master Admin Studio</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-nav-sign-in-top"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-black text-xs hover:opacity-95 transition-all cursor-pointer shadow-sm"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header / Branding / Super Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo - Original Cart NOVA Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('all');
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">CART</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent font-display">NOVA</span>
              </div>
              <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-400 tracking-widest uppercase">Next-Gen Marketplace</span>
            </div>
          </a>
        </div>

        {/* Super Search Bar with Category Select & AI Visual Search */}
        <div className="flex-1 max-w-2xl relative search-container">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-2xl border-2 border-orange-500/80 hover:border-orange-500 focus-within:border-orange-600 focus-within:ring-4 focus-within:ring-orange-500/20 bg-white dark:bg-slate-800 transition-all overflow-hidden shadow-xs"
          >
            {/* Category Dropdown inside Search */}
            <div className="hidden lg:flex items-center border-r border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/60 px-3 py-2.5">
              <select
                value={searchCategoryFilter}
                onChange={(e) => setSearchCategoryFilter(e.target.value)}
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-transparent outline-none cursor-pointer pr-1"
              >
                <option value="all" className="dark:bg-slate-900">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="dark:bg-slate-900">{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Text Input */}
            <div className="flex-1 flex items-center px-3 gap-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchSuggestionsOpen(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search millions of products, brands, deals..."
                className="w-full text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent outline-none py-2"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Visual / Image Camera Search Button */}
            <button
              type="button"
              id="btn-visual-camera-search"
              onClick={() => setIsVisualSearchOpen(true)}
              title="Search by image or photo"
              className="p-2 text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Search Submit Button */}
            <button
              type="submit"
              id="btn-submit-search"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold px-4 sm:px-6 py-2.5 sm:py-3 text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <span className="hidden sm:inline">Search</span>
              <Search className="w-4 h-4 sm:hidden text-slate-950" />
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          {isSearchSuggestionsOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>🔥 Trending Searches</span>
                <span className="text-orange-600 dark:text-orange-400 font-semibold">Real-Time</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {POPULAR_SEARCHES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item);
                      setIsSearchSuggestionsOpen(false);
                    }}
                    className="text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 hover:text-orange-700 dark:hover:text-orange-300 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Quick AI Concierge recommendation trigger */}
              <div
                onClick={() => {
                  setIsSearchSuggestionsOpen(false);
                  setIsAIAssistantOpen(true);
                }}
                className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 border border-cyan-200/80 dark:border-cyan-800/60 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Need personal shopping recommendations?</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">Ask Nova AI Concierge for gift ideas, comparisons, or deal negotiations</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Open &rarr;</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* AI Ads & Commercials Player Action Button */}
          <button
            id="btn-open-ai-commercials"
            onClick={() => setIsAICommercialOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white px-2.5 sm:px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 hover:shadow-lg transition-all cursor-pointer group active:scale-95"
            title="Watch AI Commercials & Spotlights"
          >
            <Tv className="w-4 h-4 text-rose-200 group-hover:scale-110 transition-transform animate-pulse" />
            <span className="hidden md:inline">AI Ads</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full font-black">Live</span>
          </button>

          {/* Nova AI Shopping Assistant Floating Action Button */}
          <button
            id="btn-open-nova-ai"
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-3 sm:px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 hover:shadow-lg transition-all cursor-pointer group active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Nova AI</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">Assistant</span>
          </button>

          {/* Lucky Wheel Mystery Box / Voucher Vault */}
          <button
            id="btn-open-lucky-wheel"
            onClick={() => setIsLuckyWheelOpen(true)}
            title="Spin to win coupons & vouchers"
            className="relative p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer hidden md:flex items-center justify-center border border-slate-200/60 dark:border-slate-800"
          >
            <Gift className="w-5 h-5 text-amber-500" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              %
            </span>
          </button>

          {/* Wishlist Button */}
          <button
            id="btn-nav-wishlist"
            onClick={() => setIsWishlistOpen(true)}
            title="Saved Wishlist"
            className="relative p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer hidden sm:flex items-center justify-center border border-slate-200/60 dark:border-slate-800"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-slate-600 dark:text-slate-300'}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="btn-open-cart"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition-all cursor-pointer relative shadow-sm active:scale-95 border border-slate-700 dark:border-slate-700"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-orange-400" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-orange-500 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-bounce">
                  {cartTotalItems}
                </span>
              )}
            </div>
            <span className="font-bold text-xs sm:text-sm hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Category Ribbon & Quick Hub Navigation - Collapsible on mobile scroll */}
      <div
        className={`bg-slate-50/90 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 transition-all duration-300 ${
          isHeaderCollapsed
            ? 'max-h-0 py-0 opacity-0 overflow-hidden border-t-0 -translate-y-2 md:translate-y-0 md:max-h-16 md:py-0 md:opacity-100'
            : 'max-h-16 opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2 text-xs">
          {/* Quick Hub Pills */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Marketplace
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('flash-drops-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3.5 py-1.5 rounded-xl font-bold hover:opacity-95 shadow-sm cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Flash Drops</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('nova-mall-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 bg-slate-900 dark:bg-slate-800 text-amber-300 px-3.5 py-1.5 rounded-xl font-bold hover:bg-slate-800 shadow-sm cursor-pointer border border-slate-700"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Mall</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('team-save-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-xl font-bold hover:opacity-95 shadow-sm cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-yellow-300" />
              <span>Team Save</span>
            </button>

            <button
              id="btn-open-shopping-apis-ribbon"
              onClick={() => setIsShoppingApisModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3.5 py-1.5 rounded-xl font-bold hover:opacity-95 shadow-sm cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Shopping APIs Hub</span>
            </button>

            <button
              id="btn-open-admin-studio-ribbon"
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl hover:opacity-95 shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-950" />
              <span>Admin Studio</span>
            </button>
          </div>

          {/* Category Quick Chips */}
          <div className="flex items-center gap-1.5 shrink-0 border-l border-slate-200 dark:border-slate-800 pl-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const el = document.getElementById('marketplace-products-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'text-orange-600 dark:text-orange-400 font-bold bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
