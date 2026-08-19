export interface ShoppingApi {
  id: string;
  name: string;
  category: 'General E-Commerce' | 'Electronics & Hardware' | 'Marketplaces' | 'Groceries & Nutrition' | 'Headless Commerce' | 'Price Intelligence';
  description: string;
  auth: 'No Auth (Open)' | 'API Key' | 'OAuth 2.0';
  https: boolean;
  cors: 'Yes' | 'No' | 'Unknown';
  baseUrl: string;
  docsUrl: string;
  sampleEndpoints: {
    name: string;
    method: 'GET' | 'POST';
    path: string;
    description: string;
    supportsLiveFetch: boolean;
  }[];
  tags: string[];
  featured?: boolean;
}

export const PUBLIC_SHOPPING_APIS: ShoppingApi[] = [
  {
    id: 'dummyjson',
    name: 'DummyJSON Products API',
    category: 'General E-Commerce',
    description: 'Realistic e-commerce dataset containing 190+ products across smartphones, laptops, fragrances, skincare, groceries, home-decoration, furniture, tops, dresses, and more with images, stock, and ratings.',
    auth: 'No Auth (Open)',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://dummyjson.com',
    docsUrl: 'https://dummyjson.com/docs/products',
    sampleEndpoints: [
      { name: 'Get All Products', method: 'GET', path: 'https://dummyjson.com/products?limit=30', description: 'Retrieve paginated products with specs and ratings', supportsLiveFetch: true },
      { name: 'Search Products', method: 'GET', path: 'https://dummyjson.com/products/search?q=phone', description: 'Query items matching search term', supportsLiveFetch: true },
      { name: 'Get Product Categories', method: 'GET', path: 'https://dummyjson.com/products/categories', description: 'List all product category slugs', supportsLiveFetch: true },
      { name: 'Get Single Product', method: 'GET', path: 'https://dummyjson.com/products/1', description: 'Retrieve detailed single product profile', supportsLiveFetch: true }
    ],
    tags: ['E-Commerce', 'Catalog', 'Open API', 'Dummy Data', 'CORS Enabled'],
    featured: true
  },
  {
    id: 'fakestore',
    name: 'FakeStoreAPI',
    category: 'General E-Commerce',
    description: 'Free REST API for e-commerce or shopping store prototyping. Provides products (electronics, jewelery, men/women clothing), carts, and user authentication tokens.',
    auth: 'No Auth (Open)',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://fakestoreapi.com',
    docsUrl: 'https://fakestoreapi.com/docs',
    sampleEndpoints: [
      { name: 'Get All Products', method: 'GET', path: 'https://fakestoreapi.com/products', description: 'Fetch all 20 curated retail items with ratings', supportsLiveFetch: true },
      { name: 'Get Electronics', method: 'GET', path: 'https://fakestoreapi.com/products/category/electronics', description: 'Filtered electronics catalog', supportsLiveFetch: true },
      { name: 'Get Jewelery', method: 'GET', path: 'https://fakestoreapi.com/products/category/jewelery', description: 'Fine jewelery and accessories', supportsLiveFetch: true },
      { name: 'Get Single Item', method: 'GET', path: 'https://fakestoreapi.com/products/1', description: 'Backpack product details with ratings', supportsLiveFetch: true }
    ],
    tags: ['Prototyping', 'REST', 'Jewelry', 'Electronics', 'Free'],
    featured: true
  },
  {
    id: 'platzi',
    name: 'Platzi Fake Store API',
    category: 'General E-Commerce',
    description: 'Modern REST and GraphQL API for e-commerce apps. Includes products with multiple high-res image galleries, category hierarchies, user profiles, and full CRUD operations.',
    auth: 'No Auth (Open)',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://api.escuelajs.co/api/v1',
    docsUrl: 'https://fakeapi.platzi.com/en/rest/products/',
    sampleEndpoints: [
      { name: 'Get Products (Paginated)', method: 'GET', path: 'https://api.escuelajs.co/api/v1/products?offset=0&limit=20', description: 'Retrieve products with multiple images', supportsLiveFetch: true },
      { name: 'Get Categories', method: 'GET', path: 'https://api.escuelajs.co/api/v1/categories', description: 'Fetch category classifications', supportsLiveFetch: true },
      { name: 'Filter by Price', method: 'GET', path: 'https://api.escuelajs.co/api/v1/products/?price_min=50&price_max=200', description: 'Query items in price range', supportsLiveFetch: true }
    ],
    tags: ['GraphQL', 'REST', 'Categories', 'Multi-Image', 'Open API'],
    featured: true
  },
  {
    id: 'openfoodfacts',
    name: 'Open Food Facts API',
    category: 'Groceries & Nutrition',
    description: 'Collaborative, open food database with over 3 million grocery products worldwide. Includes ingredients, nutrition grades (Nutri-Score), allergen warnings, and barcodes.',
    auth: 'No Auth (Open)',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://world.openfoodfacts.org/api/v2',
    docsUrl: 'https://openfoodfacts.github.io/api-documentation/',
    sampleEndpoints: [
      { name: 'Get Product by Barcode', method: 'GET', path: 'https://world.openfoodfacts.org/api/v2/product/737628064502.json', description: 'Fetch Nutri-Score & ingredients for item', supportsLiveFetch: true },
      { name: 'Search Organic Products', method: 'GET', path: 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=organic&json=1&page_size=10', description: 'Query organic groceries', supportsLiveFetch: true }
    ],
    tags: ['Groceries', 'Nutrition', 'Barcode', 'NutriScore', 'Open Data'],
    featured: true
  },
  {
    id: 'mercadolibre',
    name: 'MercadoLibre Marketplace API',
    category: 'Marketplaces',
    description: 'Largest e-commerce ecosystem in Latin America. Public endpoints for product searches, category trees, trending terms, and seller store credentials.',
    auth: 'No Auth (Open)',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://api.mercadolibre.com',
    docsUrl: 'https://developers.mercadolibre.com.ar/en_us/api-docs-en',
    sampleEndpoints: [
      { name: 'Search Marketplace', method: 'GET', path: 'https://api.mercadolibre.com/sites/MLA/search?q=smartwatch&limit=10', description: 'Search items across Latin America catalog', supportsLiveFetch: true },
      { name: 'Get Site Categories', method: 'GET', path: 'https://api.mercadolibre.com/sites/MLA/categories', description: 'Marketplace category taxonomy', supportsLiveFetch: true }
    ],
    tags: ['Latin America', 'Marketplace', 'Multi-Seller', 'Live Search']
  },
  {
    id: 'ebay-browse',
    name: 'eBay Browse & Buy API',
    category: 'Marketplaces',
    description: 'Official eBay developer API to search millions of live marketplace listings, item specifics, shipping estimates, seller ratings, and buy actions.',
    auth: 'OAuth 2.0',
    https: true,
    cors: 'Unknown',
    baseUrl: 'https://api.ebay.com/buy/browse/v1',
    docsUrl: 'https://developer.ebay.com/api-docs/buy/browse/overview.html',
    sampleEndpoints: [
      { name: 'Item Summary Search', method: 'GET', path: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=camera', description: 'Search live eBay listings with price filters', supportsLiveFetch: false },
      { name: 'Get Item Specifics', method: 'GET', path: 'https://api.ebay.com/buy/browse/v1/item/v1|123456789|0', description: 'Item condition, return policy, and courier options', supportsLiveFetch: false }
    ],
    tags: ['eBay', 'Auctions', 'Marketplace', 'Enterprise']
  },
  {
    id: 'bestbuy',
    name: 'Best Buy Products API',
    category: 'Electronics & Hardware',
    description: 'Query Best Buy product catalog including pricing, customer reviews, detailed tech specifications, and in-store availability across locations.',
    auth: 'API Key',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://api.bestbuy.com/v1',
    docsUrl: 'https://bestbuyapis.github.io/bby-query-builder/',
    sampleEndpoints: [
      { name: 'Query Laptops', method: 'GET', path: 'https://api.bestbuy.com/v1/products(categoryPath.id=abcat0502000)?format=json&show=name,regularPrice,salePrice', description: 'Search laptops on sale', supportsLiveFetch: false },
      { name: 'Top Deals Feed', method: 'GET', path: 'https://api.bestbuy.com/v1/products(onSale=true)?format=json', description: 'Daily flash discounts feed', supportsLiveFetch: false }
    ],
    tags: ['Electronics', 'Retail', 'Best Buy', 'In-Store Stock']
  },
  {
    id: 'digikey',
    name: 'Digi-Key Electronics API',
    category: 'Electronics & Hardware',
    description: 'Access millions of electronic components, microcontrollers, semiconductors, technical datasheets, and manufacturer inventory levels.',
    auth: 'OAuth 2.0',
    https: true,
    cors: 'No',
    baseUrl: 'https://api.digikey.com/Search/v3',
    docsUrl: 'https://developer.digikey.com/products/search',
    sampleEndpoints: [
      { name: 'Keyword Search', method: 'GET', path: 'https://api.digikey.com/Search/v3/Products/Keyword', description: 'Search electronics components by part number', supportsLiveFetch: false },
      { name: 'Manufacturer Details', method: 'GET', path: 'https://api.digikey.com/Search/v3/Manufacturers', description: 'Browse verified hardware suppliers', supportsLiveFetch: false }
    ],
    tags: ['Hardware', 'IoT', 'Semiconductors', 'Electronics']
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce REST API',
    category: 'Headless Commerce',
    description: 'Fully extensible REST API for WooCommerce stores. Manage catalog products, inventory levels, discount coupons, customer accounts, and webhook order triggers.',
    auth: 'API Key',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://example.com/wp-json/wc/v3',
    docsUrl: 'https://woocommerce.github.io/woocommerce-rest-api-docs/',
    sampleEndpoints: [
      { name: 'List All Products', method: 'GET', path: '/wp-json/wc/v3/products', description: 'Retrieve full store product list with variations', supportsLiveFetch: false },
      { name: 'Create Order', method: 'POST', path: '/wp-json/wc/v3/orders', description: 'Dispatch new order payload with line items', supportsLiveFetch: false }
    ],
    tags: ['WordPress', 'WooCommerce', 'Headless', 'Webhooks']
  },
  {
    id: 'serpapi-shopping',
    name: 'SerpApi Google Shopping API',
    category: 'Price Intelligence',
    description: 'Real-time structured JSON results for Google Shopping searches. Extract live merchant pricing, competitor reviews, delivery estimates, and stock status.',
    auth: 'API Key',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://serpapi.com/search.json?engine=google_shopping',
    docsUrl: 'https://serpapi.com/google-shopping-api',
    sampleEndpoints: [
      { name: 'Search Shopping Deals', method: 'GET', path: 'https://serpapi.com/search.json?engine=google_shopping&q=sneakers', description: 'Extract merchant pricing matrix', supportsLiveFetch: false }
    ],
    tags: ['Price Comparison', 'Google Shopping', 'Scraping', 'Analytics']
  },
  {
    id: 'commercejs',
    name: 'Commerce.js (Chec)',
    category: 'Headless Commerce',
    description: 'API-first headless eCommerce engine. Handles carts, checkouts, payments, webhooks, and product collections with client-side SDK.',
    auth: 'API Key',
    https: true,
    cors: 'Yes',
    baseUrl: 'https://api.chec.io/v1',
    docsUrl: 'https://commercejs.com/docs/',
    sampleEndpoints: [
      { name: 'Get Live Products', method: 'GET', path: 'https://api.chec.io/v1/products', description: 'Fetch headless storefront catalog', supportsLiveFetch: false },
      { name: 'Create Cart', method: 'GET', path: 'https://api.chec.io/v1/carts', description: 'Initialize serverless cart session', supportsLiveFetch: false }
    ],
    tags: ['Headless', 'Jamstack', 'Serverless', 'Modern Commerce']
  }
];
