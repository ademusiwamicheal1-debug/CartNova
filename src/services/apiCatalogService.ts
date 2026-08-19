import { Product } from '../types';

/**
 * Normalizes DummyJSON product format into Cart NOVA Product model
 */
export function normalizeDummyJsonProduct(item: any): Product {
  const price = typeof item.price === 'number' ? item.price : 99.99;
  const discount = typeof item.discountPercentage === 'number' ? Math.round(item.discountPercentage) : 15;
  const originalPrice = discount > 0 ? Number((price / (1 - discount / 100)).toFixed(2)) : price;
  const rating = typeof item.rating === 'number' ? Number(item.rating.toFixed(1)) : 4.6;
  const stock = typeof item.stock === 'number' ? item.stock : 45;

  const images = Array.isArray(item.images) && item.images.length > 0
    ? item.images.filter((img: string) => img && !img.includes('placeholder'))
    : [item.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'];

  const categorySlug = String(item.category || 'tech').toLowerCase().replace(/\s+/g, '-');
  const brandName = item.brand || 'NOVA Verified Brand';

  return {
    id: `dummyjson-${item.id}`,
    title: item.title || 'Premium Marketplace Item',
    subtitle: item.description ? item.description.slice(0, 90) + '...' : 'Engineered for high performance and daily reliability.',
    slug: `dj-${item.id}-${(item.title || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    brand: brandName,
    category: mapToNovaCategory(categorySlug),
    subcategory: item.category || 'Lifestyle & Gear',
    price,
    originalPrice,
    discountPercent: discount,
    rating,
    reviewCount: Math.floor((item.id * 89) % 850) + 42,
    soldCount: Math.floor((item.id * 142) % 3500) + 120,
    stockCount: stock,
    isFlashDrop: discount > 15,
    flashDropEndsInSeconds: 18400,
    isNovaChoice: rating >= 4.5,
    isOfficialMall: true,
    isFreeShipping: price > 35,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2-Year Official Manufacturer Warranty',
    thumbnail: item.thumbnail || images[0],
    images: images.length > 0 ? images : [item.thumbnail],
    colors: [
      { name: 'Standard Edition', hex: '#1e293b' },
      { name: 'Titanium Silver', hex: '#94a3b8' }
    ],
    sizes: ['Standard', 'Pro Edition'],
    specs: {
      'Manufacturer': brandName,
      'Category': item.category || 'General',
      'Inventory SKU': item.sku || `NVX-${item.id}-DJ`,
      'Weight': item.weight ? `${item.weight} kg` : '0.45 kg',
      'Origin': 'Global Import Center',
      'Quality Certified': 'ISO-9001 / CE Verified'
    },
    keyFeatures: [
      item.description || 'Authentic quality sourced directly from verified manufacturers.',
      'Includes official Cart NOVA buyer escrow protection.',
      'Pre-inspected at fulfillment hub for zero-defect guarantee.'
    ],
    seller: {
      id: `seller-dj-${item.id % 5 + 1}`,
      name: `${brandName} Global Store`,
      rating: 4.9,
      scorePercent: 98,
      followers: 14200,
      badge: 'Nova Mall',
      responseRate: '< 5 mins',
      shipsFrom: 'Central Express Hub',
      isVerified: true
    },
    tags: [categorySlug, brandName.toLowerCase(), 'public-api', 'dummyjson', 'verified'],
    reviews: Array.isArray(item.reviews) && item.reviews.length > 0
      ? item.reviews.map((r: any, idx: number) => ({
          id: `rev-dj-${item.id}-${idx}`,
          author: r.reviewerName || 'Verified Buyer',
          rating: r.rating || 5,
          date: r.date ? new Date(r.date).toLocaleDateString() : 'Recent order',
          comment: r.comment || 'Outstanding build quality. Exceeded expectations and arrived swiftly.',
          helpfulCount: Math.floor(Math.random() * 15) + 2,
          verifiedPurchase: true
        }))
      : [
          {
            id: `rev-dj-gen-${item.id}`,
            author: 'Jordan Miller',
            rating: 5,
            date: '2 days ago',
            comment: 'Item arrived in immaculate packaging. The build and performance are top tier.',
            helpfulCount: 8,
            verifiedPurchase: true
          }
        ],
    groupBuy: {
      enabled: true,
      groupPrice: Number((price * 0.78).toFixed(2)),
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 14400
    }
  };
}

/**
 * Normalizes FakeStoreAPI product format into Cart NOVA Product model
 */
export function normalizeFakeStoreProduct(item: any): Product {
  const price = typeof item.price === 'number' ? item.price : 49.99;
  const originalPrice = Number((price * 1.25).toFixed(2));
  const rating = item.rating?.rate ? Number(item.rating.rate.toFixed(1)) : 4.4;
  const reviewCount = item.rating?.count || 85;

  const categoryMap: Record<string, string> = {
    'electronics': 'tech',
    'jewelery': 'fashion',
    "men's clothing": 'fashion',
    "women's clothing": 'fashion'
  };

  const novaCategory = categoryMap[item.category] || 'lifestyle';

  return {
    id: `fakestore-${item.id}`,
    title: item.title || 'FakeStore Catalog Item',
    subtitle: item.description ? item.description.slice(0, 95) + '...' : 'Sourced via FakeStoreAPI public endpoint.',
    slug: `fs-${item.id}-${(item.title || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    brand: 'FakeStore Official',
    category: novaCategory,
    subcategory: item.category || 'Retail',
    price,
    originalPrice,
    discountPercent: 20,
    rating,
    reviewCount,
    soldCount: reviewCount * 4 + 150,
    stockCount: 85,
    isFlashDrop: price > 60,
    flashDropEndsInSeconds: 21600,
    isNovaChoice: rating >= 4.0,
    isOfficialMall: true,
    isFreeShipping: price > 40,
    expressDeliveryHours: 24,
    returnDays: 14,
    warranty: '1-Year International Warranty',
    thumbnail: item.image,
    images: [item.image],
    colors: [
      { name: 'Original', hex: '#3b82f6' },
      { name: 'Dark Onyx', hex: '#0f172a' }
    ],
    sizes: ['Standard', 'Universal'],
    specs: {
      'Category': item.category || 'General',
      'API Source': 'FakeStoreAPI REST',
      'Condition': 'Brand New Factory Sealed',
      'Rating Count': `${reviewCount} verified ratings`
    },
    keyFeatures: [
      item.description || 'Quality tested and verified by FakeStoreAPI catalog.',
      'Includes rapid doorstep delivery & free return guarantee.'
    ],
    seller: {
      id: 'seller-fakestore',
      name: 'FakeStore Direct Global',
      rating: 4.8,
      scorePercent: 96,
      followers: 28500,
      badge: 'Verified Merchant',
      responseRate: '< 10 mins',
      shipsFrom: 'Express Direct Hub',
      isVerified: true
    },
    tags: [item.category || 'retail', 'fakestoreapi', 'public-api', 'live-feed'],
    reviews: [
      {
        id: `rev-fs-${item.id}`,
        author: 'Taylor Brooks',
        rating: Math.round(rating),
        date: '3 days ago',
        comment: 'Great value for money. Exact match with catalog specifications.',
        helpfulCount: 6,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: Number((price * 0.8).toFixed(2)),
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 10800
    }
  };
}

/**
 * Normalizes Platzi Fake Store API product format into Cart NOVA Product model
 */
export function normalizePlatziProduct(item: any): Product {
  const price = typeof item.price === 'number' ? item.price : 65.0;
  const originalPrice = Number((price * 1.3).toFixed(2));

  // Clean images from Platzi (some have bracket formatting like ["url"])
  let cleanedImages: string[] = [];
  if (Array.isArray(item.images)) {
    cleanedImages = item.images.map((img: string) => {
      if (typeof img === 'string') {
        return img.replace(/[\[\]"]/g, '').trim();
      }
      return '';
    }).filter((img: string) => img && (img.startsWith('http://') || img.startsWith('https://')));
  }

  if (cleanedImages.length === 0) {
    cleanedImages = ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'];
  }

  const categoryName = item.category?.name || 'General';
  const novaCategory = mapToNovaCategory(categoryName);

  return {
    id: `platzi-${item.id}`,
    title: item.title || 'Platzi Catalog Product',
    subtitle: item.description ? item.description.slice(0, 95) + '...' : 'Fetched from Platzi Fake Store REST API.',
    slug: `platzi-${item.id}-${(item.title || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    brand: 'Platzi Atelier',
    category: novaCategory,
    subcategory: categoryName,
    price,
    originalPrice,
    discountPercent: 23,
    rating: 4.7,
    reviewCount: 118,
    soldCount: 430,
    stockCount: 60,
    isFlashDrop: price > 50,
    flashDropEndsInSeconds: 16000,
    isNovaChoice: true,
    isOfficialMall: false,
    isFreeShipping: price > 45,
    expressDeliveryHours: 48,
    returnDays: 30,
    warranty: 'Platzi 1-Year Quality Shield',
    thumbnail: cleanedImages[0],
    images: cleanedImages,
    colors: [
      { name: 'Obsidian Black', hex: '#09090b' },
      { name: 'Pure White', hex: '#f8fafc' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: {
      'Category': categoryName,
      'Collection': 'Platzi 2026 Collection',
      'API Source': 'Platzi Fake Store API v1',
      'Images Count': `${cleanedImages.length} HD photos`
    },
    keyFeatures: [
      item.description || 'Refined design and premium materials crafted for long-lasting usage.',
      'Sourced via Platzi Fake Store GraphQL & REST ecosystem.'
    ],
    seller: {
      id: 'seller-platzi',
      name: 'Platzi Official Boutique',
      rating: 4.9,
      scorePercent: 99,
      followers: 41200,
      badge: 'Top Brand',
      responseRate: '< 2 mins',
      shipsFrom: 'Metropolitan Logistics Center',
      isVerified: true
    },
    tags: [categoryName.toLowerCase(), 'platzi', 'public-api', 'open-commerce'],
    reviews: [
      {
        id: `rev-platzi-${item.id}`,
        author: 'Morgan Vance',
        rating: 5,
        date: 'Yesterday',
        comment: 'High quality materials and exactly as shown in the HD images.',
        helpfulCount: 12,
        verifiedPurchase: true
      }
    ],
    groupBuy: {
      enabled: true,
      groupPrice: Number((price * 0.75).toFixed(2)),
      requiredMembers: 2,
      currentMembers: 1,
      expiresInSeconds: 18000
    }
  };
}

function mapToNovaCategory(cat: string): string {
  const lower = cat.toLowerCase();
  if (lower.includes('smart') || lower.includes('phone') || lower.includes('laptop') || lower.includes('tech') || lower.includes('electronic')) {
    return 'tech';
  }
  if (lower.includes('cloth') || lower.includes('dress') || lower.includes('shoe') || lower.includes('fashion') || lower.includes('jewel') || lower.includes('watch')) {
    return 'fashion';
  }
  if (lower.includes('home') || lower.includes('furniture') || lower.includes('decor') || lower.includes('kitchen') || lower.includes('appliance')) {
    return 'home';
  }
  if (lower.includes('beauty') || lower.includes('skin') || lower.includes('fragrance')) {
    return 'beauty';
  }
  if (lower.includes('grocer') || lower.includes('food') || lower.includes('drink')) {
    return 'groceries';
  }
  if (lower.includes('sport') || lower.includes('outdoor') || lower.includes('fitness')) {
    return 'sports';
  }
  return 'lifestyle';
}

export type ApiSourceType = 'curated' | 'dummyjson' | 'fakestore' | 'platzi' | 'blended';

/**
 * Fetches products from selected public shopping API source
 */
export async function fetchProductsFromApi(source: ApiSourceType): Promise<Product[]> {
  try {
    if (source === 'dummyjson') {
      const res = await fetch('https://dummyjson.com/products?limit=40');
      if (!res.ok) throw new Error(`DummyJSON API returned ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.products)) {
        return data.products.map(normalizeDummyJsonProduct);
      }
      return [];
    }

    if (source === 'fakestore') {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error(`FakeStoreAPI returned ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map(normalizeFakeStoreProduct);
      }
      return [];
    }

    if (source === 'platzi') {
      const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=30');
      if (!res.ok) throw new Error(`Platzi API returned ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map(normalizePlatziProduct);
      }
      return [];
    }

    if (source === 'blended') {
      const [djRes, fsRes, plRes] = await Promise.allSettled([
        fetch('https://dummyjson.com/products?limit=25').then(r => r.json()),
        fetch('https://fakestoreapi.com/products').then(r => r.json()),
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20').then(r => r.json())
      ]);

      const blendedList: Product[] = [];

      if (djRes.status === 'fulfilled' && Array.isArray(djRes.value?.products)) {
        blendedList.push(...djRes.value.products.map(normalizeDummyJsonProduct));
      }
      if (fsRes.status === 'fulfilled' && Array.isArray(fsRes.value)) {
        blendedList.push(...fsRes.value.map(normalizeFakeStoreProduct));
      }
      if (plRes.status === 'fulfilled' && Array.isArray(plRes.value)) {
        blendedList.push(...plRes.value.map(normalizePlatziProduct));
      }

      return blendedList;
    }

    return [];
  } catch (error) {
    console.error('Error fetching live products from public API:', error);
    throw error;
  }
}
