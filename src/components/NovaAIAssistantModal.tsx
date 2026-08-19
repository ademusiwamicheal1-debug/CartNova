import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ShoppingCart,
  Zap,
  Tag,
  ArrowRight,
  Gift,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { AIAssistantMessage } from '../types';

export const NovaAIAssistantModal: React.FC = () => {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    products,
    cart,
    formatPrice,
    addToCart,
    setActiveProductModal,
    applyCoupon
  } = useShop();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AIAssistantMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "👋 Hi! I'm Nova, your personal AI shopping concierge powered by Gemini 3.7. Ask me for product recommendations, spec comparisons, gift matching, or deal negotiations!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Best wireless headphones under $100',
        'Top kitchen appliances for fast meals',
        'Give me a secret voucher code',
        'Compare Smartwatches for fitness'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAIAssistantOpen) {
      scrollToBottom();
    }
  }, [messages, isAIAssistantOpen]);

  if (!isAIAssistantOpen) return null;

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    setInputMessage('');

    // Append user message
    const userMsg: AIAssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Server-side Gemini API call
      const response = await fetch('/api/nova-ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: textToSend,
          cartItems: cart.map(c => ({ title: c.product.title, price: c.product.price })),
          catalogContext: products.slice(0, 15).map(p => ({
            id: p.id,
            title: p.title,
            brand: p.brand,
            category: p.category,
            price: p.price,
            originalPrice: p.originalPrice,
            rating: p.rating,
            discountPercent: p.discountPercent
          }))
        })
      });

      const data = await response.json();

      // Resolve recommended products from catalog IDs
      const matchedProducts = data.recommendedProductIds
        ? products.filter(p => data.recommendedProductIds.includes(p.id))
        : [];

      // Auto-apply suggested coupon if any
      if (data.couponUnlocked) {
        applyCoupon(data.couponUnlocked);
      }

      const botMsg: AIAssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Here's what I found for you in the Cart NOVA marketplace:",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProducts: matchedProducts,
        couponUnlocked: data.couponUnlocked,
        suggestions: data.suggestions || ['Show more flash deals', 'Check express delivery times', 'How do returns work?']
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('AI assistant error:', err);
      // Fallback message
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: "I found great options in our top trending catalog! Check out our flagship NovaSound ANC Pro or Air Fryer Pro.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProducts: products.slice(0, 2)
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-2xl w-full h-[85vh] shadow-2xl flex flex-col justify-between overflow-hidden relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black font-display text-white">
                  Nova AI Shopping Assistant
                </h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Gemini 3.7
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Personalized catalog intelligence, reviews synthesis & deal finder
              </p>
            </div>
          </div>

          <button
            id="btn-close-ai-assistant"
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Flow */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Text Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tr-xs shadow-md'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-xs shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Coupon Unlocked Alert */}
                  {msg.couponUnlocked && (
                    <div className="mt-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-300">
                      <span className="font-bold flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-amber-400" />
                        Voucher Unlocked: <strong className="font-mono bg-slate-950 px-2 py-0.5 rounded text-white">{msg.couponUnlocked}</strong>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">✓ Auto-applied</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 text-right mt-1">
                    {msg.timestamp}
                  </div>
                </div>

                {/* Recommended Products Carousel / Grid inside Chat */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {msg.recommendedProducts.map(p => (
                      <div
                        key={p.id}
                        className="bg-slate-950/80 border border-slate-700 rounded-xl p-2.5 flex items-center gap-2.5 hover:border-cyan-500/60 transition-colors"
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-contain bg-slate-900 p-1 shrink-0 cursor-pointer"
                          onClick={() => {
                            setIsAIAssistantOpen(false);
                            setActiveProductModal(p);
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <h4
                            onClick={() => {
                              setIsAIAssistantOpen(false);
                              setActiveProductModal(p);
                            }}
                            className="text-xs font-bold text-white truncate cursor-pointer hover:text-cyan-300"
                          >
                            {p.title}
                          </h4>
                          <div className="text-xs font-black text-amber-400 font-display">
                            {formatPrice(p.price)}
                          </div>
                          <button
                            id={`btn-ai-add-${p.id}`}
                            onClick={() => addToCart(p, 1)}
                            className="mt-1 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold py-1 px-2 rounded-md flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] bg-slate-800 hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-slate-700 hover:border-cyan-500/50 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-cyan-300 bg-slate-800/60 p-3 rounded-2xl max-w-sm border border-slate-700">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Nova AI is consulting the marketplace & analyzing deals...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-slate-800 rounded-2xl p-1.5 border border-slate-700 focus-within:border-cyan-500"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Nova AI anything: 'Find portable power stations', 'Give me a coupon'..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-400 px-3 py-2 outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
