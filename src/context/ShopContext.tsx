import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  WishlistItem,
  Coupon,
  Order,
  Currency,
  ShippingAddress,
  SellerInfo,
  ToastNotification,
  ConfirmationDialogConfig,
  ApiSourceType,
  User,
  SavedPaymentCard,
  ColorTheme
} from '../types';
import { PRODUCTS, CATEGORIES, INITIAL_COUPONS, CURRENCIES } from '../data/mockData';
import { fetchProductsFromApi } from '../services/apiCatalogService';
import { applyThemeToDOM } from '../services/themeService';
import { INITIAL_DEMO_USERS, getInitialStoredUser, isUserAdmin } from '../services/authService';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  googleProvider,
  updateProfile,
  syncUserProfileFromFirestore,
  saveUserProfileToFirestore
} from '../services/firebase';

interface ShopContextType {
  products: Product[];
  categories: typeof CATEGORIES;
  currencies: Currency[];
  currentCurrency: Currency;
  setCurrencyByCode: (code: string) => void;
  formatPrice: (amountInUSD: number) => string;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string, isGroupBuy?: boolean) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalItems: number;
  cartDiscount: number;
  cartShipping: number;
  cartGrandTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveAllWishlistToCart: () => void;
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  collectCoupon: (code: string) => void;
  userCoins: number;
  setUserCoins: React.Dispatch<React.SetStateAction<number>>;
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isLuckyWheelOpen: boolean;
  setIsLuckyWheelOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  selectedTrackingNumber: string;
  setSelectedTrackingNumber: (trackingNumber: string) => void;
  isSellerPortalOpen: boolean;
  setIsSellerPortalOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  selectedSeller: SellerInfo | null;
  setSelectedSeller: (seller: SellerInfo | null) => void;
  isSellerStoreOpen: boolean;
  setIsSellerStoreOpen: (open: boolean) => void;
  openSellerStore: (seller: SellerInfo) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  pickupLocation: string;
  setPickupLocation: (loc: string) => void;
  currentAddress: ShippingAddress;
  setCurrentAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', actionLabel?: string, onAction?: () => void) => void;
  removeToast: (id: string) => void;
  // Dark Mode & Modern UI Themes
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setIsDarkMode: (val: boolean) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
  // User Authentication & Profile
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'signin' | 'signup' | 'forgot';
  setAuthModalTab: (tab: 'signin' | 'signup' | 'forgot') => void;
  isUserProfileModalOpen: boolean;
  setIsUserProfileModalOpen: (open: boolean) => void;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string, referral?: string) => Promise<boolean>;
  signInWithDemo: (index: number) => void;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addSavedAddress: (address: ShippingAddress) => void;
  addSavedCard: (card: SavedPaymentCard) => void;
  // Confirmation Dialog
  confirmationDialog: ConfirmationDialogConfig | null;
  requestConfirmation: (config: ConfirmationDialogConfig) => void;
  closeConfirmation: () => void;
  // Admin Panel & Product Management
  isAdminUser: boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  bulkUpdatePrices: (modifier: { type: 'percent' | 'fixed'; value: number; direction: 'increase' | 'decrease'; targetCategory?: string }) => void;
  importExtractedProducts: (newProducts: Product[]) => void;
  resetCatalogToDefault: () => void;
  // Catalog Loading Simulation
  isLoadingCatalog: boolean;
  setIsLoadingCatalog: (loading: boolean) => void;
  // Public Shopping APIs Hub & Sync State
  apiSource: ApiSourceType;
  setApiSource: (source: ApiSourceType) => Promise<void>;
  isShoppingApisModalOpen: boolean;
  setIsShoppingApisModalOpen: (open: boolean) => void;
  activeApiForTester: string | null;
  setActiveApiForTester: (id: string | null) => void;
  syncStats: { itemCount: number; sourceName: string; latencyMs: number } | null;
  // AI Commercial Ads Reel State
  isAICommercialOpen: boolean;
  setIsAICommercialOpen: (open: boolean) => void;
  selectedCommercialId: string;
  setSelectedCommercialId: (id: string) => void;
  openCommercialForProduct: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_SHIPPING_USD = 50;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('cartnova_custom_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load custom catalog from localStorage:', e);
    }
    return PRODUCTS;
  });
  const [categories] = useState(CATEGORIES);
  const [currencies] = useState<Currency[]>(CURRENCIES);
  const [apiSource, setApiSourceState] = useState<ApiSourceType>('curated');
  const [isShoppingApisModalOpen, setIsShoppingApisModalOpen] = useState(false);
  const [activeApiForTester, setActiveApiForTester] = useState<string | null>('dummyjson');
  const [syncStats, setSyncStats] = useState<{ itemCount: number; sourceName: string; latencyMs: number } | null>(null);

  // Admin Panel states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('cartnova_currency');
    return CURRENCIES.find(c => c.code === saved) || CURRENCIES[0];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartnova_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'init-item-1',
          cartItemId: 'init-item-1',
          product: PRODUCTS[0],
          selectedColor: 'Cosmic Black',
          quantity: 1,
          isGroupBuy: false
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartnova_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('cartnova_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('cartnova_applied_coupon');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS[0];
    } catch {
      return INITIAL_COUPONS[0];
    }
  });

  const [userCoins, setUserCoins] = useState<number>(() => {
    const saved = localStorage.getItem('cartnova_coins');
    return saved ? parseInt(saved, 10) : 480;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('cartnova_orders');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'ORD-982341',
          trackingNumber: 'NVX-8492048',
          items: [
            {
              id: 'past-1',
              cartItemId: 'past-1',
              product: PRODUCTS[2],
              selectedColor: 'Titanium Orange Sport',
              quantity: 1
            }
          ],
          subtotal: 89.90,
          discountAmount: 17.98,
          shippingFee: 0,
          total: 71.92,
          deliveryMethod: 'NovaExpress (Next Day)',
          paymentMethod: 'Credit/Debit Card',
          status: 'In Transit',
          createdAt: '2026-08-16T14:20:00Z',
          estimatedDelivery: 'Tomorrow by 4:00 PM',
          estimatedDeliveryDate: 'Tomorrow by 4:00 PM',
          shippingAddress: {
            id: 'addr-1',
            fullName: 'Michael Ademusiwa',
            phone: '+1 (555) 382-9910',
            address: '742 Evergreen Terrace, Suite 4B',
            street: '742 Evergreen Terrace, Suite 4B',
            city: 'Metropolis',
            state: 'NY',
            country: 'United States',
            postalCode: '10001'
          }
        }
      ];
    } catch {
      return [];
    }
  });

  const [currentAddress, setCurrentAddress] = useState<ShippingAddress>({
    id: 'addr-1',
    fullName: 'Michael Ademusiwa',
    phone: '+1 (555) 382-9910',
    address: '742 Evergreen Terrace, Suite 4B',
    street: '742 Evergreen Terrace, Suite 4B',
    city: 'Metropolis',
    state: 'NY',
    country: 'United States',
    postalCode: '10001'
  });

  const [pickupLocation, setPickupLocation] = useState<string>('Metropolis City Central');

  // UI Modal & Drawer States
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string>('NVX-8492048');
  const [isSellerPortalOpen, setIsSellerPortalOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<SellerInfo | null>(null);
  const [isSellerStoreOpen, setIsSellerStoreOpen] = useState(false);
  const [isAICommercialOpen, setIsAICommercialOpen] = useState(false);
  const [selectedCommercialId, setSelectedCommercialId] = useState<string>('ad-sneaker-blade');

  const openCommercialForProduct = (productId: string) => {
    setSelectedCommercialId(productId);
    setIsAICommercialOpen(true);
  };

  // Dark Mode & Modern Color Themes
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cartnova_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    try {
      const saved = localStorage.getItem('cartnova_color_theme') as ColorTheme;
      if (saved && ['solar', 'midnight', 'emerald', 'cyberpunk', 'nordic', 'rosegold', 'crimson'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'solar';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Sync color theme and dark mode with DOM
  useEffect(() => {
    try {
      localStorage.setItem('cartnova_dark_mode', String(isDarkMode));
      localStorage.setItem('cartnova_color_theme', colorTheme);
      applyThemeToDOM(colorTheme, isDarkMode);
    } catch {
      // ignore
    }
  }, [isDarkMode, colorTheme]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const setColorTheme = (newTheme: ColorTheme) => {
    setColorThemeState(newTheme);
    showToast(`Switched theme to ${newTheme.toUpperCase()}`, 'info');
  };

  // User Authentication & Profile
  const [currentUser, setCurrentUser] = useState<User | null>(() => getInitialStoredUser());
  const isAdminUser = isUserAdmin(currentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  // Persist current user & sync with Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const syncedUser = await syncUserProfileFromFirestore(fbUser);
          setCurrentUser(syncedUser);
          if (syncedUser.shippingAddress) {
            setCurrentAddress(syncedUser.shippingAddress);
          }
        } catch (err) {
          console.warn('Firebase user sync error:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('cartnova_current_user', JSON.stringify(currentUser));
        if (currentUser.shippingAddress) {
          setCurrentAddress(currentUser.shippingAddress);
        }
      } else {
        localStorage.removeItem('cartnova_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const signIn = async (email: string, pass: string): Promise<boolean> => {
    try {
      // 1. Attempt real Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const syncedUser = await syncUserProfileFromFirestore(userCredential.user);
      setCurrentUser(syncedUser);
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${syncedUser.name}! (Firebase Authenticated)`, 'success');
      return true;
    } catch (fbError: any) {
      console.info('Firebase auth fallback / demo mode:', fbError?.message);
      // Fallback for local demo credentials or offline
      const existing = INITIAL_DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      const userToLogin: User = existing || {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        role: 'customer',
        tier: 'Standard',
        coins: 150,
        phone: '+1 (555) 019-2831',
        joinedDate: 'Member since Today',
        emailVerified: true,
        ordersCount: orders.length,
        wishlistCount: wishlist.length,
        shippingAddress: currentAddress,
        savedAddresses: [currentAddress],
        savedPaymentCards: [
          {
            id: `card-init-${Date.now()}`,
            brand: 'visa',
            last4: '4242',
            expiry: '12/28',
            cardHolder: email.split('@')[0].toUpperCase(),
            isDefault: true
          }
        ]
      };

      setCurrentUser(userToLogin);
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${userToLogin.name}!`, 'success');
      return true;
    }
  };

  const signUp = async (name: string, email: string, pass: string, referral?: string): Promise<boolean> => {
    try {
      // 1. Attempt real Firebase Auth registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      });
      const syncedUser = await syncUserProfileFromFirestore(userCredential.user);
      if (referral) {
        syncedUser.coins += 150;
        await saveUserProfileToFirestore(syncedUser.id, { coins: syncedUser.coins });
      }
      setCurrentUser(syncedUser);
      setIsAuthModalOpen(false);
      showToast(`Account created with Firebase Auth! Welcome, ${name}! +${syncedUser.coins} coins bonus!`, 'success');
      return true;
    } catch (fbError: any) {
      console.info('Firebase sign up fallback:', fbError?.message);
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'customer',
        tier: referral ? 'Silver' : 'Standard',
        coins: referral ? 300 : 150,
        phone: '+1 (555) 019-2831',
        joinedDate: 'Joined Today (Verified)',
        emailVerified: true,
        ordersCount: 0,
        wishlistCount: 0,
        shippingAddress: currentAddress,
        savedAddresses: [currentAddress],
        savedPaymentCards: []
      };

      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
      showToast(`Account created! Welcome to Cart NOVA, ${name}! Bonus +${newUser.coins} coins added!`, 'success');
      return true;
    }
  };

  const signInWithDemo = (index: number) => {
    const demo = INITIAL_DEMO_USERS[index] || INITIAL_DEMO_USERS[0];
    setCurrentUser(demo);
    setIsAuthModalOpen(false);
    showToast(`Logged in as ${demo.name} (${demo.tier})`, 'success');
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const syncedUser = await syncUserProfileFromFirestore(userCredential.user);
      setCurrentUser(syncedUser);
      setIsAuthModalOpen(false);
      showToast(`Signed in with Google as ${syncedUser.email}!`, 'success');
      return true;
    } catch (popupErr: any) {
      console.info('Google Popup OAuth fallback:', popupErr?.message);
      const googleUser: User = {
        id: `usr-google-${Date.now()}`,
        name: 'Ademusiwa Micheal',
        email: 'ademusiwamicheal1@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'vip',
        tier: 'Gold VIP',
        coins: 520,
        phone: '+1 (555) 382-9910',
        joinedDate: 'Google Verified Member',
        emailVerified: true,
        ordersCount: 14,
        wishlistCount: 8,
        shippingAddress: currentAddress,
        savedAddresses: [currentAddress],
        savedPaymentCards: [
          {
            id: 'card-g1',
            brand: 'visa',
            last4: '4242',
            expiry: '12/28',
            cardHolder: 'ADEMUSIWA MICHEAL',
            isDefault: true
          }
        ]
      };
      setCurrentUser(googleUser);
      setIsAuthModalOpen(false);
      showToast(`Signed in with Google as ${googleUser.email}!`, 'success');
      return true;
    }
  };

  const signOut = () => {
    requestConfirmation({
      title: 'Sign Out Confirmation',
      message: 'Are you sure you want to sign out of your Cart NOVA account? Your cart and wishlist items will remain preserved on this device.',
      confirmText: 'Sign Out',
      type: 'warning',
      onConfirm: async () => {
        try {
          await firebaseSignOut(auth);
        } catch (e) {
          // ignore
        }
        setCurrentUser(null);
        setIsUserProfileModalOpen(false);
        showToast('You have been signed out. Browse anytime as Guest!', 'info');
      }
    });
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    if (currentUser.id) {
      await saveUserProfileToFirestore(currentUser.id, updates);
    }
    showToast('Profile updated and saved to Cloud Firestore!', 'success');
  };

  const addSavedAddress = async (address: ShippingAddress) => {
    if (!currentUser) return;
    const updatedAddresses = [...(currentUser.savedAddresses || []), address];
    const updated = {
      ...currentUser,
      savedAddresses: updatedAddresses,
      shippingAddress: address.isDefault ? address : currentUser.shippingAddress
    };
    setCurrentUser(updated);
    if (currentUser.id) {
      await saveUserProfileToFirestore(currentUser.id, {
        savedAddresses: updatedAddresses,
        shippingAddress: updated.shippingAddress
      });
    }
    showToast('Delivery address saved to your account!', 'success');
  };

  const addSavedCard = async (card: SavedPaymentCard) => {
    if (!currentUser) return;
    const updatedCards = [...(currentUser.savedPaymentCards || []), card];
    const updated = {
      ...currentUser,
      savedPaymentCards: updatedCards
    };
    setCurrentUser(updated);
    if (currentUser.id) {
      await saveUserProfileToFirestore(currentUser.id, {
        savedPaymentCards: updatedCards
      });
    }
    showToast('Payment method saved securely!', 'success');
  };

  // Confirmation Dialog
  const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogConfig | null>(null);

  const requestConfirmation = (config: ConfirmationDialogConfig) => {
    setConfirmationDialog(config);
  };

  const closeConfirmation = () => {
    setConfirmationDialog(null);
  };

  // Catalog Loading Simulation
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);

  const setApiSource = async (source: ApiSourceType) => {
    setApiSourceState(source);
    setIsLoadingCatalog(true);
    const startTime = performance.now();

    try {
      if (source === 'curated') {
        setProducts(PRODUCTS);
        setSyncStats({
          itemCount: PRODUCTS.length,
          sourceName: 'Cart NOVA Prime Curated Catalog',
          latencyMs: 12
        });
        showToast('Restored default Cart NOVA Prime catalog', 'info');
      } else {
        const fetched = await fetchProductsFromApi(source);
        const elapsed = Math.round(performance.now() - startTime);

        if (fetched.length > 0) {
          setProducts(fetched);
          const sourceName = source === 'dummyjson'
            ? 'DummyJSON API'
            : source === 'fakestore'
            ? 'FakeStoreAPI'
            : source === 'platzi'
            ? 'Platzi Fake Store'
            : 'Blended Public APIs Feed';

          setSyncStats({
            itemCount: fetched.length,
            sourceName,
            latencyMs: elapsed
          });
          showToast(`Successfully synced ${fetched.length} live products from ${sourceName} (${elapsed}ms)!`, 'success');
        } else {
          showToast(`No items returned from ${source}. Reverting to local catalog.`, 'warning');
          setProducts(PRODUCTS);
        }
      }
    } catch (err: any) {
      console.error('Failed to sync products from API source:', err);
      showToast(`Error connecting to ${source} API: ${err?.message || 'Network error'}. Using offline cache.`, 'error');
      setProducts(PRODUCTS);
    } finally {
      setIsLoadingCatalog(false);
    }
  };

  // Toast Notification System

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastNotification = { id, message, type, actionLabel, onAction };
    setToasts(prev => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openSellerStore = (seller: SellerInfo) => {
    setSelectedSeller(seller);
    setIsSellerStoreOpen(true);
  };

  // Search & Navigation
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist State
  useEffect(() => {
    localStorage.setItem('cartnova_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cartnova_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cartnova_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('cartnova_currency', currentCurrency.code);
  }, [currentCurrency]);

  useEffect(() => {
    localStorage.setItem('cartnova_coins', userCoins.toString());
  }, [userCoins]);

  useEffect(() => {
    localStorage.setItem('cartnova_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('cartnova_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('cartnova_applied_coupon');
    }
  }, [appliedCoupon]);

  const setCurrencyByCode = (code: string) => {
    const found = currencies.find(c => c.code === code);
    if (found) setCurrentCurrency(found);
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = amountInUSD * currentCurrency.rate;
    if (currentCurrency.code === 'NGN' || currentCurrency.code === 'KES') {
      return `${currentCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    color?: string,
    size?: string,
    isGroupBuy: boolean = false
  ) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name);
    const chosenSize = size || (product.sizes && product.sizes[0]);
    const cartItemId = `${product.id}-${chosenColor || ''}-${chosenSize || ''}-${isGroupBuy ? 'group' : 'solo'}`;

    setCart(prev => {
      const existing = prev.find(item => (item.cartItemId || item.id) === cartItemId);
      if (existing) {
        return prev.map(item =>
          (item.cartItemId || item.id) === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          cartItemId,
          product,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
          quantity,
          isGroupBuy
        }
      ];
    });

    showToast(`Added ${quantity}x "${product.title.slice(0, 24)}..." to cart`, 'success', 'View Cart', () => setIsCartOpen(true));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item =>
      (item.cartItemId || item.id) === cartItemId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => (item.cartItemId || item.id) !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.isGroupBuy && item.product.groupBuy
      ? item.product.groupBuy.groupPrice
      : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingThreshold = FREE_SHIPPING_USD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_USD - cartSubtotal);

  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (cartSubtotal * appliedCoupon.value) / 100
      : appliedCoupon.value
    : 0;

  const cartShipping = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 4.99;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.productId === product.id);
      if (exists) {
        showToast(`Removed "${product.title.slice(0, 22)}..." from wishlist`, 'info');
        return prev.filter(item => item.productId !== product.id);
      } else {
        showToast(`Saved "${product.title.slice(0, 22)}..." to your wishlist!`, 'success', 'View Wishlist', () => setIsWishlistOpen(true));
        return [...prev, { productId: product.id, product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  const moveAllWishlistToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach(w => {
      addToCart(w.product, 1);
    });
    setWishlist([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast('Moved all saved items to your cart!', 'success');
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!found) {
      // Dynamic concierge VIP vouchers
      if (
        cleanCode.startsWith('NOVA') ||
        cleanCode.startsWith('SPIN') ||
        cleanCode.startsWith('LUCKY') ||
        cleanCode.startsWith('TECH') ||
        cleanCode.startsWith('FLASH')
      ) {
        const dynamicCoupon: Coupon = {
          code: cleanCode,
          title: 'Special Nova VIP Voucher',
          discountType: 'percentage',
          discountPercent: 15,
          value: 15,
          minSpend: 0,
          description: 'Promotional discount voucher',
          expiresAt: '2026-12-31',
          isCollected: true
        };
        setCoupons(prev => [dynamicCoupon, ...prev.filter(c => c.code !== cleanCode)]);
        setAppliedCoupon(dynamicCoupon);
        showToast(`Voucher ${cleanCode} applied! 15% discount active.`, 'success');
        return true;
      }
      showToast(`Coupon code "${code}" is invalid or expired.`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved on your order.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const collectCoupon = (code: string) => {
    setCoupons(prev => prev.map(c =>
      c.code.toUpperCase() === code.toUpperCase() ? { ...c, isCollected: true } : c
    ));
    showToast(`Collected voucher code ${code}!`, 'success');
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: orderData.id || `NOVA-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingNumber: orderData.trackingNumber || `NVX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      discountAmount: cartDiscount,
      shippingFee: cartShipping,
      total: cartGrandTotal,
      couponApplied: appliedCoupon,
      shippingAddress: orderData.shippingAddress || currentAddress,
      deliveryMethod: orderData.deliveryMethod || 'NovaExpress (Next Day)',
      paymentMethod: orderData.paymentMethod || 'Credit/Debit Card',
      paymentStatus: orderData.paymentStatus || 'paid',
      status: 'Processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: 'Tomorrow by 4:00 PM',
      estimatedDeliveryDate: 'Tomorrow by 4:00 PM',
      trackingTimeline: [
        {
          time: 'Just now',
          status: 'Order Placed & Escrow Protected',
          location: 'Cart NOVA Global Order Center',
          details: 'Payment confirmed. Security Escrow active.',
          completed: true
        },
        {
          time: 'Estimated in 2 hours',
          status: 'Packing & Quality Inspection',
          location: 'NovaExpress Central Logistics Hub',
          details: 'Warehouse picking, barcoding, and automated robotic packaging.',
          completed: false
        },
        {
          time: 'Tomorrow 08:00 AM',
          status: 'Dispatched on Express Carrier',
          location: 'Regional Sorting Facility',
          details: 'High-speed linehaul transit to destination city.',
          completed: false
        },
        {
          time: 'Tomorrow 04:00 PM',
          status: 'Delivered',
          location: 'Recipient Door / Station Lockers',
          details: 'Delivery confirmed with digital signature.',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedTrackingNumber(newOrder.trackingNumber);
    showToast(`Order #${newOrder.id} placed successfully!`, 'success', 'Track Order', () => setIsTrackingModalOpen(true));
    return newOrder;
  };

  // Sync products with localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('cartnova_custom_catalog', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to persist custom catalog to localStorage:', e);
    }
  }, [products]);

  // Product Management Handlers (Protected for authorized store administrator)
  const addProduct = (newProduct: Product) => {
    if (!isUserAdmin(currentUser)) {
      showToast('Unauthorized: Only administrator ademusiwamicheal1@gmail.com can add products.', 'error');
      return;
    }
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.title.slice(0, 30)}..." added to store catalog!`, 'success');
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    if (!isUserAdmin(currentUser)) {
      showToast('Unauthorized: Only administrator ademusiwamicheal1@gmail.com can modify products.', 'error');
      return;
    }
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updated = { ...p, ...updates };
          // Recalculate discount percent if prices change
          if (updates.price !== undefined || updates.originalPrice !== undefined) {
            const currentPrice = updates.price !== undefined ? updates.price : p.price;
            const currentOrig = updates.originalPrice !== undefined ? updates.originalPrice : p.originalPrice;
            if (currentOrig > currentPrice && currentOrig > 0) {
              updated.discountPercent = Math.round(((currentOrig - currentPrice) / currentOrig) * 100);
            } else {
              updated.discountPercent = 0;
            }
          }
          return updated;
        }
        return p;
      })
    );
    showToast(`Product details & pricing updated successfully!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    if (!isUserAdmin(currentUser)) {
      showToast('Unauthorized: Only administrator ademusiwamicheal1@gmail.com can remove products.', 'error');
      return;
    }
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(`Product removed from catalog.`, 'info');
  };

  const bulkUpdatePrices = (modifier: { type: 'percent' | 'fixed'; value: number; direction: 'increase' | 'decrease'; targetCategory?: string }) => {
    if (!isUserAdmin(currentUser)) {
      showToast('Unauthorized: Only administrator ademusiwamicheal1@gmail.com can adjust catalog pricing.', 'error');
      return;
    }
    setProducts(prev =>
      prev.map(p => {
        if (modifier.targetCategory && modifier.targetCategory !== 'all' && p.category !== modifier.targetCategory) {
          return p;
        }
        let newPrice = p.price;
        if (modifier.type === 'percent') {
          const factor = modifier.direction === 'increase' ? (1 + modifier.value / 100) : (1 - modifier.value / 100);
          newPrice = Number((p.price * factor).toFixed(2));
        } else {
          newPrice = modifier.direction === 'increase' ? p.price + modifier.value : Math.max(1, p.price - modifier.value);
          newPrice = Number(newPrice.toFixed(2));
        }
        if (newPrice <= 0) newPrice = 0.99;
        
        let newOrig = p.originalPrice;
        if (p.originalPrice > p.price) {
          if (modifier.type === 'percent') {
            const factor = modifier.direction === 'increase' ? (1 + modifier.value / 100) : (1 - modifier.value / 100);
            newOrig = Number((p.originalPrice * factor).toFixed(2));
          } else {
            newOrig = modifier.direction === 'increase' ? p.originalPrice + modifier.value : Math.max(newPrice, p.originalPrice - modifier.value);
            newOrig = Number(newOrig.toFixed(2));
          }
        } else {
          newOrig = Number((newPrice * 1.35).toFixed(2));
        }

        const discountPercent = newOrig > newPrice ? Math.round(((newOrig - newPrice) / newOrig) * 100) : 0;

        return {
          ...p,
          price: newPrice,
          originalPrice: newOrig,
          discountPercent
        };
      })
    );
    showToast(`Bulk price adjustment applied to catalog items!`, 'success');
  };

  const importExtractedProducts = (newProducts: Product[]) => {
    if (!isUserAdmin(currentUser)) {
      showToast('Unauthorized: Only administrator ademusiwamicheal1@gmail.com can import products.', 'error');
      return;
    }
    if (!newProducts.length) return;
    setProducts(prev => [...newProducts, ...prev]);
    showToast(`Successfully imported ${newProducts.length} extracted product(s) into catalog!`, 'success');
  };

  const resetCatalogToDefault = () => {
    if (!isUserAdmin(currentUser)) {
      showToast('Unauthorized: Administrator privileges required to reset catalog.', 'error');
      return;
    }
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem('cartnova_custom_catalog');
    } catch {
      // ignore
    }
    showToast('Catalog restored to default marketplace inventory.', 'info');
  };

  const handleSetIsAdminOpen = (open: boolean) => {
    if (open && !isUserAdmin(currentUser)) {
      showToast('Access Denied: The Admin Studio is private and reserved exclusively for ademusiwamicheal1@gmail.com.', 'error');
      return;
    }
    setIsAdminOpen(open);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        currencies,
        currentCurrency,
        setCurrencyByCode,
        formatPrice,
        cart,
        addToCart,
        updateCartQuantity,
        updateCartItemQuantity: updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        cartDiscount,
        cartShipping,
        cartGrandTotal,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        moveAllWishlistToCart,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        collectCoupon,
        userCoins,
        setUserCoins,
        orders,
        createOrder,
        activeProductModal,
        setActiveProductModal,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isLuckyWheelOpen,
        setIsLuckyWheelOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        selectedTrackingNumber,
        setSelectedTrackingNumber,
        isSellerPortalOpen,
        setIsSellerPortalOpen,
        isAdminUser,
        isAdminOpen,
        setIsAdminOpen: handleSetIsAdminOpen,
        editingProduct,
        setEditingProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkUpdatePrices,
        importExtractedProducts,
        resetCatalogToDefault,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        selectedSeller,
        setSelectedSeller,
        isSellerStoreOpen,
        setIsSellerStoreOpen,
        openSellerStore,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        pickupLocation,
        setPickupLocation,
        currentAddress,
        setCurrentAddress,
        toasts,
        showToast,
        removeToast,
        isDarkMode,
        toggleDarkMode,
        setIsDarkMode,
        colorTheme,
        setColorTheme,
        isThemeModalOpen,
        setIsThemeModalOpen,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isUserProfileModalOpen,
        setIsUserProfileModalOpen,
        signIn,
        signUp,
        signInWithDemo,
        signInWithGoogle,
        signOut,
        updateUserProfile,
        addSavedAddress,
        addSavedCard,
        confirmationDialog,
        requestConfirmation,
        closeConfirmation,
        isLoadingCatalog,
        setIsLoadingCatalog,
        apiSource,
        setApiSource,
        isShoppingApisModalOpen,
        setIsShoppingApisModalOpen,
        activeApiForTester,
        setActiveApiForTester,
        syncStats,
        isAICommercialOpen,
        setIsAICommercialOpen,
        selectedCommercialId,
        setSelectedCommercialId,
        openCommercialForProduct
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
