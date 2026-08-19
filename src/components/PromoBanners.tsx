import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, ArrowRight, ShieldCheck, Truck, Check, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromoBanners: React.FC = () => {
  const { applyCoupon, showToast, setIsLuckyWheelOpen, setIsAIAssistantOpen } = useShop();
  const [claimedCodes, setClaimedCodes] = useState<string[]>([]);

  const handleClaimVoucher = (code: string, discount: string) => {
    if (claimedCodes.includes(code)) {
      showToast(`Coupon ${code} is already claimed!`, 'info');
      return;
    }
    applyCoupon(code);
    setClaimedCodes(prev => [...prev, code]);
    showToast(`🎉 Claimed & applied ${discount} voucher (${code})!`, 'success');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* 2-Column Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Banner 1: Nova Express & Super Deals */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-500/20 flex flex-col justify-between min-h-[220px]"
        >
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>NOVA HYPER PASS EVENT</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-tight">
              Unlock Instant $25 Off <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                On Orders Over $150
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              Enjoy zero platform handling fees, verified merchant protection, and guaranteed 24h express dispatch.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleClaimVoucher('CARTNOVA25', '$25 Off')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 ${
                claimedCodes.includes('CARTNOVA25')
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-extrabold shadow-orange-500/25'
              }`}
            >
              {claimedCodes.includes('CARTNOVA25') ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>VOUCHER ACTIVE</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 text-slate-950" />
                  <span>CLAIM $25 VOUCHER (CODE: CARTNOVA25)</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsLuckyWheelOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>Spin & Win</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Banner 2: AI Shopping & Guaranteed Authenticity */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-sky-500/20 flex flex-col justify-between min-h-[220px]"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              <span>NOVA INTELLIGENCE 3.0</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-tight">
              Smart AI Shopping Matchmaker <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400">
                Personalized Budget Picks
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              Ask Nova AI anything: find exact fits, compare specs, synthesize 1,000+ verified customer reviews in seconds.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Launch Nova AI Assistant</span>
            </button>

            <div className="flex items-center gap-4 text-[11px] text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 100% Genuine
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-cyan-400" /> Free Global Returns
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
