import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Package,
  MapPin,
  ChevronRight,
  Phone,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartGrandTotal,
    cartShipping,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    formatPrice,
    userCoins,
    setUserCoins,
    createOrder,
    pickupLocation,
    requestConfirmation,
    showToast
  } = useShop();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  // Shipping Form State
  const [fullName, setFullName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.mercer@cartnova.com');
  const [phone, setPhone] = useState('+1 (555) 382-9901');
  const [address, setAddress] = useState('742 Evergreen Terrace, Suite 402');
  const [city, setCity] = useState(pickupLocation);
  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'standard' | 'pickup'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'cod' | 'coins'>('card');
  const [useCoinsDiscount, setUseCoinsDiscount] = useState(false);

  if (!isCheckoutOpen) return null;

  const coinsDiscountAmount = useCoinsDiscount ? Math.min(cartGrandTotal * 0.1, userCoins * 0.05) : 0;
  const finalPayableTotal = Math.max(0, cartGrandTotal - coinsDiscountAmount);

  const handleClosePrompt = () => {
    if (step === 'confirmed') {
      setIsCheckoutOpen(false);
      return;
    }

    requestConfirmation({
      title: 'Leave Checkout?',
      message: 'Your items will stay safely preserved in your cart, but checkout session progress will be closed.',
      confirmText: 'Leave Checkout',
      cancelText: 'Continue Checkout',
      type: 'warning',
      onConfirm: () => setIsCheckoutOpen(false)
    });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `NOVA-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedOrderId(orderId);

    createOrder({
      id: orderId,
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount + coinsDiscountAmount,
      shippingFee: cartShipping,
      total: finalPayableTotal,
      couponCode: appliedCoupon?.code,
      status: 'processing',
      trackingNumber: `NVX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: 'Tomorrow by 4:00 PM',
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        country: 'Global Region'
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      createdAt: new Date().toISOString()
    });

    if (useCoinsDiscount) {
      setUserCoins(prev => Math.max(0, prev - 100));
    } else {
      // Award bonus coins for completing order
      setUserCoins(prev => prev + Math.floor(finalPayableTotal * 2));
    }

    setStep('confirmed');
    showToast(`Order ${orderId} successfully placed!`, 'success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden relative text-slate-900 dark:text-white"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black shadow-md shadow-orange-500/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white font-display">
                Cart NOVA Escrow Checkout
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                256-Bit SSL Encrypted • Buyer Money-Back Guarantee
              </p>
            </div>
          </div>

          <button
            id="btn-close-checkout"
            onClick={handleClosePrompt}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        {step !== 'confirmed' && (
          <div className="flex items-center border-b border-slate-200/80 dark:border-slate-800 px-6 py-3 bg-white dark:bg-slate-900 text-xs font-bold">
            <div className={`flex items-center gap-1.5 ${step === 'details' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 flex items-center justify-center text-[10px] font-black">1</span>
              <span>Shipping & Logistics</span>
            </div>
            <ChevronRight className="w-4 h-4 mx-3 text-slate-300 dark:text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-black">2</span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Details */}
        {step === 'details' && (
          <form onSubmit={() => setStep('payment')} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone (Courier SMS updates)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">City / Region Hub</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Delivery Street Address & Apt</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Delivery Speeds */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Logistics Delivery Option</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-orange-600 dark:text-orange-400 mb-1">
                    <Truck className="w-4 h-4" /> Next-Day Express
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Guaranteed within 24h</p>
                </div>

                <div
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-white mb-1">
                    <Package className="w-4 h-4 text-emerald-500" /> Standard Courier
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">2-3 Business days</p>
                </div>

                <div
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-white mb-1">
                    <MapPin className="w-4 h-4 text-purple-500" /> Nova Station Hub
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Self-service locker pick</p>
                </div>
              </div>
            </div>

            {/* Bottom Proceed Action */}
            <div className="flex items-center justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Options & Order Confirmation */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder} className="p-6 space-y-4">
            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Credit / Debit Card</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Visa, Mastercard, American Express, Verve</div>
                  </div>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
              </div>

              <div
                onClick={() => setPaymentMethod('momo')}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'momo'
                    ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Mobile Money / OPay / M-Pesa / PalmPay</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Instant direct wallet deduction via phone prompt</div>
                  </div>
                </div>
                {paymentMethod === 'momo' && <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
              </div>

              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Cash on Delivery (Pay on Arrival)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Inspect parcel first, then pay courier cash or card terminal</div>
                  </div>
                </div>
                {paymentMethod === 'cod' && <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
              </div>
            </div>

            {/* Nova Coins Redemption Option */}
            {userCoins >= 50 && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-200">Redeem Nova Coins ({userCoins} available)</div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-300">Save extra {formatPrice(Math.min(cartGrandTotal * 0.1, userCoins * 0.05))}</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={useCoinsDiscount}
                  onChange={(e) => setUseCoinsDiscount(e.target.checked)}
                  className="rounded-lg text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
              </div>
            )}

            {/* Summary Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Voucher Savings:</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              {coinsDiscountAmount > 0 && (
                <div className="flex justify-between text-amber-700 dark:text-amber-400 font-bold">
                  <span>Coins Redemption:</span>
                  <span>-{formatPrice(coinsDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping:</span>
                <span>{cartShipping === 0 ? <strong className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</strong> : formatPrice(cartShipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800 font-display">
                <span>Total Due:</span>
                <span className="text-base text-orange-600 dark:text-orange-400">{formatPrice(finalPayableTotal)}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold cursor-pointer"
              >
                &larr; Back to Shipping
              </button>

              <button
                id="btn-confirm-order-pay"
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Place Order & Pay ({formatPrice(finalPayableTotal)})</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmed Success Screen */}
        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white">
              Order Confirmed & Placed!
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>! Your order <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{createdOrderId}</span> has been verified and dispatched to our regional fulfillment hub.
            </p>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Estimated Delivery:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">Tomorrow by 4:00 PM</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Destination:</span>
                <strong className="text-slate-800 dark:text-slate-200">{city}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Payment Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Escrow Secured (Paid)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
