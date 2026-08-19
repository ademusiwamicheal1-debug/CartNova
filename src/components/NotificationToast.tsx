import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let bgClass = 'bg-slate-900/95 dark:bg-slate-950/95 text-white border-slate-700/80 shadow-emerald-950/20';
          let iconColor = 'text-emerald-400';
          let progressBg = 'bg-emerald-500';

          if (toast.type === 'warning') {
            Icon = AlertCircle;
            bgClass = 'bg-amber-950/95 text-amber-100 border-amber-800/80 shadow-amber-950/30';
            iconColor = 'text-amber-400';
            progressBg = 'bg-amber-500';
          } else if (toast.type === 'info') {
            Icon = Info;
            bgClass = 'bg-slate-900/95 dark:bg-slate-950/95 text-white border-slate-700/80 shadow-cyan-950/20';
            iconColor = 'text-cyan-400';
            progressBg = 'bg-cyan-500';
          } else if (toast.type === 'error') {
            Icon = XCircle;
            bgClass = 'bg-red-950/95 text-red-100 border-red-800/80 shadow-red-950/30';
            iconColor = 'text-red-400';
            progressBg = 'bg-red-500';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`pointer-events-auto relative overflow-hidden flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${bgClass}`}
            >
              {/* Bottom linear progress timer indicator */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-1 ${progressBg}`}
              />

              <div className="flex items-center gap-3 min-w-0 pr-1">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <p className="text-xs font-semibold leading-snug">
                  {toast.message}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {toast.actionLabel && toast.onAction && (
                  <button
                    onClick={() => {
                      toast.onAction?.();
                      removeToast(toast.id);
                    }}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-xl transition-colors cursor-pointer"
                  >
                    {toast.actionLabel}
                  </button>
                )}

                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
