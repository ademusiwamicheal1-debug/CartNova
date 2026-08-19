import React from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, Store, Eye, Tv } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveProductModal,
    openSellerStore,
    openCommercialForProduct
  } = useShop();

  const inWish = isInWishlist(product.id);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500/50 hover:shadow-xl transition-all p-3.5 sm:p-5 flex flex-col sm:flex-row items-center gap-4 group"
      >
        {/* Left Image Stage */}
        <div
          onClick={() => setActiveProductModal(product)}
          className="w-full sm:w-48 h-48 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 flex items-center justify-center relative cursor-pointer shrink-0 overflow-hidden"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Center Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">{product.brand}</span>
            {product.isOfficialMall && (
              <span className="bg-slate-900 dark:bg-slate-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 border border-amber-400/30 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> MALL
              </span>
            )}
            {product.isFreeShipping && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Truck className="w-3 h-3" /> Free Next-Day
              </span>
            )}
            {/* Seller Link */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openSellerStore(product.seller);
              }}
              className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold flex items-center gap-1 bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
            >
              <Store className="w-3 h-3 text-orange-500" />
              <span>{product.seller.name}</span>
            </button>
          </div>

          <h3
            onClick={() => setActiveProductModal(product)}
            className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 mb-1.5 cursor-pointer"
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2.5" onClick={() => setActiveProductModal(product)}>
            {product.subtitle}
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal">({product.reviewCount.toLocaleString()})</span>
            </div>
            <span>•</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{product.soldCount.toLocaleString()}+ sold</span>
          </div>

          {/* Key specs bullet */}
          <div className="hidden md:flex flex-wrap gap-1.5">
            {product.keyFeatures.slice(0, 2).map((feat, idx) => (
              <span key={idx} className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-lg font-medium">
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Right Price & Actions */}
        <div className="w-full sm:w-52 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 dark:text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id={`btn-list-wishlist-${product.id}`}
              onClick={() => toggleWishlist(product)}
              className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                inWish
                  ? 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900/50'
                  : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500' : ''}`} />
            </button>

            <button
              id={`btn-list-buy-${product.id}`}
              onClick={() => addToCart(product, 1)}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500/60 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discountPercent > 0 && (
          <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg shadow-sm">
            -{product.discountPercent}%
          </span>
        )}
        {product.isOfficialMall && (
          <span className="bg-slate-900 dark:bg-slate-950 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm border border-amber-400/30">
            <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
            MALL
          </span>
        )}
      </div>

      {/* Wishlist Heart Button */}
      <button
        id={`btn-wishlist-${product.id}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-red-500 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-slate-200/40 dark:border-slate-700"
        title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-300'}`} />
      </button>

      {/* Image Stage */}
      <div
        onClick={() => setActiveProductModal(product)}
        className="relative h-48 sm:h-52 bg-slate-50/80 dark:bg-slate-800/40 overflow-hidden cursor-pointer flex items-center justify-center p-4"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
        />

        {/* Hover Quick View Overlay Bar */}
        <div className="absolute inset-x-0 bottom-0 py-1.5 px-2 bg-slate-950/90 backdrop-blur-md text-white text-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openCommercialForProduct(product.id);
            }}
            className="px-2 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-[10px] font-black uppercase flex items-center gap-1 transition-all"
            title="Watch AI Commercial Spotlight"
          >
            <Tv className="w-3 h-3" />
            <span>AI Ad</span>
          </button>
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <Eye className="w-3.5 h-3.5 text-orange-400" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openSellerStore(product.seller);
              }}
              className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold flex items-center gap-1 truncate cursor-pointer"
              title={`Visit ${product.seller.name}`}
            >
              <Store className="w-3 h-3 text-orange-500 shrink-0" />
              <span className="truncate">{product.seller.name}</span>
            </button>
            {product.isFreeShipping && (
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
                <Truck className="w-2.5 h-2.5" /> Express
              </span>
            )}
          </div>

          <h3
            onClick={() => setActiveProductModal(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug mb-1.5 cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Rating & Sold volume */}
          <div className="flex items-center gap-1.5 text-xs mb-2">
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-400 dark:text-slate-500 text-[11px]">({product.reviewCount.toLocaleString()})</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{product.soldCount.toLocaleString()}+ sold</span>
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((c, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-700 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">+{product.colors.length}</span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg sm:text-xl font-black text-slate-950 dark:text-white font-display">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          id={`btn-grid-buy-${product.id}`}
          onClick={() => addToCart(product, 1)}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-slate-950" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};
