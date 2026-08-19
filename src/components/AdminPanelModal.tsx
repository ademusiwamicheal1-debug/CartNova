import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import {
  extractProductFromSource,
  ECOMMERCE_PRESETS,
  CURATED_PRODUCT_IMAGES,
  ExtractionPreset
} from '../services/adminService';
import {
  X,
  SlidersHorizontal,
  Package,
  DollarSign,
  Image as ImageIcon,
  Sparkles,
  Link,
  Globe,
  Upload,
  Plus,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Percent,
  Search,
  RefreshCw,
  Download,
  ArrowUpDown,
  Zap,
  ShoppingBag,
  ExternalLink,
  Check,
  Tag,
  ShieldCheck,
  Eye
} from 'lucide-react';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminUser,
    currentUser,
    isAdminOpen,
    setIsAdminOpen,
    products,
    categories,
    formatPrice,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkUpdatePrices,
    importExtractedProducts,
    resetCatalogToDefault,
    setActiveProductModal,
    showToast,
    requestConfirmation
  } = useShop();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'inventory' | 'extractor' | 'pricing' | 'media'>('inventory');

  // Search & Filter in Inventory Tab
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'price-asc' | 'price-desc' | 'stock' | 'rating'>('title');

  // Quick edit modal / inline state
  const [selectedProductForMedia, setSelectedProductForMedia] = useState<Product | null>(null);
  const [editingProductItem, setEditingProductItem] = useState<Product | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // E-Commerce Extractor State
  const [extractorUrl, setExtractorUrl] = useState('');
  const [extractorRawText, setExtractorRawText] = useState('');
  const [extractorMarkup, setExtractorMarkup] = useState<number>(25);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedResult, setExtractedResult] = useState<Product | null>(null);
  const [extractedSourceTag, setExtractedSourceTag] = useState<string>('');
  const [activeExtractorMode, setActiveExtractorMode] = useState<'url' | 'presets' | 'raw'>('url');

  // Bulk Price Studio State
  const [bulkModifierType, setBulkModifierType] = useState<'percent' | 'fixed'>('percent');
  const [bulkModifierValue, setBulkModifierValue] = useState<number>(15);
  const [bulkModifierDirection, setBulkModifierDirection] = useState<'increase' | 'decrease'>('increase');
  const [bulkTargetCategory, setBulkTargetCategory] = useState<string>('all');

  // Media Studio State
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imageSearchKeyword, setImageSearchKeyword] = useState('smartphones');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State for creating new product
  const [newProductForm, setNewProductForm] = useState<Partial<Product>>({
    title: '',
    subtitle: '',
    brand: '',
    category: 'phones-tablets',
    subcategory: 'Flagship Smartphones',
    price: 99.99,
    originalPrice: 149.99,
    discountPercent: 33,
    stockCount: 50,
    rating: 4.9,
    reviewCount: 150,
    soldCount: 420,
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    isFlashDrop: false,
    isNovaChoice: true,
    isOfficialMall: true,
    isFreeShipping: true,
    specs: { 'Condition': 'Brand New 100% Authentic', 'Warranty': '2-Year Official Protection' },
    keyFeatures: ['Engineered with premium aerospace-grade materials.', 'Includes official Cart NOVA buyer escrow protection.'],
    tags: ['new-arrival', 'premium']
  });

  if (!isAdminOpen) return null;

  // Strict Authorization Barrier: Gated exclusively for ademusiwamicheal1@gmail.com
  if (!isAdminUser) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900/50 text-center relative animate-scale-in">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
            Restricted Admin Studio
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            This administration portal is private and restricted. Only the master store administrator (<span className="font-bold text-orange-600 dark:text-orange-400">ademusiwamicheal1@gmail.com</span>) has permission to manage inventory, scrape products, and adjust pricing.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3.5 mb-6 text-left border border-slate-200 dark:border-slate-700/60">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Current Session: <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser ? currentUser.email : 'Guest / Not Signed In'}</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              Access Role: <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser ? currentUser.role : 'unauthenticated'}</span>
            </p>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-95 transition-all cursor-pointer shadow-md"
          >
            Close Security Gate
          </button>
        </div>
      </div>
    );
  }

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock') return a.stockCount - b.stockCount;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.title.localeCompare(b.title);
  });

  // Extract from URL / Raw text / Preset
  const handleExtract = async (overrideReq?: { presetId?: string; url?: string; rawText?: string }) => {
    setIsExtracting(true);
    try {
      const res = await extractProductFromSource({
        url: overrideReq?.url || extractorUrl,
        rawText: overrideReq?.rawText || extractorRawText,
        sourcePreset: overrideReq?.presetId,
        markupPercent: extractorMarkup
      });

      if (res.success && res.product) {
        setExtractedResult(res.product);
        setExtractedSourceTag(res.source);
        showToast(`Successfully extracted product from ${res.source}!`, 'success');
      } else {
        showToast('Could not extract product details. Please check the URL or content.', 'error');
      }
    } catch (err: any) {
      showToast('Extraction error occurred. Fallback applied.', 'warning');
    } finally {
      setIsExtracting(false);
    }
  };

  // Import extracted product to catalog
  const handleConfirmImport = () => {
    if (!extractedResult) return;
    addProduct(extractedResult);
    showToast(`"${extractedResult.title.slice(0, 30)}..." imported to store catalog!`, 'success');
    setExtractedResult(null);
    setExtractorUrl('');
    setExtractorRawText('');
    setActiveTab('inventory');
  };

  // Apply Bulk Price Adjustment
  const handleApplyBulkPricing = () => {
    requestConfirmation({
      title: 'Confirm Bulk Price Adjustment',
      message: `Are you sure you want to ${bulkModifierDirection} prices by ${bulkModifierType === 'percent' ? `${bulkModifierValue}%` : `$${bulkModifierValue}`} across ${bulkTargetCategory === 'all' ? 'ALL products' : `products in "${bulkTargetCategory}"`}?`,
      confirmText: 'Apply Adjustment',
      type: 'warning',
      onConfirm: () => {
        bulkUpdatePrices({
          type: bulkModifierType,
          value: Number(bulkModifierValue),
          direction: bulkModifierDirection,
          targetCategory: bulkTargetCategory
        });
      }
    });
  };

  // Quick Inline Price Change
  const handleInlinePriceChange = (product: Product, newPriceStr: string) => {
    const newPrice = parseFloat(newPriceStr);
    if (isNaN(newPrice) || newPrice <= 0) return;
    updateProduct(product.id, { price: newPrice });
  };

  // Quick Inline Stock Change
  const handleInlineStockChange = (product: Product, newStockStr: string) => {
    const newStock = parseInt(newStockStr, 10);
    if (isNaN(newStock) || newStock < 0) return;
    updateProduct(product.id, { stockCount: newStock });
  };

  // Upload Local Image File (Base64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        if (selectedProductForMedia) {
          const updatedImages = [base64Url, ...(selectedProductForMedia.images || [])];
          updateProduct(selectedProductForMedia.id, {
            thumbnail: base64Url,
            images: updatedImages
          });
          setSelectedProductForMedia({
            ...selectedProductForMedia,
            thumbnail: base64Url,
            images: updatedImages
          });
          showToast('Image uploaded and set as primary product photo!', 'success');
        } else if (editingProductItem) {
          const updatedImages = [base64Url, ...(editingProductItem.images || [])];
          setEditingProductItem({
            ...editingProductItem,
            thumbnail: base64Url,
            images: updatedImages
          });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Export Catalog JSON
  const handleExportCatalog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cartnova_catalog_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalog exported to JSON file.', 'success');
  };

  // Import Catalog JSON Backup
  const handleImportCatalogJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          importExtractedProducts(parsed);
          showToast(`Imported ${parsed.length} products from JSON backup!`, 'success');
        } else {
          showToast('Invalid JSON catalog structure.', 'error');
        }
      } catch {
        showToast('Failed to parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Submit New Product Form
  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.title || !newProductForm.price) {
      showToast('Please fill out product title and price.', 'error');
      return;
    }

    const price = Number(newProductForm.price);
    const origPrice = Number(newProductForm.originalPrice || price * 1.3);
    const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

    const fullProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      title: newProductForm.title || 'New Marketplace Item',
      subtitle: newProductForm.subtitle || 'High performance item curated for Cart NOVA marketplace.',
      slug: `custom-${newProductForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}-${Date.now().toString(36)}`,
      brand: newProductForm.brand || 'NovaVerified',
      category: newProductForm.category || 'phones-tablets',
      subcategory: newProductForm.subcategory || 'General Gear',
      price,
      originalPrice: origPrice,
      discountPercent: discount,
      rating: Number(newProductForm.rating) || 4.9,
      reviewCount: Number(newProductForm.reviewCount) || 120,
      soldCount: Number(newProductForm.soldCount) || 350,
      stockCount: Number(newProductForm.stockCount) || 50,
      isFlashDrop: !!newProductForm.isFlashDrop,
      isNovaChoice: !!newProductForm.isNovaChoice,
      isOfficialMall: !!newProductForm.isOfficialMall,
      isFreeShipping: price > 35,
      expressDeliveryHours: 24,
      returnDays: 30,
      warranty: '2-Year Official Manufacturer Warranty',
      thumbnail: newProductForm.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      images: Array.isArray(newProductForm.images) && newProductForm.images.length > 0
        ? newProductForm.images
        : [newProductForm.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
      specs: newProductForm.specs || { 'Condition': 'Brand New Authentic' },
      keyFeatures: newProductForm.keyFeatures || ['High performance build quality.', 'NovaCare protection warranty.'],
      tags: newProductForm.tags || ['custom', 'new-arrival'],
      seller: {
        id: `seller-store-custom`,
        name: `${newProductForm.brand || 'Merchant'} Official Store`,
        rating: 4.95,
        scorePercent: 99.0,
        followers: 85000,
        badge: 'Nova Mall',
        responseRate: '100% within 2 mins',
        shipsFrom: 'Nova Express Warehouse Hub',
        isVerified: true
      },
      reviews: [
        {
          id: `rev-custom-${Date.now()}`,
          author: 'Alex Carter',
          rating: 5,
          date: 'Just now',
          comment: 'Exceptional product. High quality materials, fast delivery, and pristine packaging.',
          helpfulCount: 14,
          verifiedPurchase: true
        }
      ]
    };

    addProduct(fullProduct);
    setIsAddProductModalOpen(false);
    showToast(`Created and published "${fullProduct.title}"!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-6xl w-full my-auto shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-900 dark:bg-slate-950 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold shadow-lg shadow-orange-500/20">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-display text-white">
                  Cart NOVA Admin Studio
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  ademusiwamicheal1@gmail.com
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Master Admin Portal • Live catalog ({products.length} products), profit margins, scraper & media studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-admin-reset-catalog"
              onClick={() => {
                requestConfirmation({
                  title: 'Reset Entire Catalog?',
                  message: 'This will restore the marketplace inventory to the original default products. Any custom additions or price modifications will be reset.',
                  confirmText: 'Reset Catalog',
                  type: 'danger',
                  onConfirm: resetCatalogToDefault
                });
              }}
              title="Reset catalog to default"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              id="btn-close-admin-panel"
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
          <button
            id="tab-admin-inventory"
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-800/80 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalog & Inventory ({products.length})</span>
          </button>

          <button
            id="tab-admin-extractor"
            onClick={() => setActiveTab('extractor')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'extractor'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-800/80 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-500" />
            <span>E-Commerce Extractor</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] px-1.5 py-0.2 rounded-full font-bold border border-emerald-500/20">
              AI Scraper
            </span>
          </button>

          <button
            id="tab-admin-pricing"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-800/80 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-500" />
            <span>Price & Margin Studio</span>
          </button>

          <button
            id="tab-admin-media"
            onClick={() => setActiveTab('media')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'media'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-800/80 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-blue-500" />
            <span>Picture & Media Studio</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/50 dark:bg-slate-950/50">

          {/* ===================== TAB 1: INVENTORY & CATALOG ===================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {/* Top Controls & Search Bar */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2 w-full">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-admin-search-products"
                      type="text"
                      placeholder="Search by title, brand, SKU, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-transparent focus:border-orange-500 focus:outline-hidden"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <select
                    id="select-admin-category-filter"
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-transparent focus:border-orange-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">All Categories ({products.length})</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <select
                    id="select-admin-sort"
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-transparent focus:border-orange-500 focus:outline-hidden cursor-pointer hidden lg:block"
                  >
                    <option value="title">Sort: Title (A-Z)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="stock">Stock Level</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    id="btn-admin-add-product"
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>

                  <button
                    id="btn-admin-export-json"
                    onClick={handleExportCatalog}
                    title="Export catalog as JSON backup"
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <label
                    id="label-admin-import-json"
                    title="Import JSON catalog backup"
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportCatalogJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Product Inventory Table / Cards */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="px-4 py-3">Product & Thumbnail</th>
                        <th className="px-3 py-3">Category</th>
                        <th className="px-3 py-3">Price ($)</th>
                        <th className="px-3 py-3">MSRP / Orig ($)</th>
                        <th className="px-3 py-3">Stock (Units)</th>
                        <th className="px-3 py-3">Badges</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {filteredProducts.slice(0, 50).map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          {/* Image & Title */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                onClick={() => {
                                  setSelectedProductForMedia(product);
                                  setActiveTab('media');
                                }}
                                title="Click to edit picture in Media Studio"
                                className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 cursor-pointer group"
                              >
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                  <ImageIcon className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="min-w-0 max-w-xs">
                                <div className="font-bold text-slate-900 dark:text-white truncate">
                                  {product.title}
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                  <span className="font-semibold text-orange-600 dark:text-orange-400">{product.brand}</span>
                                  <span>•</span>
                                  <span>SKU: {product.id}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="px-3 py-3">
                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {product.category}
                            </span>
                          </td>

                          {/* Price Inline Editor */}
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 font-bold">$</span>
                              <input
                                id={`input-price-${product.id}`}
                                type="number"
                                step="0.01"
                                defaultValue={product.price}
                                onBlur={(e) => handleInlinePriceChange(product, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleInlinePriceChange(product, (e.target as HTMLInputElement).value);
                                    (e.target as HTMLInputElement).blur();
                                  }
                                }}
                                className="w-20 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                              />
                            </div>
                          </td>

                          {/* MSRP / Original Price Inline Editor */}
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 font-bold">$</span>
                              <input
                                id={`input-orig-price-${product.id}`}
                                type="number"
                                step="0.01"
                                defaultValue={product.originalPrice}
                                onBlur={(e) => {
                                  const val = parseFloat(e.target.value);
                                  if (!isNaN(val) && val >= 0) {
                                    updateProduct(product.id, { originalPrice: val });
                                  }
                                }}
                                className="w-20 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-500 dark:text-slate-400 focus:border-orange-500 focus:outline-hidden"
                              />
                            </div>
                          </td>

                          {/* Stock Count Inline Editor */}
                          <td className="px-3 py-3">
                            <input
                              id={`input-stock-${product.id}`}
                              type="number"
                              defaultValue={product.stockCount}
                              onBlur={(e) => handleInlineStockChange(product, e.target.value)}
                              className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-orange-500 focus:outline-hidden"
                            />
                          </td>

                          {/* Badges */}
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1 flex-wrap">
                              {product.isFlashDrop && (
                                <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-red-500/20">
                                  ⚡ Flash
                                </span>
                              )}
                              {product.isNovaChoice && (
                                <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-orange-500/20">
                                  Choice
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                id={`btn-preview-${product.id}`}
                                onClick={() => {
                                  setActiveProductModal(product);
                                  setIsAdminOpen(false);
                                }}
                                title="View in live store"
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                id={`btn-media-edit-${product.id}`}
                                onClick={() => {
                                  setSelectedProductForMedia(product);
                                  setActiveTab('media');
                                }}
                                title="Edit pictures & gallery"
                                className="p-1.5 rounded-lg text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>

                              <button
                                id={`btn-edit-full-${product.id}`}
                                onClick={() => setEditingProductItem(product)}
                                title="Edit full details"
                                className="p-1.5 rounded-lg text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 cursor-pointer"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                id={`btn-duplicate-${product.id}`}
                                onClick={() => {
                                  const duplicated: Product = {
                                    ...product,
                                    id: `prod-copy-${Date.now()}`,
                                    title: `${product.title} (Copy)`,
                                    slug: `${product.slug}-copy-${Date.now().toString(36)}`
                                  };
                                  addProduct(duplicated);
                                }}
                                title="Duplicate product"
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              >
                                <Copy className="w-4 h-4" />
                              </button>

                              <button
                                id={`btn-delete-${product.id}`}
                                onClick={() => {
                                  requestConfirmation({
                                    title: 'Delete Product?',
                                    message: `Are you sure you want to delete "${product.title}"? This cannot be undone.`,
                                    confirmText: 'Delete',
                                    type: 'danger',
                                    onConfirm: () => deleteProduct(product.id)
                                  });
                                }}
                                title="Delete product"
                                className="p-1.5 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length > 50 && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
                    Showing top 50 of {filteredProducts.length} matching products. Use search to narrow results.
                  </div>
                )}

                {filteredProducts.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                    <p className="font-bold text-base text-slate-700 dark:text-slate-300">No products found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================== TAB 2: E-COMMERCE EXTRACTOR ===================== */}
          {activeTab === 'extractor' && (
            <div className="space-y-6">
              {/* Extractor Subheader */}
              <div className="bg-linear-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Omni-Channel E-Commerce Scraper
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                    Extract Goods & Products from Any E-Commerce Source
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1.5 leading-relaxed">
                    Paste any product link or catalog description from Amazon, AliExpress, Shopify stores, eBay, Temu, Walmart, or Shein. Our smart extractor parses prices, pictures, reviews, specs, and calculates markup margins automatically.
                  </p>
                </div>
                <Globe className="w-48 h-48 text-white/10 absolute -right-6 -bottom-10 pointer-events-none" />
              </div>

              {/* Extraction Mode Switcher & Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form: URL / Raw input / Presets */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    
                    {/* Sub Mode Tabs */}
                    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <button
                        id="btn-extractor-mode-url"
                        onClick={() => setActiveExtractorMode('url')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          activeExtractorMode === 'url'
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        <Link className="w-3.5 h-3.5" />
                        <span>Extract from URL</span>
                      </button>

                      <button
                        id="btn-extractor-mode-presets"
                        onClick={() => setActiveExtractorMode('presets')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          activeExtractorMode === 'presets'
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Instant Presets</span>
                      </button>

                      <button
                        id="btn-extractor-mode-raw"
                        onClick={() => setActiveExtractorMode('raw')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          activeExtractorMode === 'raw'
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>Raw Text / JSON</span>
                      </button>
                    </div>

                    {/* URL Input Mode */}
                    {activeExtractorMode === 'url' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Product Page URL
                          </label>
                          <div className="relative">
                            <input
                              id="input-extractor-url"
                              type="url"
                              placeholder="e.g. https://www.amazon.com/dp/... or https://aliexpress.com/item/..."
                              value={extractorUrl}
                              onChange={(e) => setExtractorUrl(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden"
                            />
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Compatible with Amazon, AliExpress, Shopify, eBay, Temu, Walmart, Shein, Target, BestBuy, or any standard e-commerce store.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Presets Mode */}
                    {activeExtractorMode === 'presets' && (
                      <div className="space-y-2.5">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Select a Viral Preset from Popular Marketplaces:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ECOMMERCE_PRESETS.map((preset) => (
                            <button
                              key={preset.id}
                              onClick={() => handleExtract({ presetId: preset.id })}
                              className="p-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 rounded-xl text-left transition-all cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: preset.iconColor }}>
                                  {preset.source}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold group-hover:text-emerald-500 flex items-center gap-1">
                                  1-Click Extract →
                                </span>
                              </div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                                {preset.name}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                Price: ${preset.mockData.price} (MSRP: ${preset.mockData.originalPrice})
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Raw Text / JSON Mode */}
                    {activeExtractorMode === 'raw' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Paste Raw Product Text, Description, or JSON
                          </label>
                          <textarea
                            id="textarea-extractor-raw"
                            rows={4}
                            placeholder="Paste product specifications, price lines, bullet points, or JSON schema..."
                            value={extractorRawText}
                            onChange={(e) => setExtractorRawText(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden custom-scrollbar"
                          />
                        </div>
                      </div>
                    )}

                    {/* Markup / Margin Settings */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Percent className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Retail Markup Margin:</span>
                        </label>
                        <p className="text-[10px] text-slate-400">Added to source cost price upon catalog import</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {[0, 15, 25, 40, 50].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setExtractorMarkup(pct)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              extractorMarkup === pct
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            +{pct}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extract Trigger Button */}
                    {activeExtractorMode !== 'presets' && (
                      <button
                        id="btn-run-extract"
                        onClick={() => handleExtract()}
                        disabled={isExtracting || (!extractorUrl && !extractorRawText)}
                        className="w-full py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        {isExtracting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Extracting Goods & Pictures...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Extract Product from Source</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Preview Card: Extracted Result */}
                <div className="lg:col-span-5">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs h-full flex flex-col">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Extracted Product Preview
                      </h4>
                      {extractedSourceTag && (
                        <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Source: {extractedSourceTag}
                        </span>
                      )}
                    </div>

                    {extractedResult ? (
                      <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          {/* Image & Title Preview */}
                          <div className="flex items-start gap-3">
                            <img
                              src={extractedResult.thumbnail}
                              alt={extractedResult.title}
                              className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-700"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                                {extractedResult.brand} • {extractedResult.category}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5">
                                {extractedResult.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {extractedResult.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Price & Markup Breakdown */}
                          <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 text-center">
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Retail Price</div>
                              <div className="text-base font-black text-emerald-600 dark:text-emerald-400 font-display">
                                {formatPrice(extractedResult.price)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">MSRP List</div>
                              <div className="text-sm font-semibold text-slate-500 line-through">
                                {formatPrice(extractedResult.originalPrice)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Discount</div>
                              <div className="text-sm font-bold text-orange-600">
                                -{extractedResult.discountPercent}% OFF
                              </div>
                            </div>
                          </div>

                          {/* Key Specs Preview */}
                          <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1.5 text-xs">
                            <div className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">Extracted Specifications:</div>
                            {Object.entries(extractedResult.specs || {}).slice(0, 3).map(([k, v]) => (
                              <div key={k} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                                <span className="font-medium">{k}:</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{String(v)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Import Button */}
                        <button
                          id="btn-confirm-import-product"
                          onClick={handleConfirmImport}
                          className="w-full py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Import to Live Store Catalog</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                        <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
                        <p className="font-bold text-sm text-slate-600 dark:text-slate-400">No Product Extracted Yet</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs">
                          Paste a product link from Amazon, AliExpress, or Shopify, or choose one of the Instant Presets on the left to test.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ===================== TAB 3: PRICE & MARGIN STUDIO ===================== */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              
              {/* Bulk Price Adjuster Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Bulk Price Adjustment & Margin Optimizer
                    </h3>
                    <p className="text-xs text-slate-500">
                      Quickly apply global markups, seasonal discount campaigns, or margin tweaks across categories.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Direction */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Adjustment Direction
                    </label>
                    <select
                      id="select-bulk-direction"
                      value={bulkModifierDirection}
                      onChange={(e: any) => setBulkModifierDirection(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:outline-hidden"
                    >
                      <option value="increase">Increase Price (Markup +)</option>
                      <option value="decrease">Decrease Price (Discount -)</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Adjustment Type
                    </label>
                    <select
                      id="select-bulk-type"
                      value={bulkModifierType}
                      onChange={(e: any) => setBulkModifierType(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:outline-hidden"
                    >
                      <option value="percent">Percentage (%)</option>
                      <option value="fixed">Fixed Dollar Amount ($)</option>
                    </select>
                  </div>

                  {/* Value */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Modifier Value ({bulkModifierType === 'percent' ? '%' : '$'})
                    </label>
                    <input
                      id="input-bulk-value"
                      type="number"
                      min="1"
                      value={bulkModifierValue}
                      onChange={(e) => setBulkModifierValue(Number(e.target.value))}
                      className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Target Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Apply to Category
                    </label>
                    <select
                      id="select-bulk-category"
                      value={bulkTargetCategory}
                      onChange={(e) => setBulkTargetCategory(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:outline-hidden"
                    >
                      <option value="all">Entire Catalog (All {products.length} Products)</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500">
                    Preview Rule: <strong>{bulkModifierDirection === 'increase' ? 'Add' : 'Subtract'} {bulkModifierType === 'percent' ? `${bulkModifierValue}%` : `$${bulkModifierValue}`}</strong> to {bulkTargetCategory === 'all' ? 'all items' : `items in ${bulkTargetCategory}`}.
                  </div>

                  <button
                    id="btn-apply-bulk-pricing"
                    onClick={handleApplyBulkPricing}
                    className="px-6 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 cursor-pointer transition-all"
                  >
                    Apply Bulk Price Adjustment
                  </button>
                </div>
              </div>

              {/* Price Psychology & Quick Presets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Quick Retail Price Presets (.99 Formatting)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Format all current catalog prices to clean psychological price endings (.99).
                  </p>
                  <button
                    onClick={() => {
                      products.forEach(p => {
                        const base = Math.floor(p.price);
                        const cleanPrice = Number((base + 0.99).toFixed(2));
                        updateProduct(p.id, { price: cleanPrice });
                      });
                      showToast('All product prices formatted to .99 psychological endings!', 'success');
                    }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Round All Prices to $X.99
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Flash Drops Generator
                  </h4>
                  <p className="text-xs text-slate-500">
                    Enable Flash Sale 25% discount across top 10 best-selling items in the catalog.
                  </p>
                  <button
                    onClick={() => {
                      products.slice(0, 10).forEach(p => {
                        const flashPrice = Number((p.price * 0.75).toFixed(2));
                        updateProduct(p.id, {
                          isFlashDrop: true,
                          price: flashPrice,
                          originalPrice: p.price,
                          discountPercent: 25,
                          flashDropEndsInSeconds: 18400
                        });
                      });
                      showToast('Activated 25% Flash Drop prices on top 10 items!', 'success');
                    }}
                    className="px-4 py-2 bg-linear-to-r from-red-500 to-orange-500 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    ⚡ Enable 25% Flash Deals on Top 10
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 4: PICTURE & MEDIA STUDIO ===================== */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              
              {/* Product Selector for Media Editing */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Product to Manage Pictures:
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <select
                    id="select-media-product"
                    value={selectedProductForMedia?.id || products[0]?.id}
                    onChange={(e) => {
                      const found = products.find(p => p.id === e.target.value);
                      if (found) setSelectedProductForMedia(found);
                    }}
                    className="flex-1 w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:outline-hidden cursor-pointer"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.brand}) — ${p.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Product Media Editor */}
              {(() => {
                const targetProduct = selectedProductForMedia || products[0];
                if (!targetProduct) return null;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Current Pictures & Gallery */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{targetProduct.title}</h4>
                          <p className="text-xs text-slate-400">Current Gallery & Thumbnail</p>
                        </div>
                      </div>

                      {/* Primary Thumbnail Banner */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                          Primary Product Thumbnail:
                        </span>
                        <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group">
                          <img
                            src={targetProduct.thumbnail}
                            alt={targetProduct.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            Active Thumbnail
                          </div>
                        </div>
                      </div>

                      {/* Gallery Images List */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Image Gallery ({targetProduct.images?.length || 1} Photos):
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {(targetProduct.images || [targetProduct.thumbnail]).map((imgUrl, idx) => (
                            <div
                              key={idx}
                              className={`relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 group ${
                                targetProduct.thumbnail === imgUrl ? 'border-orange-500 shadow-md' : 'border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                                {targetProduct.thumbnail !== imgUrl && (
                                  <button
                                    onClick={() => {
                                      updateProduct(targetProduct.id, { thumbnail: imgUrl });
                                      setSelectedProductForMedia({ ...targetProduct, thumbnail: imgUrl });
                                      showToast('Set as main thumbnail!', 'success');
                                    }}
                                    className="px-2 py-1 bg-orange-500 text-white rounded-md text-[10px] font-bold cursor-pointer hover:bg-orange-600"
                                  >
                                    Set Main
                                  </button>
                                )}
                                {(targetProduct.images?.length || 0) > 1 && (
                                  <button
                                    onClick={() => {
                                      const updatedImgs = targetProduct.images.filter((_, i) => i !== idx);
                                      updateProduct(targetProduct.id, { images: updatedImgs });
                                      setSelectedProductForMedia({ ...targetProduct, images: updatedImgs });
                                      showToast('Image removed from gallery.', 'info');
                                    }}
                                    className="p-1 bg-red-500 text-white rounded-md text-[10px] cursor-pointer hover:bg-red-600"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Add New Pictures & HD Library */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Add New Product Pictures
                      </h4>

                      {/* Add Image by Direct URL */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Add by Image URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="input-new-image-url"
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:outline-hidden"
                          />
                          <button
                            onClick={() => {
                              if (!newImageUrl.trim()) return;
                              const updatedImgs = [...(targetProduct.images || []), newImageUrl.trim()];
                              updateProduct(targetProduct.id, { images: updatedImgs });
                              setSelectedProductForMedia({ ...targetProduct, images: updatedImgs });
                              setNewImageUrl('');
                              showToast('Image added to gallery!', 'success');
                            }}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Upload from Local Device */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Upload Local Image File
                        </label>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Choose File or Drag & Drop (PNG, JPG, WebP)</span>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Unsplash Curated Product Photos Instant Picker */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            HD Product Photos Library
                          </label>
                          <select
                            value={imageSearchKeyword}
                            onChange={(e) => setImageSearchKeyword(e.target.value)}
                            className="text-xs py-1 px-2 bg-slate-100 dark:bg-slate-800 rounded-lg border-none text-slate-700 dark:text-slate-300"
                          >
                            <option value="smartphones">Smartphones</option>
                            <option value="audio">Audio & Headphones</option>
                            <option value="gaming">Gaming & Keyboards</option>
                            <option value="kitchen">Kitchen & Home</option>
                            <option value="fashion">Fashion & Apparel</option>
                            <option value="beauty">Beauty & Cosmetics</option>
                            <option value="outdoors">Solar & Outdoors</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {(CURATED_PRODUCT_IMAGES[imageSearchKeyword] || []).map((imgUrl, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                updateProduct(targetProduct.id, {
                                  thumbnail: imgUrl,
                                  images: [imgUrl, ...(targetProduct.images || [])]
                                });
                                setSelectedProductForMedia({
                                  ...targetProduct,
                                  thumbnail: imgUrl,
                                  images: [imgUrl, ...(targetProduct.images || [])]
                                });
                                showToast('Applied HD photo to product!', 'success');
                              }}
                              className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer group hover:border-blue-500"
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                                Click to Apply
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      </div>

      {/* ===================== MODAL: ADD NEW PRODUCT ===================== */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold font-display">Add New Product to Store</h3>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProduct} className="p-6 overflow-y-auto custom-scrollbar space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ApexPro Noise-Cancelling ANC Wireless Headphones"
                    value={newProductForm.title}
                    onChange={(e) => setNewProductForm({ ...newProductForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ApexAudio"
                    value={newProductForm.brand}
                    onChange={(e) => setNewProductForm({ ...newProductForm, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Selling Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    MSRP / Original Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProductForm.originalPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, originalPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProductForm.stockCount}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stockCount: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProductForm.thumbnail}
                    onChange={(e) => setNewProductForm({
                      ...newProductForm,
                      thumbnail: e.target.value,
                      images: [e.target.value]
                    })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: EDIT PRODUCT FULL DETAILS ===================== */}
      {editingProductItem && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-display">Edit Product Details & Pricing</h3>
              </div>
              <button
                onClick={() => setEditingProductItem(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingProductItem.title}
                    onChange={(e) => setEditingProductItem({ ...editingProductItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProductItem.price}
                    onChange={(e) => setEditingProductItem({ ...editingProductItem, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProductItem.originalPrice}
                    onChange={(e) => setEditingProductItem({ ...editingProductItem, originalPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={editingProductItem.stockCount}
                    onChange={(e) => setEditingProductItem({ ...editingProductItem, stockCount: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    value={editingProductItem.thumbnail}
                    onChange={(e) => setEditingProductItem({ ...editingProductItem, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProductItem(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateProduct(editingProductItem.id, editingProductItem);
                    setEditingProductItem(null);
                  }}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
