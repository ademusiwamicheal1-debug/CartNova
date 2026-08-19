import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './SkeletonLoader';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  ShieldCheck,
  Truck,
  Zap,
  RotateCcw,
  X,
  Search,
  ChevronDown,
  Sparkles,
  AlertCircle,
  RefreshCw,
  PackageX,
  Code2,
  Globe,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    formatPrice,
    requestConfirmation,
    isLoadingCatalog,
    setIsLoadingCatalog,
    apiSource,
    setApiSource,
    setIsShoppingApisModalOpen,
    syncStats,
    showToast
  } = useShop();

  const [sortBy, setSortBy] = useState<'relevance' | 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [hasErrorState, setHasErrorState] = useState(false);

  // Filters State
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [onlyMall, setOnlyMall] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyFlashDrops, setOnlyFlashDrops] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSellerId, setSelectedSellerId] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  // Trigger brief realistic skeleton animation when category or sort changes
  useEffect(() => {
    setIsLoadingCatalog(true);
    const timer = setTimeout(() => {
      setIsLoadingCatalog(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubcategory, sortBy, selectedBrand]);

  // Extract unique brands and sellers
  const brands = useMemo(() => {
    const set = new Set(products.map(p => p.brand));
    return Array.from(set);
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSeller = product.seller.name.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesBrand && !matchesCategory && !matchesSeller && !matchesTags) {
          return false;
        }
      }

      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Mall only
      if (onlyMall && !product.isOfficialMall) {
        return false;
      }

      // Free shipping
      if (onlyFreeShipping && !product.isFreeShipping) {
        return false;
      }

      // Flash drops
      if (onlyFlashDrops && !product.isFlashDrop) {
        return false;
      }

      // In stock only
      if (onlyInStock && product.stockCount <= 0) {
        return false;
      }

      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      // Seller filter
      if (selectedSellerId !== 'all' && product.seller.id !== selectedSellerId) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.soldCount - a.soldCount;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // relevance default
    });
  }, [
    products,
    selectedCategory,
    selectedSubcategory,
    searchQuery,
    priceRange,
    onlyMall,
    onlyFreeShipping,
    onlyFlashDrops,
    onlyInStock,
    minRating,
    selectedBrand,
    selectedSellerId,
    sortBy
  ]);

  const activeCategoryObject = categories.find(c => c.id === selectedCategory);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setOnlyMall(false);
    setOnlyFreeShipping(false);
    setOnlyFlashDrops(false);
    setOnlyInStock(false);
    setMinRating(0);
    setSelectedBrand('all');
    setSelectedSellerId('all');
    setSortBy('relevance');
    showToast('All search and category filters have been reset', 'info');
  };

  const handlePromptReset = () => {
    const isFilterActive =
      selectedCategory !== 'all' ||
      selectedSubcategory !== 'all' ||
      searchQuery !== '' ||
      priceRange[1] < 1000 ||
      onlyMall ||
      onlyFreeShipping ||
      onlyFlashDrops ||
      minRating > 0;

    if (!isFilterActive) return;

    requestConfirmation({
      title: 'Reset All Filters?',
      message: 'This will restore full marketplace search, clear active keywords, price ranges, and brand selections.',
      confirmText: 'Reset Filters',
      cancelText: 'Keep Current',
      type: 'warning',
      onConfirm: resetAllFilters
    });
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubcategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (priceRange[1] < 1000 ? 1 : 0) +
    (onlyMall ? 1 : 0) +
    (onlyFreeShipping ? 1 : 0) +
    (onlyFlashDrops ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0);

  return (
    <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Public Shopping APIs Live Source Switcher Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-indigo-500/30 shadow-lg mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-wide text-blue-300 uppercase">
                Catalog Data Engine:
              </span>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                publicapis.io/category/shopping
              </span>
              {syncStats && (
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  {syncStats.latencyMs}ms ({syncStats.itemCount} items)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300">
              Live sync between Cart NOVA local store & verified public shopping REST APIs.
            </p>
          </div>
        </div>

        {/* Source Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setApiSource('curated')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              apiSource === 'curated'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <span>Cart NOVA Prime</span>
          </button>

          <button
            onClick={() => setApiSource('dummyjson')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              apiSource === 'dummyjson'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-blue-300" />
            <span>DummyJSON Live</span>
          </button>

          <button
            onClick={() => setApiSource('fakestore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              apiSource === 'fakestore'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <span>FakeStoreAPI</span>
          </button>

          <button
            onClick={() => setApiSource('platzi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              apiSource === 'platzi'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <span>Platzi Store</span>
          </button>

          <button
            onClick={() => setApiSource('blended')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              apiSource === 'blended'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>All-API Blended</span>
          </button>

          <button
            onClick={() => setIsShoppingApisModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/40 transition-all shrink-0 cursor-pointer flex items-center gap-1"
            title="Open Interactive API Sandbox & Documentation"
          >
            <span>API Console</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Category Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black tracking-wider uppercase text-orange-600 dark:text-orange-400">
              {selectedCategory === 'all' ? 'Mega Marketplace Catalog' : 'Category Department'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {filteredProducts.length} Verified Products Found
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            {activeCategoryObject ? activeCategoryObject.name : 'Explore All Categories & Verified Deals'}
          </h2>

          {searchQuery && (
            <div className="mt-2 inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs px-3 py-1.5 rounded-xl border border-orange-200 dark:border-orange-800">
              <span>Matching search: <strong>"{searchQuery}"</strong></span>
              <button onClick={() => setSearchQuery('')} className="hover:text-orange-900 dark:hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Subcategories Pills */}
        {activeCategoryObject && activeCategoryObject.subcategories && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All {activeCategoryObject.name}
            </button>
            {activeCategoryObject.subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Control Bar: Sorting & Filter Toggles */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Mobile Filter Drawer Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-bold text-xs border border-orange-200 dark:border-slate-700 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Filter Badges */}
          <button
            onClick={() => setOnlyMall(!onlyMall)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              onlyMall
                ? 'bg-slate-900 dark:bg-amber-400 text-amber-300 dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Nova Mall</span>
          </button>

          <button
            onClick={() => setOnlyFreeShipping(!onlyFreeShipping)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              onlyFreeShipping
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Free Express</span>
          </button>

          <button
            onClick={() => setOnlyFlashDrops(!onlyFlashDrops)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              onlyFlashDrops
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Flash Drop Deals</span>
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={handlePromptReset}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 font-semibold px-2 py-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Right Sort & View Modes */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              <option value="relevance">Best Match</option>
              <option value="popular">Top Sales Volume</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount %</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs h-fit space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-orange-500" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-display uppercase tracking-wider">
                Refine Search
              </h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handlePromptReset}
                className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Department Selection */}
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Department
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold border border-orange-200/60 dark:border-orange-800/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Marketplace</span>
                <span className="text-[10px] opacity-60">({products.length})</span>
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold border border-orange-200/60 dark:border-orange-800/40'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Price Budget
              </h4>
              <span className="text-xs font-black text-orange-600 dark:text-orange-400">
                {formatPrice(0)} - {formatPrice(priceRange[1])}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-1.5 mt-2.5">
              <button
                onClick={() => setPriceRange([0, 50])}
                className="py-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer text-center"
              >
                &lt; $50
              </button>
              <button
                onClick={() => setPriceRange([50, 200])}
                className="py-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer text-center"
              >
                $50 - $200
              </button>
              <button
                onClick={() => setPriceRange([200, 1000])}
                className="py-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer text-center"
              >
                $200+
              </button>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Brand
            </h4>
            <div className="space-y-1 max-h-36 overflow-y-auto custom-scrollbar pr-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  selectedBrand === 'all'
                    ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                All Brands
              </button>
              {brands.map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedBrand === b
                      ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Customer Rating
            </h4>
            <div className="space-y-1.5">
              {[4.8, 4.5, 4.0].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    minRating === rating
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{rating} Stars & Up</span>
                  </div>
                  {minRating === rating && <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid / List (9 cols) */}
        <div className="lg:col-span-9">
          {/* Error State Simulation Trigger Banner */}
          {hasErrorState ? (
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-3xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-200 font-display">
                  Marketplace Network Synchronizing
                </h3>
                <p className="text-xs text-red-700 dark:text-red-300 max-w-md mx-auto">
                  An unexpected network timeout occurred while fetching real-time merchant stocks. Please retry your query.
                </p>
              </div>
              <button
                onClick={() => setHasErrorState(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Connection</span>
              </button>
            </div>
          ) : isLoadingCatalog ? (
            /* Loading Skeletons */
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4'
                  : 'flex flex-col gap-3.5 sm:gap-4'
              }
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-10 sm:p-14 text-center space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mx-auto shadow-inner">
                <PackageX className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                  No matching products found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  We couldn't find any products matching your specific filters or search keywords. Try clearing active filters or searching for popular categories.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={resetAllFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Clear All Filters & Show Everything
                </button>
                <button
                  onClick={() => setSelectedCategory('electronics')}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-4 py-3 rounded-2xl text-xs transition-colors cursor-pointer"
                >
                  Browse Electronics
                </button>
              </div>
            </div>
          ) : (
            /* Products List */
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4'
                  : 'flex flex-col gap-3.5 sm:gap-4'
              }
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
