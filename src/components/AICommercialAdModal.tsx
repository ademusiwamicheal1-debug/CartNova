import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Eye,
  Share2,
  ThumbsUp,
  RotateCcw,
  Film,
  Layers,
  Wand2,
  CheckCircle,
  Tv,
  ChevronRight,
  TrendingUp,
  Tag,
  Zap
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AI_COMMERCIAL_ADS } from '../data/aiCommercialsData';
import { AICommercialAd, Product } from '../types';

export const AICommercialAdModal: React.FC = () => {
  const {
    isAICommercialOpen,
    setIsAICommercialOpen,
    selectedCommercialId,
    setSelectedCommercialId,
    products,
    addToCart,
    setActiveProductModal,
    formatPrice,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'watch' | 'generator'>('watch');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceOverActive, setIsVoiceOverActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [likedAds, setLikedAds] = useState<Record<string, boolean>>({});
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // AI Generator state
  const [selectedProductForAd, setSelectedProductForAd] = useState<string>(products[0]?.id || '');
  const [selectedTone, setSelectedTone] = useState<'Viral TikTok' | 'Cinematic SuperBowl' | 'ASMR Aesthetic' | 'Direct Response Infomercial'>('Viral TikTok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);

  // Find active commercial ad or match product
  const currentAd: AICommercialAd =
    AI_COMMERCIAL_ADS.find(
      ad => ad.id === selectedCommercialId || ad.productId === selectedCommercialId
    ) || AI_COMMERCIAL_ADS[0];

  // Match corresponding product from catalog
  const associatedProduct: Product | undefined = products.find(
    p => p.id === currentAd.productId || p.slug === currentAd.productId
  ) || products[0];

  // Sync video play state
  useEffect(() => {
    setVideoError(false);
    if (!isAICommercialOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsVoiceOverActive(false);
      return;
    }

    setIsPlaying(true);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isAICommercialOpen, selectedCommercialId]);

  // Voiceover narrator synth
  const toggleVoiceOver = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.', 'info');
      return;
    }

    if (isVoiceOverActive) {
      window.speechSynthesis.cancel();
      setIsVoiceOverActive(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentAd.scriptNarrator);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsVoiceOverActive(false);
      utterance.onerror = () => setIsVoiceOverActive(false);
      window.speechSynthesis.speak(utterance);
      setIsVoiceOverActive(true);
      showToast('AI Voiceover narration started!', 'success');
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 30);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (adId: string) => {
    setLikedAds(prev => ({ ...prev, [adId]: !prev[adId] }));
    showToast(likedAds[adId] ? 'Removed like' : 'Liked this commercial!', 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Commercial link copied to clipboard!', 'success');
    }
  };

  const handleGenerateCustomCommercial = () => {
    const prod = products.find(p => p.id === selectedProductForAd);
    if (!prod) return;

    setIsGenerating(true);
    setTimeout(() => {
      let script = '';
      if (selectedTone === 'Viral TikTok') {
        script = `Stop scrolling! Did you know you can get the ${prod.title} at 75% off direct factory price? It features ${prod.keyFeatures[0] || 'cutting-edge performance'} and 24-hour express delivery. Grab the Temu super deal on Cart NOVA before stock runs out!`;
      } else if (selectedTone === 'Cinematic SuperBowl') {
        script = `Precision. Power. Innovation. Meet the all-new ${prod.title}. Designed with ${prod.keyFeatures[0] || 'mastercraft durability'}, now accessible to everyone. Experience the future today.`;
      } else if (selectedTone === 'ASMR Aesthetic') {
        script = `Listen closely... Unboxing the all-new ${prod.title}. Feel the ultra-smooth texture and premium finish. Elevate your everyday aesthetic effortlessly.`;
      } else {
        script = `Are you tired of overpaying for ${prod.subcategory || 'everyday essentials'}? The ${prod.title} solves your problems with ${prod.keyFeatures[0] || 'instant convenience'}. Over ${prod.soldCount.toLocaleString()} happy customers cannot be wrong. Order yours now for just $${prod.price.toFixed(2)}!`;
      }
      setGeneratedScript(script);
      setIsGenerating(false);
      showToast('AI Commercial Script generated successfully!', 'success');
    }, 1200);
  };

  if (!isAICommercialOpen) return null;

  return (
    <div
      id="ai-commercial-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      <div
        id="ai-commercial-modal-container"
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <Tv className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                  Nova TV <span className="text-rose-400 font-extrabold text-xs px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 uppercase">AI Commercial Spot</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Live Video Ads, Instant Product Showcase & Factory-Direct Temu Mega Deals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setActiveTab('watch')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'watch'
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Watch Ads Reel
              </button>
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'generator'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                AI Ad Creator
              </button>
            </div>

            <button
              onClick={() => setIsAICommercialOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              aria-label="Close Commercial Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="sm:hidden flex border-b border-slate-800 bg-slate-950/80 px-3 py-2 gap-2">
          <button
            onClick={() => setActiveTab('watch')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg text-center transition-all ${
              activeTab === 'watch' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Watch Ads Reel
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
              activeTab === 'generator' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Wand2 className="w-3 h-3" />
            AI Ad Creator
          </button>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'watch' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-slate-800">
              {/* Left 8 Cols: Video Player & Overlays */}
              <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col justify-between bg-slate-950/90">
                {/* Commercial Video Screen Frame */}
                <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 group">
                  {!videoError ? (
                    <video
                      key={currentAd.id}
                      ref={videoRef}
                      poster={currentAd.posterImage}
                      className="w-full h-full object-cover"
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={() => setIsPlaying(false)}
                      onError={() => setVideoError(true)}
                      playsInline
                      autoPlay
                      muted={isMuted}
                      loop
                    >
                      <source src={currentAd.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    /* High-tech Animated Spotlight Fallback */
                    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                      <img
                        src={currentAd.posterImage}
                        alt={currentAd.title}
                        className={`w-full h-full object-cover filter brightness-75 transition-transform duration-1000 ${
                          isPlaying ? 'scale-110 animate-pulse' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                        <div className="w-16 h-16 rounded-2xl bg-rose-600/90 text-white flex items-center justify-center shadow-2xl shadow-rose-600/40 animate-bounce mb-3">
                          <Tv className="w-8 h-8" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-wider mb-2">
                          AI Broadcast Spotlight Mode
                        </span>
                        <h3 className="text-base sm:text-xl font-black text-white max-w-md drop-shadow">
                          {currentAd.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm drop-shadow">
                          {currentAd.tagline}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Top Video Overlay: Deal Badge & Live Indicator */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg shadow-rose-900/40 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        LIVE AD SPOTLIGHT
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[11px] font-black uppercase tracking-wide backdrop-blur-md shadow">
                        {currentAd.dealBadge}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-lg bg-black/60 text-slate-300 text-xs font-mono backdrop-blur-md">
                      {Math.floor(currentTime)}s / {Math.floor(duration)}s
                    </span>
                  </div>

                  {/* Floating Product Quick Buy Overlay */}
                  {associatedProduct && (
                    <div className="absolute bottom-14 left-3 right-3 z-10">
                      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-xl p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={associatedProduct.thumbnail}
                            alt={associatedProduct.title}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover bg-slate-800 flex-shrink-0 ring-1 ring-orange-500/50"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-black text-orange-400 tracking-wider block truncate">
                              FEATURED IN COMMERCIAL
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-[280px]">
                              {associatedProduct.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm sm:text-base font-black text-rose-400">
                                {formatPrice(associatedProduct.price)}
                              </span>
                              <span className="text-[11px] text-slate-400 line-through">
                                {formatPrice(associatedProduct.originalPrice)}
                              </span>
                              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                                -{associatedProduct.discountPercent}% OFF
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => {
                              setActiveProductModal(associatedProduct);
                              setIsAICommercialOpen(false);
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                            title="Quick View Details"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Details</span>
                          </button>
                          <button
                            onClick={() => {
                              addToCart(associatedProduct);
                              showToast(`Added "${associatedProduct.title}" to cart at commercial deal price!`, 'success');
                            }}
                            className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Instant Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={toggleVoiceOver}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isVoiceOverActive
                            ? 'bg-rose-500 text-white shadow-md animate-pulse'
                            : 'bg-white/20 hover:bg-white/30 text-slate-200 backdrop-blur-sm'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>AI Narrator {isVoiceOverActive ? 'Speaking' : 'Voice'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(currentAd.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${
                          likedAds[currentAd.id] ? 'bg-rose-500/30 text-rose-400' : 'bg-white/20 text-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{(currentAd.likesCount + (likedAds[currentAd.id] ? 1 : 0)).toLocaleString()}</span>
                      </button>
                      <button
                        onClick={handleShare}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                        title="Share Commercial"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Commercial Narrative & Key Highlights */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        AI Teleprompter Script:
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                        {currentAd.tone} Tone
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {currentAd.viewCount.toLocaleString()} Total Ad Views
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    "{currentAd.scriptNarrator}"
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentAd.highlightPoints.map((point, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Commercial Channels Playlist */}
              <div className="lg:col-span-4 p-4 bg-slate-900/95 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-orange-400" />
                    Trending Commercial Reels
                  </h4>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {AI_COMMERCIAL_ADS.length} Spots Available
                  </span>
                </div>

                <div className="space-y-2.5 overflow-y-auto max-h-[480px] pr-1">
                  {AI_COMMERCIAL_ADS.map(ad => {
                    const isSelected = ad.id === currentAd.id;
                    const prod = products.find(p => p.id === ad.productId);

                    return (
                      <div
                        key={ad.id}
                        onClick={() => {
                          setSelectedCommercialId(ad.id);
                          setIsPlaying(true);
                        }}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                          isSelected
                            ? 'bg-orange-500/15 border-orange-500/80 ring-1 ring-orange-500/30'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                          <img
                            src={ad.posterImage}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-white/80 text-slate-900 flex items-center justify-center">
                              <Play className="w-3 h-3 ml-0.5 fill-slate-900" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[9px] font-mono text-white">
                            {ad.durationSeconds}s
                          </span>
                        </div>

                        <div className="min-w-0 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-orange-400 block truncate">
                              {ad.dealBadge}
                            </span>
                            <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                              {ad.title}
                            </h5>
                          </div>

                          {prod && (
                            <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800">
                              <span className="text-xs font-black text-rose-400">
                                {formatPrice(prod.price)}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {ad.viewCount.toLocaleString()} views
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* AI Ad Creator Studio */
            <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  <Wand2 className="w-3.5 h-3.5" />
                  Instant AI Commercial Studio
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Generate an AI Commercial for Any Product
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                  Pick any item from the 200+ Temu catalog, select your marketing tone, and let Gemini AI create a broadcast-ready commercial script and story breakdown.
                </p>
              </div>

              <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
                {/* 1. Select Product */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    1. Select Target Product from Catalog ({products.length} Products Available):
                  </label>
                  <select
                    value={selectedProductForAd}
                    onChange={e => setSelectedProductForAd(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {products.slice(0, 100).map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} — ${p.price.toFixed(2)} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Choose Tone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    2. Select Commercial Video Tone:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Viral TikTok', 'Cinematic SuperBowl', 'ASMR Aesthetic', 'Direct Response Infomercial'] as const).map(
                      tone => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => setSelectedTone(tone)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                            selectedTone === tone
                              ? 'bg-purple-600/30 border-purple-500 text-purple-200 ring-1 ring-purple-500'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {tone}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateCustomCommercial}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Synthesizing Commercial Script...' : 'Generate Commercial Ad Spot'}</span>
                </button>
              </div>

              {/* Generated Result Output */}
              {generatedScript && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/50 shadow-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Generated Commercial Teleprompter Script
                    </span>
                    <button
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utt = new SpeechSynthesisUtterance(generatedScript);
                          utt.rate = 1.05;
                          window.speechSynthesis.speak(utt);
                          showToast('Playing AI voice narration preview!', 'success');
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      Play AI Voice Preview
                    </button>
                  </div>

                  <p className="text-sm text-slate-100 italic bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed">
                    "{generatedScript}"
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(generatedScript);
                          showToast('Script copied to clipboard!', 'success');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
                    >
                      Copy Script
                    </button>
                    <button
                      onClick={() => {
                        const prod = products.find(p => p.id === selectedProductForAd);
                        if (prod) {
                          setActiveProductModal(prod);
                          setIsAICommercialOpen(false);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Product Page
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
