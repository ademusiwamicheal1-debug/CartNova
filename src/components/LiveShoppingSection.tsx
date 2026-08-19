import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { LIVE_STREAMS } from '../data/mockData';
import { Radio, Users, ShoppingCart, Play, Sparkles, Heart } from 'lucide-react';
import { LiveStreamShopping } from '../types';

export const LiveShoppingSection: React.FC = () => {
  const { formatPrice, addToCart, setActiveProductModal } = useShop();
  const [activeStream, setActiveStream] = useState<LiveStreamShopping>(LIVE_STREAMS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedCount, setLikedCount] = useState(1280);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikedCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-indigo-900/50">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center animate-pulse">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                  NOVA LIVE SHOPPING & VIRAL DROPS
                </h2>
                <span className="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  LIVE NOW
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Watch real hands-on tests, teardowns, and live discount drops with instant 1-tap cart additions.
              </p>
            </div>
          </div>
        </div>

        {/* Live Stream Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Active Stream Player Preview (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-slate-950 overflow-hidden relative border border-slate-800 flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
            {/* Video Background Image */}
            <div className="absolute inset-0">
              <img
                src={activeStream.videoThumb}
                alt={activeStream.title}
                className="w-full h-full object-cover opacity-60 scale-105 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60"></div>
            </div>

            {/* Top Player Badges */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Radio className="w-3.5 h-3.5" /> LIVE
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10 font-mono">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  {activeStream.viewers.toLocaleString()} watching
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer ${
                    hasLiked ? 'text-red-500 bg-red-950/80' : 'text-white hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-500' : ''}`} />
                  <span>{likedCount}</span>
                </button>
              </div>
            </div>

            {/* Middle Play Action Simulator */}
            <div className="relative z-10 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-orange-500/90 hover:bg-orange-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 transform hover:scale-110 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Play className="w-7 h-7 fill-white ml-1" />
              </button>
            </div>

            {/* Bottom Floating Pinned Product Card */}
            <div className="relative z-10 p-4">
              <div className="bg-slate-900/90 backdrop-blur-md border border-white/15 rounded-2xl p-3 flex items-center justify-between gap-3 max-w-xl">
                <div
                  onClick={() => setActiveProductModal(activeStream.featuredProduct)}
                  className="flex items-center gap-3 cursor-pointer overflow-hidden"
                >
                  <img
                    src={activeStream.featuredProduct.thumbnail}
                    alt={activeStream.featuredProduct.title}
                    className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-orange-400 uppercase">Live Feature Deal</div>
                    <div className="text-xs font-bold text-white truncate max-w-xs">{activeStream.featuredProduct.title}</div>
                    <div className="text-sm font-black text-amber-400 font-display">
                      {formatPrice(activeStream.featuredProduct.price)}
                    </div>
                  </div>
                </div>

                <button
                  id={`btn-live-buy-${activeStream.featuredProduct.id}`}
                  onClick={() => addToCart(activeStream.featuredProduct, 1)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Stream Queue Selection (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Active Broadcasts & Reviews
            </div>
            {LIVE_STREAMS.map(stream => (
              <div
                key={stream.id}
                onClick={() => setActiveStream(stream)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  activeStream.id === stream.id
                    ? 'bg-slate-800/90 border-orange-500/80 shadow-md ring-1 ring-orange-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="w-20 h-16 rounded-xl bg-slate-950 overflow-hidden relative shrink-0">
                  <img
                    src={stream.videoThumb}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[9px] font-black px-1 rounded">
                    LIVE
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mb-0.5">
                    <img src={stream.hostAvatar} alt={stream.hostName} className="w-4 h-4 rounded-full" />
                    <span className="truncate">{stream.hostName}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-2 leading-tight">
                    {stream.title}
                  </h4>
                  <div className="text-[11px] font-bold text-amber-400 mt-1">
                    {formatPrice(stream.featuredProduct.price)} (-{stream.discountPercent}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
