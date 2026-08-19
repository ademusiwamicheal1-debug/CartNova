import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, CheckCircle2, Star, Sparkles, ArrowRight, Award } from 'lucide-react';

export const NovaMallSection: React.FC = () => {
  const {
    products,
    formatPrice,
    setActiveProductModal
  } = useShop();

  const mallProducts = products.filter(p => p.isOfficialMall).slice(0, 6);

  const MALL_BENEFITS = [
    { title: '100% Authentic Guarantee', desc: 'Direct from authorized brand manufacturers' },
    { title: '15-Day Easy Free Return', desc: 'Hassle-free refunds with instant pickup' },
    { title: 'NovaExpress Priority', desc: 'Guaranteed next-day delivery on all mall orders' },
    { title: 'Official Manufacturer Warranty', desc: 'Up to 3-5 years extended warranty coverage' }
  ];

  return (
    <section id="nova-mall-section" className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL VERIFIED BRAND MALL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white">
              NovaMall Official Flagship Stores
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Shop directly from global authorized brand creators with guaranteed authenticity, dedicated support, and manufacturer warranty.
            </p>
          </div>

          {/* Benefits 4-grid */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {MALL_BENEFITS.map((b, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">{b.title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mall Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
          {mallProducts.map(product => (
            <div
              key={product.id}
              onClick={() => setActiveProductModal(product)}
              className="bg-slate-800/90 hover:bg-slate-800 rounded-2xl p-3 border border-slate-700/80 hover:border-amber-400/80 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Brand Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400 text-[11px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="h-32 bg-slate-900 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 line-clamp-2 leading-snug mb-2">
                  {product.title}
                </h3>
              </div>

              <div>
                <div className="text-sm sm:text-base font-black text-amber-400 font-display">
                  {formatPrice(product.price)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {product.soldCount.toLocaleString()}+ orders
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
