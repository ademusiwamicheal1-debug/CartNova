import { ColorTheme, ThemeConfig, ThemeMode } from '../types';

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: 'solar',
    name: 'Nova Solar',
    subtitle: 'Signature Vibrant Energy',
    description: 'The iconic Cart NOVA look with warm radiant amber, solar orange, and crisp accents.',
    primaryColor: '#f97316',
    accentColor: '#f59e0b',
    previewGradient: 'from-orange-500 via-amber-500 to-yellow-500',
    tag: 'Classic Default',
    bgGradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
    glowColor: 'rgba(249, 115, 22, 0.35)'
  },
  {
    id: 'midnight',
    name: 'Cyber Midnight',
    subtitle: 'Deep Sapphire & Electric Indigo',
    description: 'High-tech obsidian and deep navy aesthetic with electric sapphire glow and violet highlights.',
    primaryColor: '#3b82f6',
    accentColor: '#6366f1',
    previewGradient: 'from-blue-600 via-indigo-600 to-sky-400',
    tag: 'Tech Flagship',
    bgGradient: 'from-blue-600/10 via-indigo-600/5 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.35)'
  },
  {
    id: 'emerald',
    name: 'Emerald Luxury',
    subtitle: 'Forest Velvet & Pure Gold',
    description: 'Prestige mall aesthetic featuring radiant jade emerald, forest velvet, and champagne gold details.',
    primaryColor: '#10b981',
    accentColor: '#059669',
    previewGradient: 'from-emerald-500 via-teal-600 to-green-400',
    tag: 'Luxury Mall',
    bgGradient: 'from-emerald-500/10 via-teal-600/5 to-transparent',
    glowColor: 'rgba(16, 185, 129, 0.35)'
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    subtitle: 'Vivid Fuchsia & Ultraviolet',
    description: 'Futuristic synthwave aesthetic with bold neon fuchsia, electric magenta, and ultraviolet sparks.',
    primaryColor: '#ec4899',
    accentColor: '#a855f7',
    previewGradient: 'from-pink-500 via-fuchsia-600 to-purple-600',
    tag: 'Futuristic Glow',
    bgGradient: 'from-pink-500/10 via-purple-600/5 to-transparent',
    glowColor: 'rgba(236, 72, 153, 0.35)'
  },
  {
    id: 'nordic',
    name: 'Nordic Frost',
    subtitle: 'Arctic Cyan & Glacier White',
    description: 'Ultra-clean Scandinavian aesthetic with cool glacier cyan, pristine arctic ice, and balanced serenity.',
    primaryColor: '#06b6d4',
    accentColor: '#0284c7',
    previewGradient: 'from-cyan-500 via-teal-500 to-sky-400',
    tag: 'Minimal Arctic',
    bgGradient: 'from-cyan-500/10 via-sky-500/5 to-transparent',
    glowColor: 'rgba(6, 182, 212, 0.35)'
  },
  {
    id: 'rosegold',
    name: 'Rose Gold Luxe',
    subtitle: 'Blush Gold & Champagne',
    description: 'Sophisticated haute couture palette blending warm blush rose, champagne shimmer, and soft bronze.',
    primaryColor: '#f43f5e',
    accentColor: '#fb7185',
    previewGradient: 'from-rose-500 via-rose-400 to-amber-300',
    tag: 'Haute Boutique',
    bgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    glowColor: 'rgba(244, 63, 94, 0.35)'
  },
  {
    id: 'crimson',
    name: 'Crimson Obsidian',
    subtitle: 'Bold Ruby & Dark Power',
    description: 'Intense flash-drop racing aesthetic with deep ruby crimson, scarlet blaze, and carbon accents.',
    primaryColor: '#ef4444',
    accentColor: '#dc2626',
    previewGradient: 'from-red-600 via-rose-600 to-amber-600',
    tag: 'Flash Power',
    bgGradient: 'from-red-600/10 via-rose-600/5 to-transparent',
    glowColor: 'rgba(239, 68, 68, 0.35)'
  }
];

export function applyThemeToDOM(colorTheme: ColorTheme, isDark: boolean) {
  try {
    const root = document.documentElement;
    // Set data-theme attribute
    root.setAttribute('data-theme', colorTheme);
    root.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');

    // Update dark class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const config = THEME_CONFIGS.find(t => t.id === colorTheme) || THEME_CONFIGS[0];

    // Set CSS custom properties for instant dynamic theme color binding
    root.style.setProperty('--theme-primary', config.primaryColor);
    root.style.setProperty('--theme-accent', config.accentColor);
    root.style.setProperty('--theme-glow', config.glowColor);
  } catch (e) {
    console.warn('Failed to apply theme to DOM:', e);
  }
}
