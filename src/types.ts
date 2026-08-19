export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
  avatarUrl?: string;
  photos?: string[];
}

export type Review = ProductReview;

export interface SellerInfo {
  id: string;
  name: string;
  rating: number;
  scorePercent: number;
  followers: number;
  badge: 'Nova Mall' | 'Verified Merchant' | 'Global Store' | 'Top Brand';
  responseRate: string;
  shipsFrom: string;
  isVerified: boolean;
}

export interface GroupBuyDeal {
  enabled: boolean;
  groupPrice: number;
  requiredMembers: number;
  currentMembers: number;
  expiresInSeconds: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stockCount: number;
  isFlashDrop: boolean;
  flashDropEndsInSeconds?: number;
  isNovaChoice: boolean;
  isOfficialMall: boolean;
  isFreeShipping: boolean;
  expressDeliveryHours: number;
  returnDays: number;
  warranty: string;
  thumbnail: string;
  images: string[];
  colors?: { name: string; hex: string; image?: string }[];
  sizes?: string[];
  specs: Record<string, string>;
  keyFeatures: string[];
  seller: SellerInfo;
  tags: string[];
  reviews: ProductReview[];
  groupBuy?: GroupBuyDeal;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  bannerImage: string;
  productCount: number;
  subcategories: string[];
  trendingKeywords: string[];
}

export interface CartItem {
  cartItemId: string;
  id?: string;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  isGroupBuy?: boolean;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountPercent?: number;
  discountAmount?: number;
  value: number;
  minSpend: number;
  description: string;
  expiresAt: string;
  category?: string;
  isCollected?: boolean;
}

export interface ShippingAddress {
  id?: string;
  fullName: string;
  phone: string;
  street?: string;
  address?: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isDefault?: boolean;
  pickupStation?: string;
}

export interface TrackingCheckpoint {
  time: string;
  status: string;
  location: string;
  details: string;
  completed: boolean;
}

export interface Order {
  id: string;
  trackingNumber: string;
  items: CartItem[];
  subtotal: number;
  discount?: number;
  discountAmount?: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  couponApplied?: Coupon | null;
  shippingAddress: ShippingAddress;
  deliveryMethod?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  status: string;
  createdAt: string;
  estimatedDelivery?: string;
  estimatedDeliveryDate?: string;
  trackingTimeline?: TrackingCheckpoint[];
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
  name: string;
}

export interface LiveStreamShopping {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  viewers: number;
  featuredProduct: Product;
  videoThumb: string;
  badge: string;
  discountPercent: number;
}

export interface AIAssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  couponUnlocked?: string;
  suggestions?: string[];
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

export interface ConfirmationDialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel?: () => void;
}

export type ApiSourceType = 'curated' | 'dummyjson' | 'fakestore' | 'platzi' | 'blended';

export interface SavedPaymentCard {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'applepay';
  last4: string;
  expiry: string;
  cardHolder: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'seller' | 'vip' | 'admin';
  tier: 'Standard' | 'Silver' | 'Gold VIP' | 'Diamond Elite';
  coins: number;
  phone?: string;
  shippingAddress?: ShippingAddress;
  joinedDate: string;
  savedPaymentCards: SavedPaymentCard[];
  savedAddresses: ShippingAddress[];
  ordersCount?: number;
  wishlistCount?: number;
  emailVerified?: boolean;
}

export type ColorTheme =
  | 'solar'
  | 'midnight'
  | 'emerald'
  | 'cyberpunk'
  | 'nordic'
  | 'rosegold'
  | 'crimson';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  id: ColorTheme;
  name: string;
  subtitle: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  previewGradient: string;
  tag: string;
  bgGradient: string;
  glowColor: string;
}

export interface AICommercialAd {
  id: string;
  productId: string;
  title: string;
  tagline: string;
  videoUrl: string;
  posterImage: string;
  durationSeconds: number;
  tone: 'Viral TikTok' | 'Cinematic SuperBowl' | 'ASMR Aesthetic' | 'Direct Response Infomercial';
  scriptNarrator: string;
  highlightPoints: string[];
  viewCount: number;
  likesCount: number;
  dealBadge: string;
}

export interface CommercialScriptGenerationRequest {
  productId: string;
  tone: string;
  duration: number;
}



