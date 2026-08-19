import React from 'react';
import { useShop } from '../context/ShopContext';
import { Users, Flame, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const TeamSaveSection: React.FC = () => {
  const {
    products,
    formatPrice,
    addToCart,
    setActiveProductModal,
    showToast
  } = useShop();

  const groupBuyProducts = products.filter(p => p.groupBuy && p.groupBuy.enabled);

  return (
    <section id="team-save-section" className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Header Container */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border border-purple-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                TEAM SAVE • GROUP BUY SQUAD DEALS
              </h2>
              <span className="bg-pink-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                Slash Up to 60%
              </span>
            </div>
            <p className="text-xs text-purple-200">
              Team up with other Cart NOVA shoppers. Unlock wholesale pricing instantly when a squad fills.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-950/80 px-3.5 py-2 rounded-2xl border border-purple-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>If squad doesn't fill in 24h, you get an automatic full refund</span>
        </div>
      </div>

      {/* Group Buy Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {groupBuyProducts.map(product => {
          if (!product.groupBuy) return null;
          const savings = product.price - product.groupBuy.groupPrice;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-purple-100 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-[11px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-pink-600 text-pink-600 dark:fill-pink-400 dark:text-pink-400" />
                    Save extra {formatPrice(savings)}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    2-Person Squad
                  </span>
                </div>

                {/* Product Thumbnail */}
                <div
                  onClick={() => setActiveProductModal(product)}
                  className="h-44 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-3 flex items-center justify-center overflow-hidden cursor-pointer mb-3"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Title & Brand */}
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{product.brand}</div>
                <h3
                  onClick={() => setActiveProductModal(product)}
                  className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2 cursor-pointer mb-2.5 leading-snug"
                >
                  {product.title}
                </h3>

                {/* Squad Price vs Solo Price */}
                <div className="bg-purple-50 dark:bg-purple-950/40 rounded-2xl p-3 mb-3 border border-purple-100 dark:border-purple-900/40">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-bold text-purple-900 dark:text-purple-300">Squad Price:</span>
                    <span className="text-lg font-black text-purple-700 dark:text-purple-400 font-display">
                      {formatPrice(product.groupBuy.groupPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Solo Price:</span>
                    <span className="line-through">{formatPrice(product.price)}</span>
                  </div>
                </div>

                {/* Squad Members Avatar Status */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-xs">
                      M
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-800 border-dashed">
                      +1
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400">
                    1 person waiting to join!
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  id={`btn-join-squad-${product.id}`}
                  onClick={() => {
                    addToCart(product, 1, undefined, undefined, true);
                    showToast(`Joined Squad Buy for "${product.title.slice(0, 20)}..."!`, 'success');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-95 text-white font-black py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Join Squad ({formatPrice(product.groupBuy.groupPrice)})</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(product, 1, undefined, undefined, false);
                    showToast(`Added Solo Item "${product.title.slice(0, 20)}..." to cart`, 'info');
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 px-3 rounded-xl text-[11px] transition-colors cursor-pointer"
                >
                  Buy Solo at {formatPrice(product.price)}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
