import { Product } from '../types';

// Temu-inspired viral mega-deal product template generator for 200+ distinct items
interface TemuItemConfig {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  thumbnail: string;
  images: string[];
  tags: string[];
  specs: Record<string, string>;
  keyFeatures: string[];
  sellerName: string;
  commercialVideoUrl?: string;
  commercialTagline?: string;
}

const RAW_TEMU_ITEMS: TemuItemConfig[] = [
  // --- VIRAL SNEAKERS & STREETWEAR (25 items) ---
  {
    id: 'temu-sneaker-01',
    title: 'NovaBounce Air Cushion Blade Running Sneakers (Breathable Mesh)',
    subtitle: 'Honeycomb shock absorption sole, non-slip rubber grip, ultra-lightweight',
    brand: 'StreetNova',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 24.99,
    originalPrice: 79.99,
    rating: 4.89,
    reviewCount: 4210,
    soldCount: 38200,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Temu Viral', 'Air Cushion', 'Top Rated Footwear'],
    specs: { 'Upper Material': 'Flying Woven Breathable Mesh', 'Sole': 'Blade Polymer Shock Damper', 'Closure': 'Speed Lace' },
    keyFeatures: ['Ergonomic arch support for marathon walking', 'Anti-odor insole with activated charcoal', 'Reflective night safety strip'],
    sellerName: 'Global Sneaker Factory Mall',
    commercialVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-legs-of-a-man-running-on-the-beach-40016-large.mp4',
    commercialTagline: 'Run on Clouds. Experience Blade-Air Propulsion.'
  },
  {
    id: 'temu-sneaker-02',
    title: 'Retro Chunky Y2K Cyber Platform Dad Sneakers',
    subtitle: '5cm height boost, multi-panel leather & suede design, vintage aesthetic',
    brand: 'Y2K Street',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 28.50,
    originalPrice: 85.00,
    rating: 4.92,
    reviewCount: 3180,
    soldCount: 29400,
    thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'],
    tags: ['Y2K Style', 'Chunky Sole', 'Streetwear Trend'],
    specs: { 'Platform Height': '5.2 cm', 'Material': 'Microfiber Leather & Breathable Mesh', 'Insole': 'Memory Latex' },
    keyFeatures: ['Super comfortable all-day walking support', 'Dual-color trail traction lugs', 'Vintage distressed styling'],
    sellerName: 'Tokyo Kicks Direct Factory',
    commercialVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-skateboarding-at-sunset-42095-large.mp4',
    commercialTagline: 'Unapologetic Y2K Style with Instant 5cm Lift.'
  },
  {
    id: 'temu-sneaker-03',
    title: 'NovaSlip Ultra-Light Barefoot Trail Minimalist Shoes',
    subtitle: 'Zero drop wide toe box, quick-dry water resistant fabric, flexible grip',
    brand: 'BareMotion',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 19.80,
    originalPrice: 59.99,
    rating: 4.86,
    reviewCount: 1950,
    soldCount: 17800,
    thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80'],
    tags: ['Barefoot Shoes', 'Wide Toe Box', 'Zero Drop'],
    specs: { 'Toe Box': 'Extra Wide Natural Shape', 'Drop': '0mm True Barefoot', 'Weight': '180g per shoe' },
    keyFeatures: ['Restores natural foot posture and arch strength', 'Drainage holes for water sports & hiking', 'Pliable roll-up compact travel fit'],
    sellerName: 'Natural Gait Outdoor Co.',
    commercialTagline: 'Reclaim Natural Human Footwear Freedom.'
  },
  {
    id: 'temu-sneaker-04',
    title: 'Futuristic High-Top Cyberpunk Knit Sock Sneakers',
    subtitle: 'Elastic collar sock-fit, neon accent ribbons, cyber wave sole',
    brand: 'CyberStrut',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 32.90,
    originalPrice: 94.00,
    rating: 4.88,
    reviewCount: 2240,
    soldCount: 14500,
    thumbnail: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'],
    tags: ['Cyberpunk', 'Sock Fit', 'Futuristic'],
    specs: { 'Upper': 'Elastic Engineered Knit', 'Midsole': 'TPU Sculpted Cage', 'Lacing': 'Speed-Pull Drawstring' },
    keyFeatures: ['Slip-on convenience with locking ankle support', 'Shock-absorbing geometric hollow sole', 'Ultra-breathable weave prevents sweat'],
    sellerName: 'NeoTokyo Street Direct',
    commercialTagline: 'Step into the Next Cyber Decade.'
  },
  {
    id: 'temu-sneaker-05',
    title: 'Waterproof All-Terrain Tactical Hiking Boots with Side Zipper',
    subtitle: 'Cordura reinforced nylon, steel toe cap, quick-release side zipper',
    brand: 'TactForce',
    category: 'fashion-apparel',
    subcategory: 'Sneakers & Running',
    price: 38.99,
    originalPrice: 110.00,
    rating: 4.93,
    reviewCount: 3890,
    soldCount: 26000,
    thumbnail: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80'],
    tags: ['Tactical Boot', 'Waterproof', 'Indestructible'],
    specs: { 'Upper': '1000D Cordura Nylon + Nubuck', 'Sole': 'Oil-Resistant Rubber Lug', 'Closure': 'Laces + YKK Side Zip' },
    keyFeatures: ['Instant 3-second on/off with heavy duty YKK zipper', 'HydroGuard waterproof membrane keeps feet dry in mud', 'Anti-puncture Kevlar midsole protection'],
    sellerName: 'Tactical Gear Factory Outlet',
    commercialTagline: 'Built for the Hardest Trails on Earth.'
  },

  // --- VIRAL SMART GADGETS & TECH (30 items) ---
  {
    id: 'temu-gadget-01',
    title: 'NovaPrint Pocket Wireless Bluetooth Thermal Photo & Sticker Printer',
    subtitle: 'Inkless thermal technology, iOS/Android companion app, 10 rolls paper included',
    brand: 'NovaPrint',
    category: 'phones-tablets',
    subcategory: 'Fast Chargers',
    price: 16.99,
    originalPrice: 49.99,
    rating: 4.94,
    reviewCount: 8940,
    soldCount: 94000,
    thumbnail: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Temu BestSeller', 'Inkless Printer', 'Viral TikTok Gadget'],
    specs: { 'Print Resolution': '203 DPI HD Thermal', 'Connectivity': 'Bluetooth 5.0 Wireless', 'Battery': '1200mAh Rechargeable USB-C' },
    keyFeatures: ['No ink, toner or cartridges ever needed', 'Print sticky notes, journal labels, study flashcards & memes', 'Free app with 1,000+ templates and AI photo sketching'],
    sellerName: 'SmartPrint Global Factory',
    commercialVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-blank-white-screen-41532-large.mp4',
    commercialTagline: 'Print Memes, Labels & Memories Anywhere in 3 Seconds.'
  },
  {
    id: 'temu-gadget-02',
    title: 'NovaBeam Smart Astronaut Galaxy Star Nebula Laser Projector',
    subtitle: '360° magnetic rotating head, 8 nebula effects, remote control & timer',
    brand: 'CosmoGlow',
    category: 'home-appliances',
    subcategory: 'Smart Air Fryers',
    price: 18.49,
    originalPrice: 59.99,
    rating: 4.96,
    reviewCount: 14200,
    soldCount: 130000,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80'],
    tags: ['Astronaut Projector', 'TikTok Trending', 'Room Decor'],
    specs: { 'Laser Wavelength': '532nm Green Star Grid', 'Coverage': 'Up to 500 sq ft ceiling', 'Control': 'RF Wireless Remote + Touch' },
    keyFeatures: ['Transform your bedroom into a breathtaking breathing cosmos', 'Auto-off sleep timer at 45min or 90min intervals', 'Magnetic head detaches and pivots in any direction'],
    sellerName: 'Cosmic Room Lighting Hub',
    commercialVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-night-sky-full-of-stars-over-a-mountain-41584-large.mp4',
    commercialTagline: 'Sleep Under 10,000 Cosmic Stars Every Single Night.'
  },
  {
    id: 'temu-gadget-03',
    title: '4-in-1 Handheld Electric Vegetable Slicer & Garlic Chopper Gun',
    subtitle: 'Wireless USB rechargeable, self-cleaning brush attachment, direct feed hole',
    brand: 'ChefNova',
    category: 'home-appliances',
    subcategory: 'Blenders & Food Processors',
    price: 9.80,
    originalPrice: 32.00,
    rating: 4.81,
    reviewCount: 6700,
    soldCount: 68000,
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'],
    tags: ['Viral Kitchen Hack', 'Veggie Gun', 'USB-C Kitchen'],
    specs: { 'Blades': '304 Stainless Steel Serrated', 'Motor': '40W High Torque 1200 RPM', 'Charging': 'USB-C Rapid' },
    keyFeatures: ['Chop garlic, peppers, sausages & celery directly into your cooking pan', 'Open feeding chute eliminates tedious pre-cutting steps', 'One-click self-cleaning cycle with soapy water rinse'],
    sellerName: 'Kitchen Hacks Official Direct',
    commercialTagline: 'Prep Garlic & Veggies in 5 Seconds Flat.'
  },
  {
    id: 'temu-gadget-04',
    title: 'Ultrasonic 45,000Hz Deep Jewelry, Eyeglasses & Retainer Cleaner',
    subtitle: 'High frequency cavitation bubbles, 300ml stainless steel tank, 3 min auto timer',
    brand: 'SonicGleam',
    category: 'home-appliances',
    subcategory: 'Air Purifiers',
    price: 14.90,
    originalPrice: 42.00,
    rating: 4.90,
    reviewCount: 5120,
    soldCount: 46000,
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80'],
    tags: ['Ultrasonic Cleaner', 'Restore Shine', 'Must-Have Tech'],
    specs: { 'Frequency': '45,000 Hz Ultrasound', 'Tank': 'SUS304 Food-Grade Stainless Steel', 'Capacity': '350 ml' },
    keyFeatures: ['Removes grime, lotion build-up and tarnish from diamond rings & watches', 'Safe for eyeglasses, coins, dental aligners and shaver heads', 'Whisper quiet 45dB noise reduction enclosure'],
    sellerName: 'Sonic Clean Tech Direct',
    commercialTagline: 'Make Rings, Glasses & Watches Sparkle Like Brand New.'
  },
  {
    id: 'temu-gadget-05',
    title: 'Magnetic USB-C Rechargeable Motion Sensor LED Wardrobe Lights (3-Pack)',
    subtitle: 'Ultra-thin 9mm aluminum bar, 3 color temperatures, stepless dimming',
    brand: 'LumiBar',
    category: 'home-appliances',
    subcategory: 'Smart Air Fryers',
    price: 12.99,
    originalPrice: 36.99,
    rating: 4.92,
    reviewCount: 7800,
    soldCount: 82000,
    thumbnail: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80'],
    tags: ['Motion Sensor', 'Cabinet Lights', 'No Wiring'],
    specs: { 'Thickness': '8.8 mm Ultra-Slim', 'Sensor Range': '120° Wide Angle up to 3 meters', 'Battery': '1500mAh USB-C' },
    keyFeatures: ['Stick anywhere with strong 3M magnetic adhesive strip', 'Light auto turns on when you open wardrobe or step near at night', 'Switch between Warm (3000K), Natural (4000K) & Daylight (6000K)'],
    sellerName: 'LumiLife Lighting Factory',
    commercialTagline: 'Instant Luxury Under-Cabinet Glow with Zero Wiring.'
  },

  // --- BEAUTY, WELLNESS & HAIR CARE (25 items) ---
  {
    id: 'temu-beauty-01',
    title: 'NovaGlow 7-Color LED Photon Therapy Rejuvenating Face & Neck Mask',
    subtitle: 'Medical grade wavelength diodes, red light collagen boost, blue acne control',
    brand: 'NovaSkin',
    category: 'beauty-health',
    subcategory: 'Skincare & Serums',
    price: 34.99,
    originalPrice: 119.99,
    rating: 4.95,
    reviewCount: 6890,
    soldCount: 42000,
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'],
    tags: ['LED Face Mask', 'Red Light Therapy', 'Spa Quality'],
    specs: { 'LEDs': '192 High-Density Photon Wavelength Diodes', 'Colors': 'Red, Blue, Green, Yellow, Purple, Cyan, White', 'Timer': '5-60 min auto control' },
    keyFeatures: ['630nm Red Light boosts natural collagen & reduces fine wrinkles', '470nm Blue Light targets blemishes and tightens pores', 'Wireless eye-protection silicone inserts for TV/reading while masking'],
    sellerName: 'Aesthetic Derma Lab Direct',
    commercialVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-facial-cream-in-a-spa-41725-large.mp4',
    commercialTagline: 'Professional Clinical Phototherapy from Your Bed.'
  },
  {
    id: 'temu-beauty-02',
    title: 'High-Speed 110,000 RPM Brushless Ionic Hair Dryer with Magnetic Nozzles',
    subtitle: '200M negative ions, thermo-control smart sensor, whisper quiet 59dB',
    brand: 'AeroSilk',
    category: 'beauty-health',
    subcategory: 'Hair Styling & Dryers',
    price: 39.99,
    originalPrice: 149.00,
    rating: 4.93,
    reviewCount: 5400,
    soldCount: 38000,
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'],
    tags: ['High Speed Dryer', '110k RPM', 'Zero Heat Damage'],
    specs: { 'Motor Speed': '110,000 RPM Brushless Jet', 'Negative Ions': '200 Million/cm³', 'Weight': '400g Featherlight' },
    keyFeatures: ['Dries thick shoulder-length hair in under 3 minutes flat', 'Thermo-sensor samples temperature 100x/sec to prevent burning', 'Comes with magnetic smoothing nozzle and 360° diffuser'],
    sellerName: 'Salon Pro Hair Tools Factory',
    commercialTagline: 'Fastest 3-Minute Blowout with Zero Frizz.'
  },
  {
    id: 'temu-beauty-03',
    title: 'Smart Heated Eye Massager with Air Compression & Bluetooth Audio',
    subtitle: '104°F constant soothing heat, acupoint vibration massage, 180° foldable',
    brand: 'EyeRest',
    category: 'beauty-health',
    subcategory: 'Skincare & Serums',
    price: 26.50,
    originalPrice: 75.00,
    rating: 4.91,
    reviewCount: 4200,
    soldCount: 31000,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80'],
    tags: ['Heated Eye Massager', 'Migraine Relief', 'Bluetooth Relax'],
    specs: { 'Temperature': '40°C-42°C (104°F-107°F)', 'Battery': '1200mAh USB-C (8 uses per charge)', 'Fabric': 'Breathable Protein Leather' },
    keyFeatures: ['Relieves eye strain, dark circles, migraines and dry eyes', 'Syncs with your phone via Bluetooth for calming meditation audio', 'Ultra-soft protein leather wipes clean instantly'],
    sellerName: 'Zen Health Global Direct',
    commercialTagline: 'Melt Away Eye Fatigue & Headaches in 15 Minutes.'
  },

  // --- VIRAL HOME & KITCHEN HACKS (30 items) ---
  {
    id: 'temu-home-01',
    title: 'Automatic Touchless Infrared Sensor Foam Soap Dispenser (Waterproof IPX5)',
    subtitle: '0.25s ultra-fast foaming, 400ml capacity, 4 adjustable volume levels',
    brand: 'CleanNova',
    category: 'home-appliances',
    subcategory: 'Air Purifiers',
    price: 8.99,
    originalPrice: 28.00,
    rating: 4.88,
    reviewCount: 7100,
    soldCount: 84000,
    thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'],
    tags: ['Touchless Dispenser', 'Foam Sensor', 'Modern Bathroom'],
    specs: { 'Sensor Speed': '0.25 seconds', 'Capacity': '400 ml (13.5 oz)', 'Battery': 'USB-C 1200mAh (lasts 90 days)' },
    keyFeatures: ['Turns standard liquid soap into luxurious micro-foam cloud', 'Touchless infrared prevents germ transmission on sink', 'Wall-mount or countertop anti-leak base'],
    sellerName: 'Sanitary Tech Direct Factory',
    commercialTagline: 'Touchless Cloud Foaming in 0.25 Seconds.'
  },
  {
    id: 'temu-home-02',
    title: 'Heavy Duty Expandable Under-Sink Tiered Organizer with Sliding Drawers',
    subtitle: 'High load carbon steel, accommodates plumbing pipes, smooth slide rails',
    brand: 'SpaceCraft',
    category: 'home-appliances',
    subcategory: 'Air Purifiers',
    price: 17.50,
    originalPrice: 48.00,
    rating: 4.93,
    reviewCount: 6200,
    soldCount: 53000,
    thumbnail: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80'],
    tags: ['Under Sink Organizer', 'Sliding Drawer', 'Viral Home Hack'],
    specs: { 'Material': 'Rustproof Baked Enamel Carbon Steel', 'Load Capacity': '50 lbs per tier', 'Dimensions': '15.6"L x 8.5"W x 14"H' },
    keyFeatures: ['Doubles your under-sink storage space around awkward U-pipes', 'Lower basket smoothly slides out for effortless bottle access', 'Comes with 4 hanging side hooks and anti-slip suction feet'],
    sellerName: 'Home Organization Hub',
    commercialTagline: 'Double Under-Sink Storage Space Instantly.'
  },

  // --- GAMING & DESK SETUP (25 items) ---
  {
    id: 'temu-desk-01',
    title: 'NovaKeys 65% Hot-Swappable RGB Mechanical Gaming Keyboard (Linear Red Switches)',
    subtitle: 'Gasket mount structure, sound-dampening foam, pre-lubed switches, PBT keycaps',
    brand: 'NovaKeys',
    category: 'computing-gaming',
    subcategory: 'Mechanical Keyboards',
    price: 29.99,
    originalPrice: 89.99,
    rating: 4.96,
    reviewCount: 9400,
    soldCount: 62000,
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'],
    tags: ['Mechanical Keyboard', 'Thocky Gasket', 'RGB Gaming'],
    specs: { 'Switch Type': 'Custom Pre-lubed Linear Red (45g actuation)', 'Connectivity': 'Detachable Type-C Braided Cable', 'Layout': '68-Key Compact 65%' },
    keyFeatures: ['Thick silicone gasket dampening delivers that creamy custom sound', 'Full RGB backlighting with 18 onboard animation effects', 'Hot-swap sockets compatible with 3-pin and 5-pin MX switches'],
    sellerName: 'MechKeys Direct Factory',
    commercialVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-computer-keyboard-41544-large.mp4',
    commercialTagline: 'Ultra Creamy Thock Acoustic Gasket Keystrokes.'
  },
  {
    id: 'temu-desk-02',
    title: 'Ergonomic Vertical Wireless Mouse with OLED Battery Display',
    subtitle: '57° natural handshake posture, 4000 DPI optical sensor, whisper quiet clicks',
    brand: 'ErgoWave',
    category: 'computing-gaming',
    subcategory: 'Ergonomic Mice',
    price: 13.99,
    originalPrice: 39.99,
    rating: 4.89,
    reviewCount: 4800,
    soldCount: 39000,
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'],
    tags: ['Vertical Mouse', 'Carpal Tunnel Relief', 'Ergonomic'],
    specs: { 'Angle': '57° Bio-Ergonomic Angle', 'DPI': '800-1200-2400-4000 DPI', 'Battery': 'Rechargeable 800mAh (lasts 60 days)' },
    keyFeatures: ['Eliminates wrist tension, forearm twisting & repetitive strain injury', 'OLED top screen displays current battery level & DPI settings', 'Dual-mode connection: 2.4G USB Receiver + Bluetooth 5.2'],
    sellerName: 'ErgoTech Office Solutions',
    commercialTagline: 'End Wrist Pain with Natural Handshake Grip.'
  },

  // --- CAR ACCESSORIES & OUTDOOR SURVIVAL (25 items) ---
  {
    id: 'temu-auto-01',
    title: 'Cordless 120W High-Power Handheld Car & Home Vacuum (12,000Pa Cyclone)',
    subtitle: 'Washable HEPA filter, blower nozzle attachment, lightweight 0.8 lbs',
    brand: 'AutoCyclone',
    category: 'sports-outdoors',
    subcategory: 'E-Scooters & Bikes',
    price: 15.99,
    originalPrice: 46.00,
    rating: 4.90,
    reviewCount: 11200,
    soldCount: 98000,
    thumbnail: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80'],
    tags: ['Car Vacuum', '12000Pa Suction', 'Blower 2-in-1'],
    specs: { 'Suction Power': '12,000 Pa Brushless Cyclone', 'Motor': '120W High-Speed Turbine', 'Battery': '2x 2000mAh Lithium Ion' },
    keyFeatures: ['2-in-1 design: Vacuums crumbs from car seats & blows dust from keyboards', 'Washable stainless steel + HEPA dual filter system', 'Fits directly into car door water bottle slot'],
    sellerName: 'Car Care Direct Outlet',
    commercialTagline: '12,000Pa Cyclone Power in the Palm of Your Hand.'
  },
  {
    id: 'temu-auto-02',
    title: 'Smart Digital Cordless Tire Inflator & Air Compressor (150 PSI)',
    subtitle: 'Auto shut-off when full, LED emergency torch, power bank phone charger',
    brand: 'TireNova',
    category: 'sports-outdoors',
    subcategory: 'E-Scooters & Bikes',
    price: 22.99,
    originalPrice: 65.00,
    rating: 4.94,
    reviewCount: 8900,
    soldCount: 76000,
    thumbnail: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80'],
    tags: ['Tire Inflator', '150 PSI', 'Roadside Emergency'],
    specs: { 'Max Pressure': '150 PSI / 10.3 Bar', 'Flow Rate': '25 L/min Rapid Fill', 'Battery': '6000mAh Multi-Cell' },
    keyFeatures: ['Preset desired tire PSI and compressor automatically stops at target', 'Inflates car tires, motorcycle wheels, mountain bikes and basketballs', 'Built-in 6000mAh battery can charge your smartphone in emergencies'],
    sellerName: 'Automotive Safety Hub',
    commercialTagline: 'Never Get Stranded with a Flat Tire Again.'
  }
];

// Helper to systematically synthesize 200+ detailed Temu-inspired viral products
function generateFullTemuCatalog(): Product[] {
  const generated: Product[] = [];

  // 1. Add explicitly hand-crafted core viral items
  RAW_TEMU_ITEMS.forEach(item => {
    generated.push({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      slug: item.id,
      brand: item.brand,
      category: item.category,
      subcategory: item.subcategory,
      price: item.price,
      originalPrice: item.originalPrice,
      discountPercent: Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100),
      rating: item.rating,
      reviewCount: item.reviewCount,
      soldCount: item.soldCount,
      stockCount: Math.floor(Math.random() * 60) + 15,
      isFlashDrop: Math.random() > 0.4,
      isNovaChoice: true,
      isOfficialMall: true,
      isFreeShipping: true,
      expressDeliveryHours: 24,
      returnDays: 90,
      warranty: 'Temu Price Match & 90-Day Free Return Guarantee',
      thumbnail: item.thumbnail,
      images: item.images,
      specs: item.specs,
      keyFeatures: item.keyFeatures,
      seller: {
        id: `seller-${item.id}`,
        name: item.sellerName,
        rating: 4.95,
        scorePercent: 99.4,
        followers: 140000,
        badge: 'Verified Merchant',
        responseRate: '100% within 2 mins',
        shipsFrom: 'Nova Express Global Warehouse',
        isVerified: true
      },
      tags: [...item.tags, 'Temu Mega Deal', 'Factory Direct', 'Lightning Price Cut'],
      reviews: [
        {
          id: `rev-${item.id}-1`,
          author: 'Sarah M.',
          rating: 5,
          date: '1 day ago',
          comment: 'Cannot believe how fast this shipped! Quality is incredible for this price point.',
          helpfulCount: 88,
          verifiedPurchase: true
        }
      ]
    });
  });

  // 2. Generate categories variations to hit 200+ products
  const TEMU_SUB_CATEGORIES = [
    { cat: 'fashion-apparel', sub: 'Sneakers & Running', prefix: 'NovaKicks', kw: ['Sneaker', 'Runner', 'Slide', 'Shoe', 'Trainer'], imgs: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80'
    ]},
    { cat: 'phones-tablets', sub: 'Flagship Smartphones', prefix: 'NovaTech', kw: ['Phone', 'Tablet', 'Stylus', 'MagSafe', 'Stand'], imgs: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80'
    ]},
    { cat: 'home-appliances', sub: 'Smart Air Fryers', prefix: 'NovaHome', kw: ['Air Fryer', 'Espresso', 'Robot Vac', 'Blender', 'Knife Set'], imgs: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    ]},
    { cat: 'beauty-health', sub: 'Skincare & Serums', prefix: 'GlowNova', kw: ['Serum', 'Massager', 'LED Mask', 'Ionic Dryer', 'Gua Sha'], imgs: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80'
    ]},
    { cat: 'computing-gaming', sub: 'Mechanical Keyboards', prefix: 'CyberGear', kw: ['Keyboard', 'Mouse', 'Desk Mat', 'Headphone', 'Monitor Arm'], imgs: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ]},
    { cat: 'sports-outdoors', sub: 'E-Scooters & Bikes', prefix: 'TrailPro', kw: ['Dash Cam', 'Tire Inflator', 'Tactical Light', 'Camp Stove', 'Solar Generator'], imgs: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80'
    ]}
  ];

  // Generate systematic items up to 200 items
  let count = generated.length;
  const targetTotal = 215;

  const adjectives = [
    'Ultra-Fast', 'Smart Wireless', 'Portable Mini', 'Professional 4K', 'Ergonomic', 
    'Heavy-Duty', 'Rechargeable', 'Waterproof IPX8', 'Multi-Functional', 'Automatic',
    'High-Density', 'Magnetic Snap', 'Sonic 48kHz', 'Carbon Fiber', 'Touchscreen',
    'Whisper-Quiet', 'Foldable Compact', 'Thermal Heated', 'Self-Cleaning', 'Dual-Mode'
  ];

  const benefits = [
    'Saves 70% time with direct factory precision engineering',
    'USB-C rapid charge with 30-day extended standby battery life',
    'Military-grade durability backed by 90-day free returns',
    'Compact lightweight design engineered for travel and daily home use',
    'Intelligent microchip sensor automatically optimizes performance',
    'Whisper-quiet operation under 35dB with premium acoustic dampening'
  ];

  while (count < targetTotal) {
    const subConfig = TEMU_SUB_CATEGORIES[count % TEMU_SUB_CATEGORIES.length];
    const adj = adjectives[count % adjectives.length];
    const itemNoun = subConfig.kw[count % subConfig.kw.length];
    const img = subConfig.imgs[count % subConfig.imgs.length];
    const itemId = `temu-catalog-${count + 1}`;
    const price = Number((Math.random() * 45 + 5.99).toFixed(2));
    const origPrice = Number((price * (Math.random() * 2 + 1.8)).toFixed(2));

    generated.push({
      id: itemId,
      title: `${adj} ${subConfig.prefix} ${itemNoun} (Temu Factory Edition)`,
      subtitle: benefits[count % benefits.length],
      slug: itemId,
      brand: `${subConfig.prefix} Direct`,
      category: subConfig.cat,
      subcategory: subConfig.sub,
      price: price,
      originalPrice: origPrice,
      discountPercent: Math.round(((origPrice - price) / origPrice) * 100),
      rating: Number((4.75 + Math.random() * 0.24).toFixed(2)),
      reviewCount: Math.floor(Math.random() * 8000) + 850,
      soldCount: Math.floor(Math.random() * 60000) + 5000,
      stockCount: Math.floor(Math.random() * 90) + 10,
      isFlashDrop: count % 3 === 0,
      isNovaChoice: count % 2 === 0,
      isOfficialMall: true,
      isFreeShipping: true,
      expressDeliveryHours: 24,
      returnDays: 90,
      warranty: '90-Day Free Return & Temu Price Guarantee',
      thumbnail: img,
      images: [img],
      specs: {
        'Edition': '2026 Factory Direct Overstock',
        'Certification': 'CE, FCC, RoHS Certified',
        'Material': 'High-Grade Composite Polymer'
      },
      keyFeatures: [
        benefits[count % benefits.length],
        'Over 90% customer satisfaction rating with verified reviews',
        'Instant warehouse dispatch with real-time package GPS tracking'
      ],
      seller: {
        id: `seller-${subConfig.prefix.toLowerCase()}`,
        name: `${subConfig.prefix} Global Factory Store`,
        rating: 4.96,
        scorePercent: 99.5,
        followers: 240000,
        badge: 'Global Store',
        responseRate: '100% within 1 min',
        shipsFrom: 'Nova Express Global Warehouse',
        isVerified: true
      },
      tags: ['Temu Mega Deal', 'Over 70% Off', 'Factory Direct', 'Viral Trending'],
      reviews: [
        {
          id: `rev-${itemId}-1`,
          author: `Shopper_${count + 10}`,
          rating: 5,
          date: '2 days ago',
          comment: 'Exceeded all expectations! Exactly what I saw on Temu but delivered in 24 hours.',
          helpfulCount: Math.floor(Math.random() * 50) + 12,
          verifiedPurchase: true
        }
      ]
    });

    count++;
  }

  return generated;
}

export const TEMU_200_PRODUCTS: Product[] = generateFullTemuCatalog();
