import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  X,
  Store,
  ShieldCheck,
  Star,
  Users,
  Clock,
  MapPin,
  MessageCircle,
  Heart,
  Search,
  CheckCircle2,
  Truck,
  Sparkles,
  Send,
  Award
} from 'lucide-react';

export const SellerStoreModal: React.FC = () => {
  const {
    selectedSeller,
    isSellerStoreOpen,
    setIsSellerStoreOpen,
    products,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'chat'>('products');
  const [storeSearchQuery, setStoreSearchQuery] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'seller'; text: string; time: string }>>([
    {
      sender: 'seller',
      text: `Hello! Welcome to our official store on Cart NOVA. How can we assist you with our product specifications, shipping, or warranty today?`,
      time: 'Just now'
    }
  ]);

  if (!isSellerStoreOpen || !selectedSeller) return null;

  // Filter products by this seller
  const sellerProducts = products.filter(p => p.seller.id === selectedSeller.id || p.seller.name === selectedSeller.name);

  const displayedProducts = sellerProducts.filter(p => {
    if (!storeSearchQuery.trim()) return true;
    const q = storeSearchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    showToast(
      isFollowing ? `Unfollowed ${selectedSeller.name}` : `You are now following ${selectedSeller.name}! You'll receive instant alerts on new store drops and VIP coupons.`,
      'success'
    );
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userMsg, time: timeNow }
    ]);
    setChatInput('');

    // Seller simulated auto reply
    setTimeout(() => {
      let reply = `Thank you for reaching out to ${selectedSeller.name}! Our representative has noted: "${userMsg}". All our products feature official factory warranty and are dispatched directly from our ${selectedSeller.shipsFrom} with express next-day delivery.`;
      if (userMsg.toLowerCase().includes('discount') || userMsg.toLowerCase().includes('deal')) {
        reply = `Thanks for asking! You can use code "NOVA-STORE10" or check out our active bundle promotions on this store page!`;
      } else if (userMsg.toLowerCase().includes('warranty') || userMsg.toLowerCase().includes('return')) {
        reply = `All our products come with a 2-Year official replacement warranty and 15-day hassle-free returns backed by Cart NOVA Escrow Protection.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'seller',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Store Banner Hero */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
          {/* Close button */}
          <button
            id="btn-close-seller-store"
            onClick={() => setIsSellerStoreOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Store Avatar & Details */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-xl shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-orange-400">
                  <Store className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-black font-display text-white">
                    {selectedSeller.name}
                  </h1>
                  {selectedSeller.isVerified && (
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      {selectedSeller.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedSeller.rating} / 5.0</span>
                    <span className="text-slate-400 font-normal">({selectedSeller.scorePercent}% Positive)</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{(selectedSeller.followers + (isFollowing ? 1 : 0)).toLocaleString()} Followers</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Response: {selectedSeller.responseRate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>Ships directly from: <strong className="text-slate-300">{selectedSeller.shipsFrom}</strong></span>
                </div>
              </div>
            </div>

            {/* Follow & Chat Buttons */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                id="btn-follow-seller-store"
                onClick={handleFollowToggle}
                className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isFollowing
                    ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-red-400 text-red-400' : ''}`} />
                <span>{isFollowing ? 'Following' : 'Follow Store'}</span>
              </button>

              <button
                id="btn-chat-with-seller"
                onClick={() => setActiveTab('chat')}
                className="flex-1 md:flex-initial bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Chat with Merchant</span>
              </button>
            </div>
          </div>

          {/* Store Tabs Navigation */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
                activeTab === 'products'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>Store Products ({sellerProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
                activeTab === 'about'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Merchant Verification & Policies</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
                activeTab === 'chat'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct Store Inquiries</span>
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* In-Store Search Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={storeSearchQuery}
                    onChange={(e) => setStoreSearchQuery(e.target.value)}
                    placeholder={`Search within ${selectedSeller.name}...`}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  {storeSearchQuery && (
                    <button
                      onClick={() => setStoreSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="text-xs text-slate-500 hidden sm:inline">
                  Showing <strong>{displayedProducts.length}</strong> items in this store
                </span>
              </div>

              {/* Products Grid */}
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                  <p className="text-sm font-bold text-slate-700">No products matched "{storeSearchQuery}" in this store</p>
                  <button
                    onClick={() => setStoreSearchQuery('')}
                    className="mt-3 text-xs font-bold text-orange-600 hover:underline"
                  >
                    Clear store search
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-black font-display text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-600" />
                  <span>Cart NOVA Merchant Trust & Escrow Guarantee</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>{selectedSeller.name}</strong> is a thoroughly vetted, verified merchant operating in accordance with Cart NOVA's strict commercial standards. All sales are protected by our Buyer Escrow Protection program, ensuring your funds are held safely until you receive your goods in perfect condition.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Express Shipping</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Dispatched from {selectedSeller.shipsFrom} with automated barcode tracking.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                      <span>100% Genuine Guarantee</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Certified authentic stock directly sourced from original factories and brand licensors.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Official Warranty</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Eligible for comprehensive manufacturer replacement & 15-day refund protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[420px]">
              {/* Chat Header */}
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold">{selectedSeller.name} Customer Care</span>
                </div>
                <span className="text-[11px] text-slate-400">Average response: &lt; 5 mins</span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                        msg.sender === 'user'
                          ? 'bg-orange-500 text-white rounded-tr-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Ask ${selectedSeller.name} a question...`}
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white p-2 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
