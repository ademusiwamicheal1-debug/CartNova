import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PUBLIC_SHOPPING_APIS, ShoppingApi } from '../data/shoppingApis';
import {
  X,
  Globe,
  Code2,
  Send,
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Layers,
  Zap,
  Search,
  ShieldCheck,
  Clock,
  Database,
  ArrowRight,
  RefreshCw,
  Terminal,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShoppingApisModal: React.FC = () => {
  const {
    isShoppingApisModalOpen,
    setIsShoppingApisModalOpen,
    activeApiForTester,
    setActiveApiForTester,
    apiSource,
    setApiSource,
    showToast
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAuth, setSelectedAuth] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'directory' | 'console'>('directory');

  // Interactive Console State
  const [selectedApiId, setSelectedApiId] = useState<string>(activeApiForTester || 'dummyjson');
  const [selectedEndpointUrl, setSelectedEndpointUrl] = useState<string>('https://dummyjson.com/products?limit=10');
  const [httpMethod, setHttpMethod] = useState<'GET' | 'POST'>('GET');
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseStatusText, setResponseStatusText] = useState<string>('');
  const [responseLatency, setResponseLatency] = useState<number | null>(null);
  const [responseSize, setResponseSize] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [codeLanguage, setCodeLanguage] = useState<'fetch' | 'axios' | 'curl' | 'python'>('fetch');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isShoppingApisModalOpen) return null;

  const currentApi = PUBLIC_SHOPPING_APIS.find(a => a.id === selectedApiId) || PUBLIC_SHOPPING_APIS[0];

  // Filter APIs
  const filteredApis = PUBLIC_SHOPPING_APIS.filter(api => {
    if (selectedCategory !== 'all' && api.category !== selectedCategory) return false;
    if (selectedAuth !== 'all' && api.auth !== selectedAuth) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = api.name.toLowerCase().includes(q);
      const matchesDesc = api.description.toLowerCase().includes(q);
      const matchesTags = api.tags.some(t => t.toLowerCase().includes(q));
      if (!matchesName && !matchesDesc && !matchesTags) return false;
    }
    return true;
  });

  const handleSelectApiForTesting = (api: ShoppingApi, endpointUrl?: string) => {
    setSelectedApiId(api.id);
    setActiveApiForTester(api.id);
    const ep = endpointUrl || api.sampleEndpoints[0]?.path || api.baseUrl;
    setSelectedEndpointUrl(ep);
    setActiveTab('console');
  };

  const handleExecuteRequest = async () => {
    if (!selectedEndpointUrl) return;
    setIsLoadingRequest(true);
    setResponseStatus(null);
    setResponseData(null);
    const startTime = performance.now();

    try {
      const res = await fetch(selectedEndpointUrl, {
        method: httpMethod,
        headers: { 'Accept': 'application/json' }
      });
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      setResponseLatency(latency);
      setResponseStatus(res.status);
      setResponseStatusText(res.statusText || (res.ok ? 'OK' : 'Error'));

      const data = await res.json();
      setResponseData(data);
      const jsonStr = JSON.stringify(data);
      const bytes = new Blob([jsonStr]).size;
      setResponseSize(bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`);
      showToast(`Request complete: ${res.status} ${res.statusText || 'OK'} in ${latency}ms`, 'success');
    } catch (err: any) {
      const endTime = performance.now();
      setResponseLatency(Math.round(endTime - startTime));
      setResponseStatus(0);
      setResponseStatusText('Network / CORS Restriction');
      setResponseData({
        error: true,
        message: err?.message || 'Failed to fetch. Check CORS policy or endpoint URL.',
        tip: 'Some production APIs require server-side proxies or authorized API keys.'
      });
      showToast(`API Fetch notice: ${err?.message || 'CORS / Network restriction'}`, 'warning');
    } finally {
      setIsLoadingRequest(false);
    }
  };

  const generateCodeSnippet = () => {
    const url = selectedEndpointUrl || 'https://dummyjson.com/products';
    if (codeLanguage === 'fetch') {
      return `// JavaScript fetch()\nfetch('${url}', {\n  method: '${httpMethod}',\n  headers: { 'Content-Type': 'application/json' }\n})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
    }
    if (codeLanguage === 'axios') {
      return `// Axios client\nimport axios from 'axios';\n\nconst response = await axios.${httpMethod.toLowerCase()}('${url}');\nconsole.log(response.data);`;
    }
    if (codeLanguage === 'curl') {
      return `# cURL Request\ncurl -X ${httpMethod} "${url}" \\\n  -H "Accept: application/json"`;
    }
    if (codeLanguage === 'python') {
      return `# Python requests\nimport requests\n\nresponse = requests.${httpMethod.toLowerCase()}("${url}")\ndata = response.json()\nprint(data)`;
    }
    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(generateCodeSnippet());
    setCopiedCode(true);
    showToast('Code snippet copied to clipboard!', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyJson = () => {
    if (!responseData) return;
    navigator.clipboard?.writeText?.(JSON.stringify(responseData, null, 2));
    setCopiedJson(true);
    showToast('JSON payload copied to clipboard!', 'info');
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-6xl w-full my-auto shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden relative flex flex-col max-h-[94vh] text-slate-900 dark:text-white"
      >
        {/* Modal Top Header */}
        <div className="px-5 sm:px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950 dark:text-white">
                  PUBLIC SHOPPING APIS DIRECTORY & CONSOLE
                </h2>
                <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  publicapis.io/category/shopping
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore, test live endpoints, and sync verified e-commerce APIs directly into Cart NOVA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://publicapis.io/category/shopping"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
            >
              <span>publicapis.io</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              id="btn-close-apis-modal"
              onClick={() => setIsShoppingApisModalOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'directory'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Shopping APIs Directory ({PUBLIC_SHOPPING_APIS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('console')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'console'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Live Request Sandbox & JSON Inspector</span>
            </button>
          </div>

          {/* Quick Active Catalog Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Active Store Feed:</span>
            <span className="bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-black px-2.5 py-0.5 rounded-lg border border-orange-200 dark:border-orange-800">
              {apiSource === 'curated' ? 'Cart NOVA Prime' : apiSource.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Tab 1: APIs Directory */}
        {activeTab === 'directory' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 space-y-6">
            {/* Search & Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shopping APIs by title, tag, category..."
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="General E-Commerce">General E-Commerce</option>
                  <option value="Electronics & Hardware">Electronics & Hardware</option>
                  <option value="Marketplaces">Marketplaces</option>
                  <option value="Groceries & Nutrition">Groceries & Nutrition</option>
                  <option value="Headless Commerce">Headless Commerce</option>
                  <option value="Price Intelligence">Price Intelligence</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <select
                  value={selectedAuth}
                  onChange={(e) => setSelectedAuth(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                >
                  <option value="all">All Auth Types</option>
                  <option value="No Auth (Open)">No Auth (Open Access)</option>
                  <option value="API Key">API Key Required</option>
                  <option value="OAuth 2.0">OAuth 2.0</option>
                </select>
              </div>
            </div>

            {/* Quick 1-Click Sync Spotlight Banner */}
            <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-5 sm:p-6 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black shadow-md">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black font-display text-white">
                      Live Catalog Switcher & Public API Feeds
                    </h3>
                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                      LIVE SYNC
                    </span>
                  </div>
                  <p className="text-xs text-blue-200">
                    Switch Cart NOVA's entire product engine to live feeds from DummyJSON, FakeStoreAPI, or Platzi FakeStore in one click.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setApiSource('dummyjson');
                    setIsShoppingApisModalOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Sync DummyJSON (50 Items)
                </button>
                <button
                  onClick={() => {
                    setApiSource('fakestore');
                    setIsShoppingApisModalOpen(false);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Sync FakeStoreAPI
                </button>
                <button
                  onClick={() => {
                    setApiSource('blended');
                    setIsShoppingApisModalOpen(false);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  All-API Blended Feed
                </button>
              </div>
            </div>

            {/* APIs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredApis.map(api => {
                const isSyncable = ['dummyjson', 'fakestore', 'platzi'].includes(api.id);

                return (
                  <div
                    key={api.id}
                    className="bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {api.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                              api.auth.includes('No Auth')
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            }`}
                          >
                            {api.auth}
                          </span>
                          {api.https && (
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                              HTTPS
                            </span>
                          )}
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                            CORS: {api.cors}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-black text-slate-900 dark:text-white font-display mb-1.5">
                        {api.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {api.description}
                      </p>

                      {/* Sample Endpoints Quick list */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sample Endpoints:</div>
                        {api.sampleEndpoints.slice(0, 2).map((ep, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectApiForTesting(api, ep.path)}
                            className="bg-slate-50 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs cursor-pointer group transition-colors"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.5 rounded">
                                {ep.method}
                              </span>
                              <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                                {ep.path}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                              Test &rarr;
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {api.tags.map(t => (
                          <span key={t} className="bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded-md">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                      <button
                        onClick={() => handleSelectApiForTesting(api)}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Terminal className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
                        <span>Interactive Sandbox</span>
                      </button>

                      {isSyncable && (
                        <button
                          onClick={() => {
                            setApiSource(api.id as any);
                            setIsShoppingApisModalOpen(false);
                          }}
                          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Sync Store</span>
                        </button>
                      )}

                      <a
                        href={api.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title="View Official API Documentation"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Live Request Sandbox & JSON Inspector */}
        {activeTab === 'console' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 space-y-6">
            {/* Top API Preset Selector */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase">Target Shopping API</label>
                  <select
                    value={selectedApiId}
                    onChange={(e) => {
                      const api = PUBLIC_SHOPPING_APIS.find(a => a.id === e.target.value);
                      if (api) {
                        setSelectedApiId(api.id);
                        setSelectedEndpointUrl(api.sampleEndpoints[0]?.path || api.baseUrl);
                      }
                    }}
                    className="bg-transparent font-bold text-sm text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    {PUBLIC_SHOPPING_APIS.map(a => (
                      <option key={a.id} value={a.id} className="dark:bg-slate-900">
                        {a.name} ({a.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Endpoint Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 mr-1">Presets:</span>
                {currentApi.sampleEndpoints.map((ep, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedEndpointUrl(ep.path);
                      setHttpMethod(ep.method);
                    }}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-xl border transition-colors cursor-pointer ${
                      selectedEndpointUrl === ep.path
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {ep.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Bar */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex items-center rounded-2xl border-2 border-blue-500 bg-white dark:bg-slate-800 flex-1 overflow-hidden shadow-xs">
                <span className="px-3.5 py-2.5 text-xs font-black font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-r border-slate-200 dark:border-slate-700">
                  {httpMethod}
                </span>
                <input
                  type="text"
                  value={selectedEndpointUrl}
                  onChange={(e) => setSelectedEndpointUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white bg-transparent outline-none"
                />
              </div>

              <button
                id="btn-execute-api-request"
                onClick={handleExecuteRequest}
                disabled={isLoadingRequest}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
              >
                {isLoadingRequest ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isLoadingRequest ? 'Executing Request...' : 'Send Live Request'}</span>
              </button>
            </div>

            {/* Response Console & Code Snippets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 cols: Response Inspector */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Response Payload</span>
                    {responseStatus !== null && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                          responseStatus >= 200 && responseStatus < 300
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                            : 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {responseStatus} {responseStatusText}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    {responseLatency !== null && (
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-blue-500" />
                        {responseLatency} ms
                      </span>
                    )}
                    {responseSize && (
                      <span className="flex items-center gap-1 font-mono">
                        <Database className="w-3 h-3 text-purple-500" />
                        {responseSize}
                      </span>
                    )}
                    {responseData && (
                      <button
                        onClick={handleCopyJson}
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors cursor-pointer"
                      >
                        {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950 text-slate-200 rounded-3xl p-4 font-mono text-xs max-h-[380px] overflow-y-auto custom-scrollbar border border-slate-800 shadow-inner">
                  {isLoadingRequest ? (
                    <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                      <span>Sending request to {selectedEndpointUrl}...</span>
                    </div>
                  ) : responseData ? (
                    <pre className="whitespace-pre-wrap text-[11px] leading-relaxed">
                      {JSON.stringify(responseData, null, 2)}
                    </pre>
                  ) : (
                    <div className="py-16 text-center text-slate-500">
                      Click <strong className="text-blue-400">"Send Live Request"</strong> to query this shopping API endpoint.
                    </div>
                  )}
                </div>
              </div>

              {/* Right 5 cols: Code Generator & Quick Actions */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-blue-500" />
                      Code Snippet
                    </span>

                    <button
                      onClick={handleCopyCode}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied Snippet' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-900/80 p-1 rounded-xl text-xs font-bold">
                    {(['fetch', 'axios', 'curl', 'python'] as const).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setCodeLanguage(lang)}
                        className={`flex-1 py-1 rounded-lg uppercase text-[10px] transition-colors cursor-pointer ${
                          codeLanguage === lang
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  {/* Generated Code Area */}
                  <pre className="bg-slate-950 text-emerald-400 p-3.5 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800">
                    {generateCodeSnippet()}
                  </pre>

                  {/* 1-Click Sync to Store Button */}
                  {['dummyjson', 'fakestore', 'platzi'].includes(currentApi.id) && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setApiSource(currentApi.id as any);
                          setIsShoppingApisModalOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Populate Cart NOVA Store with {currentApi.name}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
