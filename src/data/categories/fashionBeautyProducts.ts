import { Product } from '../../types';

export const FASHION_BEAUTY_PRODUCTS: Product[] = [
  {
    id: 'novastride-sneakers-carbon',
    title: 'NovaStride AeroX Carbon-Plate Marathon Pro Running Shoes',
    subtitle: 'Dual-Density Supercritical Nitrogen Foam, 185g Featherlight, Anti-Pronation Support',
    slug: 'novastride-aerox-running-shoes',
    brand: 'NovaStride',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 69.99,
    originalPrice: 149.99,
    discountPercent: 53,
    rating: 4.93,
    reviewCount: 4820,
    soldCount: 38900,
    stockCount: 110,
    isFlashDrop: true,
    flashDropEndsInSeconds: 11200,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 15,
    warranty: '1 Year Quality Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Velocity Crimson Red', hex: '#dc2626' },
      { name: 'Cyber Neon Lime', hex: '#84cc16' },
      { name: 'Triple Phantom Black', hex: '#0f172a' }
    ],
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    specs: {
      'Weight': '185 grams (Men\'s US 9)',
      'Plate': 'Full-length 3D S-Curved Carbon Fiber Propulsion Plate',
      'Midsole': 'NovaFoam Nitro Supercritical Pebax with 85% Energy Return',
      'Drop': '8mm Heel-to-Toe Drop'
    },
    keyFeatures: [
      'Carbon plate spring propels forward momentum and shaves minutes off race pace',
      'Jacquard breathable engineered mesh upper keeps feet dry and blister-free',
      'Continental grade anti-slip rubber outsole grips wet tarmac and track curves'
    ],
    seller: {
      id: 'novastride-official',
      name: 'NovaStride Athletic Mall',
      rating: 4.96,
      scorePercent: 99.4,
      followers: 410000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Footwear Vault',
      isVerified: true
    },
    tags: ['Carbon Fiber Plate', '185g Featherlight', '85% Energy Return'],
    reviews: [
      {
        id: 'rev-fb-1',
        author: 'Daniel W.',
        rating: 5,
        date: '3 days ago',
        comment: 'Ran my half-marathon in these and set a new personal record by 4 minutes! Cushiony yet super snappy.',
        helpfulCount: 390,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 59.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 9500
    }
  },
  {
    id: 'novachronos-automatic-skeleton-watch',
    title: 'NovaChronos Royal Voyager Sapphire Automatic Skeleton Watch',
    subtitle: 'Self-Winding Mechanical Movement, 50m Waterproof, 316L Surgical Steel, Italian Leather',
    slug: 'novachronos-royal-voyager-watch',
    brand: 'NovaChronos',
    category: 'fashion-apparel',
    subcategory: 'Luxury Watches',
    price: 149.00,
    originalPrice: 329.00,
    discountPercent: 55,
    rating: 4.96,
    reviewCount: 1650,
    soldCount: 7800,
    stockCount: 35,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '5 Years International Movement Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Silver Bezel & Cognac Brown Leather', hex: '#78350f' },
      { name: 'Obsidian Black Steel', hex: '#18181b' },
      { name: 'Rose Gold & Navy Blue', hex: '#1e3a8a' }
    ],
    specs: {
      'Movement': 'Custom Calibre 8800 24-Jewel Self-Winding Automatic (42-Hour Reserve)',
      'Crystal': 'Double-Domed Anti-Reflective Synthetic Sapphire Crystal (9 Mohs hardness)',
      'Case': '41mm 316L Surgical Stainless Steel with Exhibition Caseback',
      'Water Resistance': '5 ATM / 50 Meters'
    },
    keyFeatures: [
      'Open-heart skeleton dial reveals intricate ticking escapement wheel and balance spring',
      'Never requires a battery; powered purely by the kinetic motion of your wrist',
      'Quick-release interchangeable genuine full-grain Italian calfskin leather strap'
    ],
    seller: {
      id: 'novachronos-boutique',
      name: 'NovaChronos Geneva Vault',
      rating: 4.98,
      scorePercent: 99.8,
      followers: 195000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Luxury VIP Safe',
      isVerified: true
    },
    tags: ['Automatic Movement', 'Sapphire Crystal', 'Exhibition Caseback'],
    reviews: [
      {
        id: 'rev-fb-2',
        author: 'Alexander G.',
        rating: 5,
        date: '1 week ago',
        comment: 'The finishing on the gears and case easily punches above $1,000 Swiss timepieces. Comes in a gorgeous wooden presentation box.',
        helpfulCount: 210,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novapack-waterproof-travel-backpack-35l',
    title: 'NovaPack Nomad 35L Expandable Waterproof Laptop Travel Backpack',
    subtitle: '180° TSA Clamshell Opening, 17" Padded Laptop Sleeve, USB-C Port, Luggage Strap',
    slug: 'novapack-nomad-35l-backpack',
    brand: 'NovaTravel',
    category: 'fashion-apparel',
    subcategory: 'Backpacks & Luggage',
    price: 49.99,
    originalPrice: 89.99,
    discountPercent: 44,
    rating: 4.89,
    reviewCount: 3950,
    soldCount: 26500,
    stockCount: 85,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: 'Lifetime Seam & Zipper Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Stealth Matte Black', hex: '#0f172a' },
      { name: 'Heather Charcoal', hex: '#475569' },
      { name: 'Deep Forest Green', hex: '#14532d' }
    ],
    specs: {
      'Capacity': '25L Standard, Expands to 35L (Flight Carry-On Approved)',
      'Material': '900D Waterproof High-Density Oxford with YKK Splash-Proof Zippers',
      'Compartments': '3 Main Compartments + 15 Functional Organizer Pockets + Hidden Anti-Theft Back Pocket',
      'Weight': '1.1 kg'
    },
    keyFeatures: [
      'TSA-friendly lay-flat laptop compartment speeds through airport security checkpoints',
      'Breathable 3D honeycomb air-mesh back panel with ergonomic load-relieving chest strap',
      'Integrated external USB-C & USB-A pass-through charging ports'
    ],
    seller: {
      id: 'novatravel-gear',
      name: 'NovaTravel Official Store',
      rating: 4.91,
      scorePercent: 98.5,
      followers: 150000,
      badge: 'Nova Mall',
      responseRate: '99% within 10 mins',
      shipsFrom: 'Nova Express Hub',
      isVerified: true
    },
    tags: ['35L Expandable', 'TSA Flight Ready', 'Waterproof 900D'],
    reviews: [
      {
        id: 'rev-fb-3',
        author: 'Chris P.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Packed for a 4-day business trip with 2 suits, sneakers, toiletries and my 16" laptop without checking a bag. Best backpack I have owned.',
        helpfulCount: 340,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novaglow-hyaluronic-serum-set',
    title: 'NovaGlow Triple Botanical Hyaluronic Acid & Peptide Anti-Aging Serum Set (3x 50ml)',
    subtitle: 'Infused with Niacinamide 5%, Vitamin C Ester, Multi-Molecular HA & Plant Collagen',
    slug: 'novaglow-triple-hyaluronic-serum-set',
    brand: 'NovaGlow',
    category: 'beauty-health',
    subcategory: 'Skincare Serums',
    price: 29.99,
    originalPrice: 65.00,
    discountPercent: 54,
    rating: 4.94,
    reviewCount: 6200,
    soldCount: 42000,
    stockCount: 140,
    isFlashDrop: true,
    flashDropEndsInSeconds: 13500,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '100% Satisfaction or Money Back Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Volume': 'Set of 3 Bottles (50ml / 1.7 fl.oz each)',
      'Key Actives': 'Multi-depth Hyaluronic Acid, 5% Niacinamide, Matrixyl 3000 Peptides, Centella Asiatica',
      'Formulation': '100% Vegan, Cruelty-Free, Paraben-Free, Fragrance-Free, Non-Comedogenic',
      'Skin Type': 'All Skin Types (Sensitive Skin Dermatologist Approved)'
    },
    keyFeatures: [
      'Delivers 72 hours of continuous deep dermal hydration without greasiness',
      'Visibly reduces fine lines, pore appearance, and evens out hyperpigmentation tone',
      'Dries silky-smooth under makeup and sunscreen without pilling'
    ],
    seller: {
      id: 'novaglow-skincare',
      name: 'NovaGlow Beauty Lab',
      rating: 4.97,
      scorePercent: 99.6,
      followers: 320000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Clean Lab',
      isVerified: true
    },
    tags: ['Triple HA Serum', 'Dermatologist Tested', '72h Hydration'],
    reviews: [
      {
        id: 'rev-fb-4',
        author: 'Sophia V.',
        rating: 5,
        date: '4 days ago',
        comment: 'Skin feels plump and dewy every morning. My fine lines around the forehead have softened noticeably in 3 weeks.',
        helpfulCount: 480,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 24.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 11000
    }
  },
  {
    id: 'novadryer-high-speed-hair-styler',
    title: 'NovaSilk AeroGlide 110,000 RPM High-Speed Ionic Hair Dryer & Multi-Styler',
    subtitle: 'Includes 5 Magnetic Styling Nozzles, Intelligent 100x/sec Thermal Guard, 200M Negative Ions',
    slug: 'novasilk-aeroglide-hair-dryer',
    brand: 'NovaSilk',
    category: 'beauty-health',
    subcategory: 'Hair Dryers & Stylers',
    price: 89.99,
    originalPrice: 189.99,
    discountPercent: 53,
    rating: 4.92,
    reviewCount: 3840,
    soldCount: 22800,
    stockCount: 60,
    isFlashDrop: true,
    flashDropEndsInSeconds: 16800,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Replacement Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Platinum Silver & Rose Gold', hex: '#e2e8f0' },
      { name: 'Midnight Navy & Copper', hex: '#1e3a8a' }
    ],
    specs: {
      'Motor': '110,000 RPM Brushless Digital Vortex Motor',
      'Airflow Speed': '65 m/s Hurricane Fast Drying (Dries long thick hair in 3-5 mins)',
      'Heat Sensor': 'NTC Thermistor checks temperature 100 times per second to prevent heat damage',
      'Attachments': 'Diffuser, Auto-Wrap Curler, Flyaway Tamer, Concentrator Nozzle'
    },
    keyFeatures: [
      '200 Million negative ions neutralize static electricity and lock in natural cuticle moisture',
      'Whisper-quiet acoustic damping operates at under 59dB',
      'Ultra-lightweight 380g balanced ergonomic handle prevents arm fatigue'
    ],
    seller: {
      id: 'novaglow-skincare',
      name: 'NovaGlow Beauty Lab',
      rating: 4.97,
      scorePercent: 99.6,
      followers: 320000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Clean Lab',
      isVerified: true
    },
    tags: ['110k RPM Brushless', '5 Magnetic Attachments', 'Zero Heat Damage'],
    reviews: [
      {
        id: 'rev-fb-5',
        author: 'Hannah M.',
        rating: 5,
        date: '5 days ago',
        comment: 'Dries my waist-length thick hair in 4 minutes flat! The flyaway nozzle leaves hair super glossy and straight without a flatiron.',
        helpfulCount: 310,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novasonic-electric-toothbrush-pro',
    title: 'NovaSmile DiamondCare Sonic Electric Toothbrush with UV Sanitizing Travel Case',
    subtitle: '48,000 VPM Maglev Motor, 6 Smart Modes, Pressure Sensor, 90-Day Battery Life',
    slug: 'novasmile-diamondcare-sonic-toothbrush',
    brand: 'NovaSmile',
    category: 'beauty-health',
    subcategory: 'Electric Toothbrushes',
    price: 39.99,
    originalPrice: 79.99,
    discountPercent: 50,
    rating: 4.95,
    reviewCount: 5120,
    soldCount: 39000,
    stockCount: 115,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1559591937-e10222471581?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1559591937-e10222471581?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Glacier White', hex: '#f8fafc' },
      { name: 'Matte Obsidian Black', hex: '#09090b' },
      { name: 'Pastel Lavender', hex: '#c084fc' }
    ],
    specs: {
      'Sonic Vibrations': '48,000 Micro-Brushes per minute',
      'Battery': '90 Days on a single 3-hour USB-C charge',
      'Brush Heads': 'Includes 8 DuPont Diamond W-Shaped Replacement Brush Heads (2 Years Supply)',
      'Waterproof': 'IPX8 100% Shower-Safe Submersible'
    },
    keyFeatures: [
      'Smart Pressure Sensor flashes red LED ring when brushing too hard to protect sensitive gums',
      '2-Minute Smart QuadPacer timer pauses every 30 seconds to remind shifting brushing zones',
      'UV-C Sterilizer travel case kills 99.9% of bacteria on brush heads automatically'
    ],
    seller: {
      id: 'novaglow-skincare',
      name: 'NovaGlow Beauty Lab',
      rating: 4.97,
      scorePercent: 99.6,
      followers: 320000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Clean Lab',
      isVerified: true
    },
    tags: ['48k VPM Sonic', '90-Day Battery', 'UV Sanitizing Case'],
    reviews: [
      {
        id: 'rev-fb-6',
        author: 'Dr. Gregory B.',
        rating: 5,
        date: '1 week ago',
        comment: 'As a dental hygienist, this has the same cavitation plaque removal as $250 flagship brands. The UV case is stellar for travel.',
        helpfulCount: 520,
        verifiedPurchase: true
      }
    ]
  }
];
