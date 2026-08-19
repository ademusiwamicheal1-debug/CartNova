import { Product } from '../../types';

export const TECH_PRODUCTS: Product[] = [
  {
    id: 'nova-pro-phone-16',
    title: 'NovaPro 16 Ultra 5G (16GB RAM + 512GB Titanium)',
    subtitle: '6.8" 144Hz AMOLED, Snapdragon 8 Gen 3, 200MP Quad Camera with 120W HyperCharge',
    slug: 'novapro-16-ultra-5g',
    brand: 'NovaMobile',
    category: 'phones-tablets',
    subcategory: 'Flagship Smartphones',
    price: 749.99,
    originalPrice: 1199.99,
    discountPercent: 37,
    rating: 4.9,
    reviewCount: 3410,
    soldCount: 18200,
    stockCount: 55,
    isFlashDrop: true,
    flashDropEndsInSeconds: 18500,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Manufacturer VIP Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Slate', hex: '#334155' },
      { name: 'Nebula Purple', hex: '#6b21a8' },
      { name: 'Desert Gold', hex: '#d97706' }
    ],
    specs: {
      'Display': '6.8" Quad HD+ Curved AMOLED 1-144Hz LTPO, 3200 nits Peak',
      'Processor': 'Snapdragon 8 Gen 3 Leading Edition (4nm)',
      'Camera': '200MP OIS Main + 50MP Ultra-Wide + 50MP 5x Periscope',
      'Battery': '5400mAh Silicon-Carbon with 120W Wired + 50W Wireless',
      'OS': 'NovaOS 5.0 (Android 15 Base)'
    },
    keyFeatures: [
      '200MP Ultra-Clear sensor captures stunning detail day and night',
      '120W HyperCharge powers 0 to 100% in just 19 minutes',
      'IP68 dust and water resistance with aerospace titanium chassis'
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
    tags: ['Flagship 2026', '200MP Camera', '120W Fast Charge'],
    reviews: [
      {
        id: 'rev-tp-1',
        author: 'Julian M.',
        rating: 5,
        date: '3 days ago',
        comment: 'Camera is mindblowing. Telephoto zoom captures lunar craters crisp. Battery easily lasts 2 full days of heavy usage.',
        helpfulCount: 284,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 699.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 12000
    }
  },
  {
    id: 'nova-tab-pro-12',
    title: 'NovaPad Pro 12.9" 2.8K OLED Drawing & Gaming Tablet (12GB+256GB)',
    subtitle: 'Includes Active Magnetic Stylus Pen & Magnetic Folio Keyboard, 10000mAh Battery',
    slug: 'novapad-pro-12-tablet',
    brand: 'NovaTech',
    category: 'phones-tablets',
    subcategory: 'iPads & Tablets',
    price: 499.00,
    originalPrice: 799.00,
    discountPercent: 38,
    rating: 4.8,
    reviewCount: 1420,
    soldCount: 6800,
    stockCount: 38,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Screen Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#475569' },
      { name: 'Silver Frost', hex: '#e2e8f0' }
    ],
    specs: {
      'Screen': '12.9-inch 2.8K (2880x1800) OLED, 120Hz, 100% DCI-P3',
      'Audio': '8-Speaker Dolby Atmos Cinema System',
      'Stylus': '4096-level Pressure Sensing NovaPencil with 2ms latency',
      'Battery': '10,500mAh with 65W GaN Fast Charging'
    },
    keyFeatures: [
      'Desktop workstation mode with floating multi-window capability',
      'Zero-lag drawing experience tailored for Procreate, Photoshop & Canva',
      'Bundled with detachable backlit smart keyboard and stylus'
    ],
    seller: {
      id: 'novatech-mall',
      name: 'NovaTech Authorized Hub',
      rating: 4.92,
      scorePercent: 98.6,
      followers: 240000,
      badge: 'Nova Mall',
      responseRate: '99% within 5 mins',
      shipsFrom: 'Nova Express Central',
      isVerified: true
    },
    tags: ['Drawing Stylus Included', '2.8K OLED', 'Dolby Audio'],
    reviews: [
      {
        id: 'rev-tp-2',
        author: 'Sandra P.',
        rating: 5,
        date: '1 week ago',
        comment: 'The OLED screen is ridiculously vibrant. Having both the stylus and keyboard in the box makes this a phenomenal value.',
        helpfulCount: 160,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'anker-nova-gan-140w-charger',
    title: 'NovaPower 140W 4-Port GaN Prime Fast Charger Hub',
    subtitle: '3x USB-C PD 3.1 (140W Max) + 1x USB-A QC 4.0, Compact Travel Foldable Plug',
    slug: 'novapower-140w-gan-charger',
    brand: 'NovaPower',
    category: 'phones-tablets',
    subcategory: 'Fast Chargers',
    price: 49.99,
    originalPrice: 89.99,
    discountPercent: 44,
    rating: 4.95,
    reviewCount: 5280,
    soldCount: 38400,
    stockCount: 120,
    isFlashDrop: true,
    flashDropEndsInSeconds: 9800,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Replacement Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#1e293b' },
      { name: 'Arctic White', hex: '#f8fafc' }
    ],
    specs: {
      'Total Output': '140W GaN III Fast Power Delivery',
      'Single Port Max': '140W USB-C (Charges MacBook Pro 16" to 50% in 28 min)',
      'Safety': 'ActiveShield 3.0 Temperature Monitoring (3M checks/day)',
      'Dimensions': '68 x 68 x 31 mm (Ultra-Compact)'
    },
    keyFeatures: [
      'Powers 2 Laptops + 1 Tablet + 1 Phone simultaneously with dynamic power allocation',
      'GaN III technology runs 40% cooler than standard silicon chargers',
      'Universal compatibility: Apple, Samsung 45W PPS, Dell, Lenovo, Steam Deck'
    ],
    seller: {
      id: 'novapower-flagship',
      name: 'NovaPower Energy Mall',
      rating: 4.97,
      scorePercent: 99.4,
      followers: 380000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Global',
      isVerified: true
    },
    tags: ['140W GaN', 'MacBook & iPhone Fast', 'Best Value Charger'],
    reviews: [
      {
        id: 'rev-tp-3',
        author: 'Derek L.',
        rating: 5,
        date: '5 days ago',
        comment: 'Replaced 4 different chargers in my travel bag with this single cube. Charges my laptop, iPad and phone together without even getting warm!',
        helpfulCount: 220,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'magnetic-power-bank-10000mah',
    title: 'NovaSnap Qi2 15W Magnetic Wireless Power Bank (10,000mAh)',
    subtitle: 'Slim Aluminum Build, Foldable Kickstand, Digital Battery % LED Screen, 30W USB-C',
    slug: 'novasnap-qi2-magnetic-power-bank',
    brand: 'NovaSnap',
    category: 'phones-tablets',
    subcategory: 'Power Banks',
    price: 34.99,
    originalPrice: 59.99,
    discountPercent: 42,
    rating: 4.85,
    reviewCount: 2890,
    soldCount: 21500,
    stockCount: 88,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '18 Months Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1609592424388-e93895e636b1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592424388-e93895e636b1?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Midnight Titanium', hex: '#0f172a' },
      { name: 'Sage Green', hex: '#15803d' },
      { name: 'Blush Pink', hex: '#f43f5e' }
    ],
    specs: {
      'Wireless Tech': 'Certified Qi2 15W MagSafe Fast Snap',
      'Capacity': '10,000mAh (charges iPhone 16 Pro 2.2 times)',
      'Wired Speed': '30W Bi-directional USB-C PD',
      'Kickstand': 'Zinc-alloy adjustable angle stand'
    },
    keyFeatures: [
      'Strong 12N neodymium magnetic lock holds phone securely in portrait or landscape',
      'Pass-through charging enables charging phone and power bank together overnight',
      'Smart real-time LED percentage display'
    ],
    seller: {
      id: 'novasnap-store',
      name: 'NovaSnap Accessories',
      rating: 4.88,
      scorePercent: 97.8,
      followers: 95000,
      badge: 'Verified Merchant',
      responseRate: '98% within 15 mins',
      shipsFrom: 'Nova Hub West',
      isVerified: true
    },
    tags: ['Qi2 Wireless', 'MagSafe Kickstand', 'Pocket Size'],
    reviews: [
      {
        id: 'rev-tp-4',
        author: 'Clara W.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Snap is super strong and the stand is great for FaceTime while cooking. Essential daily carry.',
        helpfulCount: 94,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novabeats-air-earbuds-pro',
    title: 'NovaBeats Air Pro TWS True Wireless Earbuds',
    subtitle: '45dB Smart ANC, Spatial Audio Head Tracking, 42h Battery, IPX7 Waterproof',
    slug: 'novabeats-air-pro-tws',
    brand: 'NovaSound',
    category: 'audio-wearables',
    subcategory: 'TWS Earbuds',
    price: 39.99,
    originalPrice: 79.99,
    discountPercent: 50,
    rating: 4.82,
    reviewCount: 4670,
    soldCount: 31200,
    stockCount: 95,
    isFlashDrop: true,
    flashDropEndsInSeconds: 15400,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '1 Year Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pearl White', hex: '#f8fafc' },
      { name: 'Matte Obsidian', hex: '#09090b' },
      { name: 'Sky Cyan', hex: '#06b6d4' }
    ],
    specs: {
      'ANC Depth': '-45dB Adaptive Active Noise Cancellation',
      'Driver': '11mm Liquid Crystal Polymer Bass Driver',
      'Battery': '8.5h Single / 42h with wireless charging case',
      'Waterproof': 'IPX7 Sweat & Rain Proof'
    },
    keyFeatures: [
      'Low latency 38ms Gaming Mode with sync sound effects',
      'Custom EQ mobile app with 8 preset profiles and personalized hearing test',
      'Triple-mic ENC for crystal-clear phone and meeting calls'
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
    tags: ['Spatial Audio', '42h Battery', 'Wireless Charging'],
    reviews: [
      {
        id: 'rev-tp-5',
        author: 'Kevin T.',
        rating: 5,
        date: '4 days ago',
        comment: 'Bass is punchy without distorting vocals. Stays firmly in ears during 10k running.',
        helpfulCount: 145,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 32.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 8000
    }
  },
  {
    id: 'novawatch-ultra-titanium',
    title: 'NovaWatch Ultra 2 AMOLED Rugged Smartwatch (GPS + ECG + Compass)',
    subtitle: '100m Waterproof Diving, 20-Day Battery, Sapphire Glass, Dual-Frequency GPS',
    slug: 'novawatch-ultra-2-smartwatch',
    brand: 'NovaFit',
    category: 'audio-wearables',
    subcategory: 'Smartwatches',
    price: 119.00,
    originalPrice: 229.00,
    discountPercent: 48,
    rating: 4.91,
    reviewCount: 3120,
    soldCount: 16500,
    stockCount: 45,
    isFlashDrop: true,
    flashDropEndsInSeconds: 22000,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years Global Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Orange Alpine', hex: '#ea580c' },
      { name: 'Tactical Black Trail', hex: '#18181b' },
      { name: 'Oceanic Blue Loop', hex: '#0284c7' }
    ],
    specs: {
      'Display': '1.96" AMOLED 1000 nits Always-On Screen with Sapphire crystal',
      'Sensors': 'Optical Heart Rate, SpO2, ECG, Barometer, Temperature, Compass',
      'Water Rating': '10 ATM (100 meters dive proof)',
      'Battery': '20 days typical / 60 hours continuous GPS tracking'
    },
    keyFeatures: [
      'Dual-frequency L1+L5 GPS accurately charts forest trails and city marathons',
      '150+ Sports modes with automated workout detection and VO2 Max analysis',
      'Bluetooth phone calls, NFC contactless transit pass & music storage'
    ],
    seller: {
      id: 'novafit-store',
      name: 'NovaFit Wearables Mall',
      rating: 4.94,
      scorePercent: 99.1,
      followers: 210000,
      badge: 'Nova Mall',
      responseRate: '100% within 3 mins',
      shipsFrom: 'Nova Express Vault',
      isVerified: true
    },
    tags: ['100m Waterproof', '20-Day Battery', 'Dual GPS'],
    reviews: [
      {
        id: 'rev-tp-6',
        author: 'Brian S.',
        rating: 5,
        date: '6 days ago',
        comment: 'Took this on a 5-day Appalachian trail hike. GPS tracking was pinpoint accurate and still had 68% battery remaining upon return.',
        helpfulCount: 310,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novaboom-speaker-60w',
    title: 'NovaBoom 360 Party SoundBox 60W Bluetooth 5.4 Speaker',
    subtitle: 'IPX7 Waterproof, RGB Beat-Sync Lighting, 24h Playtime, TWS Stereo Pairing',
    slug: 'novaboom-360-bluetooth-speaker',
    brand: 'NovaSound',
    category: 'audio-wearables',
    subcategory: 'Bluetooth Speakers',
    price: 45.99,
    originalPrice: 89.99,
    discountPercent: 49,
    rating: 4.86,
    reviewCount: 1980,
    soldCount: 12400,
    stockCount: 60,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '1 Year Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Jet Black', hex: '#0f172a' },
      { name: 'Camo Olive', hex: '#3f6212' },
      { name: 'Lava Red', hex: '#b91c1c' }
    ],
    specs: {
      'Power Output': '60W Peak Dual Woofer + Dual Tweeter Array',
      'Battery': '7800mAh (Doubles as emergency power bank to charge phones)',
      'Bluetooth': '5.4 Low Latency with 30m wireless range',
      'Waterproof': 'IPX7 floats on pool water'
    },
    keyFeatures: [
      '360-degree omnidirectional acoustics with dual passive radiator bass thump',
      'PartyCast connects up to 100 NovaBoom speakers for synchronized festival sound',
      'RGB dynamic ring lights pulse to musical rhythms'
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
    tags: ['60W Peak Audio', 'IPX7 Floats', 'RGB Beat Sync'],
    reviews: [
      {
        id: 'rev-tp-7',
        author: 'Leo H.',
        rating: 5,
        date: '1 week ago',
        comment: 'Incredible bass for its size. We used it at our beach barbecue all afternoon in light drizzle without any issues.',
        helpfulCount: 88,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novablade-rtx4080-laptop',
    title: 'NovaBlade Apex 16" QHD 240Hz Gaming Laptop (Core i9 + RTX 4080)',
    subtitle: '32GB DDR5 RAM, 2TB Gen4 NVMe SSD, Vapor Chamber Cooling, CNC Aluminum Chassis',
    slug: 'novablade-apex-16-gaming-laptop',
    brand: 'NovaBlade',
    category: 'computing-gaming',
    subcategory: 'Gaming Laptops',
    price: 1599.00,
    originalPrice: 2299.00,
    discountPercent: 30,
    rating: 4.94,
    reviewCount: 1820,
    soldCount: 4300,
    stockCount: 18,
    isFlashDrop: true,
    flashDropEndsInSeconds: 16000,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '2 Years On-Site Next Business Day Repair',
    thumbnail: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Abyssal Dark Slate', hex: '#0f172a' }
    ],
    specs: {
      'CPU': 'Intel Core i9-14900HX (24 cores, 32 threads, up to 5.8 GHz)',
      'GPU': 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6 (175W Full TGP)',
      'Display': '16.0" 2560x1600 IPS 240Hz 3ms, 100% DCI-P3, G-SYNC',
      'Storage': '2TB PCIe 4.0 NVMe SSD (dual M.2 slots)',
      'Memory': '32GB DDR5 5600MHz (expandable to 64GB)'
    },
    keyFeatures: [
      'Vapor chamber liquid metal cooling keeps temperatures below 75°C under heavy ray tracing',
      'Per-key RGB mechanical feel keyboard with N-key rollover',
      'Thunderbolt 4, HDMI 2.1, Wi-Fi 7 and 99.9Wh maximum airline-safe battery'
    ],
    seller: {
      id: 'novablade-store',
      name: 'NovaBlade Gaming Store',
      rating: 4.96,
      scorePercent: 99.3,
      followers: 180000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova VIP Express',
      isVerified: true
    },
    tags: ['RTX 4080 175W', '240Hz QHD', 'Core i9-14900HX'],
    reviews: [
      {
        id: 'rev-tp-8',
        author: 'Viktor G.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Runs Cyberpunk 2077 with Path Tracing enabled at over 90 FPS smooth. Fan noise is surprisingly manageable.',
        helpfulCount: 195,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novakeys-pro-wireless-keyboard',
    title: 'NovaKeys V87 Wireless Hot-Swappable Mechanical Keyboard',
    subtitle: 'Gasket Mount, Tri-Mode (BT5.1/2.4G/USB-C), PBT Dye-Sub Keycaps, Pre-lubed Linear Switches',
    slug: 'novakeys-v87-mechanical-keyboard',
    brand: 'NovaKeys',
    category: 'computing-gaming',
    subcategory: 'Mechanical Keyboards',
    price: 59.99,
    originalPrice: 109.99,
    discountPercent: 45,
    rating: 4.92,
    reviewCount: 3890,
    soldCount: 19400,
    stockCount: 70,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '1 Year Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Retro Cream Cafe', hex: '#fef3c7' },
      { name: 'Cyberpunk Cyber Neon', hex: '#4c1d95' },
      { name: 'Matcha Forest', hex: '#14532d' }
    ],
    specs: {
      'Layout': '87-Key TKL 80% with rotary aluminum volume knob',
      'Structure': '5-Layer Sound Dampening Poron Gasket Mount',
      'Battery': '4000mAh Rechargeable (up to 200 hours without backlight)',
      'Switches': 'Factory Lubed Butter Linear Switches (45g actuation)'
    },
    keyFeatures: [
      'Creamy, thocky acoustic sound profile right out of the box with zero modding required',
      'Hot-swappable PCB supports both 3-pin and 5-pin Cherry, Gateron, Kailh switches',
      'South-facing per-key RGB with 22 dynamic animation modes'
    ],
    seller: {
      id: 'novakeys-hub',
      name: 'NovaKeys Custom Gear',
      rating: 4.93,
      scorePercent: 98.9,
      followers: 145000,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Center',
      isVerified: true
    },
    tags: ['Creamy Thock Sound', 'Gasket Mount', 'Tri-Mode Wireless'],
    reviews: [
      {
        id: 'rev-tp-9',
        author: 'Amy C.',
        rating: 5,
        date: '5 days ago',
        comment: 'The sound is like ASMR heaven. Typing my university papers has never been so satisfying. Knob control is a bonus.',
        helpfulCount: 230,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novaspeed-2tb-nvme-ssd',
    title: 'NovaSpeed Pro 2TB PCIe 4.0 NVMe M.2 SSD (7450MB/s)',
    subtitle: 'Includes Heatsink for PS5 & PC Gaming, DRAM Cache, 5-Year TBW Warranty',
    slug: 'novaspeed-pro-2tb-nvme-ssd',
    brand: 'NovaSpeed',
    category: 'computing-gaming',
    subcategory: 'Storage & SSDs',
    price: 119.99,
    originalPrice: 199.99,
    discountPercent: 40,
    rating: 4.96,
    reviewCount: 4120,
    soldCount: 28900,
    stockCount: 85,
    isFlashDrop: true,
    flashDropEndsInSeconds: 14200,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '5 Years / 1200 TBW Manufacturer Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Graphite Black with Graphene Heatsink', hex: '#18181b' }
    ],
    specs: {
      'Sequential Read': 'Up to 7,450 MB/s',
      'Sequential Write': 'Up to 6,900 MB/s',
      'Form Factor': 'M.2 2280 with low-profile aerospace heatsink',
      'Compatibility': 'PlayStation 5, Windows 11/10, Linux, MacOS Enclosures'
    },
    keyFeatures: [
      'Maximizes PS5 load times and enables instant 4K video timeline scrub',
      'Built-in 2GB LPDDR4 dedicated DRAM cache buffer',
      'Advanced thermal throttling prevention with graphene-coated aluminum fins'
    ],
    seller: {
      id: 'novaspeed-direct',
      name: 'NovaSpeed Storage Official',
      rating: 4.97,
      scorePercent: 99.6,
      followers: 310000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Vault',
      isVerified: true
    },
    tags: ['7450MB/s Read', 'PS5 Ready', '5-Year Warranty'],
    reviews: [
      {
        id: 'rev-tp-10',
        author: 'Gary N.',
        rating: 5,
        date: '1 week ago',
        comment: 'Installed in my PS5 in under 3 minutes. Games like Spider-Man and Horizon load instantaneously.',
        helpfulCount: 178,
        verifiedPurchase: true
      }
    ]
  }
];
