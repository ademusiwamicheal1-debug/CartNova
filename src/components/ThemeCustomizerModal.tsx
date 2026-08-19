import React from 'react';
import { useShop } from '../context/ShopContext';
import { THEME_CONFIGS } from '../services/themeService';
import { ColorTheme } from '../types';
import {
  Palette,
  X,
  Sun,
  Moon,
  Check,
  Sparkles,
  Zap,
  Sliders,
  ShieldCheck,
  RefreshCw,
  Eye
} from 'lucide-react';

export const ThemeCustomizerModal: React.FC = () => {
  const {
    isThemeModalOpen,
    setIsThemeModalOpen,
    colorTheme,
    setColorTheme,
    isDarkMode,
    toggleDarkMode,
    setIsDarkMode,
    showToast
  } = useShop();

  if (!isThemeModalOpen) return null;

  const currentConfig = THEME_CONFIGS.find(t => t.id === colorTheme) || THEME_CONFIGS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsThemeModalOpen(false)}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 transition-all">
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <span>Modern UI Theme Studio</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                    7 Palettes
                  </span>
                </h2>
                <p className="text-xs text-slate-300">
                  Switch aesthetic palettes, color modes, and glow lighting across Cart NOVA
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsThemeModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Light / Dark Mode Controls */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Display Color Mode</span>
              <span className="text-xs text-slate-500 font-normal">Instant sync with system</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsDarkMode(false)}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 text-slate-900 font-bold ring-2 ring-orange-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${!isDarkMode ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  <Sun className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold flex items-center justify-between">
                    <span>Light Mode</span>
                    {!isDarkMode && <Check className="w-4 h-4 text-orange-500" />}
                  </div>
                  <div className="text-xs text-slate-500 font-normal">Clean, bright contrast</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode(true)}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-white font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  <Moon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold flex items-center justify-between">
                    <span>Dark Mode</span>
                    {isDarkMode && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className="text-xs text-slate-500 font-normal">Deep obsidian & eye-safe</div>
                </div>
              </button>
            </div>
          </div>

          {/* 7 Modern UI Theme Palettes */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Choose Modern Theme Aesthetic</span>
              <span className="text-xs font-bold text-orange-500">{currentConfig.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {THEME_CONFIGS.map(theme => {
                const isSelected = colorTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setColorTheme(theme.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 shadow-md ring-2 ring-slate-900/10 dark:ring-white/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      {/* Swatch & Name */}
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-lg shadow-xs bg-gradient-to-tr ${theme.previewGradient} flex items-center justify-center shrink-0`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{theme.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {theme.subtitle}
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase shrink-0">
                        {theme.tag}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>

                    {/* Gradient preview bar */}
                    <div className={`mt-2.5 h-1.5 w-full rounded-full bg-gradient-to-r ${theme.previewGradient}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Theme Preview Sandbox */}
          <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-orange-500" />
              <span>Live Theme UI Component Preview</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Primary Action Button Preview */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 font-bold uppercase">Primary Button</div>
                <button
                  type="button"
                  style={{ backgroundColor: currentConfig.primaryColor }}
                  className="w-full py-2 px-3 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Buy with 1-Click</span>
                </button>
              </div>

              {/* Accent Deal Badge */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 font-bold uppercase">Deal Badge</div>
                <div className="flex items-center gap-2">
                  <span
                    style={{ borderColor: currentConfig.primaryColor, color: currentConfig.primaryColor }}
                    className="border px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-50 dark:bg-slate-800"
                  >
                    45% OFF
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">$79.90</span>
                </div>
              </div>

              {/* VIP Member Glow Badge */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 font-bold uppercase">Active Glow Aura</div>
                <div
                  className={`w-full py-1.5 px-2 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r ${currentConfig.previewGradient}`}
                >
                  {currentConfig.name} Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setColorTheme('solar');
              setIsDarkMode(false);
              showToast('Reset to default Cart NOVA theme', 'info');
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsThemeModalOpen(false);
              showToast(`Applied ${currentConfig.name} theme successfully!`, 'success');
            }}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs px-5 py-2.5 rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-md"
          >
            Apply & Save Preference
          </button>
        </div>
      </div>
    </div>
  );
};
