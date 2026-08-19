import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Zap, Clock, Flame, ShoppingCart, Heart, ShieldCheck, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export const FlashDropsSection: React.FC = () => {
  const {
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveProductModal,
    showToast
  } = useShop();

  const flashProducts = products.filter(p => p.isFlashDrop);

  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (n: number) => n.toString().padStart(2, '0');

  return (
    <section id="flash-drops-section" className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Section Header with Gradient Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center font-black shadow-md">
              <Zap className="w-7 h-7 fill-red-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                  LIGHTNING FLASH DROPS
                </h2>
                <span className="bg-amber-300 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
                  Up to 70% OFF
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Strict stock allocations refreshed every 6 hours. Instant price slash deals.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Ticker Timer */}
        <div className="flex items-center gap-2.5 bg-slate-950/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 self-start md:self-auto">
          <Clock className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">Ends In:</span>
          <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
            <span className="bg-slate-900/90 px-2.5 py-1 rounded-lg text-amber-300 shadow-inner">
              {formatDigit(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="bg-slate-900/90 px-2.5 py-1 rounded-lg text-amber-300 shadow-inner">
              {formatDigit(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="bg-slate-900/90 px-2.5 py-1 rounded-lg text-amber-300 shadow-inner">
              {formatDigit(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Dense Grid of Flash Deals */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {flashProducts.map((product) => {
          const claimPercent = Math.min(94, Math.max(65, Math.floor((product.soldCount / (product.soldCount + product.stockCount)) * 100)));
          const inWish = isInWishlist(product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative"
            >
              {/* Top Tags */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-white" />
                  -{product.discountPercent}%
                </span>
                {product.isOfficialMall && (
                  <span className="bg-slate-900 dark:bg-slate-950 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shadow-sm border border-amber-400/30">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    MALL
                  </span>
                )}
              </div>

              {/* Wishlist Toggle Button */}
              <button
                id={`btn-wishlist-flash-${product.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-red-500 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-slate-200/40 dark:border-slate-700"
                title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-300'}`} />
              </button>

              {/* Product Image Stage */}
              <div
                onClick={() => setActiveProductModal(product)}
                className="relative h-44 sm:h-48 bg-slate-50 dark:bg-slate-800/40 overflow-hidden cursor-pointer flex items-center justify-center p-3"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info Block */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div onClick={() => setActiveProductModal(product)} className="cursor-pointer">
                  <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5 truncate">
                    {product.brand}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-2">
                    {product.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base sm:text-lg font-black text-red-600 dark:text-red-400 font-display">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>

                  {/* Stock Claim Progress Meter */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                        <Flame className="w-3 h-3 fill-orange-500" />
                        {claimPercent}% Claimed
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px]">{product.stockCount} left</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${claimPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id={`btn-flash-buy-${product.id}`}
                    onClick={() => {
                      addToCart(product, 1);
                      showToast(`Added Flash Deal "${product.title.slice(0, 20)}..." to cart!`, 'success');
                    }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Quick Buy</span>
                  </button>

                  <button
                    onClick={() => setActiveProductModal(product)}
                    className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
                    title="Quick View Specs & Reviews"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
