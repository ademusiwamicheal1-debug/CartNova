import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Gift,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const {
    formatPrice,
    setIsAIAssistantOpen,
    setIsLuckyWheelOpen,
    setSelectedCategory,
    products,
    setActiveProductModal
  } = useShop();

  const [activeSlide, setActiveSlide] = useState(0);

  const SLIDES = [
    {
      id: 'slide-1',
      badge: '🔥 MEGA SUPER SALE 2026',
      title: 'Next-Gen Flagships & Smart Tech Odyssey',
      subtitle: 'Up to 60% OFF verified audio, ultra-fast solar stations, and foldables with Free Next-Day Courier.',
      highlight: 'Save up to $600',
      ctaText: 'Shop Tech Drops',
      categoryTarget: 'phones-tablets',
      bgColor: 'from-slate-900 via-slate-800 to-indigo-950',
      accentColor: 'text-orange-400',
      btnBg: 'bg-orange-500 hover:bg-orange-600',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1000&auto=format&fit=crop&q=80',
      featuredProduct: products[10] || products[0]
    },
    {
      id: 'slide-2',
      badge: '⚡ FLASH DROPS OF THE DAY',
      title: 'NovaSound Pulse Pro ANC Hi-Res Audio',
      subtitle: '48dB Active Noise Cancelling, Spatial Audio, 65-Hour Battery Life. Official Flagship Warranty.',
      highlight: 'Only $79.99 (50% OFF)',
      ctaText: 'Claim Flash Drop',
      categoryTarget: 'audio-wearables',
      bgColor: 'from-slate-900 via-orange-950 to-slate-900',
      accentColor: 'text-amber-400',
      btnBg: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
      featuredProduct: products[0]
    },
    {
      id: 'slide-3',
      badge: '👥 TEAM SAVE SOCIAL DEALS',
      title: 'Squad Buying: Slash Prices up to 70%',
      subtitle: 'Team up with other Cart NOVA shoppers to unlock wholesale squad discounts instantly on viral items.',
      highlight: 'Squad Savings Active',
      ctaText: 'Explore Group Deals',
      categoryTarget: 'fashion-apparel',
      bgColor: 'from-purple-950 via-slate-900 to-indigo-950',
      accentColor: 'text-pink-400',
      btnBg: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80',
      featuredProduct: products[5]
    }
  ];

  // Auto rotate banner every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

  const current = SLIDES[activeSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Top Banner Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Main Interactive Carousel Slide (8 cols) */}
        <div className={`lg:col-span-8 rounded-2xl bg-gradient-to-r ${current.bgColor} text-white p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl flex flex-col justify-between min-h-[380px] sm:min-h-[420px] transition-all duration-700`}>
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Background visual image overlay with dark fade */}
          <div className="absolute inset-0 right-0 lg:left-1/3 opacity-30 sm:opacity-40 mix-blend-luminosity pointer-events-none overflow-hidden">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>

          {/* Slide Content */}
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3 sm:mb-4 text-orange-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight mb-3">
              {current.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              {current.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id={`btn-hero-cta-${current.id}`}
                onClick={() => {
                  if (current.featuredProduct) {
                    setActiveProductModal(current.featuredProduct);
                  } else {
                    setSelectedCategory(current.categoryTarget);
                    const el = document.getElementById('marketplace-products-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${current.btnBg} text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-black/30 transition-all transform hover:-translate-y-0.5 cursor-pointer`}
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAIAssistantOpen(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-3 rounded-xl text-sm flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Ask AI Advisor</span>
              </button>
            </div>
          </div>

          {/* Carousel Pagination and Arrows */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 mt-6">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlide((activeSlide + 1) % SLIDES.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Quick Action Cards (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: Lucky Spin Voucher Vault */}
          <div
            onClick={() => setIsLuckyWheelOpen(true)}
            className="flex-1 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-5 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform"></div>

            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full inline-block mb-1">
                  🎁 Mystery Voucher Vault
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display leading-tight">
                  Spin the Nova Wheel & Win Up to $30 OFF
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0 group-hover:rotate-12 transition-transform">
                🎰
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs font-bold border-t border-white/20 mt-2">
              <span className="text-amber-100">1 Free Daily Spin Available</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Spin Now &rarr;
              </span>
            </div>
          </div>

          {/* Card 2: Nova AI Shopping Concierge Banner */}
          <div
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex-1 rounded-2xl bg-gradient-to-br from-cyan-900 via-slate-900 to-blue-950 p-5 text-white shadow-lg border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  🤖 Smart AI Concierge
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display text-white leading-tight">
                  Personalized Deals, Gift Match & Bargaining
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>

            <p className="text-xs text-slate-300 pt-1">
              "Find best ANC headphones under $100" or negotiate cart combo discounts.
            </p>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-cyan-400 border-t border-cyan-500/20 mt-2">
              <span>Powered by Gemini 3.7</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Start Chat &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Badges Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">100% Authentic Mall</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Verified official brands</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">NovaExpress Next-Day</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Free delivery on $50+</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">15-Day Free Returns</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">No questions asked escrow</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">24/7 Dedicated Support</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Live chat & instant resolution</div>
          </div>
        </div>
      </div>
    </div>
  );
};
