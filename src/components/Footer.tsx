import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Store,
  QrCode,
  Smartphone,
  Globe,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setSelectedCategory,
    setIsSellerPortalOpen,
    setIsAIAssistantOpen,
    setIsLuckyWheelOpen,
    setIsTrackingModalOpen,
    setIsShoppingApisModalOpen
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">NovaExpress Delivery</div>
              <div className="text-xs text-slate-400">Fast next-day priority dispatch</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Escrow Buyer Protection</div>
              <div className="text-xs text-slate-400">100% money back guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">15-Day Free Returns</div>
              <div className="text-xs text-slate-400">Hassle-free doorstep pickup</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">24/7 Priority Support</div>
              <div className="text-xs text-slate-400">Live agent & AI assistance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links & Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">CART NOVA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Cart NOVA is the modern mega online marketplace connecting millions of verified global brands, independent artisans, and shoppers with real-time flash drops, group buying squads, and AI-powered intelligence.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Subscribe for Secret VIP Flash Vouchers
              </div>
              {subscribed ? (
                <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30">
                  ✓ Subscribed! Check your inbox for your $15 welcome code.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Marketplace Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Marketplace Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('flash-drops-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  ⚡ Lightning Flash Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('team-save-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  👥 Team Save Squad Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('nova-mall-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🛡️ Official Verified Brand Mall
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLuckyWheelOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🎁 Daily Voucher Spin Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAIAssistantOpen(true)}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  🤖 Nova AI Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setSelectedCategory('phones-tablets')} className="hover:text-white transition-colors cursor-pointer">
                  Phones & Tablets
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('audio-wearables')} className="hover:text-white transition-colors cursor-pointer">
                  Audio & Wearables
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('home-appliances')} className="hover:text-white transition-colors cursor-pointer">
                  Home & Smart Kitchen
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('fashion-apparel')} className="hover:text-white transition-colors cursor-pointer">
                  Fashion & Streetwear
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('power-solar')} className="hover:text-white transition-colors cursor-pointer">
                  Solar & Power Stations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sell & Logistics */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Partner & Sell
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setIsSellerPortalOpen(true)} className="hover:text-orange-400 font-bold transition-colors cursor-pointer flex items-center gap-1">
                  <Store className="w-3.5 h-3.5" /> Sell on Cart NOVA
                </button>
              </li>
              <li>
                <button onClick={() => setIsTrackingModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  NovaExpress Logistics Portal
                </button>
              </li>
              <li>
                <span className="text-slate-500">Regional Fulfillment Warehouses</span>
              </li>
              <li>
                <span className="text-slate-500">Affiliate Creator Network</span>
              </li>
              <li>
                <button
                  onClick={() => setIsShoppingApisModalOpen(true)}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  🌐 Public Shopping APIs (publicapis.io)
                </button>
              </li>
              <li>
                <span className="text-slate-500">Developer API & Webhooks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Payment Security */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 Cart NOVA Marketplace Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Escrow Protocol</span>
            <span>•</span>
            <span>Dispute Resolution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
