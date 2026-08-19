import { Product } from '../types';

interface TemplateItem {
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  basePrice: number;
  origPrice: number;
  img: string;
  tag: string;
  feature: string;
  specKey: string;
  specVal: string;
}

const TEMPLATES: TemplateItem[] = [
  // Phones & Tablets
  {
    name: 'NovaCase Magnetic Kevlar Aramid Fiber Ultra-Thin Case (0.6mm)',
    category: 'phones-tablets',
    subcategory: 'Cases & Covers',
    brand: 'NovaSnap',
    basePrice: 29.99,
    origPrice: 49.99,
    img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    tag: 'Aerospace Kevlar',
    feature: 'Built with 1500D military-grade aramid fiber with embedded N52 neodymium magnets',
    specKey: 'Thickness',
    specVal: '0.65mm Featherlight 14g'
  },
  {
    name: 'NovaScreen Diamond 9H+ Privacy Tempered Glass Protector (3-Pack)',
    category: 'phones-tablets',
    subcategory: 'Cases & Covers',
    brand: 'NovaSnap',
    basePrice: 12.99,
    origPrice: 24.99,
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    tag: '28° Anti-Peep',
    feature: '28-degree narrow viewing angle blocks curious eyes in subways and planes',
    specKey: 'Hardness',
    specVal: '9H Electroplated Oleophobic'
  },
  {
    name: 'NovaPower Car Rapid Dual 65W USB-C PD Metal Charger Plug',
    category: 'phones-tablets',
    subcategory: 'Fast Chargers',
    brand: 'NovaPower',
    basePrice: 16.99,
    origPrice: 29.99,
    img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    tag: '65W Dual PD',
    feature: 'Charges MacBook and iPhone simultaneously from standard 12V car socket',
    specKey: 'Output',
    specVal: '65W USB-C PD + 18W QC3.0'
  },
  {
    name: 'NovaStand 360° Rotating Aluminum Tablet Desk Stand & Holder',
    category: 'phones-tablets',
    subcategory: 'iPads & Tablets',
    brand: 'NovaTech',
    basePrice: 26.99,
    origPrice: 45.00,
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    tag: '360° Swivel',
    feature: 'Heavy carbon steel base keeps iPads up to 13" rock-steady during drawing',
    specKey: 'Material',
    specVal: 'CNC Solid Aluminum Alloy'
  },
  {
    name: 'NovaCell 20,000mAh 65W Laptop Fast Charging Power Bank with Digital Display',
    category: 'phones-tablets',
    subcategory: 'Power Banks',
    brand: 'NovaPower',
    basePrice: 49.99,
    origPrice: 89.99,
    img: 'https://images.unsplash.com/photo-1609592424388-e93895e636b1?w=800&auto=format&fit=crop&q=80',
    tag: '65W Laptop PD',
    feature: 'Charges MacBook Air to 100% and iPhone 16 Pro 4.5 times on single charge',
    specKey: 'Capacity',
    specVal: '20,000mAh 74Wh Airline Approved'
  },

  // Audio & Wearables
  {
    name: 'NovaStudio Dynamic USB/XLR Cardioid Streaming & Podcast Microphone',
    category: 'audio-wearables',
    subcategory: 'Bluetooth Speakers',
    brand: 'NovaSound',
    basePrice: 69.99,
    origPrice: 129.99,
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    tag: 'Dual USB/XLR',
    feature: 'Built-in DSP hardware compressor, zero-latency headphone monitoring, and RGB mute touch button',
    specKey: 'Polar Pattern',
    specVal: 'Cardioid Dynamic (24-bit 96kHz)'
  },
  {
    name: 'NovaBass Waterproof Bluetooth Shower Speaker with Suction Cup & FM Radio',
    category: 'audio-wearables',
    subcategory: 'Bluetooth Speakers',
    brand: 'NovaSound',
    basePrice: 22.99,
    origPrice: 39.99,
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    tag: 'IPX7 Shower',
    feature: 'Stick onto bathroom tiles or pool walls with heavy-duty suction cup, 12h playtime',
    specKey: 'Water Rating',
    specVal: 'IPX7 100% Waterproof'
  },
  {
    name: 'NovaFit Elite Milanese Stainless Steel Mesh Quick-Release Watch Band (22mm)',
    category: 'audio-wearables',
    subcategory: 'Smartwatches',
    brand: 'NovaFit',
    basePrice: 16.99,
    origPrice: 29.99,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    tag: 'Milanese Magnetic',
    feature: 'Breathable woven 316L stainless steel mesh with infinite magnetic buckle adjustment',
    specKey: 'Compatibility',
    specVal: 'Standard 20mm & 22mm Smartwatches'
  },
  {
    name: 'NovaSleep ANC Bluetooth Sleep Mask with Ultra-Thin Flat Stereo Speakers',
    category: 'audio-wearables',
    subcategory: 'Noise Cancelling Headphones',
    brand: 'NovaSound',
    basePrice: 27.99,
    origPrice: 49.99,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    tag: 'Side Sleeper Safe',
    feature: '3D ergonomic eye contour leaves zero pressure on eyelids; ultra-thin padded speakers',
    specKey: 'Battery',
    specVal: '12 Hours Continuous White Noise'
  },

  // Computers & Gaming
  {
    name: 'NovaDesk 72" Dual-Motor Electric Height Adjustable Standing Desk (Solid Bamboo)',
    category: 'computing-gaming',
    subcategory: 'PC Components',
    brand: 'NovaDesk',
    basePrice: 299.00,
    origPrice: 499.00,
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    tag: 'Dual Motor Whisper',
    feature: 'Smooth dual-motor lift carries up to 300 lbs with 4 memory height presets and anti-collision sensor',
    specKey: 'Height Range',
    specVal: '25" to 51" (Quiet <45dB)'
  },
  {
    name: 'NovaChair Ergonomic Mesh Executive Office Chair with 3D Dynamic Lumbar Support',
    category: 'computing-gaming',
    subcategory: 'PC Components',
    brand: 'NovaDesk',
    basePrice: 169.00,
    origPrice: 289.00,
    img: 'https://images.unsplash.com/photo-1580481077197-c83134375b47?w=800&auto=format&fit=crop&q=80',
    tag: 'Ergo Lumbar',
    feature: 'German breathable elastic mesh seat, 4D adjustable armrests, and 135° recline with footrest',
    specKey: 'Weight Capacity',
    specVal: '350 lbs BIFMA Class-4 Gas Lift'
  },
  {
    name: 'NovaKey Coiled Aviator Custom USB-C Keyboard Cable (Paracord & Techflex)',
    category: 'computing-gaming',
    subcategory: 'Mechanical Keyboards',
    brand: 'NovaKeys',
    basePrice: 19.99,
    origPrice: 35.00,
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    tag: 'Coiled Aviator',
    feature: 'Detachable 5-pin zinc alloy GX16 aviator connector with tight double-sleeved coil',
    specKey: 'Coil Diameter',
    specVal: '20mm Inner Diameter (6-inch coil)'
  },
  {
    name: 'NovaPad RGB Gaming Mouse Pad XXL Extended Desk Mat (36" x 16")',
    category: 'computing-gaming',
    subcategory: 'Ergonomic Mice',
    brand: 'NovaBlade',
    basePrice: 18.99,
    origPrice: 32.00,
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    tag: '14 RGB Modes',
    feature: 'Water-resistant micro-woven cloth surface ensures smooth optical mouse tracking',
    specKey: 'Dimensions',
    specVal: '900 x 400 x 4 mm'
  },
  {
    name: 'NovaHub 7-Port USB 3.0 Powered Data Hub with Individual LED Power Switches',
    category: 'computing-gaming',
    subcategory: 'PC Components',
    brand: 'NovaTech',
    basePrice: 24.99,
    origPrice: 39.99,
    img: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80',
    tag: 'Individual Switches',
    feature: '5Gbps transfer speed with dedicated 12V 2A power adapter for external hard drives',
    specKey: 'Ports',
    specVal: '7x USB 3.0 (5Gbps)'
  },

  // Home & Kitchen
  {
    name: 'NovaPan 12" Non-Stick Diamond Granite Frying Pan with Stay-Cool Wood Handle',
    category: 'home-appliances',
    subcategory: 'Home Essentials',
    brand: 'NovaChef',
    basePrice: 29.99,
    origPrice: 55.00,
    img: 'https://images.unsplash.com/photo-1584990347449-39908cfd0c32?w=800&auto=format&fit=crop&q=80',
    tag: 'Diamond Granite',
    feature: '100% PFOA/PFAS free natural stone coating lets eggs and pancakes slide with zero oil',
    specKey: 'Induction Compatible',
    specVal: 'Works on Gas, Induction, Ceramic, Electric'
  },
  {
    name: 'NovaGrind Electric Conical Burr Coffee Bean Grinder with Precision Digital Timer',
    category: 'home-appliances',
    subcategory: 'Espresso Machines',
    brand: 'NovaChef',
    basePrice: 69.99,
    origPrice: 119.99,
    img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    tag: 'Anti-Static Burr',
    feature: 'Stainless steel conical burrs minimize grinding heat and friction to preserve coffee oils',
    specKey: 'Grind Settings',
    specVal: '35 Precise Grind Levels'
  },
  {
    name: 'NovaFroth 4-in-1 Automatic Hot & Cold Milk Frother and Steamer (500ml)',
    category: 'home-appliances',
    subcategory: 'Espresso Machines',
    brand: 'NovaChef',
    basePrice: 34.99,
    origPrice: 59.99,
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    tag: 'Cold & Hot Froth',
    feature: 'Creates velvety microfoam for cappuccinos, lattes, macchiatos, and iced cold foam in 90s',
    specKey: 'Capacity',
    specVal: '240ml Frothing / 500ml Warming'
  },
  {
    name: 'NovaScale Smart Bluetooth Coffee Scale with Automatic Timer & Flow Rate Meter',
    category: 'home-appliances',
    subcategory: 'Home Essentials',
    brand: 'NovaChef',
    basePrice: 29.99,
    origPrice: 49.99,
    img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    tag: '0.1g Precision',
    feature: 'High-precision sensor weighs down to 0.1 grams with auto-detect pour timer',
    specKey: 'Accuracy',
    specVal: '0.1g to 2000g'
  },
  {
    name: 'NovaChop 4-in-1 Electric Vegetable Chopper, Mincer & Salad Slicer Handheld',
    category: 'home-appliances',
    subcategory: 'Blenders & Food Processors',
    brand: 'NovaChef',
    basePrice: 19.99,
    origPrice: 35.00,
    img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    tag: 'Wireless Chopper',
    feature: 'Directly slices garlic, chili, onions, and carrots into the cooking skillet with one click',
    specKey: 'Battery',
    specVal: 'USB-C Rechargeable'
  },

  // Fashion & Apparel
  {
    name: 'NovaCap Vintage Washed Unstructured Low-Profile Cotton Baseball Dad Hat',
    category: 'fashion-apparel',
    subcategory: 'Men\'s Streetwear',
    brand: 'NovaStreet',
    basePrice: 14.99,
    origPrice: 25.00,
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    tag: '100% Washed Cotton',
    feature: 'Distressed vintage wash with brass buckle adjustable strap back',
    specKey: 'Material',
    specVal: '100% Breathable Bio-Washed Chino Cotton'
  },
  {
    name: 'NovaBelt Automatic Sliding Ratchet Genuine Leather Dress Belt (No Holes)',
    category: 'fashion-apparel',
    subcategory: 'Men\'s Streetwear',
    brand: 'NovaChronos',
    basePrice: 19.99,
    origPrice: 35.00,
    img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    tag: 'Micro-Adjust 1/4"',
    feature: '32 micro-adjustments provide the exact snug fit after dinner without clumsy punch holes',
    specKey: 'Leather',
    specVal: 'Full-Grain Top Cowhide Leather'
  },
  {
    name: 'NovaGrip Minimalist Slim Aluminum RFID Blocking Card Holder Wallet',
    category: 'fashion-apparel',
    subcategory: 'Luxury Watches',
    brand: 'NovaSnap',
    basePrice: 19.99,
    origPrice: 38.00,
    img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    tag: 'Pop-Up Quick Eject',
    feature: 'Patented trigger mechanism fans out cards instantly for quick grocery checkout payments',
    specKey: 'Capacity',
    specVal: 'Holds 6 Cards + Cash Money Clip'
  },
  {
    name: 'NovaSilk 100% Mulberry Silk Luxury Pillowcase for Hair & Skin (22 Momme Queen)',
    category: 'fashion-apparel',
    subcategory: 'Women\'s Dresses',
    brand: 'NovaSilk',
    basePrice: 24.99,
    origPrice: 48.00,
    img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    tag: 'Grade 6A Mulberry',
    feature: 'Prevents morning sleep wrinkles and eliminates hair frizz and breakage naturally',
    specKey: 'Silk Grade',
    specVal: '22 Momme 100% Grade 6A Pure Mulberry Silk'
  },

  // Beauty & Health
  {
    name: 'NovaGua Sha Electric Heated Sonic Scraping & Microcurrent Face Lifting Tool',
    category: 'beauty-health',
    subcategory: 'Skincare Serums',
    brand: 'NovaDerma',
    basePrice: 34.99,
    origPrice: 65.00,
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    tag: 'Heated Microcurrent',
    feature: '42°C thermal massage combined with 8000 RPM sonic vibration sculpts jawline contours',
    specKey: 'Modes',
    specVal: 'Red Light Collagen + Blue Light Purifying'
  },
  {
    name: 'NovaMist Facial Nano-Ionic Warm Steam Sauna for Deep Pore Cleansing',
    category: 'beauty-health',
    subcategory: 'Skincare Serums',
    brand: 'NovaGlow',
    basePrice: 29.99,
    origPrice: 55.00,
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    tag: 'Nano Ionic Steam',
    feature: 'Penetrates skin 10x more effectively to melt away blackheads and unclog pores',
    specKey: 'Steam Time',
    specVal: '15 Minutes Continuous Fine Mist'
  },
  {
    name: 'NovaClip Professional Heavy-Duty Surgical Stainless Steel Nail Clipper Set (4-Piece)',
    category: 'beauty-health',
    subcategory: 'Grooming Kits',
    brand: 'NovaCare',
    basePrice: 12.99,
    origPrice: 22.00,
    img: 'https://images.unsplash.com/photo-1559591937-e10222471581?w=800&auto=format&fit=crop&q=80',
    tag: 'Curved Surgical Steel',
    feature: 'Hand-sharpened curved blades cut thick toenails smoothly without cracking or jagged edges',
    specKey: 'Steel',
    specVal: '420J2 High Carbon Surgical Steel'
  },

  // Solar & Energy
  {
    name: 'NovaPower 100W Foldable ETFE Waterproof Solar Charger with USB-C PD & DC',
    category: 'solar-power',
    subcategory: 'Foldable Solar Panels',
    brand: 'NovaPower',
    basePrice: 99.99,
    origPrice: 169.99,
    img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    tag: '100W Foldable',
    feature: 'Folds down to laptop size with built-in smart IC chip to charge phones and battery banks directly',
    specKey: 'Weight',
    specVal: '2.1 kg (4.6 lbs)'
  },
  {
    name: 'NovaLight Solar Motion Sensor 300-LED Outdoor Security Floodlights (2-Pack)',
    category: 'solar-power',
    subcategory: 'Rechargeable Lanterns',
    brand: 'NovaPower',
    basePrice: 29.99,
    origPrice: 49.99,
    img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    tag: '270° Wide Angle',
    feature: '3 adjustable light heads illuminate up to 800 sq ft with 26ft PIR motion detection',
    specKey: 'Waterproof',
    specVal: 'IP65 All-Weather Resistant'
  },
  {
    name: 'NovaVolt 600W Pure Sine Wave Emergency Home Backup Power Inverter',
    category: 'solar-power',
    subcategory: 'Backup Inverters',
    brand: 'NovaPower',
    basePrice: 59.99,
    origPrice: 99.99,
    img: 'https://images.unsplash.com/photo-1558441719-204122d250c6?w=800&auto=format&fit=crop&q=80',
    tag: 'Pure Sine Wave',
    feature: 'Converts 12V car battery power to clean 120V household electricity safe for sensitive electronics',
    specKey: 'Surge Power',
    specVal: '1200W Surge Peak'
  },

  // Sports & Outdoors
  {
    name: 'NovaTorch 20,000-Lumen Tactical LED Zoomable Flashlight with 5000mAh Battery',
    category: 'sports-outdoors',
    subcategory: 'Camping Tents',
    brand: 'NovaCamp',
    basePrice: 28.99,
    origPrice: 49.99,
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
    tag: '20,000 Lumens',
    feature: 'Beam casts light up to 3,200 feet (10 football fields) with aircraft aluminum strike bezel',
    specKey: 'LED Chip',
    specVal: 'XHP70.2 Ultra-Bright Core'
  },
  {
    name: 'NovaMat High-Density 1/2-Inch Extra Thick Non-Slip Yoga & Pilates Mat with Carry Strap',
    category: 'sports-outdoors',
    subcategory: 'Home Gym Equipment',
    brand: 'NovaFit',
    basePrice: 24.99,
    origPrice: 45.00,
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    tag: '1/2" Joint Cushion',
    feature: 'Eco-friendly high-density NBR foam cushions spine, knees, and joints on hard floors',
    specKey: 'Dimensions',
    specVal: '72" x 24" x 0.5" Extra Thick'
  },
  {
    name: 'NovaPump Portable Smart Cordless Tire Inflator & Air Compressor (150 PSI)',
    category: 'sports-outdoors',
    subcategory: 'E-Scooters & Bikes',
    brand: 'NovaDrive',
    basePrice: 38.99,
    origPrice: 69.99,
    img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
    tag: 'Auto Shut-Off',
    feature: 'Inflates a flat car tire from 0 to 36 PSI in 5 minutes with preset pressure auto-stop',
    specKey: 'Battery',
    specVal: '7800mAh Rechargeable + 12V Car Cable'
  },
  {
    name: 'NovaHammock 2-Person Ultralight Portable Camping Hammock with Tree Straps',
    category: 'sports-outdoors',
    subcategory: 'Camping Tents',
    brand: 'NovaCamp',
    basePrice: 19.99,
    origPrice: 38.00,
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
    tag: '500 lbs Capacity',
    feature: '210T parachute ripstop nylon with 2x 10ft heavy-duty non-stretch tree straps',
    specKey: 'Weight',
    specVal: '580g Packs into attached stuff sack'
  }
];

export const EXPANDED_CATALOG_PRODUCTS: Product[] = TEMPLATES.map((tpl, i) => {
  const discount = Math.round(((tpl.origPrice - tpl.basePrice) / tpl.origPrice) * 100);
  const id = `exp-item-${i + 1}-${tpl.brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  
  return {
    id,
    title: tpl.name,
    subtitle: tpl.feature,
    slug: id,
    brand: tpl.brand,
    category: tpl.category,
    subcategory: tpl.subcategory,
    price: tpl.basePrice,
    originalPrice: tpl.origPrice,
    discountPercent: discount,
    rating: 4.85 + ((i % 15) * 0.01),
    reviewCount: 850 + (i * 120),
    soldCount: 4500 + (i * 850),
    stockCount: 30 + (i * 4),
    isFlashDrop: i % 3 === 0,
    flashDropEndsInSeconds: i % 3 === 0 ? 12000 + (i * 300) : undefined,
    isNovaChoice: i % 2 === 0,
    isOfficialMall: true,
    isFreeShipping: true,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2 Years Manufacturer Replacement',
    thumbnail: tpl.img,
    images: [tpl.img],
    specs: {
      [tpl.specKey]: tpl.specVal,
      'Quality Standard': 'CE / FCC / RoHS / ISO9001 Certified',
      'Shipping': 'NovaExpress 24-Hour Dispatch'
    },
    keyFeatures: [
      tpl.feature,
      'Engineered with premium aerospace-grade components for long lasting durability',
      'Backed by NovaCare 30-day risk-free money back guarantee'
    ],
    seller: {
      id: `${tpl.brand.toLowerCase()}-official`,
      name: `${tpl.brand} Official Flagship`,
      rating: 4.96,
      scorePercent: 99.4,
      followers: 260000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    tags: [tpl.tag, 'Nova Choice', 'Free Fast Shipping'],
    reviews: [
      {
        id: `rev-exp-${i + 1}`,
        author: ['David K.', 'Sarah M.', 'Alex B.', 'Jessica T.', 'Marcus L.'][i % 5],
        rating: 5,
        date: `${(i % 7) + 1} days ago`,
        comment: `Outstanding product! Build quality is top-tier and it arrived via NovaExpress the very next day. Highly recommended.`,
        helpfulCount: 45 + (i * 8),
        verifiedPurchase: true
      }
    ],
    groupBuy: tpl.basePrice > 25 ? {
      enabled: true,
      groupPrice: Math.round(tpl.basePrice * 0.88 * 100) / 100,
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 14000
    } : undefined
  };
});
