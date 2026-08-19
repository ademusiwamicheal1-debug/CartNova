import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Store,
  TrendingUp,
  Package,
  DollarSign,
  ShieldCheck,
  Users,
  CheckCircle2,
  Upload,
  Plus
} from 'lucide-react';

export const SellerPortalModal: React.FC = () => {
  const { isSellerPortalOpen, setIsSellerPortalOpen, formatPrice } = useShop();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'register'>('dashboard');
  const [storeName, setStoreName] = useState('Apex Digital Electronics');
  const [category, setCategory] = useState('phones-tablets');
  const [isRegistered, setIsRegistered] = useState(true);

  if (!isSellerPortalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black font-display text-white">
                Cart NOVA Merchant & Seller Center
              </h2>
              <p className="text-[11px] text-orange-300">
                Reach over 14.8M active shoppers with 0% listing fees & express fulfillment
              </p>
            </div>
          </div>

          <button
            id="btn-close-seller-portal"
            onClick={() => setIsSellerPortalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Top Performance Stats (Simulator) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-3.5">
              <div className="text-[11px] font-bold text-orange-800 uppercase tracking-wider">30-Day Revenue</div>
              <div className="text-xl font-black text-orange-700 font-display mt-0.5">{formatPrice(48290)}</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ +24.8% vs last mo.</div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Orders Dispatched</div>
              <div className="text-xl font-black text-emerald-700 font-display mt-0.5">1,482</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">99.8% On-time</div>
            </div>

            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-3.5">
              <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Store Rating</div>
              <div className="text-xl font-black text-blue-700 font-display mt-0.5">4.92 ★</div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1">Verified Official</div>
            </div>

            <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-3.5">
              <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">Active Inventory</div>
              <div className="text-xl font-black text-purple-700 font-display mt-0.5">64 SKUs</div>
              <div className="text-[10px] text-purple-600 font-semibold mt-1">All in Hub Stock</div>
            </div>
          </div>

          {/* Seller Perks */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              Why 120,000+ Brands & Creators Sell on Cart NOVA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>0% Commission for 30 Days</strong> on new seller registrations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>NovaExpress Fulfillment</strong> storage & next-day courier handling</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AI Marketing Boost</strong> automatic social promotion & live drops</span>
              </div>
            </div>
          </div>

          {/* Quick Listing Action */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Logged in as Merchant: <strong className="text-slate-800">{storeName}</strong>
            </div>
            <button
              onClick={() => setIsSellerPortalOpen(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
            >
              Return to Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
