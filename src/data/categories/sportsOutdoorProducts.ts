import { Product } from '../../types';

export const SPORTS_OUTDOOR_PRODUCTS: Product[] = [
  {
    id: 'novacamp-4person-instant-tent',
    title: 'NovaCamp Summit 4-Person Instant Pop-Up Waterproof Cabin Tent',
    subtitle: '60-Second Setup, PU3000mm Rainfly, UPF 50+ UV Shield, Dual Doors & Panoramic Mesh',
    slug: 'novacamp-summit-4person-tent',
    brand: 'NovaCamp',
    category: 'sports-outdoors',
    subcategory: 'Camping Tents',
    price: 89.99,
    originalPrice: 159.99,
    discountPercent: 44,
    rating: 4.91,
    reviewCount: 2950,
    soldCount: 18400,
    stockCount: 50,
    isFlashDrop: true,
    flashDropEndsInSeconds: 15000,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '3 Years Stormproof Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Forest Evergreen & Khaki', hex: '#14532d' },
      { name: 'Sunset Amber & Slate', hex: '#d97706' }
    ],
    specs: {
      'Setup Time': 'Under 60 Seconds with Pre-Attached Hydraulic Telescoping Poles',
      'Dimensions': '96 x 84 x 56 inches (Fits 1 Queen Air Mattress or 4 Sleeping Bags)',
      'Waterproof Index': '3000mm Ripstop 210D Oxford with Welded Tub Floor and Taped Seams',
      'Weight': '4.8 kg with Compact Carry Bag'
    },
    keyFeatures: [
      'Hydraulic pre-assembled frame pops up in seconds like an umbrella without frustration',
      'Large mesh windows and top ground vents provide 360° airflow while keeping insects out',
      'Darkroom blackout coating blocks 90% of morning sunlight for restful sleeping'
    ],
    seller: {
      id: 'novacamp-gear',
      name: 'NovaCamp Wilderness Store',
      rating: 4.94,
      scorePercent: 99.1,
      followers: 185000,
      badge: 'Nova Mall',
      responseRate: '100% within 5 mins',
      shipsFrom: 'Nova Express Outdoor Hub',
      isVerified: true
    },
    tags: ['60s Pop-Up', 'PU3000mm Stormproof', 'Darkroom Blackout'],
    reviews: [
      {
        id: 'rev-so-1',
        author: 'Tyler R.',
        rating: 5,
        date: '1 week ago',
        comment: 'Survived a torrential thunderstorm in Yosemite without a single drop entering. Set it up in the dark in 45 seconds flat.',
        helpfulCount: 270,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 79.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 12000
    }
  },
  {
    id: 'novaride-pro-escooter-500w',
    title: 'NovaRide Pro 500W Foldable Commuter E-Scooter (28-Mile Range)',
    subtitle: '10" Self-Sealing Tubeless Tires, Dual Braking System, Cruise Control, Smart LCD Dashboard',
    slug: 'novaride-pro-commuter-escooter',
    brand: 'NovaRide',
    category: 'sports-outdoors',
    subcategory: 'E-Scooters & Bikes',
    price: 349.00,
    originalPrice: 599.00,
    discountPercent: 42,
    rating: 4.88,
    reviewCount: 1820,
    soldCount: 8400,
    stockCount: 30,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 48,
    returnDays: 15,
    warranty: '2 Years Motor & Battery Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Stealth Space Gray & Neon Accents', hex: '#334155' }
    ],
    specs: {
      'Motor': '500W High-Torque Brushless Motor (Peak 800W, 20% Hill Grade Climbing)',
      'Top Speed': '19 mph (30 km/h) with 3 Speed Modes (Eco, Standard, Sport)',
      'Range': 'Up to 28 Miles (45 km) per charge on 36V 10.4Ah Lithium Battery',
      'Max Load': '265 lbs (120 kg)'
    },
    keyFeatures: [
      '10-inch puncture-resistant jelly tubeless pneumatic tires glide over potholes and cobblestones',
      'Dual braking (Front E-ABS regenerative + Rear mechanical disc) stops in 3.2 meters',
      '3-Second quick-fold aerospace aluminum frame easily stores in car trunk or under train seats'
    ],
    seller: {
      id: 'novaride-mobility',
      name: 'NovaRide Urban Mobility',
      rating: 4.92,
      scorePercent: 98.7,
      followers: 140000,
      badge: 'Nova Mall',
      responseRate: '99% within 10 mins',
      shipsFrom: 'Nova Heavy Express',
      isVerified: true
    },
    tags: ['28-Mile Range', '10" Tubeless Tires', '500W Brushless'],
    reviews: [
      {
        id: 'rev-so-2',
        author: 'Jordan K.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Replaced my daily bus commute. Takes steep San Francisco hills with ease and folds up in my office.',
        helpfulCount: 195,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novafit-adjustable-dumbbell-set',
    title: 'NovaFit SelectTech 55-lb Quick-Select Adjustable Dumbbell Set (Pair)',
    subtitle: 'Replaces 15 Pairs of Weights (5 to 55 lbs), Anti-Slip Knurled Steel Grip, Storage Trays',
    slug: 'novafit-55lb-adjustable-dumbbells',
    brand: 'NovaFit',
    category: 'sports-outdoors',
    subcategory: 'Home Gym Equipment',
    price: 199.00,
    originalPrice: 349.00,
    discountPercent: 43,
    rating: 4.95,
    reviewCount: 3820,
    soldCount: 16200,
    stockCount: 40,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 48,
    returnDays: 30,
    warranty: '5 Years Steel Plate Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cast Iron Black & Crimson Ring', hex: '#18181b' }
    ],
    specs: {
      'Weight Range': '5 to 55 lbs per dumbbell (Adjustable in 2.5 lb / 5 lb increments)',
      'Adjustment Speed': '1-Second Dial Mechanism with Secure Double-Locking Pin',
      'Plates': 'Heavy-Duty Laser-Cut Cast Iron with Silent Thermoplastic Coating',
      'Includes': 'Pair of 2 Dumbbells + 2 High-Impact Molded Floor Trays'
    },
    keyFeatures: [
      'Replaces an entire rack of 30 bulky individual dumbbells, saving 90% of home gym floor space',
      'Laser-knurled non-slip handle ensures firm ergonomic grip during heavy presses and rows',
      'Smooth, clank-free quiet lifts with durable impact coating'
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
    tags: ['5-55 lbs Pair', '1-Sec Dial Switch', 'Home Gym Essential'],
    reviews: [
      {
        id: 'rev-so-3',
        author: 'Markus T.',
        rating: 5,
        date: '4 days ago',
        comment: 'Weight change mechanism is smooth and reassuringly solid. Saves massive space in my garage gym.',
        helpfulCount: 310,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novagun-deep-tissue-massage-pro',
    title: 'NovaRelief Apex Pro Deep Tissue Percussion Massage Gun (16mm Amplitude)',
    subtitle: 'QuietGlide 45W Brushless Motor, 8 Specialized Attachments, OLED Touchscreen, 6h Battery',
    slug: 'novarelief-apex-pro-massage-gun',
    brand: 'NovaFit',
    category: 'sports-outdoors',
    subcategory: 'Home Gym Equipment',
    price: 49.99,
    originalPrice: 99.99,
    discountPercent: 50,
    rating: 4.92,
    reviewCount: 4620,
    soldCount: 32000,
    stockCount: 75,
    isFlashDrop: true,
    flashDropEndsInSeconds: 10400,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Replacement',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Space Carbon', hex: '#1e293b' },
      { name: 'Titanium Silver', hex: '#cbd5e1' }
    ],
    specs: {
      'Stall Force': '55 lbs High-Torque Pressure Resistance',
      'Amplitude': '16mm Deep Muscle Penetration (Reaches deep fascia)',
      'Speed Levels': '30 Adjustable Percussion Speeds (1,200 to 3,400 RPM)',
      'Noise Level': 'Sub-40dB QuietGlide technology'
    },
    keyFeatures: [
      'Rapidly breaks down lactic acid post-workout, relieving chronic muscle stiffness and knots',
      'Includes heated titanium head, soft air cushion head, fork head, and bullet point head',
      'Ergonomic angled handle allows massaging 100% of your back without straining wrists'
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
    tags: ['16mm Deep Fascia', '55 lbs Stall Force', '8 Massage Heads'],
    reviews: [
      {
        id: 'rev-so-4',
        author: 'Dr. Sarah C. (Physical Therapist)',
        rating: 5,
        date: '5 days ago',
        comment: 'I use this on clients daily. The stall force doesn’t bog down even when applying firm pressure to tight quads and glutes.',
        helpfulCount: 420,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'novahydro-vacuum-insulated-flask-40oz',
    title: 'NovaHydro Arctic Tumbler 40oz Vacuum Insulated Stainless Steel Flask with Straw Lid',
    subtitle: 'Keeps Ice 36 Hours / Hot 18 Hours, 100% Leak-Proof 2-in-1 MagCap, Cup Holder Friendly',
    slug: 'novahydro-arctic-40oz-flask',
    brand: 'NovaHydro',
    category: 'sports-outdoors',
    subcategory: 'Hydration Flasks',
    price: 24.99,
    originalPrice: 42.00,
    discountPercent: 41,
    rating: 4.96,
    reviewCount: 7800,
    soldCount: 65000,
    stockCount: 160,
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: 'Lifetime Thermal Insulation Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Sage Meadow Green', hex: '#15803d' },
      { name: 'Blush Sandstone', hex: '#fb7185' },
      { name: 'Glacier Ice Blue', hex: '#0284c7' },
      { name: 'Onyx Midnight', hex: '#09090b' }
    ],
    specs: {
      'Capacity': '40oz (1.18 Liters)',
      'Material': 'Pro-Grade 18/8 Kitchen Stainless Steel (No flavor transfer, BPA-free)',
      'Base': 'Tapered 3.1-inch base fits standard automotive car cup holders',
      'Coating': 'Powder-coated slip-resistant exterior that never sweats'
    },
    keyFeatures: [
      'Double-wall copper vacuum insulation keeps ice frozen solid for over 36 hours in summer heat',
      'Dual-function lid lets you sip through silicone straw or chug from wide-mouth opening',
      'Comfort-grip ergonomic handle makes carrying all-day hydration effortless'
    ],
    seller: {
      id: 'novahydro-official',
      name: 'NovaHydro Bottles & Flasks',
      rating: 4.97,
      scorePercent: 99.7,
      followers: 280000,
      badge: 'Nova Mall',
      responseRate: '100% within 1 min',
      shipsFrom: 'Nova Express Hydration Hub',
      isVerified: true
    },
    tags: ['36h Ice Cold', 'Car Cup Holder Fit', 'Leakproof MagCap'],
    reviews: [
      {
        id: 'rev-so-5',
        author: 'Emily B.',
        rating: 5,
        date: '2 days ago',
        comment: 'Left it in my hot car parked in Arizona summer for 8 hours and came back to ice rattling inside! 100% leakproof when tossed in my gym bag.',
        helpfulCount: 560,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: 19.99,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 8500
    }
  }
];
