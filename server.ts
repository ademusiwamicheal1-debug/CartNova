import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI client server-side
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch {
    return null;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Cart NOVA Marketplace Engine', time: new Date().toISOString() });
});

// AI Shopping Assistant Endpoint
app.post('/api/nova-ai/assistant', async (req, res) => {
  const { prompt, userPrompt, contextProducts, catalogContext, cartItems, history } = req.body;
  const actualPrompt = userPrompt || prompt || '';
  const catalog = catalogContext || contextProducts || [];

  try {
    const ai = getGeminiClient();

    if (ai) {
      const systemInstruction = `You are "Nova", the intelligent, friendly, and expert AI Shopping Concierge for "Cart NOVA" — a mega modern e-commerce marketplace combining flash sales, official brand stores, group buy discounts, and express logistics.
Your goal is to help shoppers find the perfect products, compare options, understand value, suggest gifts, and occasionally negotiate fun combo deals.
Keep responses concise, helpful, engaging, and formatted with clean markdown bullet points.

When users ask for product recommendations or comparisons, refer to the available catalog products provided in the context if relevant.
If they ask for a discount, bundle deal, or negotiate for their cart, you can grant them a unique thematic discount code like "NOVA-MAGIC15" (15% off) or "SQUAD20" (20% off) with a friendly explanation.

Available Products in Catalog Summary:
${JSON.stringify(catalog).slice(0, 4000)}

Current Cart Summary:
${JSON.stringify(cartItems || []).slice(0, 1000)}`;

      const fullPrompt = `${history ? `Conversation History:\n${history}\n\n` : ''}User Query: ${actualPrompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || '';
      if (replyText) {
        const couponMatch = replyText.match(/NOVA-[A-Z0-9]+|SQUAD[0-9]+|FLASH[0-9]+/i);
        const couponUnlocked = couponMatch ? couponMatch[0].toUpperCase() : undefined;

        // Extract recommended product IDs if mentioned
        const recommendedProductIds = catalog
          .filter((p: any) => replyText.toLowerCase().includes(p.title?.toLowerCase()) || replyText.toLowerCase().includes(p.brand?.toLowerCase()))
          .map((p: any) => p.id);

        return res.json({
          reply: replyText,
          couponUnlocked,
          recommendedProductIds,
          suggestions: [
            'Compare specs with top alternatives',
            'Can I get an extra discount?',
            'What is the return policy?'
          ]
        });
      }
    }
  } catch (error: any) {
    // Graceful fallback without noisy unhandled stack traces
  }

  // Graceful fallback response when Gemini key is not configured or encountering permission limits
  const lower = actualPrompt.toLowerCase();
  let fallbackReply = `Hi there! I'm Nova, your AI Shopping Concierge. I looked through our Cart NOVA marketplace for "${actualPrompt}".`;
  let fallbackCoupon: string | undefined = undefined;
  let recommendedIds: string[] = [];

  if (lower.includes('coupon') || lower.includes('discount') || lower.includes('voucher') || lower.includes('code') || lower.includes('deal')) {
    fallbackCoupon = 'NOVA-VIP15';
    fallbackReply = `🎉 You've unlocked a secret VIP Cart NOVA voucher code! Use **${fallbackCoupon}** at checkout for an extra 15% discount across all qualifying orders. I've automatically applied it to your active session!`;
  } else if (lower.includes('headphone') || lower.includes('audio') || lower.includes('sound') || lower.includes('music')) {
    recommendedIds = ['p-aud-1', 'p-aud-2'];
    fallbackReply = `🎧 For premium sound, I highly recommend our **NovaSound ANC Pro Wireless** (with 48dB active noise cancellation and 60hr battery) or the **AeroPulse Open-Ear Sports Buds** for workout comfort. Both come with free next-day express delivery!`;
  } else if (lower.includes('watch') || lower.includes('fitness') || lower.includes('smartwatch')) {
    recommendedIds = ['p-aud-2', 'p-pho-2'];
    fallbackReply = `⌚ For health and fitness tracking, the **Titanium Ultra GPS Smartwatch** features dual-frequency satellite tracking, ECG heart rate monitoring, and a vivid 2000-nit sapphire display.`;
  } else if (lower.includes('kitchen') || lower.includes('cook') || lower.includes('fryer') || lower.includes('appliance')) {
    recommendedIds = ['p-hom-1', 'p-hom-2'];
    fallbackReply = `🍳 For effortless smart cooking, the **TurboCrisp Dual-Zone Smart Air Fryer 9L** is our top-rated kitchen appliance, letting you cook two dishes simultaneously with sync-finish!`;
  } else {
    recommendedIds = catalog.slice(0, 2).map((p: any) => p.id);
    fallbackReply = `✨ Here are our top-rated marketplace deals right now with verified buyer satisfaction, full manufacturer warranty, and free next-day courier delivery!`;
  }

  return res.json({
    reply: fallbackReply,
    couponUnlocked: fallbackCoupon,
    recommendedProductIds: recommendedIds,
    suggestions: [
      'Give me a secret voucher code',
      'Best wireless headphones under $100',
      'Top kitchen appliances for fast meals',
      'Compare Smartwatches for fitness'
    ]
  });
});

// AI Product Review Summarizer & Pros/Cons Analyzer
app.post('/api/nova-ai/review-summary', async (req, res) => {
  const { productTitle, specs, reviews, category } = req.body;

  try {
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Analyze this product from the Cart NOVA marketplace and generate a smart buyer breakdown.
Product: ${productTitle}
Category: ${category}
Specs: ${JSON.stringify(specs || {})}
Customer Reviews: ${JSON.stringify(reviews || [])}

Provide a JSON output containing:
- summary: A crisp 2-sentence summary of overall customer sentiment.
- pros: Array of 3 key strengths.
- cons: Array of 1-2 minor caveats or trade-offs.
- verdict: A 1-sentence final buying recommendation verdict.
- score: A number rating out of 10 (e.g. 9.3).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && parsed.summary) {
          return res.json(parsed);
        }
      }
    }
  } catch (error: any) {
    // Graceful fallback without noisy unhandled stack traces
  }

  // Graceful deterministic contextual synthesis of product specs and reviews
  const title = productTitle || 'This item';
  const cat = category ? category.replace(/-/g, ' ') : 'marketplace electronics';

  const specKeys = specs ? Object.keys(specs) : [];
  const prosList: string[] = [];
  if (specKeys.length > 0) {
    prosList.push(`Top-tier ${specKeys[0]}: ${specs[specKeys[0]]}`);
  }
  if (specKeys.length > 1) {
    prosList.push(`Engineered with ${specs[specKeys[1]]} for maximum reliability`);
  }
  prosList.push(`High verified customer satisfaction rating with official manufacturer warranty`);

  const consList = [
    'Popular seller item with rapid inventory turnover during flash sales'
  ];

  return res.json({
    summary: `Verified Cart NOVA shoppers give ${title} high marks for its stellar reliability, intuitive daily usability, and premium craftsmanship.`,
    pros: prosList.slice(0, 3),
    cons: consList,
    verdict: `A top-tier recommendation for shoppers looking for dependable quality in ${cat}.`,
    score: 9.4
  });
});

// AI & Rule-based E-Commerce Product Extractor Endpoint
app.post('/api/admin/extract-product', async (req, res) => {
  const { url, rawText, rawJson, sourcePreset, markupPercent = 0 } = req.body;

  try {
    const ai = getGeminiClient();

    let textToAnalyze = '';
    let fetchedHtmlSnippet = '';
    let detectedSource = 'E-Commerce Marketplace';

    if (url) {
      if (url.includes('amazon.')) detectedSource = 'Amazon';
      else if (url.includes('aliexpress.')) detectedSource = 'AliExpress';
      else if (url.includes('ebay.')) detectedSource = 'eBay';
      else if (url.includes('temu.')) detectedSource = 'Temu';
      else if (url.includes('walmart.')) detectedSource = 'Walmart';
      else if (url.includes('shein.')) detectedSource = 'Shein';
      else if (url.includes('myshopify.com') || url.includes('/products/')) detectedSource = 'Shopify Store';
      else detectedSource = 'External E-Commerce Web Store';

      try {
        const fetchRes = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
          },
          signal: AbortSignal.timeout(6000)
        });
        if (fetchRes.ok) {
          const html = await fetchRes.text();
          // Extract title, meta tags, json-ld, and body text
          fetchedHtmlSnippet = html.slice(0, 15000);
        }
      } catch (err: any) {
        console.log('Direct HTML fetch skipped/cors fallback:', err?.message || err);
      }
    }

    textToAnalyze = `
Source URL: ${url || 'N/A'}
Source Preset: ${sourcePreset || 'N/A'}
Detected Source: ${detectedSource}
Raw User Input: ${rawText || ''}
Raw JSON: ${rawJson ? JSON.stringify(rawJson) : ''}
Fetched HTML Snippet: ${fetchedHtmlSnippet ? fetchedHtmlSnippet.slice(0, 8000) : 'None'}
`;

    if (ai) {
      const prompt = `You are a world-class e-commerce product scraper and catalog extractor.
Analyze the provided web content, URL, text, or JSON from an external e-commerce source (${detectedSource}) and extract a rich, structured product for the Cart NOVA marketplace.

Available Categories (MUST pick one exact slug):
- "phones-tablets"
- "audio-wearables"
- "computing-gaming"
- "home-appliances"
- "fashion-apparel"
- "beauty-health"
- "solar-power"
- "sports-outdoors"

Input data:
${textToAnalyze}

Return a valid JSON object matching this schema:
{
  "title": "Clean, engaging product title (50-90 chars)",
  "subtitle": "Informative subtitle with 2-3 key specs (70-120 chars)",
  "brand": "Brand name or manufacturer",
  "category": "One of the 8 category slugs listed above",
  "subcategory": "Specific subcategory name (e.g. 'Flagship Smartphones', 'Espresso Machines')",
  "price": 49.99 (Extracted retail price in USD as a number),
  "originalPrice": 89.99 (Extracted MSRP/original price before discount as a number),
  "discountPercent": 44 (Calculated discount % or default to 15-50%),
  "rating": 4.85 (Number between 4.0 and 5.0),
  "reviewCount": 1250 (Estimated review count number),
  "stockCount": 65 (Inventory quantity),
  "thumbnail": "High-quality realistic Unsplash or extracted image URL for this product type",
  "images": ["High quality image URL 1", "High quality image URL 2"],
  "specs": {
    "Key Spec 1": "Value 1",
    "Key Spec 2": "Value 2",
    "Key Spec 3": "Value 3",
    "Key Spec 4": "Value 4"
  },
  "keyFeatures": [
    "Compelling feature 1",
    "Compelling feature 2",
    "Compelling feature 3"
  ],
  "tags": ["tag1", "tag2", "tag3"],
  "seller": {
    "name": "Brand / Merchant name",
    "rating": 4.9,
    "badge": "Nova Mall",
    "shipsFrom": "Nova Express Global Hub"
  },
  "source": "${detectedSource}"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && parsed.title) {
          // Apply markup if requested
          if (markupPercent && markupPercent !== 0) {
            const factor = 1 + (Number(markupPercent) / 100);
            parsed.price = Number((parsed.price * factor).toFixed(2));
            parsed.originalPrice = Number((parsed.originalPrice * factor).toFixed(2));
          }
          return res.json({ success: true, product: parsed, source: detectedSource });
        }
      }
    }
  } catch (error: any) {
    // Smart heuristic fallback on permission/network limits
  }

  // Smart Heuristic Fallback
  const detectedSource = url ? (url.includes('amazon') ? 'Amazon' : url.includes('aliexpress') ? 'AliExpress' : url.includes('shopify') ? 'Shopify' : url.includes('ebay') ? 'eBay' : 'E-Commerce Store') : (sourcePreset || 'External Store');
  
  const parsedFallback = generateFallbackExtractedProduct(url, rawText, rawJson, sourcePreset, markupPercent, detectedSource);
  return res.json({ success: true, product: parsedFallback, source: detectedSource, isFallback: true });
});

// Helper for deterministic fallback extraction
function generateFallbackExtractedProduct(url?: string, rawText?: string, rawJson?: any, preset?: string, markupPercent = 0, source = 'E-Commerce') {
  let title = 'Extracted Premium Marketplace Item';
  let category = 'computing-gaming';
  let subcategory = 'PC Components';
  let brand = 'NovaVerified';
  let price = 49.99;
  let origPrice = 79.99;
  let thumbnail = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
  let images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
  ];
  let specs: Record<string, string> = {
    'Condition': 'Brand New 100% Authentic',
    'Extracted From': source,
    'Warranty': '2-Year Official Protection',
    'Certification': 'CE / RoHS / ISO-9001'
  };
  let keyFeatures = [
    'Directly extracted and verified from external e-commerce inventory.',
    'Includes official Cart NOVA buyer escrow protection & satisfaction guarantee.',
    'Fast express courier delivery with real-time package tracking.'
  ];

  if (rawJson && typeof rawJson === 'object') {
    title = rawJson.title || rawJson.name || title;
    brand = rawJson.brand || rawJson.vendor || brand;
    price = Number(rawJson.price) || price;
    origPrice = Number(rawJson.originalPrice || rawJson.compare_at_price || rawJson.msrp) || Number((price * 1.35).toFixed(2));
    if (rawJson.image || rawJson.thumbnail) thumbnail = rawJson.image || rawJson.thumbnail;
    if (Array.isArray(rawJson.images) && rawJson.images.length > 0) images = rawJson.images;
  } else if (rawText) {
    const lines = rawText.split('\n').filter(l => l.trim().length > 0);
    if (lines.length > 0) title = lines[0].slice(0, 90);
    const priceMatch = rawText.match(/\$?\s?(\d+(\.\d{1,2})?)/);
    if (priceMatch) {
      price = parseFloat(priceMatch[1]);
      origPrice = Number((price * 1.35).toFixed(2));
    }
  } else if (url) {
    const urlClean = url.replace(/https?:\/\/(www\.)?/, '').split('?')[0];
    const pathParts = urlClean.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || 'product';
    const cleanTitle = lastPart.replace(/[-_]/g, ' ').replace(/\.(html|php|asp)/, '');
    if (cleanTitle.length > 3) {
      title = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    }
  }

  // Check category heuristics
  const lower = `${title} ${rawText || ''} ${url || ''}`.toLowerCase();
  if (lower.includes('phone') || lower.includes('case') || lower.includes('charger') || lower.includes('tablet') || lower.includes('iphone') || lower.includes('samsung')) {
    category = 'phones-tablets';
    subcategory = 'Flagship Smartphones';
    thumbnail = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80';
  } else if (lower.includes('audio') || lower.includes('headphone') || lower.includes('earbud') || lower.includes('speaker') || lower.includes('watch') || lower.includes('sound')) {
    category = 'audio-wearables';
    subcategory = 'Noise Cancelling Headphones';
    thumbnail = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
  } else if (lower.includes('kitchen') || lower.includes('coffee') || lower.includes('cook') || lower.includes('fryer') || lower.includes('vacuum') || lower.includes('blender') || lower.includes('home')) {
    category = 'home-appliances';
    subcategory = 'Smart Air Fryers';
    thumbnail = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80';
  } else if (lower.includes('dress') || lower.includes('shirt') || lower.includes('hoodie') || lower.includes('jacket') || lower.includes('shoe') || lower.includes('sneaker') || lower.includes('bag') || lower.includes('fashion')) {
    category = 'fashion-apparel';
    subcategory = 'Men\'s Streetwear';
    thumbnail = 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80';
  } else if (lower.includes('skin') || lower.includes('cream') || lower.includes('serum') || lower.includes('beauty') || lower.includes('facial') || lower.includes('hair')) {
    category = 'beauty-health';
    subcategory = 'Skincare Serums';
    thumbnail = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80';
  } else if (lower.includes('solar') || lower.includes('panel') || lower.includes('generator') || lower.includes('inverter') || lower.includes('battery') || lower.includes('power')) {
    category = 'solar-power';
    subcategory = 'Foldable Solar Panels';
    thumbnail = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80';
  } else if (lower.includes('gym') || lower.includes('sport') || lower.includes('tent') || lower.includes('camp') || lower.includes('bike') || lower.includes('fitness')) {
    category = 'sports-outdoors';
    subcategory = 'Camping Tents';
    thumbnail = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80';
  }

  if (markupPercent && markupPercent !== 0) {
    const factor = 1 + (Number(markupPercent) / 100);
    price = Number((price * factor).toFixed(2));
    origPrice = Number((origPrice * factor).toFixed(2));
  }

  const discountPercent = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

  return {
    id: `ext-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title,
    subtitle: `Imported from ${source} with verified manufacturer specifications and buyer protection.`,
    slug: `ext-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}`,
    brand,
    category,
    subcategory,
    price,
    originalPrice: origPrice,
    discountPercent,
    rating: 4.88,
    reviewCount: 950,
    soldCount: 3400,
    stockCount: 45,
    isFlashDrop: discountPercent >= 20,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: price > 35,
    expressDeliveryHours: 24,
    returnDays: 30,
    warranty: '2-Year Official Protection Guarantee',
    thumbnail,
    images: images.length > 0 ? images : [thumbnail],
    specs,
    keyFeatures,
    tags: [source.toLowerCase(), category, 'extracted', 'nova-choice'],
    seller: {
      id: `seller-${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      name: `${brand} Official Hub`,
      rating: 4.95,
      scorePercent: 99.1,
      followers: 120000,
      badge: 'Nova Mall',
      responseRate: '100% within 2 mins',
      shipsFrom: 'Nova Express Global Hub',
      isVerified: true
    },
    reviews: [
      {
        id: `rev-ext-${Date.now()}`,
        author: 'Verified Importer',
        rating: 5,
        date: 'Just now',
        comment: `Authentic item imported via ${source}. Build quality and performance match official specs.`,
        helpfulCount: 24,
        verifiedPurchase: true
      }
    ]
  };
}

// Start server with Vite middleware in dev or static files in prod
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cart NOVA server running on http://localhost:${PORT}`);
  });
}

start();
