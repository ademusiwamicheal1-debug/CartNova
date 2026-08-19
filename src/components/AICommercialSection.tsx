import React from 'react';
import { Play, Sparkles, Tv, Flame, Tag, ShoppingBag, Eye, Volume2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AI_COMMERCIAL_ADS } from '../data/aiCommercialsData';

export const AICommercialSection: React.FC = () => {
  const {
    openCommercialForProduct,
    setSelectedCommercialId,
    setIsAICommercialOpen,
    products,
    formatPrice,
    addToCart,
    setActiveProductModal,
    showToast
  } = useShop();

  const handleWatchAd = (adId: string) => {
    setSelectedCommercialId(adId);
    setIsAICommercialOpen(true);
  };

  return (
    <section
      id="nova-ai-commercials-section"
      className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header Container */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden text-white">
        {/* Background glow accents */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black tracking-wider uppercase border border-rose-500/30">
                <Tv className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                Nova TV Broadcast
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Flame className="w-3 h-3 text-amber-400" />
                Temu Mega Price Drop
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              AI Commercial Ads & Viral Reels
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Watch cinematic commercials on newly released products, listen to AI voiceovers, and grab factory-direct Temu prices before drops end.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCommercialId(AI_COMMERCIAL_ADS[0].id);
                setIsAICommercialOpen(true);
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-rose-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Commercial Reel (30s)</span>
            </button>
          </div>
        </div>

        {/* Commercial Spots Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative z-10">
          {AI_COMMERCIAL_ADS.slice(0, 3).map((ad, idx) => {
            const associatedProduct = products.find(p => p.id === ad.productId);

            return (
              <div
                key={ad.id}
                className="group relative bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Video / Poster Frame */}
                <div
                  onClick={() => handleWatchAd(ad.id)}
                  className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={ad.posterImage}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Play icon button in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-orange-500 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                      {ad.dealBadge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/70 text-slate-200 text-[10px] font-mono backdrop-blur-sm">
                      0:{ad.durationSeconds}
                    </span>
                  </div>

                  {/* Bottom tagline inside video */}
                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide block">
                      {ad.tone} Commercial
                    </span>
                    <p className="text-xs font-black text-white truncate">
                      {ad.title}
                    </p>
                  </div>
                </div>

                {/* Product Detail & Instant Buy Strip */}
                {associatedProduct && (
                  <div className="p-3.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-400 truncate block">
                        Temu Super Deal
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-black text-rose-400">
                          {formatPrice(associatedProduct.price)}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          {formatPrice(associatedProduct.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setActiveProductModal(associatedProduct)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        title="View Product Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          addToCart(associatedProduct);
                          showToast(`Added ${associatedProduct.title} to cart!`, 'success');
                        }}
                        className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1 shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>
              All commercials generated with high-definition rendering and dynamic AI voiceover scripts.
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedCommercialId(AI_COMMERCIAL_ADS[0].id);
              setIsAICommercialOpen(true);
            }}
            className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 cursor-pointer transition-all"
          >
            <span>Open AI Commercial Studio & All Channels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
