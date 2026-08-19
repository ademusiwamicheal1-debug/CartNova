import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingModalOpen, setIsTrackingModalOpen, orders, formatPrice } = useShop();
  const [searchTrackingNumber, setSearchTrackingNumber] = useState('');
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);

  if (!isTrackingModalOpen) return null;

  const activeOrder = orders[selectedOrderIndex] || null;

  const TRACKING_STEPS = [
    { title: 'Order Confirmed', date: 'Today, 10:24 AM', desc: 'Payment escrow verified & seller received order', done: true },
    { title: 'Packed at Hub', date: 'Today, 1:15 PM', desc: 'Verified by quality inspection team in central warehouse', done: true },
    { title: 'In Transit via NovaExpress', date: 'Today, 3:45 PM', desc: 'Dispatched on high-speed regional logistics route', done: true, current: true },
    { title: 'Out for Delivery', date: 'Tomorrow, 9:00 AM', desc: 'Assigned to local express delivery courier', done: false },
    { title: 'Delivered & Handed Over', date: 'Tomorrow, 4:00 PM', desc: 'Delivered directly to doorstep or pickup locker', done: false }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black font-display text-white">
                NovaExpress Live Order Tracking
              </h2>
              <p className="text-[11px] text-cyan-300">
                Real-time GPS dispatch & checkpoint telemetry
              </p>
            </div>
          </div>

          <button
            id="btn-close-order-tracking"
            onClick={() => setIsTrackingModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Tracking Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Tracking No. (e.g. NVX-88291044)"
                value={searchTrackingNumber}
                onChange={(e) => setSearchTrackingNumber(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-orange-500"
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
              Track
            </button>
          </div>

          {activeOrder ? (
            <div className="space-y-6">
              {/* Order High Level Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Tracking Number: <span className="text-orange-600 font-mono">{activeOrder.trackingNumber}</span>
                  </div>
                  <div className="text-sm font-black text-slate-900 font-display mt-0.5">
                    Estimated Delivery: {activeOrder.estimatedDelivery}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Destination: {activeOrder.shippingAddress.address}, {activeOrder.shippingAddress.city}
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-cyan-100 text-cyan-800 text-xs font-black px-2.5 py-1 rounded-lg">
                    In Transit via Priority Air/Road
                  </span>
                </div>
              </div>

              {/* Checkpoint Progress Timeline */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">
                  Logistics Milestones
                </h4>

                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {TRACKING_STEPS.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs ${
                          step.done
                            ? step.current
                              ? 'bg-orange-500 text-white ring-4 ring-orange-100 animate-pulse'
                              : 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {step.done ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs font-bold ${step.current ? 'text-orange-600' : 'text-slate-900'}`}>
                            {step.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this shipment */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                  Parcel Contents ({activeOrder.items.length} items)
                </h4>
                <div className="space-y-2">
                  {activeOrder.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <img
                        src={item.product.thumbnail}
                        alt=""
                        className="w-10 h-10 object-contain bg-white rounded-lg p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{item.product.title}</div>
                        <div className="text-[11px] text-slate-500">Qty: {item.quantity} • {formatPrice(item.product.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-500">
              No recent orders found. Place your first order to track live delivery!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
