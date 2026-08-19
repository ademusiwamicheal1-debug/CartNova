import { Product } from '../types';

export interface ExtractionRequest {
  url?: string;
  rawText?: string;
  rawJson?: any;
  sourcePreset?: string;
  markupPercent?: number;
}

export interface ExtractedProductResult {
  success: boolean;
  product: Product;
  source: string;
  isFallback?: boolean;
}

export interface ExtractionPreset {
  id: string;
  name: string;
  source: 'Amazon' | 'AliExpress' | 'Shopify' | 'eBay' | 'Temu' | 'Walmart' | 'Shein';
  category: string;
  badge: string;
  iconColor: string;
  sampleUrl: string;
  mockData: Partial<Product>;
}

export const ECOMMERCE_PRESETS: ExtractionPreset[] = [
  {
    id: 'amazon-kindle-scribe',
    name: 'Amazon Kindle Scribe 10.2" Digital Notebook & E-Reader (300 ppi)',
    source: 'Amazon',
    category: 'phones-tablets',
    badge: 'Amazon Best Seller #1',
    iconColor: '#ff9900',
    sampleUrl: 'https://www.amazon.com/dp/B09BS26B8B/kindle-scribe-10-inch',
    mockData: {
      title: 'Kindle Scribe 10.2" Paperwhite E-Reader & Digital Notebook (64GB)',
      subtitle: 'Glare-Free 300 ppi Front-Lit Display, Premium Pen with Shortcut Button, Months Battery Life',
      brand: 'Amazon',
      category: 'phones-tablets',
      subcategory: 'iPads & Tablets',
      price: 339.99,
      originalPrice: 419.99,
      discountPercent: 19,
      rating: 4.86,
      reviewCount: 3840,
      stockCount: 45,
      thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
      ],
      specs: {
        'Display': '10.2" Paperwhite 300 ppi',
        'Storage': '64GB Cloud Sync',
        'Pen': 'Battery-Free Premium Magnetic Stylus',
        'Battery': 'Up to 12 Weeks per charge'
      },
      keyFeatures: [
        'Read and write as naturally as on real paper with zero eye fatigue',
        'Convert handwritten notes to text and email to colleagues in one tap',
        'Organize notebook folders, to-do lists, journals, and marked-up PDFs'
      ],
      tags: ['Amazon Best Seller', 'E-Ink 300ppi', 'Kindle Scribe']
    }
  },
  {
    id: 'aliexpress-mechanical-keeb',
    name: 'AliExpress Zuoya GMK67 Gasket-Mount Custom Wireless Mechanical Keyboard',
    source: 'AliExpress',
    category: 'computing-gaming',
    badge: 'AliExpress Choice Deal',
    iconColor: '#e11d48',
    sampleUrl: 'https://www.aliexpress.com/item/10050058912384.html',
    mockData: {
      title: 'GMK67 Tri-Mode Gasket Mechanical Keyboard with Rotary Knob & RGB',
      subtitle: 'Bluetooth 5.0 / 2.4GHz / Type-C, Hot-Swappable PCB, Poron Sound Dampening Foam, South-Facing LEDs',
      brand: 'Zuoya Customs',
      category: 'computing-gaming',
      subcategory: 'Mechanical Keyboards',
      price: 46.99,
      originalPrice: 89.99,
      discountPercent: 48,
      rating: 4.91,
      reviewCount: 5200,
      stockCount: 80,
      thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
      ],
      specs: {
        'Structure': 'PC Plate Leaf-Spring Gasket Mount',
        'Switches': 'KTT Matcha Factory Pre-Lubed Linear',
        'Keycaps': 'Thick PBT Dye-Sub Cherry Profile',
        'Battery': '3000mAh Rechargeable'
      },
      keyFeatures: [
        'Deep "thocky" acoustics with 5-layer Poron and IXPE acoustic padding',
        'Smooth rotary aluminum knob for volume and RGB brightness adjustment',
        'Hot-swappable 5-pin sockets compatible with Cherry, Gateron, and Kailh switches'
      ],
      tags: ['AliExpress Choice', 'Gasket Mount', 'Custom Thock']
    }
  },
  {
    id: 'shopify-streetwear-hoodie',
    name: 'Shopify Boutique Heavyweight 500GSM French Terry Oversized Boxy Hoodie',
    source: 'Shopify',
    category: 'fashion-apparel',
    badge: 'Shopify Viral Drop',
    iconColor: '#059669',
    sampleUrl: 'https://representclo.com/products/heavyweight-boxy-hoodie-black',
    mockData: {
      title: 'ApexStudio 500GSM Luxury Heavyweight French Terry Boxy Hoodie',
      subtitle: '100% Organic Combed Cotton, Seamless Double Hood, Drop-Shoulder Relaxed Street Silhouette',
      brand: 'ApexStudio',
      category: 'fashion-apparel',
      subcategory: 'Men\'s Streetwear',
      price: 68.00,
      originalPrice: 130.00,
      discountPercent: 48,
      rating: 4.94,
      reviewCount: 2190,
      stockCount: 60,
      thumbnail: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
      ],
      specs: {
        'Fabric Weight': '500 GSM Luxury French Terry',
        'Material': '100% Organic Ring-Spun Cotton',
        'Fit': 'Oversized Boxy Dropped Shoulder'
      },
      keyFeatures: [
        'Pre-shrunk vintage stone wash treatment gives a luxurious drapey feel',
        'Structured double-layered hood stands upright without drawstrings',
        'Reinforced ribbed cuffs and hidden side-seam pockets'
      ],
      tags: ['Shopify Boutique', '500GSM Heavyweight', 'Boxy Fit']
    }
  },
  {
    id: 'temu-viral-portable-espresso',
    name: 'Temu Viral Handheld 18-Bar Electric Portable Espresso Machine',
    source: 'Temu',
    category: 'home-appliances',
    badge: 'Temu Viral 50k+ Sold',
    iconColor: '#f97316',
    sampleUrl: 'https://www.temu.com/goods-portable-18bar-espresso-maker.html',
    mockData: {
      title: 'NovaShot 18-Bar Self-Heating Electric Travel Espresso Maker (NS Pods & Grounds)',
      subtitle: 'Self-Heats Cold Water in 3 Mins, USB-C 7500mAh Battery, Rich Golden Crema Extraction',
      brand: 'NovaShot',
      category: 'home-appliances',
      subcategory: 'Espresso Machines',
      price: 59.99,
      originalPrice: 119.99,
      discountPercent: 50,
      rating: 4.88,
      reviewCount: 6400,
      stockCount: 95,
      thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'
      ],
      specs: {
        'Pump Pressure': '18 Bar High-Pressure Italian Pump',
        'Heating': 'Rapid 3-Minute 198°F Water Heater',
        'Compatibility': 'Nespresso Original Pods + Ground Coffee'
      },
      keyFeatures: [
        'Make authentic hot espresso anywhere: camping, road trips, hotels, or office desk',
        'Extracts up to 5 hot shots on battery or 100+ shots with pre-boiled hot water',
        'Fits directly into car cup holders and backpack bottle pockets'
      ],
      tags: ['Temu Viral', '18-Bar Espresso', 'Self-Heating']
    }
  },
  {
    id: 'ebay-vintage-lens',
    name: 'eBay Vault Helios 44-2 58mm f/2 Swirly Bokeh Portrait Lens (EF/E/Z Mount)',
    source: 'eBay',
    category: 'computing-gaming',
    badge: 'eBay Top Rated Plus',
    iconColor: '#3b82f6',
    sampleUrl: 'https://www.ebay.com/itm/helios-44-2-58mm-f2-swirly-bokeh-lens-mint',
    mockData: {
      title: 'Helios 44-2 58mm F/2 Classic Anamorphic-Look Bokeh Portrait Prime Lens',
      subtitle: 'Legendary Circular Swirly Bokeh, Multi-Coated All-Metal Glass, Seamless De-Clicked Aperture',
      brand: 'KMZ Helios',
      category: 'computing-gaming',
      subcategory: 'PC Components',
      price: 89.00,
      originalPrice: 159.00,
      discountPercent: 44,
      rating: 4.96,
      reviewCount: 1420,
      stockCount: 22,
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
      ],
      specs: {
        'Focal Length': '58mm Prime',
        'Max Aperture': 'f/2.0 (8-Blade Iris)',
        'Mount': 'M42 (Includes Canon EF / Sony E / Fuji X Adapter)'
      },
      keyFeatures: [
        'Produces cinematic vintage music video aesthetic with distinct circular background swirl',
        'Silky smooth manual focus ring modified with de-clicked cine gear teeth',
        '100% solid brass and aluminum barrel construction with zero plastic parts'
      ],
      tags: ['eBay Top Rated', 'Swirly Bokeh', 'Vintage Cinema']
    }
  },
  {
    id: 'walmart-air-purifier',
    name: 'Walmart Smart 4-Stage True HEPA Air Purifier with PM2.5 Laser Sensor',
    source: 'Walmart',
    category: 'home-appliances',
    badge: 'Walmart Rollback Deal',
    iconColor: '#0284c7',
    sampleUrl: 'https://www.walmart.com/ip/smart-true-hepa-air-purifier-1000sqft',
    mockData: {
      title: 'NovaPure Pro 4-Stage H13 Medical True HEPA Smart Air Purifier (1,200 Sq Ft)',
      subtitle: 'Captures 99.97% Smoke, Pet Dander & Allergens, Real-Time PM2.5 Display, App & Voice Control',
      brand: 'NovaPure',
      category: 'home-appliances',
      subcategory: 'Air Purifiers',
      price: 79.99,
      originalPrice: 149.99,
      discountPercent: 47,
      rating: 4.92,
      reviewCount: 4100,
      stockCount: 70,
      thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80'
      ],
      specs: {
        'CADR Rating': '300 CFM (Cleans 1,200 sq ft in 30 mins)',
        'Filtration': '4-Stage H13 HEPA + Activated Carbon Pellet Filter',
        'Noise': 'Whisper Quiet 21dB Sleep Mode'
      },
      keyFeatures: [
        'Laser particle sensor auto-adjusts fan speed when wildfire smoke or cooking odors detected',
        'Washable pre-filter extends high-efficiency HEPA cartridge lifespan to 12 months',
        'Energy Star certified consuming less electricity than an ambient LED lightbulb'
      ],
      tags: ['Walmart Rollback', 'H13 Medical HEPA', '1200 Sq Ft']
    }
  }
];

/**
 * Extracts product details from server endpoint or fallback preset
 */
export async function extractProductFromSource(req: ExtractionRequest): Promise<ExtractedProductResult> {
  // If a known preset is selected
  if (req.sourcePreset) {
    const preset = ECOMMERCE_PRESETS.find(p => p.id === req.sourcePreset);
    if (preset) {
      const mock = preset.mockData;
      const markupFactor = req.markupPercent ? 1 + (req.markupPercent / 100) : 1;
      const price = Number(((mock.price || 49.99) * markupFactor).toFixed(2));
      const originalPrice = Number(((mock.originalPrice || 79.99) * markupFactor).toFixed(2));
      const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const product: Product = {
        id: `ext-${Date.now()}-${preset.id}`,
        title: mock.title || preset.name,
        subtitle: mock.subtitle || `Imported directly from ${preset.source} verified seller listings.`,
        slug: `ext-${preset.id}-${Date.now().toString(36)}`,
        brand: mock.brand || 'NovaVerified',
        category: mock.category || preset.category,
        subcategory: mock.subcategory || 'Lifestyle',
        price,
        originalPrice,
        discountPercent,
        rating: mock.rating || 4.88,
        reviewCount: mock.reviewCount || 1200,
        soldCount: 3800,
        stockCount: mock.stockCount || 50,
        isFlashDrop: discountPercent >= 20,
        isNovaChoice: true,
        isOfficialMall: true,
        isFreeShipping: price > 35,
        expressDeliveryHours: 24,
        returnDays: 30,
        warranty: '2-Year Official Manufacturer Warranty',
        thumbnail: mock.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        images: mock.images || [mock.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
        specs: mock.specs || { 'Source': preset.source, 'Condition': 'Brand New 100% Authentic' },
        keyFeatures: mock.keyFeatures || ['Extracted from official merchant feed.', 'NovaCare Buyer Protection included.'],
        tags: [preset.source.toLowerCase(), preset.category, 'extracted-preset', 'fast-delivery'],
        seller: {
          id: `seller-${preset.source.toLowerCase()}-hub`,
          name: `${preset.source} Verified Global Store`,
          rating: 4.95,
          scorePercent: 99.4,
          followers: 180000,
          badge: 'Nova Mall',
          responseRate: '100% within 2 mins',
          shipsFrom: 'Nova Express Global Hub',
          isVerified: true
        },
        reviews: [
          {
            id: `rev-${preset.id}-1`,
            author: 'Verified Buyer',
            rating: 5,
            date: '1 day ago',
            comment: `Imported through Cart NOVA. Exact authentic item with pristine packaging and lightning delivery!`,
            helpfulCount: 34,
            verifiedPurchase: true
          }
        ]
      };

      return {
        success: true,
        product,
        source: preset.source,
        isFallback: false
      };
    }
  }

  // Attempt server API extraction
  try {
    const response = await fetch('/api/admin/extract-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.product) {
        const rawP = data.product;
        const finalProduct: Product = {
          id: rawP.id || `ext-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          title: rawP.title || 'Extracted E-Commerce Item',
          subtitle: rawP.subtitle || 'Imported product with verified specifications and official warranty.',
          slug: rawP.slug || `ext-${Date.now()}`,
          brand: rawP.brand || 'NovaVerified',
          category: rawP.category || 'computing-gaming',
          subcategory: rawP.subcategory || 'Marketplace Gear',
          price: Number(rawP.price) || 49.99,
          originalPrice: Number(rawP.originalPrice) || 79.99,
          discountPercent: Number(rawP.discountPercent) || 25,
          rating: Number(rawP.rating) || 4.85,
          reviewCount: Number(rawP.reviewCount) || 850,
          soldCount: Number(rawP.soldCount) || 2400,
          stockCount: Number(rawP.stockCount) || 40,
          isFlashDrop: rawP.isFlashDrop ?? true,
          isNovaChoice: true,
          isOfficialMall: true,
          isFreeShipping: (rawP.price || 49.99) > 35,
          expressDeliveryHours: 24,
          returnDays: 30,
          warranty: rawP.warranty || '2-Year Official Protection Guarantee',
          thumbnail: rawP.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          images: Array.isArray(rawP.images) && rawP.images.length > 0 ? rawP.images : [rawP.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
          specs: rawP.specs || { 'Condition': 'Brand New Authentic' },
          keyFeatures: rawP.keyFeatures || ['Directly imported from verified e-commerce source.'],
          tags: rawP.tags || ['extracted', 'verified'],
          seller: rawP.seller ? {
            id: `seller-${(rawP.brand || 'merchant').toLowerCase().replace(/[^a-z0-9]/g, '')}`,
            name: `${rawP.brand || 'Merchant'} Official Store`,
            rating: 4.92,
            scorePercent: 98.9,
            followers: 95000,
            badge: 'Nova Mall',
            responseRate: '100% within 3 mins',
            shipsFrom: 'Nova Express Global Hub',
            isVerified: true
          } : {
            id: 'seller-nova-hub',
            name: 'Nova Global Import Hub',
            rating: 4.95,
            scorePercent: 99.2,
            followers: 160000,
            badge: 'Nova Mall',
            responseRate: '< 2 mins',
            shipsFrom: 'Nova Express Warehouse',
            isVerified: true
          },
          reviews: Array.isArray(rawP.reviews) && rawP.reviews.length > 0 ? rawP.reviews : [
            {
              id: `rev-${Date.now()}`,
              author: 'Verified Importer',
              rating: 5,
              date: 'Just now',
              comment: 'Extracted product data verified and imported into live catalog.',
              helpfulCount: 12,
              verifiedPurchase: true
            }
          ]
        };

        return {
          success: true,
          product: finalProduct,
          source: data.source || 'E-Commerce Marketplace',
          isFallback: data.isFallback
        };
      }
    }
  } catch (err) {
    console.warn('Direct server extraction encountered network error, executing smart local parser:', err);
  }

  // Client-side smart extraction parser fallback
  const sourceName = req.url ? (req.url.includes('amazon') ? 'Amazon' : req.url.includes('aliexpress') ? 'AliExpress' : req.url.includes('shopify') ? 'Shopify' : req.url.includes('ebay') ? 'eBay' : 'Web Store') : 'External Source';
  
  let basePrice = 49.99;
  let title = 'Extracted E-Commerce Goods';
  let category = 'computing-gaming';
  let subcategory = 'PC Components';
  let brand = 'NovaGlobal';

  if (req.rawJson && typeof req.rawJson === 'object') {
    title = req.rawJson.title || req.rawJson.name || title;
    brand = req.rawJson.brand || req.rawJson.vendor || brand;
    basePrice = Number(req.rawJson.price) || basePrice;
  } else if (req.rawText) {
    const lines = req.rawText.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length > 0) title = lines[0].slice(0, 90);
    const pMatch = req.rawText.match(/\$?\s?(\d+(\.\d{1,2})?)/);
    if (pMatch) basePrice = parseFloat(pMatch[1]);
  } else if (req.url) {
    const slugParts = req.url.split('/').filter(Boolean);
    const last = slugParts[slugParts.length - 1] || 'extracted-product';
    title = last.replace(/[-_]/g, ' ').slice(0, 80);
  }

  const factor = req.markupPercent ? 1 + (req.markupPercent / 100) : 1;
  const price = Number((basePrice * factor).toFixed(2));
  const origPrice = Number((price * 1.35).toFixed(2));

  const fallbackProduct: Product = {
    id: `ext-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title,
    subtitle: `Imported from ${sourceName} with verified technical specifications and full buyer protection.`,
    slug: `ext-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}-${Date.now().toString(36)}`,
    brand,
    category,
    subcategory,
    price,
    originalPrice: origPrice,
    discountPercent: Math.round(((origPrice - price) / origPrice) * 100),
    rating: 4.88,
    reviewCount: 940,
    soldCount: 3200,
    stockCount: 45,
    isFlashDrop: true,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: price > 35,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2-Year Official Protection Guarantee',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Source': sourceName,
      'Authenticity': '100% Genuine Guaranteed',
      'Inspection': 'Passed Quality Hub Scan'
    },
    keyFeatures: [
      'Directly imported from verified e-commerce seller inventory.',
      'Protected under Cart NOVA buyer escrow refund policy.'
    ],
    tags: [sourceName.toLowerCase(), 'extracted', 'nova-verified'],
    seller: {
      id: `seller-${sourceName.toLowerCase()}-official`,
      name: `${sourceName} Verified Flagship`,
      rating: 4.94,
      scorePercent: 99.0,
      followers: 140000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    reviews: [
      {
        id: `rev-ext-${Date.now()}`,
        author: 'Verified Buyer',
        rating: 5,
        date: 'Recent',
        comment: `Authentic product extracted from ${sourceName}. Fast shipping and pristine condition.`,
        helpfulCount: 18,
        verifiedPurchase: true
      }
    ]
  };

  return {
    success: true,
    product: fallbackProduct,
    source: sourceName,
    isFallback: true
  };
}

/**
 * Curated Unsplash HD Product Images by category / query for Picture Management studio
 */
export const CURATED_PRODUCT_IMAGES: Record<string, string[]> = {
  'smartphones': [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80'
  ],
  'audio': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
  ],
  'gaming': [
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
  ],
  'kitchen': [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'
  ],
  'fashion': [
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80'
  ],
  'beauty': [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559591937-e10222471581?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80'
  ],
  'outdoors': [
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'
  ]
};
