import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Gift, Sparkles, Trophy, Zap, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LuckySpinWheel: React.FC = () => {
  const {
    isLuckyWheelOpen,
    setIsLuckyWheelOpen,
    userCoins,
    setUserCoins,
    applyCoupon,
    collectCoupon
  } = useShop();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [wonPrize, setWonPrize] = useState<{
    title: string;
    code: string;
    description: string;
    value: string;
  } | null>(null);

  const PRIZES = [
    { title: '25% OFF MEGA VIP', code: 'SPIN25VIP', description: 'Extra 25% off entire checkout on Cart NOVA', value: '25% OFF', color: '#ea580c' },
    { title: 'FREE EXPRESS SHIPPING', code: 'NOVAFREESHIP', description: 'Zero shipping fee across all regional hubs', value: 'Free Ship', color: '#0284c7' },
    { title: '$20 OFF DISCOUNT', code: 'LUCKY20', description: '$20 voucher valid on all Tech & Fashion', value: '$20 OFF', color: '#16a34a' },
    { title: '150 BONUS COINS', code: 'COINS150', description: 'Instant 150 Nova Coins credited to wallet', value: '+150 Coins', color: '#ca8a04' },
    { title: '15% FLASH SAVER', code: 'FLASH15', description: 'Extra 15% off any Lightning Flash Drop item', value: '15% OFF', color: '#9333ea' },
    { title: '$30 TECH VOUCHER', code: 'TECHNOVA30', description: 'Save $30 on orders over $120', value: '$30 OFF', color: '#dc2626' }
  ];

  if (!isLuckyWheelOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Pick random prize
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const segmentAngle = 360 / PRIZES.length;
    // Calculate final angle (extra 5 to 8 full rotations + target segment offset)
    const extraRotations = 360 * 6;
    const targetAngle = extraRotations + (360 - (prizeIndex * segmentAngle + segmentAngle / 2));

    const finalRotation = rotationAngle + targetAngle;
    setRotationAngle(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = PRIZES[prizeIndex];
      setWonPrize(prize);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (prize.code === 'COINS150') {
        setUserCoins(prev => prev + 150);
      } else {
        collectCoupon(prize.code);
        applyCoupon(prize.code);
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl overflow-hidden animate-scale">
        {/* Ambient Glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          id="btn-close-lucky-wheel"
          onClick={() => setIsLuckyWheelOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY LUCKY VOUCHER VAULT</span>
          </div>
          <h3 className="text-2xl font-black font-display text-white">
            Spin & Win Mystery Discounts!
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Every spin guarantees a real discount voucher or coin reward auto-applied at checkout.
          </p>
        </div>

        {/* Spin Wheel Stage */}
        <div className="relative flex items-center justify-center my-4">
          {/* Wheel Pointer */}
          <div className="absolute -top-3 z-30 transform -translate-x-1/2 left-1/2 filter drop-shadow-md">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400"></div>
          </div>

          {/* Rotating Wheel Canvas Container */}
          <div
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-amber-400/80 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-out flex items-center justify-center bg-slate-800"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            {PRIZES.map((prize, idx) => {
              const rotation = (360 / PRIZES.length) * idx;
              return (
                <div
                  key={idx}
                  className="absolute w-full h-full flex justify-center items-start pt-3"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <div
                    className="text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-xs"
                    style={{ backgroundColor: prize.color, color: '#fff' }}
                  >
                    {prize.value}
                  </div>
                </div>
              );
            })}

            {/* Wheel Center Button Hub */}
            <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-amber-400 flex items-center justify-center text-amber-300 font-black text-xs shadow-inner z-20">
              NOVA
            </div>
          </div>
        </div>

        {/* Win Alert or Spin CTA */}
        {wonPrize ? (
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-2xl p-4 text-center mt-4 animate-scale">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wide">
              🎉 Congratulations! You Won:
            </div>
            <div className="text-xl font-black text-white font-display mt-0.5">
              {wonPrize.title}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {wonPrize.description}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="font-mono bg-slate-950 px-3 py-1 rounded-lg text-amber-300 font-bold text-xs border border-amber-500/30">
                {wonPrize.code}
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md">
                ✓ Auto-Applied to Cart
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <button
              id="btn-spin-now"
              disabled={isSpinning}
              onClick={handleSpin}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                isSpinning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 hover:scale-[1.02] shadow-orange-500/30'
              }`}
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>{isSpinning ? 'Spinning the Wheel...' : 'SPIN FREE NOW (1 Daily Free)'}</span>
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Wallet Coins: <strong className="text-white">{userCoins}</strong></span>
          </div>
          <button
            onClick={() => setIsLuckyWheelOpen(false)}
            className="text-slate-300 hover:text-white font-semibold underline cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
