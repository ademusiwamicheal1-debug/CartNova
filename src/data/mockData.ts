import { Product, Category, Coupon, LiveStreamShopping, Currency } from '../types';
import { ALL_EXTENDED_PRODUCTS } from './extendedCatalog';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  { code: 'NGN', symbol: '₦', rate: 1450.0, name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh ', rate: 130.0, name: 'Kenyan Shilling' },
  { code: 'ZAR', symbol: 'R ', rate: 18.2, name: 'South African Rand' },
  { code: 'CAD', symbol: 'CA$', rate: 1.36, name: 'Canadian Dollar' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'phones-tablets',
    name: 'Phones & Tablets',
    slug: 'phones-tablets',
    iconName: 'Smartphone',
    bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80',
    productCount: 1420,
    subcategories: ['Flagship Smartphones', 'Budget Phones', 'iPads & Tablets', 'Cases & Covers', 'Fast Chargers', 'Power Banks'],
    trendingKeywords: ['NovaFold Ultra', 'MagSafe Charger', '5G Tablet', 'Gaming Phone']
  },
  {
    id: 'audio-wearables',
    name: 'Audio & Wearables',
    slug: 'audio-wearables',
    iconName: 'Headphones',
    bannerImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    productCount: 890,
    subcategories: ['Noise Cancelling Headphones', 'TWS Earbuds', 'Smartwatches', 'Bluetooth Speakers', 'Fitness Trackers'],
    trendingKeywords: ['Active Noise Cancellation', 'Waterproof Earbuds', 'AMOLED Smartwatch']
  },
  {
    id: 'computing-gaming',
    name: 'Computers & Gaming',
    slug: 'computing-gaming',
    iconName: 'Laptop',
    bannerImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&auto=format&fit=crop&q=80',
    productCount: 1140,
    subcategories: ['Gaming Laptops', 'Mechanical Keyboards', '4K Monitors', 'Ergonomic Mice', 'Storage & SSDs', 'PC Components'],
    trendingKeywords: ['RTX 4080 Laptop', 'RGB Custom Keyboard', '144Hz Monitor']
  },
  {
    id: 'home-appliances',
    name: 'Home & Kitchen',
    slug: 'home-appliances',
    iconName: 'Coffee',
    bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80',
    productCount: 2300,
    subcategories: ['Smart Air Fryers', 'Espresso Machines', 'Robot Vacuums', 'Air Purifiers', 'Blenders & Food Processors'],
    trendingKeywords: ['Dual Zone Air Fryer', 'Self-Emptying Robot Vacuum', 'Cold Brew Maker']
  },
  {
    id: 'fashion-apparel',
    name: 'Fashion & Sneakers',
    slug: 'fashion-apparel',
    iconName: 'Shirt',
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    productCount: 3410,
    subcategories: ['Men\'s Streetwear', 'Women\'s Dresses', 'Sneakers & Running', 'Luxury Watches', 'Backpacks & Luggage'],
    trendingKeywords: ['Chunky Sneakers', 'Waterproof Parka', 'Minimalist Watch']
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Personal Care',
    slug: 'beauty-health',
    iconName: 'Sparkles',
    bannerImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    productCount: 980,
    subcategories: ['Skincare Serums', 'Hair Dryers & Stylers', 'Electric Toothbrushes', 'Fragrances', 'Grooming Kits'],
    trendingKeywords: ['Hyaluronic Acid Serum', 'High-Speed Hair Dryer', 'Sonic Toothbrush']
  },
  {
    id: 'solar-power',
    name: 'Solar & Energy Stations',
    slug: 'solar-power',
    iconName: 'Zap',
    bannerImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    productCount: 450,
    subcategories: ['Portable Power Stations', 'Foldable Solar Panels', 'Backup Inverters', 'Rechargeable Lanterns'],
    trendingKeywords: ['1000W Power Station', 'LiFePO4 Battery', 'Off-Grid Kit']
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Camping',
    slug: 'sports-outdoors',
    iconName: 'Compass',
    bannerImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&auto=format&fit=crop&q=80',
    productCount: 760,
    subcategories: ['Camping Tents', 'Hydration Flasks', 'Home Gym Equipment', 'E-Scooters & Bikes'],
    trendingKeywords: ['Pop-up 4-Person Tent', 'Adjustable Dumbbell', 'Foldable E-Bike']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'nova-anc-pro-headphones',
    title: 'NovaSound Pulse ANC Pro Wireless Over-Ear Headphones',
    subtitle: 'Adaptive 48dB Active Noise Cancelling, Spatial Hi-Res Audio & 65h Battery',
    slug: 'novasound-pulse-anc-pro',
    brand: 'NovaSound',
    category: 'audio-wearables',
    subcategory: 'Noise Cancelling Headphones',
    price: 79.99,
    originalPrice: 159.99,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 2840,
    soldCount: 14920,
    stockCount: 42,
    isFlashDrop: true,
    flashDropEndsInSeconds: 14200,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Global Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cosmic Black', hex: '#0f172a' },
      { name: 'Titanium Silver', hex: '#cbd5e1' },
      { name: 'Desert Dune', hex: '#d97706' }
    ],
    specs: {
      'Bluetooth Version': '5.4 with LDAC & AAC codec support',
      'Noise Reduction': 'Dual-core hybrid ANC up to -48dB',
      'Battery Life': '65 hours (ANC off), 45 hours (ANC on)',
      'Fast Charge': '10 mins gives 7 hours playtime (USB-C)',
      'Drivers': '40mm Silk-Composite Custom Diaphragms',
      'Microphones': '6 AI beamforming mics for crystal calls'
    },
    keyFeatures: [
      '48dB Hybrid Hybrid Active Noise Cancellation with Transparency Mode',
      'Hi-Res Audio Certified with lossless LDAC streaming',
      'Ultra-plush memory foam earcups for all-day comfort',
      'Multi-point dual connection across Phone and PC seamlessly'
    ],
    seller: {
      id: 'novasound-flagship',
      name: 'NovaSound Official Store',
      rating: 4.95,
      scorePercent: 99,
      followers: 128400,
      badge: 'Nova Mall',
      responseRate: '100% within 10 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    tags: ['Flash Deal', 'Best Seller', 'Official Store', 'Free Delivery'],
    reviews: [
      {
        id: 'r1',
        author: 'Marcus K.',
        rating: 5,
        date: '2 days ago',
        comment: 'These sound every bit as crisp as $350 headphones. The active noise cancelling completely blocks subway screech and office chatter. Battery lasts over a week on a single charge!',
        helpfulCount: 412,
        verifiedPurchase: true
      },
      {
        id: 'r2',
        author: 'Elena R.',
        rating: 5,
        date: '1 week ago',
        comment: 'Fast delivery by NovaExpress! Arrived next morning in pristine packaging. Super comfortable with glasses on.',
        helpfulCount: 189,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 64.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 8400
    }
  },
  {
    id: 'nova-solar-station-1200',
    title: 'NovaPower Genesis 1200W Portable LiFePO4 Power Station',
    subtitle: '1024Wh High-Capacity Solar Generator, 2400W Surge, 1-Hour Fast Recharging',
    slug: 'novapower-genesis-1200w',
    brand: 'NovaPower',
    category: 'solar-power',
    subcategory: 'Portable Power Stations',
    price: 499.00,
    originalPrice: 899.00,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 1120,
    soldCount: 4200,
    stockCount: 18,
    isFlashDrop: true,
    flashDropEndsInSeconds: 22000,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '5 Years Official Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Capacity': '1024Wh (320,000mAh) EV-Grade LiFePO4',
      'AC Output': '1200W Pure Sine Wave (2400W Surge X-Boost)',
      'Lifecycles': '3,500+ cycles to 80% original capacity (10+ yrs)',
      'Recharge Speed': '0-80% in 50 minutes via AC Wall input',
      'Ports': '3x AC Outlets, 2x 100W USB-C PD, 2x USB-A 18W, 1x Car 12V',
      'Solar Input': 'Up to 500W MPPT Solar (2.5 hrs recharge)'
    },
    keyFeatures: [
      'Powers 99% of home appliances: Fridge, TV, Blender, CPAP, Wi-Fi router',
      'UPS <10ms emergency switchover prevents power drops',
      'Smart App Wi-Fi/Bluetooth monitoring and control',
      'EV-Grade LiFePO4 battery chemistry with zero fire hazard'
    ],
    seller: {
      id: 'novapower-official',
      name: 'NovaPower Energy Systems',
      rating: 4.97,
      scorePercent: 99.4,
      followers: 86200,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Warehouse',
      isVerified: true
    },
    tags: ['Power Hero', 'Solar Ready', '5 Yr Warranty', 'Free Shipping'],
    reviews: [
      {
        id: 'r3',
        author: 'David O.',
        rating: 5,
        date: '3 days ago',
        comment: 'A lifesaver during blackouts! Runs my refrigerator and starlink router effortlessly. Recharged from 10% to 100% in just over an hour. Build quality is aerospace grade.',
        helpfulCount: 231,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 449.00,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 11200
    }
  },
  {
    id: 'cyber-chronos-smartwatch',
    title: 'NovaWatch Titan Ultra Sapphire Smartwatch',
    subtitle: 'Military-Grade Titanium Case, 1.96" AMOLED 2000nits, ECG & Dual-Band GPS',
    slug: 'novawatch-titan-ultra-sapphire',
    brand: 'NovaTech',
    category: 'audio-wearables',
    subcategory: 'Smartwatches',
    price: 89.90,
    originalPrice: 199.00,
    discountPercent: 55,
    rating: 4.8,
    reviewCount: 3410,
    soldCount: 21300,
    stockCount: 65,
    isFlashDrop: true,
    flashDropEndsInSeconds: 8900,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Manufacturer',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#1e293b' },
      { name: 'Titanium Orange Sport', hex: '#f97316' },
      { name: 'Alpine Silver', hex: '#e2e8f0' }
    ],
    specs: {
      'Display': '1.96" Ultra AMOLED (410x502) Always-On, 2000 nits peak',
      'Material': 'Grade 5 Titanium Body + Sapphire Crystal Glass',
      'Water Resistance': '5ATM + IP68 (50m dive & swim ready)',
      'Sensors': 'Real-time ECG, SpO2, Heart Rate, Stress, Sleep AI tracking',
      'Battery': 'Up to 14 days standard use, 35 days in ultra battery mode',
      'Connectivity': 'Bluetooth 5.3 calling, Standalone GPS tracking'
    },
    keyFeatures: [
      'Dual-Band 5-Satellite GPS for ultra-precise outdoor navigation',
      'Bluetooth Hi-Fi speaker for answering phone calls directly on wrist',
      'Over 150+ professional athletic & sports modes with auto-detection',
      'Custom watch face studio with customizable complications'
    ],
    seller: {
      id: 'novatech-global',
      name: 'NovaTech Flagship Direct',
      rating: 4.89,
      scorePercent: 98.7,
      followers: 240000,
      badge: 'Nova Mall',
      responseRate: '99% within 15 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    tags: ['⚡ Hot Flash Drop', 'Top Rated', 'Free Express'],
    reviews: [
      {
        id: 'r4',
        author: 'Samantha W.',
        rating: 5,
        date: 'Yesterday',
        comment: 'Brightest screen I have ever seen on a smartwatch. The battery only dropped 15% after 3 full days of heavy usage and daily GPS runs. Orange ocean band looks fantastic!',
        helpfulCount: 94,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 76.50,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 5400
    }
  },
  {
    id: 'dual-basket-smart-airfryer',
    title: 'NovaChef Vortex XL Dual-Zone Smart Air Fryer (9.5L)',
    subtitle: 'SyncCook & SyncFinish 8-in-1 Dual Chamber with Crisper Glass Windows & App Control',
    slug: 'novachef-vortex-xl-dual-airfryer',
    brand: 'NovaChef',
    category: 'home-appliances',
    subcategory: 'Smart Air Fryers',
    price: 94.50,
    originalPrice: 189.00,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 4180,
    soldCount: 18200,
    stockCount: 29,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Extended',
    thumbnail: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#111827' },
      { name: 'Champagne White', hex: '#f8fafc' }
    ],
    specs: {
      'Capacity': '9.5 Liters Total (Two 4.75L independent cooking baskets)',
      'Power': '2400W Rapid Vortex 360° Air Convection',
      'Temperature Range': '40°C – 230°C (105°F – 450°F)',
      'Functions': 'Air Fry, Roast, Bake, Broil, Dehydrate, Reheat, Defrost, Proof',
      'Coating': 'Non-Stick Ceramic BPA/PFOA Free Dishwasher Safe Baskets'
    },
    keyFeatures: [
      'SyncFinish: Cook chicken wings on Basket 1 and fries on Basket 2 to finish at the exact same second!',
      'ClearView glass doors with internal LED light to monitor browning without letting heat escape',
      'Uses up to 85% less oil than traditional deep frying with crispier results',
      '100+ one-touch guided digital recipes included in companion app'
    ],
    seller: {
      id: 'novachef-direct',
      name: 'NovaChef Kitchen Appliances',
      rating: 4.93,
      scorePercent: 99.1,
      followers: 172000,
      badge: 'Nova Mall',
      responseRate: '100% within 10 mins',
      shipsFrom: 'Nova Express Local Hub',
      isVerified: true
    },
    tags: ['Kitchen Best Seller', 'Dual Basket', 'Free Shipping'],
    reviews: [
      {
        id: 'r5',
        author: 'Chloe M.',
        rating: 5,
        date: '5 days ago',
        comment: 'We use this literally every single day. The dual baskets allow cooking salmon on one side and roast potatoes on the other. Food turns out restaurant-crispy with zero effort!',
        helpfulCount: 318,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'cyber-mech-rgb-keyboard',
    title: 'NovaForge Ghost 75 Wireless Mechanical Gaming Keyboard',
    subtitle: 'Gasket Mounted, Hot-Swappable Cream Yellow Switches, OLED Smart Screen & RGB',
    slug: 'novaforge-ghost-75-mechanical-keyboard',
    brand: 'NovaForge',
    category: 'computing-gaming',
    subcategory: 'Mechanical Keyboards',
    price: 54.99,
    originalPrice: 119.99,
    discountPercent: 54,
    rating: 4.8,
    reviewCount: 1950,
    soldCount: 9400,
    stockCount: 51,
    isFlashDrop: true,
    flashDropEndsInSeconds: 18000,
    isNovaChoice: true,
    isOfficialMall: false,
    isFreeShipping: true,
    expressDeliveryHours: 48,
    returnDays: 15,
    warranty: '1 Year Full Coverage',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cyberpunk Purple/Cyan', hex: '#6366f1' },
      { name: 'Vintage Cream Beige', hex: '#fef3c7' },
      { name: 'Midnight Smoke', hex: '#18181b' }
    ],
    specs: {
      'Layout': '75% Compact (81 Keys + CNC Metal Volume Knob)',
      'Connectivity': 'Tri-Mode: 2.4GHz Wireless, Bluetooth 5.2, USB-C Detachable',
      'Mounting': '5-Layer Acoustic Gasket Mount with PORON Foams & IXPE Switch Pads',
      'Switches': 'Pre-lubed Factory Custom Cream Linear (45g actuation, thocky sound)',
      'Battery': '4000mAh Rechargeable Li-Ion (up to 200 hours without backlight)'
    },
    keyFeatures: [
      'Customizable 0.85" OLED screen for custom GIFs, CPU stats, battery and connection',
      'Full hot-swappable PCB supporting both 3-pin and 5-pin mechanical switches',
      'South-facing dynamic RGB backlighting with 22 preset lighting animations',
      'PBT Dye-Sublimated cherry profile keycaps resistant to shine and wear'
    ],
    seller: {
      id: 'novaforge-tech',
      name: 'NovaForge Peripheral Studio',
      rating: 4.88,
      scorePercent: 97.9,
      followers: 64000,
      badge: 'Verified Merchant',
      responseRate: '98% within 30 mins',
      shipsFrom: 'Nova Direct Express',
      isVerified: true
    },
    tags: ['Gamer Choice', 'Hot Swappable', 'Tri-Mode'],
    reviews: [
      {
        id: 'r6',
        author: 'Alex T.',
        rating: 5,
        date: '4 days ago',
        comment: 'The typing sound on this keyboard right out of the box is pure deep thock. Zero rattling on spacebar. The little screen playing custom Mario GIFs is awesome.',
        helpfulCount: 145,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 46.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 7200
    }
  },
  {
    id: 'air-cushion-pro-runner',
    title: 'NovaStride AeroX 4D Carbon-Fiber Running Shoes',
    subtitle: 'Nitrogen-Infused Rebound Midsole, Breathable Jacquard Knit & Ultra Grip Outsole',
    slug: 'novastride-aerox-4d-running-shoes',
    brand: 'NovaStride',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 42.00,
    originalPrice: 110.00,
    discountPercent: 61,
    rating: 4.8,
    reviewCount: 5120,
    soldCount: 38400,
    stockCount: 120,
    isFlashDrop: true,
    flashDropEndsInSeconds: 12600,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '100% Fit Guarantee or Free Return',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Volt Solar Crimson', hex: '#dc2626' },
      { name: 'Pure Phantom White', hex: '#f8fafc' },
      { name: 'Obsidian Jet Black', hex: '#0f172a' }
    ],
    sizes: ['US 7 / EU 40', 'US 8 / EU 41', 'US 9 / EU 42.5', 'US 10 / EU 44', 'US 11 / EU 45', 'US 12 / EU 46'],
    specs: {
      'Weight': '210g (Ultra-light per shoe)',
      'Plate': 'Full-length 3D Curved Carbon Fiber Propulsion Plate',
      'Foam': 'NovaBoom Nitrogen-Supercritical Pebax Midsole (82% Energy Return)',
      'Upper': 'Seamless Engineered Air-Mesh with TPU arch locks',
      'Outsole': 'Continental Rubber Compound with wet-surface micro grooves'
    },
    keyFeatures: [
      'Effortless forward propulsion that saves runner fatigue over marathon distances',
      'Zero break-in period required: plush heel collar and anatomic toe box',
      'High-durability anti-abrasion rubber withstands 1,000+ kilometers of road running'
    ],
    seller: {
      id: 'novastride-sports',
      name: 'NovaStride Performance Athletics',
      rating: 4.91,
      scorePercent: 98.9,
      followers: 310000,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Logistics',
      isVerified: true
    },
    tags: ['Mega Deal', 'Super Popular', 'Free Return'],
    reviews: [
      {
        id: 'r7',
        author: 'Jordan P.',
        rating: 5,
        date: '6 days ago',
        comment: 'I ran my 10k personal best on the first day wearing these. The spring effect is incredible, feels like bouncy clouds underfoot.',
        helpfulCount: 520,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 34.50,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 9600
    }
  },
  {
    id: 'sonic-facial-skincare-set',
    title: 'NovaGlow Lumina 7-in-1 LED Therapy & Microcurrent Facial Sculptor',
    subtitle: 'Red & Blue Light Therapy, Thermal Warm Massage & EMS Facial Toning Device',
    slug: 'novaglow-lumina-led-facial-sculptor',
    brand: 'NovaGlow',
    category: 'beauty-health',
    subcategory: 'Hair Dryers & Stylers',
    price: 38.50,
    originalPrice: 89.00,
    discountPercent: 56,
    rating: 4.8,
    reviewCount: 2240,
    soldCount: 16700,
    stockCount: 88,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pearl Rose Gold', hex: '#fb7185' },
      { name: 'Glacier White', hex: '#f1f5f9' }
    ],
    specs: {
      'LED Modes': '7 Phototherapy Wavelengths (Red 630nm, Blue 465nm, Green 520nm, etc.)',
      'Technology': 'EMS Microcurrent Facial Lifting + 42°C Thermal Collagen Activation',
      'Vibration': '10,000 Sonic Micro-Vibrations per minute for deep serum infusion',
      'Battery': 'USB-C Wireless Charging base with 40 days battery per charge'
    },
    keyFeatures: [
      'Reduces appearance of fine lines, promotes natural collagen production and skin firmness',
      'Blue light mode clears acne breakouts and tightens enlarged pores',
      'Dramatically improves nutrient absorption of serums and moisturizers by 600%'
    ],
    seller: {
      id: 'novaglow-beauty',
      name: 'NovaGlow Skincare Laboratories',
      rating: 4.92,
      scorePercent: 98.8,
      followers: 195000,
      badge: 'Nova Mall',
      responseRate: '100% within 10 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    tags: ['Beauty Hit', 'Dermatologist Tested', 'Nova Choice'],
    reviews: [
      {
        id: 'r8',
        author: 'Rebecca B.',
        rating: 5,
        date: '1 week ago',
        comment: 'My skin texture feels so smooth and my cheekbones look visibly lifted after just 10 days of the 5-minute night routine. The heat mode is so relaxing.',
        helpfulCount: 388,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'laser-navigation-robot-vacuum',
    title: 'NovaBot X9 LiDAR Self-Emptying Robot Vacuum & Sonic Mop',
    subtitle: '8000Pa Cyclone Suction, 3D Obstacle Avoidance, Auto Mop Washing & 60-Day Dust Bag',
    slug: 'novabot-x9-lidar-robot-vacuum',
    brand: 'NovaBot',
    category: 'home-appliances',
    subcategory: 'Robot Vacuums',
    price: 299.00,
    originalPrice: 699.00,
    discountPercent: 57,
    rating: 4.9,
    reviewCount: 1890,
    soldCount: 7800,
    stockCount: 22,
    isFlashDrop: true,
    flashDropEndsInSeconds: 16500,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Suction Power': '8,000Pa Hyper-Cyclone Motor with carpet auto-boost',
      'Navigation': '360° LiDAR LDS Laser Radar + AI Structured Light Camera',
      'Mopping': 'VibraMop 3,000 scrub/min with 12mm auto-lifting over carpets',
      'Base Station': 'Self-Emptying 3.5L dust bag (60 days hands-free) + Auto Water Refill',
      'Battery': '5200mAh Li-Ion covering up to 3,000 sq ft on a single charge'
    },
    keyFeatures: [
      'Never gets stuck on shoes, cables, pet toys, or furniture legs thanks to AI vision',
      'Multi-floor 3D mapping with customizable no-go zones and room-by-room scheduling',
      'Deep cleans pet hair from thick pile carpets effortlessly without roller tangles'
    ],
    seller: {
      id: 'novabot-robotics',
      name: 'NovaBot Smart Robotics',
      rating: 4.94,
      scorePercent: 99.2,
      followers: 145000,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Logistics Hub',
      isVerified: true
    },
    tags: ['Smart Home', 'Top Tech 2026', 'Free Express'],
    reviews: [
      {
        id: 'r9',
        author: 'Daniel G.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Best smart home investment of the year. I have two golden retrievers and this vacuum picks up every strand of dog hair without tangling. The app map is super crisp.',
        helpfulCount: 290,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 269.00,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 15400
    }
  },
  {
    id: '4k-foldable-gps-drone',
    title: 'NovaSky Apex 4K Foldable HDR GPS Camera Drone',
    subtitle: '3-Axis Gimbal, 12km Video Transmission, 38 Mins Flight & Omnidirectional Sensing',
    slug: 'novasky-apex-4k-gps-drone',
    brand: 'NovaSky',
    category: 'computing-gaming',
    subcategory: 'PC Components',
    price: 189.90,
    originalPrice: 389.00,
    discountPercent: 51,
    rating: 4.8,
    reviewCount: 1670,
    soldCount: 6200,
    stockCount: 34,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Care Refresh',
    thumbnail: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Camera': '4K 60fps / 48MP 1/2-inch CMOS Sensor with HDR & 4x Zoom',
      'Gimbal': '3-Axis Mechanical Stabilization with 90° vertical rotation',
      'Flight Time': '38 Minutes per Intelligent Battery',
      'Range': '12km FHD Low-Latency Video Transmission (OcuLink 3.0)',
      'Wind Resistance': 'Level 6 Wind Resistance (Up to 38 km/h winds)'
    },
    keyFeatures: [
      'Under 249g ultra-light design: No registration or pilot license needed in most regions',
      'Auto Return-to-Home with precision GPS fail-safe on low battery or lost signal',
      'One-tap QuickShots: Dronie, Rocket, Circle, Helix, and MasterShots cinematic modes'
    ],
    seller: {
      id: 'novasky-official',
      name: 'NovaSky Aerospace Co.',
      rating: 4.87,
      scorePercent: 98.4,
      followers: 89000,
      badge: 'Nova Mall',
      responseRate: '98% within 20 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    tags: ['4K Video', 'GPS Auto Return', 'Ultra-Light'],
    reviews: [
      {
        id: 'r10',
        author: 'Liam C.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'The video footage is crystal clear and as smooth as butter. Flies rock steady even at the beach in strong ocean breeze.',
        helpfulCount: 164,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'titanium-thermal-flask-900ml',
    title: 'NovaHydro Peak Pure Titanium Vacuum Insulated Flask (900ml)',
    subtitle: 'Ultralight Medical Grade Grade 1 Titanium, Keeps Ice Cold 36h / Hot 24h',
    slug: 'novahydro-peak-titanium-flask',
    brand: 'NovaHydro',
    category: 'sports-outdoors',
    subcategory: 'Hydration Flasks',
    price: 28.99,
    originalPrice: 65.00,
    discountPercent: 55,
    rating: 4.9,
    reviewCount: 3100,
    soldCount: 24500,
    stockCount: 140,
    isFlashDrop: true,
    flashDropEndsInSeconds: 7800,
    isNovaChoice: true,
    isOfficialMall: false,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: 'Lifetime Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Raw Crystal Sand Titanium', hex: '#94a3b8' },
      { name: 'Aurora Rainbow Flame', hex: '#6366f1' },
      { name: 'Deep Space Matte Black', hex: '#0f172a' }
    ],
    specs: {
      'Material': '99.8% Pure Medical Grade Titanium (Zero Metallic Taste / Odor)',
      'Weight': 'Only 185g (50% lighter than stainless steel flasks of same volume)',
      'Insulation': 'Double-Wall Vacuum with Copper Radiant Barrier Layer',
      'Lid': 'Leakproof Paracord Tactical Handle with Silicone Seals'
    },
    keyFeatures: [
      'Resistant to acid, coffee, lemon juice, and tea — never corrodes or leaches chemicals',
      'Natural anti-bacterial oxide layer keeps beverages fresh for days',
      'Extremely rugged and drop-proof for mountaineering, gym, and daily desk hydration'
    ],
    seller: {
      id: 'novahydro-outdoors',
      name: 'NovaHydro Gear & Flasks',
      rating: 4.94,
      scorePercent: 99.0,
      followers: 110000,
      badge: 'Verified Merchant',
      responseRate: '100% within 15 mins',
      shipsFrom: 'Nova Direct Express',
      isVerified: true
    },
    tags: ['Pure Titanium', 'Bestseller', 'Lifetime Warranty'],
    reviews: [
      {
        id: 'r11',
        author: 'Victor H.',
        rating: 5,
        date: '5 days ago',
        comment: 'I put hot coffee in at 7am and at 6pm it was still steaming hot. Feels feather-light in backpack. Best water bottle ever made.',
        helpfulCount: 420,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 22.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 6100
    }
  },
  {
    id: 'nova-pro-espresso-barista',
    title: 'NovaBarista Apex Touch 20-Bar Professional Espresso Machine',
    subtitle: 'Dual ThermoBlock Heating, Built-in Conical Burr Grinder & Commercial Steam Wand',
    slug: 'novabarista-apex-espresso-machine',
    brand: 'NovaBarista',
    category: 'home-appliances',
    subcategory: 'Espresso Machines',
    price: 249.00,
    originalPrice: 549.00,
    discountPercent: 54,
    rating: 4.9,
    reviewCount: 1540,
    soldCount: 5600,
    stockCount: 15,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Full Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Pump Pressure': 'Italian 20-Bar High Pressure Extraction Pump',
      'Grinder': '30 Precise Micro-Grind Settings with hardened stainless steel conical burrs',
      'Heating': 'Dual ThermoBlocks for simultaneous espresso brewing and milk steaming',
      'Water Tank': '2.8L Removable Food-Grade Reservoir with Water Filter'
    },
    keyFeatures: [
      'Micro-foam milk texturing creates silky latte art like high-end cafes',
      'PID intelligent temperature control ensures exact 92°C brew temperature',
      '58mm commercial-grade portafilter with pre-infusion pressure profiling'
    ],
    seller: {
      id: 'novabarista-official',
      name: 'NovaBarista Coffee Tech',
      rating: 4.96,
      scorePercent: 99.3,
      followers: 92000,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    tags: ['Cafe Quality', '20-Bar Italian', 'Free Express Delivery'],
    reviews: [
      {
        id: 'r12',
        author: 'Gianna L.',
        rating: 5,
        date: '1 week ago',
        comment: 'I cancelled my daily Starbucks habit. Pulls rich golden crema every single morning. Grinder is quiet and consistent.',
        helpfulCount: 209,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'ultrawide-curved-gaming-monitor',
    title: 'NovaVision Odyssey 34" WQHD 165Hz Curved Gaming Monitor',
    subtitle: '1000R Curve, 1ms MPRT, HDR400, 99% sRGB, Type-C 90W Reverse Charging & KVM',
    slug: 'novavision-odyssey-34-curved-monitor',
    brand: 'NovaVision',
    category: 'computing-gaming',
    subcategory: '4K Monitors',
    price: 279.00,
    originalPrice: 499.00,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 2310,
    soldCount: 8900,
    stockCount: 25,
    isFlashDrop: true,
    flashDropEndsInSeconds: 19400,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Zero Dead Pixel Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Resolution': '3440 x 1440 Ultrawide 21:9 WQHD',
      'Curvature & Panel': '1000R Immersive Curvature Fast-VA Matrix',
      'Refresh Rate': '165Hz with AMD FreeSync Premium Pro & G-Sync Compatible',
      'Ports': '2x HDMI 2.1, 1x DP 1.4, 1x USB-C (90W PD), 2x USB 3.0 Hub, KVM Switch'
    },
    keyFeatures: [
      'Single USB-C cable connects your laptop, delivers 4K display, and powers it at 90W',
      'Built-in KVM allows controlling 2 computers with one set of keyboard and mouse',
      'TUV Rheinland certified Eye-Care with low blue light and flicker-free technology'
    ],
    seller: {
      id: 'novavision-displays',
      name: 'NovaVision Displays Ltd',
      rating: 4.9,
      scorePercent: 98.6,
      followers: 180000,
      badge: 'Nova Mall',
      responseRate: '100% within 10 mins',
      shipsFrom: 'Nova Express Warehouse',
      isVerified: true
    },
    tags: ['165Hz Ultrawide', 'USB-C 90W', '3 Yr Guarantee'],
    reviews: [
      {
        id: 'r13',
        author: 'Eric S.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Massive screen real estate! Perfect for video editing timelines, coding, and playing Flight Simulator with panoramic field of view.',
        helpfulCount: 310,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nova-fold-ultra-smartphone',
    title: 'NovaFold Ultra 5G (16GB RAM + 512GB Storage)',
    subtitle: '7.92" Foldable 120Hz LTPO OLED, Snapdragon 8 Gen 3, 200MP Triple Periscope Camera',
    slug: 'novafold-ultra-5g-smartphone',
    brand: 'NovaMobile',
    category: 'phones-tablets',
    subcategory: 'Flagship Smartphones',
    price: 899.00,
    originalPrice: 1499.00,
    discountPercent: 40,
    rating: 4.9,
    reviewCount: 3890,
    soldCount: 14200,
    stockCount: 30,
    isFlashDrop: true,
    flashDropEndsInSeconds: 21000,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years VIP Screen Protection & Global Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Phantom Carbon', hex: '#09090b' },
      { name: 'Emerald Celestial', hex: '#065f46' },
      { name: 'Silk Starlight Titanium', hex: '#e2e8f0' }
    ],
    specs: {
      'Inner Screen': '7.92" Flexible LTPO AMOLED (2344x2156), 1-120Hz, 3000 nits, Zero Crease',
      'Outer Screen': '6.45" FHD+ AMOLED 120Hz with Nano-Crystal Armor Glass',
      'Processor': 'Qualcomm Snapdragon 8 Gen 3 Leading Version (4nm)',
      'Camera': '200MP Main OIS + 50MP Ultra-Wide Macro + 50MP 5x Periscope Telephoto (100x Digital)',
      'Battery & Charge': '5150mAh Dual Silicon-Carbon, 100W Wired + 50W Wireless'
    },
    keyFeatures: [
      'Ultra-slim 9.9mm folded thickness with aircraft-grade titanium waterdrop hinge',
      'IPX8 waterproof rating for worry-free rain and splash usage',
      'Desktop-class multi-window multitasking allows running 3 apps side-by-side with stylus support'
    ],
    seller: {
      id: 'novamobile-official',
      name: 'NovaMobile Official Store',
      rating: 4.98,
      scorePercent: 99.7,
      followers: 520000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express VIP Vault',
      isVerified: true
    },
    tags: ['Flagship of Year', '200MP Periscope', 'Free VIP Protection'],
    reviews: [
      {
        id: 'r14',
        author: 'Nathaniel E.',
        rating: 5,
        date: '3 days ago',
        comment: 'The hinge is virtually creaseless. Typing on the giant screen feels like holding a mini tablet in my pocket. Charges to 100% in 28 minutes flat.',
        helpfulCount: 450,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 849.00,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 14000
    }
  },
  ...ALL_EXTENDED_PRODUCTS
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'NOVAWELCOME20',
    title: 'New Shopper Welcome Pass',
    discountType: 'percentage',
    value: 20,
    minSpend: 30,
    description: 'Get 20% OFF your entire first order on Cart NOVA!',
    expiresAt: '2026-12-31',
    isCollected: true
  },
  {
    code: 'FLASH15',
    title: 'Flash Drops Extra 15% OFF',
    discountType: 'percentage',
    value: 15,
    minSpend: 50,
    description: 'Stackable with all Lightning Flash Drops and Tech Malls.',
    expiresAt: '2026-12-31',
    isCollected: false
  },
  {
    code: 'NOVAFREESHIP',
    title: 'Free NovaExpress Delivery',
    discountType: 'fixed',
    value: 12,
    minSpend: 25,
    description: '100% Free Next-Day Priority Shipping voucher across all hubs.',
    expiresAt: '2026-12-31',
    isCollected: true
  },
  {
    code: 'MEGABARGAIN30',
    title: 'Super Saver $30 Off',
    discountType: 'fixed',
    value: 30,
    minSpend: 150,
    description: 'Save $30 on orders over $150 in Electronics & Appliances.',
    expiresAt: '2026-12-31',
    isCollected: false
  }
];

export const LIVE_STREAMS: LiveStreamShopping[] = [
  {
    id: 'live-1',
    title: '🔥 Live Drop: NovaSound Pulse ANC vs Competitors Live Mic Test!',
    hostName: 'DJ Kairo & TechSara',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    viewers: 14280,
    featuredProduct: PRODUCTS[0],
    videoThumb: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=80',
    badge: 'LIVE EXCLUSIVE',
    discountPercent: 55
  },
  {
    id: 'live-2',
    title: '⚡ Off-Grid Emergency Test: Powering Microwave & TV on NovaPower 1200W',
    hostName: 'Captain Solar',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    viewers: 9420,
    featuredProduct: PRODUCTS[1],
    videoThumb: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
    badge: 'DEMO STREAM',
    discountPercent: 48
  },
  {
    id: 'live-3',
    title: '👟 Marathon Sprint Try-On & Water-Resist Test of NovaStride AeroX',
    hostName: 'Coach Ryan',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    viewers: 18900,
    featuredProduct: PRODUCTS[5],
    videoThumb: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80',
    badge: 'SQUAD BUY',
    discountPercent: 65
  }
];

export const PICKUP_STATIONS = [
  { id: 'ps-1', name: 'NovaExpress Central Hub - Downtown Metro Plaza', city: 'Metropolis', hours: 'Mon-Sun: 7am - 10pm', fee: 0 },
  { id: 'ps-2', name: 'Nova Locker 24/7 - Westside Shopping Boulevard', city: 'Metropolis', hours: '24/7 Smart Automated Locker', fee: 0 },
  { id: 'ps-3', name: 'Nova Express Station - Airport Business District', city: 'Metropolis', hours: 'Mon-Sat: 8am - 8pm', fee: 0 },
  { id: 'ps-4', name: 'Nova Pickup Point - University Campus Center', city: 'Metropolis', hours: 'Mon-Fri: 8am - 9pm', fee: 0 }
];
