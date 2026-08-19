import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Info, Trash2, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ConfirmationModal: React.FC = () => {
  const { confirmationDialog, closeConfirmation } = useShop();

  if (!confirmationDialog) return null;

  const {
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
    onConfirm,
    onCancel
  } = confirmationDialog;

  const handleConfirm = () => {
    onConfirm();
    closeConfirmation();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeConfirmation();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden"
        >
          {/* Accent top gradient bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-1.5 ${
              type === 'danger'
                ? 'bg-gradient-to-r from-red-500 via-rose-500 to-orange-500'
                : type === 'warning'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500'
                : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500'
            }`}
          />

          <button
            onClick={handleCancel}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                type === 'danger'
                  ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50'
                  : type === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50'
              }`}
            >
              {type === 'danger' && <Trash2 className="w-6 h-6" />}
              {type === 'warning' && <AlertTriangle className="w-6 h-6" />}
              {type === 'info' && <Info className="w-6 h-6" />}
            </div>

            <div className="space-y-1.5 flex-1 pr-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                {title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all active:scale-95 ${
                type === 'danger'
                  ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20'
                  : type === 'warning'
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
