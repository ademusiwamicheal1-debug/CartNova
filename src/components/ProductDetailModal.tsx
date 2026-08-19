import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  ShoppingCart,
  Check,
  Users,
  Share2,
  ThumbsUp,
  Award,
  Zap,
  Info,
  Clock,
  MessageSquare,
  Store,
  Send,
  Eye,
  Tv
} from 'lucide-react';
import { Product, Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    pickupLocation,
    openSellerStore,
    openCommercialForProduct,
    showToast
  } = useShop();

  const product = activeProductModal;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews' | 'ai-analysis'>('overview');

  // Interactive Review Form State
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isAddingReview, setIsAddingReview] = useState(false);

  // AI Review Summary State
  const [aiSummary, setAiSummary] = useState<{
    summary?: string;
    pros?: string[];
    cons?: string[];
    verdict?: string;
    score?: number;
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Initialize variant defaults when product opens
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      setActiveTab('overview');
      setAiSummary(null);
      setReviewsList(product.reviews || []);
      setIsAddingReview(false);

      // Fetch AI summary in background
      setIsAiLoading(true);
      fetch('/api/nova-ai/review-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: product.title,
          category: product.category,
          specs: product.specs,
          reviews: product.reviews
        })
      })
        .then(res => res.json())
        .then(data => {
          setAiSummary(data);
          setIsAiLoading(false);
        })
        .catch(err => {
          console.error('AI summary fetch failed:', err);
          setIsAiLoading(false);
        });
    }
  }, [product]);

  if (!product) return null;

  const inWish = isInWishlist(product.id);
  const currentImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast(`Product link for "${product.title}" copied to clipboard!`, 'success');
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setIsAddingReview(false);
    showToast('Thank you! Your verified purchase review has been published.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden relative flex flex-col max-h-[92vh] text-slate-900 dark:text-white"
      >
        {/* Modal Top Sticky Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-20 sticky top-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{product.brand}</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 truncate max-w-xs">{product.subcategory}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
              title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${inWish ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            <button
              id="btn-close-product-modal"
              onClick={() => setActiveProductModal(null)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Left (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Active Image Stage */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center relative min-h-[300px] sm:min-h-[380px] overflow-hidden group">
                <img
                  src={currentImages[selectedImageIndex] || product.thumbnail}
                  alt={product.title}
                  className="max-h-[320px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md">
                    -{product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {currentImages.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                  {currentImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-orange-500 ring-2 ring-orange-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Seller Mini Card */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                      {product.seller.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{product.seller.name}</span>
                        {product.seller.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="text-amber-500 font-bold">★ {product.seller.rating}</span>
                        <span>•</span>
                        <span>{product.seller.positiveFeedback}% Positive</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveProductModal(null);
                      openSellerStore(product.seller);
                    }}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline bg-white dark:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                  >
                    Visit Store
                  </button>
                </div>
              </div>
            </div>

            {/* Product Meta & Purchase Panel (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {product.isOfficialMall && (
                    <span className="bg-slate-900 dark:bg-slate-950 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 border border-amber-400/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> CART NOVA MALL OFFICIAL
                    </span>
                  )}
                  {product.isFlashDrop && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs">
                      <Zap className="w-3.5 h-3.5" /> FLASH DROP DEAL
                    </span>
                  )}
                  {product.isFreeShipping && (
                    <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Free Next-Day Courier
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      openCommercialForProduct(product.id);
                    }}
                    className="bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Tv className="w-3 h-3 animate-pulse" />
                    <span>Watch AI Commercial (30s)</span>
                  </button>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display leading-tight mb-2">
                  {product.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Rating & Sales */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-slate-900 dark:text-white">{product.rating}</span>
                    <span className="text-slate-400 dark:text-slate-500 font-normal">({product.reviewCount.toLocaleString()} ratings)</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">{product.soldCount.toLocaleString()}+ orders placed</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{product.stockCount} units in stock</span>
                </div>

                {/* Price Display Box */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-800/80 p-4 sm:p-5 rounded-3xl border border-orange-100 dark:border-slate-700 mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-display">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="text-xs font-black text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-lg">
                        Save {product.discountPercent}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium mt-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Earn <strong>{Math.floor(product.price * 5)} Nova Coins</strong> with this order</span>
                  </div>
                </div>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Color Edition: <strong className="text-slate-900 dark:text-white">{selectedColor}</strong>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(c => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border-2 transition-all cursor-pointer ${
                            selectedColor === c.name
                              ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/40 text-slate-900 dark:text-white shadow-xs'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600" style={{ backgroundColor: c.hex }} />
                          <span>{c.name}</span>
                          {selectedColor === c.name && <Check className="w-3 h-3 text-orange-600 dark:text-orange-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants (if applicable) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Select Size: <strong className="text-slate-900 dark:text-white">{selectedSize}</strong>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delivery & Logistics Estimator */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 mb-6 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-500" />
                      <span>Delivery to: <strong>{pickupLocation}</strong></span>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {product.isFreeShipping ? 'FREE Next-Day' : '$4.99 Standard'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-blue-500" />
                      <span>Return Policy: <strong>{product.returnDays}-Day Free Returns</strong></span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400">Escrow Protected</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-500" />
                      <span>Warranty: <strong>{product.warranty}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id={`btn-modal-add-cart-${product.id}`}
                  onClick={() => {
                    addToCart(product, quantity, selectedColor, selectedSize, false);
                    showToast(`Added ${quantity}x "${product.title}" to cart!`, 'success');
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-950" />
                  <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
                </button>

                {product.groupBuy && (
                  <button
                    id={`btn-modal-group-buy-${product.id}`}
                    onClick={() => {
                      addToCart(product, 1, selectedColor, selectedSize, true);
                      showToast(`Joined Squad Buy for "${product.title}"!`, 'success');
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-black py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Squad Buy ({formatPrice(product.groupBuy.groupPrice)})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Deep Tabs Section: Overview, AI Summary, Specs, Customer Reviews */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-6 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Key Features & Details
              </button>

              <button
                onClick={() => setActiveTab('ai-analysis')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ai-analysis'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Nova AI Synthesizer</span>
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Specifications ({Object.keys(product.specs).length})
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.2 rounded-full font-bold">
                  {reviewsList.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white font-display mb-3">Product Description</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white font-display mb-3">Key Highlights & Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: AI Analysis */}
            {activeTab === 'ai-analysis' && (
              <div className="space-y-4">
                {isAiLoading ? (
                  <div className="bg-cyan-50/50 dark:bg-slate-800/60 rounded-3xl p-8 text-center space-y-3 border border-cyan-100 dark:border-cyan-900/40">
                    <Sparkles className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-spin mx-auto" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Analyzing Product Specs & Reviews...</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Our Gemini intelligence engine is reading all customer sentiment data.</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-cyan-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-cyan-800/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-black font-display text-white">Nova AI Smart Synthesis</h4>
                          <p className="text-xs text-cyan-300">Automated sentiment clustering across verified purchases</p>
                        </div>
                      </div>

                      {aiSummary?.score && (
                        <div className="text-right">
                          <div className="text-xl font-black text-cyan-300">{aiSummary.score}/10</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">AI Quality Score</div>
                        </div>
                      )}
                    </div>

                    {aiSummary?.summary && (
                      <p className="text-xs sm:text-sm text-cyan-50 leading-relaxed">
                        {aiSummary.summary}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {aiSummary?.pros && aiSummary.pros.length > 0 && (
                        <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Check className="w-4 h-4" /> Top Praised Highlights
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {aiSummary.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {aiSummary?.cons && aiSummary.cons.length > 0 && (
                        <div className="bg-white/5 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Info className="w-4 h-4" /> Important Things to Note
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {aiSummary.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Specs Table */}
            {activeTab === 'specs' && (
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/40' : 'bg-white dark:bg-slate-900'}>
                        <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300 w-1/3 border-b border-slate-100 dark:border-slate-800">{key}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 4: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white font-display">Verified Customer Feedback</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Real feedback from verified purchasers across Cart NOVA</p>
                  </div>

                  <button
                    id="btn-open-add-review"
                    onClick={() => setIsAddingReview(!isAddingReview)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-orange-400 dark:text-orange-600" />
                    <span>{isAddingReview ? 'Cancel' : 'Write a Review'}</span>
                  </button>
                </div>

                {/* Add Review Form */}
                {isAddingReview && (
                  <form onSubmit={handleAddReviewSubmit} className="bg-white dark:bg-slate-800 border-2 border-orange-400 rounded-2xl p-5 shadow-sm space-y-3">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Submit Your Product Review
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Rating</label>
                        <div className="flex items-center gap-1 py-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                              className="cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= newReviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300 dark:text-slate-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Describe product quality, delivery speed, and performance..."
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Post Verified Review
                    </button>
                  </form>
                )}

                {/* Reviews Stream */}
                <div className="space-y-3">
                  {reviewsList.map(review => (
                    <div key={review.id} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                            {review.author.slice(0, 1)}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{review.author}</div>
                            <div className="text-[10px] text-slate-400">{review.date}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 text-xs">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                        {review.comment}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
                        {review.verifiedPurchase && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Nova Purchase
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setReviewsList(prev => prev.map(r => r.id === review.id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
                            showToast('Marked review as helpful', 'info');
                          }}
                          className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({review.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
