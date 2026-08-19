import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Camera, Upload, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const VisualSearchModal: React.FC = () => {
  const {
    isVisualSearchOpen,
    setIsVisualSearchOpen,
    setSearchQuery,
    showToast
  } = useShop();

  const [analyzing, setAnalyzing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const SAMPLE_ITEMS = [
    { name: 'Wireless ANC Headphones', query: 'headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' },
    { name: 'Running Sneakers', query: 'shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80' },
    { name: 'Titanium Smartwatch', query: 'smartwatch', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' },
    { name: 'Air Fryer Kitchen', query: 'fryer', img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&auto=format&fit=crop&q=80' }
  ];

  if (!isVisualSearchOpen) return null;

  const handleSimulateVisualSearch = (query: string, img: string) => {
    setPreviewImage(img);
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setIsVisualSearchOpen(false);
      setSearchQuery(query);
      showToast(`Visual match found for "${query}"!`, 'success');
      const el = document.getElementById('marketplace-products-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewImage(result);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setIsVisualSearchOpen(false);
          setSearchQuery('audio');
          showToast('Found 4 visual matches in catalog!', 'success');
        }, 1200);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full my-auto shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden relative p-6 text-slate-900 dark:text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-display text-slate-900 dark:text-white">
                Visual Image Search
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Find exact products or similar styles using photos
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVisualSearchOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag Drop or Upload Box */}
        <label className="border-2 border-dashed border-orange-300 dark:border-orange-500/40 hover:border-orange-500 bg-orange-50/40 dark:bg-orange-950/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors mb-5 block">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-2" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Click to upload an image or take a photo
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            PNG, JPG, WEBP up to 10MB
          </span>
        </label>

        {analyzing ? (
          <div className="py-6 text-center text-xs text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-orange-500" />
            <span>Analyzing visual patterns & matching catalog items...</span>
          </div>
        ) : (
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              Or Try One of These Sample Photos
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {SAMPLE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSimulateVisualSearch(item.query, item.img)}
                  className="bg-slate-50 dark:bg-slate-800/60 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-orange-300 rounded-2xl p-2.5 flex items-center gap-2.5 cursor-pointer transition-all"
                >
                  <img src={item.img} alt="" className="w-10 h-10 object-cover rounded-xl shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</div>
                    <div className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold">Click to Match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
