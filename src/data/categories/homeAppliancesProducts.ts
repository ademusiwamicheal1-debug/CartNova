import { Product } from '../../types';

export const HOME_APPLIANCES_PRODUCTS: Product[] = [
  {
    id: 'novabarista-espresso-touch',
    title: 'NovaBarista ProTouch 20-Bar Espresso Machine with Integrated Conical Grinder',
    subtitle: 'Microfoam Steam Wand, PID Thermal Control, Touch Color Display & 30 Grind Settings',
    slug: 'novabarista-protouch-espresso-machine',
    brand: 'NovaChef',
    category: 'home-appliances',
    subcategory: 'Espresso Machines',
    price: 389.00,
    originalPrice: 699.00,
    discountPercent: 44,
    rating: 4.95,
    reviewCount: 3120,
    soldCount: 12800,
    stockCount: 30,
    isFlashDrop: true,
    flashDropEndsInSeconds: 17200,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Manufacturer Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Stainless Steel', hex: '#94a3b8' },
      { name: 'Matte Truffle Black', hex: '#18181b' }
    ],
    specs: {
      'Pump Pressure': 'Italian 20-Bar High Performance Pump',
      'Grinder': 'Precision Stainless Steel Conical Burr with 30 settings',
      'Heating': 'ThermoJet 3-second rapid warm-up system',
      'Water Tank': '2.5L Removable BPA-Free reservoir with water filter'
    },
    keyFeatures: [
      'Café quality silky microfoam milk texturing for latte art creation',
      'Pre-infusion technology gently blooms espresso grounds before full pressure extraction',
      'One-touch automatic single & double shots with customizable volume and temperature'
    ],
    seller: {
      id: 'novachef-flagship',
      name: 'NovaChef Kitchen Mall',
      rating: 4.97,
      scorePercent: 99.5,
      followers: 290000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Warehouse',
      isVerified: true
    },
    tags: ['20-Bar Espresso', 'Conical Grinder', '3s Instant Heat'],
    reviews: [
      {
        id: 'rev-ha-1',
        author: 'Marco D.',
        rating: 5,
        date: '3 days ago',
        comment: 'Saves me $8 every morning at Starbucks. Crema is thick and golden brown. Steaming milk takes less than 20 seconds.',
        helpfulCount: 310,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 349.00,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 15000
    }
  },
  {
    id: 'novafry-dual-zone-air-fryer-10qt',
    title: 'NovaCrisp 10-Quart Dual-Zone Smart Air Fryer & Dehydrator (SyncCook & MatchCook)',
    subtitle: 'Cook 2 Foods 2 Ways Simultaneously, Glass Viewing Windows, 12 One-Touch Presets',
    slug: 'novacrisp-10qt-dual-zone-air-fryer',
    brand: 'NovaChef',
    category: 'home-appliances',
    subcategory: 'Smart Air Fryers',
    price: 119.99,
    originalPrice: 199.99,
    discountPercent: 40,
    rating: 4.92,
    reviewCount: 5890,
    soldCount: 34500,
    stockCount: 65,
    isFlashDrop: true,
    flashDropEndsInSeconds: 12600,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Piano Black & Rose Gold', hex: '#1c1917' }
    ],
    specs: {
      'Capacity': '10-Quart (2x 5-Quart independent baskets)',
      'Functions': 'Air Fry, Roast, Broil, Bake, Reheat, Dehydrate, Rotisserie',
      'Temperature Range': '95°F to 450°F',
      'Dishwasher Safe': 'PTFE/PFOA-free nonstick crisper plates'
    },
    keyFeatures: [
      'Smart SyncFinish finishes fries in Basket 1 and salmon in Basket 2 at the exact same second',
      'Clear glass viewing windows with interior lights allow monitoring without opening baskets',
      'Uses up to 85% less oil than traditional deep frying with crunchy crispy results'
    ],
    seller: {
      id: 'novachef-flagship',
      name: 'NovaChef Kitchen Mall',
      rating: 4.97,
      scorePercent: 99.5,
      followers: 290000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Warehouse',
      isVerified: true
    },
    tags: ['Dual Basket 10Qt', 'SyncCook', 'Glass Windows'],
    reviews: [
      {
        id: 'rev-ha-2',
        author: 'Jessica L.',
        rating: 5,
        date: '1 week ago',
        comment: 'Cooked chicken wings and roasted asparagus at the same time and both finished at the exact same moment. Cleaning is a breeze.',
        helpfulCount: 420,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novavac-robot-cleaner-x10',
    title: 'NovaClean X10 Ultra Robot Vacuum & Mop with All-in-One Auto-Empty Base',
    subtitle: '8000Pa Cyclone Suction, Hot Water Mop Washing & Drying, 3D LiDAR Obstacle Avoidance',
    slug: 'novaclean-x10-ultra-robot-vacuum',
    brand: 'NovaClean',
    category: 'home-appliances',
    subcategory: 'Robot Vacuums',
    price: 499.00,
    originalPrice: 899.00,
    discountPercent: 44,
    rating: 4.91,
    reviewCount: 2450,
    soldCount: 9800,
    stockCount: 22,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Home Care Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Glacier White & Chrome', hex: '#f1f5f9' },
      { name: 'Space Black', hex: '#0f172a' }
    ],
    specs: {
      'Suction Power': '8,000Pa Max Vormax Suction',
      'Base Station': 'Auto-Empties (75 Days Hands-Free), Washes Mops with 60°C Hot Water & Hot Air Dries',
      'Navigation': 'AI Action 3D Structured Light + LDS LiDAR Navigation',
      'Battery': '5200mAh (Cleans up to 3,200 sq.ft on single run)'
    },
    keyFeatures: [
      'Automatic mop lifting (12mm) prevents wet carpets while vacuuming',
      'Dual spinning pressurized mop pads scrub stubborn floor stains effortlessly',
      'Smart app with 3D multi-floor mapping, no-go zones, and custom room schedules'
    ],
    seller: {
      id: 'novaclean-store',
      name: 'NovaClean Official Store',
      rating: 4.93,
      scorePercent: 98.8,
      followers: 165000,
      badge: 'Nova Mall',
      responseRate: '99% within 5 mins',
      shipsFrom: 'Nova Express Central',
      isVerified: true
    },
    tags: ['8000Pa Suction', 'Hot Water Mop Wash', '75 Days Auto-Empty'],
    reviews: [
      {
        id: 'rev-ha-3',
        author: 'Robert F.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'With 2 dogs that shed constantly, this robot has been life changing. The base washes and dries the mop pads so they never smell.',
        helpfulCount: 290,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novablend-pro-speed-1800w',
    title: 'NovaBlend Apex 1800W Commercial-Grade High Speed Blender',
    subtitle: '64oz Tritan Jar, 6 Titanium Blades, 8 Touch Presets, Pulse & Self-Cleaning Mode',
    slug: 'novablend-apex-1800w-blender',
    brand: 'NovaChef',
    category: 'home-appliances',
    subcategory: 'Blenders & Food Processors',
    price: 89.99,
    originalPrice: 159.99,
    discountPercent: 44,
    rating: 4.88,
    reviewCount: 3420,
    soldCount: 21000,
    stockCount: 75,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Motor Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Gunmetal', hex: '#475569' },
      { name: 'Crimson Red', hex: '#dc2626' }
    ],
    specs: {
      'Motor': '1,800 Watts Peak / 32,000 RPM Commercial Motor',
      'Blades': '6-point hardened aerospace Japanese stainless steel blades',
      'Pitcher': '64oz (2.0L) BPA-Free Shatterproof Eastman Tritan Jar',
      'Controls': 'LED Digital Timer with 10 Variable Speeds + Pulse'
    },
    keyFeatures: [
      'Pulverizes whole fruits, frozen berries, ice cubes, and nuts into silk smoothies in 30 seconds',
      'Friction heating mode heats cold vegetables into steaming fresh soup in 6 minutes',
      'Self-cleans in 45 seconds with a drop of dish soap and warm water'
    ],
    seller: {
      id: 'novachef-flagship',
      name: 'NovaChef Kitchen Mall',
      rating: 4.97,
      scorePercent: 99.5,
      followers: 290000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Warehouse',
      isVerified: true
    },
    tags: ['1800W Motor', 'Crushes Ice in Seconds', 'Self-Cleaning'],
    reviews: [
      {
        id: 'rev-ha-4',
        author: 'Monica S.',
        rating: 5,
        date: '5 days ago',
        comment: 'Every bit as powerful as a Vitamix for a fraction of the cost. Smoothies are velvety with zero chunks.',
        helpfulCount: 180,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novapure-h13-air-purifier-large',
    title: 'NovaPure H13 True HEPA Smart Room Air Purifier (up to 1,500 Sq.Ft)',
    subtitle: 'Air Quality PM2.5 Color Sensor, Pet Hair Activated Carbon Filter, 22dB Sleep Mode, Alexa/App',
    slug: 'novapure-h13-smart-air-purifier',
    brand: 'NovaPure',
    category: 'home-appliances',
    subcategory: 'Air Purifiers',
    price: 99.99,
    originalPrice: 179.99,
    discountPercent: 44,
    rating: 4.93,
    reviewCount: 4200,
    soldCount: 26000,
    stockCount: 50,
    isFlashDrop: true,
    flashDropEndsInSeconds: 14000,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pure Matte White', hex: '#f8fafc' }
    ],
    specs: {
      'Coverage': '1,500 sq ft in 30 minutes / 400 sq ft in 8 minutes (CADR 350 m³/h)',
      'Filtration': '3-Stage: Washable Pre-Filter + Medical H13 True HEPA (99.97% down to 0.1 microns) + High-Efficiency Carbon',
      'Noise Level': 'Ultra-Quiet 22dB in Sleep Mode with lights-off toggle',
      'Smart Features': 'Real-time laser PM2.5 numerical display and auto-fan adjustment'
    },
    keyFeatures: [
      'Captures pollen, pet dander, cooking odors, smoke particles, and dust mites',
      'Filter life monitor notifies smartphone app when replacement is needed (lasts 6-8 months)',
      'Energy Star certified consuming less than $12 of electricity per year on continuous mode'
    ],
    seller: {
      id: 'novapure-store',
      name: 'NovaPure Climate Hub',
      rating: 4.95,
      scorePercent: 99.2,
      followers: 175000,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Hub',
      isVerified: true
    },
    tags: ['H13 Medical HEPA', '1500 Sq.Ft Coverage', '22dB Whisper Quiet'],
    reviews: [
      {
        id: 'rev-ha-5',
        author: 'Ashley T.',
        rating: 5,
        date: '1 week ago',
        comment: 'My morning allergy congestion disappeared within 2 nights of having this in our master bedroom. Highly recommended!',
        helpfulCount: 240,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novakettle-gooseneck-temperature',
    title: 'NovaPour Precision Electric Gooseneck Kettle (0.9L Stainless Steel)',
    subtitle: '1200W Rapid Boil, ±1°F PID Variable Temp Control, 60-Minute Keep Warm, Barista Spout',
    slug: 'novapour-precision-gooseneck-kettle',
    brand: 'NovaChef',
    category: 'home-appliances',
    subcategory: 'Espresso Machines',
    price: 45.99,
    originalPrice: 79.99,
    discountPercent: 43,
    rating: 4.94,
    reviewCount: 3820,
    soldCount: 27400,
    stockCount: 80,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Onyx Black with Walnut Wood Accents', hex: '#18181b' },
      { name: 'Stainless Steel', hex: '#94a3b8' }
    ],
    specs: {
      'Capacity': '0.9L (30 oz) 100% Food-Grade 304 Stainless Steel',
      'Power': '1200W Heats full kettle in under 3 minutes',
      'Temperature Range': '104°F to 212°F with LCD digital countdown brew stopwatch',
      'Spout': 'Precision 0.8cm gooseneck spout for optimal 90° pour-over flow rate'
    },
    keyFeatures: [
      'Precision temperature dial presets for Green Tea, Oolong, AeroPress, French Press & Pour Over',
      'Real wood handle stays cool to the touch with balanced counterweighted ergonomics',
      'Auto shutoff and boil-dry safety protection'
    ],
    seller: {
      id: 'novachef-flagship',
      name: 'NovaChef Kitchen Mall',
      rating: 4.97,
      scorePercent: 99.5,
      followers: 290000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Warehouse',
      isVerified: true
    },
    tags: ['PID 1°F Control', 'Barista Spout', 'Real Walnut Wood'],
    reviews: [
      {
        id: 'rev-ha-6',
        author: 'Liam C.',
        rating: 5,
        date: '4 days ago',
        comment: 'The pour control is flawless. Dialing exact 202°F for light roast Ethiopian beans creates perfect cups every single morning.',
        helpfulCount: 165,
        verifiedPurchase: true
      }
    ]
  }
];
