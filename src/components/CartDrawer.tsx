import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartGrandTotal,
    appliedCoupon,
    updateCartItemQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setIsCheckoutOpen,
    clearCart,
    requestConfirmation,
    showToast
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.floor((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    const success = applyCoupon(couponCodeInput);
    if (success) {
      setCouponMessage({ type: 'success', text: `Coupon "${couponCodeInput.toUpperCase()}" applied!` });
      setCouponCodeInput('');
      showToast(`Coupon ${couponCodeInput.toUpperCase()} activated!`, 'success');
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid code. Try CARTNOVA10, CARTNOVA25, or FLASH50.' });
      showToast('Coupon code is invalid or expired', 'error');
    }
  };

  const handleClearCartPrompt = () => {
    requestConfirmation({
      title: 'Clear Shopping Cart?',
      message: 'Are you sure you want to remove all items from your cart? This action cannot be undone.',
      confirmText: 'Yes, Clear Cart',
      cancelText: 'Keep Items',
      type: 'danger',
      onConfirm: () => {
        clearCart();
        showToast('Cart cleared', 'info');
      }
    });
  };

  const handleRemoveItemPrompt = (itemId: string, itemTitle: string) => {
    requestConfirmation({
      title: 'Remove Item?',
      message: `Remove "${itemTitle}" from your cart?`,
      confirmText: 'Remove',
      cancelText: 'Keep',
      type: 'danger',
      onConfirm: () => {
        removeFromCart(itemId);
        showToast('Item removed from cart', 'info');
      }
    });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between z-10 border-l border-slate-200 dark:border-slate-800"
        >
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white font-display">
                  Your Shopping Cart
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cart.length} unique item{cart.length !== 1 ? 's' : ''} in cart
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={handleClearCartPrompt}
                  className="text-[11px] text-slate-400 hover:text-red-500 font-semibold px-2 py-1 rounded-lg cursor-pointer transition-colors"
                >
                  Clear Cart
                </button>
              )}
              <button
                id="btn-close-cart-drawer"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-orange-50/80 dark:bg-slate-800/80 px-4 sm:px-5 py-3 border-b border-orange-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                {amountToFreeShipping > 0 ? (
                  <>Add <strong className="text-orange-600 dark:text-orange-400">{formatPrice(amountToFreeShipping)}</strong> for FREE Express</>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> FREE Next-Day Courier Unlocked!
                  </span>
                )}
              </span>
              <span className="text-orange-600 dark:text-orange-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-orange-200/60 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List with Swipe-to-Delete */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    Discover hot flash drops, group buying squads, and verified official mall deals today!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pb-1 px-1">
                  <span>{cart.length} product{cart.length > 1 ? 's' : ''} in cart</span>
                  <span className="flex items-center gap-1 text-slate-400 font-medium">
                    ← Swipe left to delete
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
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
                            removeFromCart(item.id);
                            showToast('Item removed from cart', 'info');
                          }}
                          className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform"
                        >
                          <Trash2 className="w-5 h-5 text-white animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-wider">Delete</span>
                        </button>
                      </div>

                      {/* Foreground Swipable Item Card */}
                      <motion.div
                        drag="x"
                        dragDirectionLock
                        dragConstraints={{ left: -90, right: 0 }}
                        dragElastic={0.12}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -65 || info.velocity.x < -250) {
                            removeFromCart(item.id);
                            showToast('Item removed from cart', 'info');
                          }
                        }}
                        className="relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 flex gap-3 z-10 touch-pan-y"
                      >
                        {/* Product Thumb */}
                        <div className="w-18 h-18 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-2 flex items-center justify-center relative shrink-0 border border-slate-100 dark:border-slate-800">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="max-h-full max-w-full object-contain"
                          />
                          {item.isGroupBuy && (
                            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md">
                              SQUAD
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => handleRemoveItemPrompt(item.id, item.product.title)}
                                className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer shrink-0"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Variant Tag */}
                            {(item.selectedColor || item.selectedSize) && (
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                              </div>
                            )}
                          </div>

                          {/* Quantity & Price Row */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                              <button
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    handleRemoveItemPrompt(item.id, item.product.title);
                                  } else {
                                    updateCartItemQuantity(item.id, item.quantity - 1);
                                  }
                                }}
                                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-black text-slate-950 dark:text-white font-display">
                                {formatPrice(
                                  (item.isGroupBuy && item.product.groupBuy
                                    ? item.product.groupBuy.groupPrice
                                    : item.product.price) * item.quantity
                                )}
                              </div>
                              {item.isGroupBuy && item.product.groupBuy && (
                                <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                                  Squad Discount
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3">
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Voucher Code (e.g. CARTNOVA10)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs uppercase font-mono font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                >
                  Apply
                </button>
              </form>

              {/* Coupon Feedback / Applied Chip */}
              {couponMessage && (
                <div className={`text-[11px] font-semibold ${couponMessage.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {couponMessage.text}
                </div>
              )}

              {appliedCoupon && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-2 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {appliedCoupon.code} applied (-{appliedCoupon.discountPercent ? `${appliedCoupon.discountPercent}%` : formatPrice(appliedCoupon.discountAmount || 0)})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-red-500 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Coupon Savings:</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{cartShipping === 0 ? <strong className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</strong> : formatPrice(cartShipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800 font-display">
                  <span>Total Amount:</span>
                  <span className="text-base text-orange-600 dark:text-orange-400">{formatPrice(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                id="btn-proceed-checkout"
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Escrow Buyer Protection & SSL Encryption</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
