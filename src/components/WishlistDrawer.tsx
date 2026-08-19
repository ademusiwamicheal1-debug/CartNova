import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    clearWishlist,
    addToCart,
    moveAllWishlistToCart,
    formatPrice,
    setActiveProductModal,
    requestConfirmation,
    showToast
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleClearWishlistPrompt = () => {
    requestConfirmation({
      title: 'Clear Saved Wishlist?',
      message: 'Are you sure you want to remove all saved products from your wishlist?',
      confirmText: 'Yes, Clear All',
      cancelText: 'Keep Saved',
      type: 'danger',
      onConfirm: () => {
        clearWishlist();
        showToast('Wishlist has been cleared', 'info');
      }
    });
  };

  const handleMoveAllPrompt = () => {
    requestConfirmation({
      title: 'Move All to Shopping Cart?',
      message: `Move all ${wishlist.length} saved products directly to your cart?`,
      confirmText: 'Move to Cart',
      cancelText: 'Cancel',
      type: 'info',
      onConfirm: () => {
        moveAllWishlistToCart();
        showToast(`Moved ${wishlist.length} item(s) to cart!`, 'success');
      }
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between z-10 border-l border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                <Heart className="w-5 h-5 fill-red-500" />
              </div>
              <div>
                <h2 className="text-base font-black font-display text-white flex items-center gap-2">
                  <span>Saved Wishlist</span>
                  <span className="text-xs bg-red-500/30 text-red-300 font-mono px-2 py-0.5 rounded-full">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Fast checkout saved favorites anytime
                </p>
              </div>
            </div>

            <button
              id="btn-close-wishlist-drawer"
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 custom-scrollbar">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 flex items-center justify-center text-red-400 shadow-inner">
                  <Heart className="w-10 h-10 stroke-1" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 leading-relaxed">
                    Tap the heart icon on any product in the marketplace to save items for later and get price-drop alerts.
                  </p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Start Exploring Products</span>
                </button>
              </div>
            ) : (
              <>
                {/* Action Toolbar */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800 text-xs px-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved • <span className="text-slate-400">← Swipe left to delete</span>
                  </span>
                  <button
                    onClick={handleClearWishlistPrompt}
                    className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {wishlist.map((item) => {
                    const product = item.product;
                    const inStock = product.stockCount > 0;

                    return (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, y: 15, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -260, height: 0, marginBottom: 0, transition: { duration: 0.25 } }}
                        className="relative overflow-hidden rounded-2xl bg-red-600 shadow-xs"
                      >
                        {/* Swipe Delete Action Underlay */}
                        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-red-600 to-red-500 flex flex-col items-center justify-center text-white px-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              toggleWishlist(product);
                              showToast('Removed from saved wishlist', 'info');
                            }}
                            className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform"
                          >
                            <Trash2 className="w-5 h-5 text-white animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Delete</span>
                          </button>
                        </div>

                        {/* Foreground Swipable Card */}
                        <motion.div
                          drag="x"
                          dragDirectionLock
                          dragConstraints={{ left: -90, right: 0 }}
                          dragElastic={0.12}
                          onDragEnd={(_, info) => {
                            if (info.offset.x < -65 || info.velocity.x < -250) {
                              toggleWishlist(product);
                              showToast('Removed from saved wishlist', 'info');
                            }
                          }}
                          className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 flex gap-3.5 z-10 touch-pan-y"
                        >
                          {/* Product Thumbnail */}
                          <div
                            onClick={() => {
                              setActiveProductModal(product);
                              setIsWishlistOpen(false);
                            }}
                            className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center relative cursor-pointer shrink-0 overflow-hidden"
                          >
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-200"
                            />
                            {product.discountPercent > 0 && (
                              <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded">
                                -{product.discountPercent}%
                              </span>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                  {product.brand}
                                </span>
                                <button
                                  onClick={() => toggleWishlist(product)}
                                  className="text-slate-400 hover:text-red-500 p-1 cursor-pointer shrink-0"
                                  title="Remove from wishlist"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <h4
                                onClick={() => {
                                  setActiveProductModal(product);
                                  setIsWishlistOpen(false);
                                }}
                                className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                              >
                                {product.title}
                              </h4>

                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                  Sold by <strong className="text-slate-700 dark:text-slate-300">{product.seller.name}</strong>
                                </span>
                              </div>
                            </div>

                            {/* Price & Add to Cart button */}
                            <div className="flex items-center justify-between gap-2 pt-2 mt-1 border-t border-slate-100 dark:border-slate-800">
                              <div>
                                <div className="text-sm font-black text-slate-950 dark:text-white font-display">
                                  {formatPrice(product.price)}
                                </div>
                                {product.originalPrice > product.price && (
                                  <div className="text-[10px] text-slate-400 dark:text-slate-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                  </div>
                                )}
                              </div>

                              <button
                                id={`btn-wishlist-add-cart-${product.id}`}
                                onClick={() => {
                                  addToCart(product, 1);
                                  showToast(`Added ${product.title.slice(0, 20)}... to cart`, 'success');
                                }}
                                disabled={!inStock}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:bg-slate-200 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>{inStock ? 'Add to Cart' : 'Out'}</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Bottom Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
              <button
                id="btn-move-all-wishlist-to-cart"
                onClick={handleMoveAllPrompt}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-slate-950" />
                <span>Move All to Cart ({wishlist.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full bg-transparent hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
