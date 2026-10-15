import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductManagerModal } from './components/ProductManagerModal';
import { LanguageSelectModal } from './components/LanguageSelectModal';
import { AffiliatePage } from './components/AffiliatePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { BottomMobileBar } from './components/BottomMobileBar';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Product, CartItem, PageTab, ProductCategory, SOCIAL_LINKS, Language } from './types/store';
import { TRANSLATIONS } from './utils/translations';
import { Search, ShoppingBag, ExternalLink, ArrowRight } from 'lucide-react';

export default function App() {
  // Language state (persisted)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('rafiquebeli_lang') as Language;
      if (savedLang === 'en' || savedLang === 'ms') return savedLang;
    } catch {
      // fallback
    }
    return 'ms';
  });

  // Language selection modal state: opens on first visit!
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(() => {
    try {
      const prompted = localStorage.getItem('rafiquebeli_lang_prompted');
      return !prompted;
    } catch {
      return true;
    }
  });

  const t = TRANSLATIONS[lang];

  // Products state (persisted with catalog version key)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('rafiquebeli_products_v5_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state (persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rafiquebeli_cart_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rafiquebeli_products_v5_catalog', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rafiquebeli_cart_v4', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Handle user language selection
  const handleSelectLanguage = (selectedLang: Language) => {
    setLang(selectedLang);
    try {
      localStorage.setItem('rafiquebeli_lang', selectedLang);
      localStorage.setItem('rafiquebeli_lang_prompted', 'true');
    } catch {
      // ignore
    }
  };

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'ms' ? 'en' : 'ms';
    handleSelectLanguage(nextLang);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Handlers supporting variant distinction
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    const chosenVariant =
      variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === chosenVariant
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { product, quantity, selectedVariant: chosenVariant }];
    });

    const prodName = lang === 'en' && product.nameEn ? product.nameEn : product.name;
    const variantLabel = chosenVariant ? ` (${chosenVariant})` : '';
    showToast(
      lang === 'en'
        ? `"${prodName}${variantLabel}" added to cart!`
        : `"${prodName}${variantLabel}" ditambah ke troli!`
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, variant);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedVariant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, variant?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedVariant === variant)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Product Manager Handlers
  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProd,
      id: `custom-${Date.now()}`,
    };
    setProducts((prev) => [created, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleResetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.setItem('rafiquebeli_products_v5_catalog', JSON.stringify(INITIAL_PRODUCTS));
    } catch {
      // ignore
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' || prod.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      prod.name.toLowerCase().includes(q) ||
      (prod.nameEn && prod.nameEn.toLowerCase().includes(q)) ||
      prod.description.toLowerCase().includes(q) ||
      (prod.descriptionEn && prod.descriptionEn.toLowerCase().includes(q)) ||
      prod.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoriesList: ('All' | ProductCategory)[] = [
    'All',
    'KAYMAIRA F&B',
    'KAYMAIRA BEAUTY',
    'TVETMARA',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-800 font-sans">
      {/* First-time Visitor Language Selection Curtain/Modal */}
      <LanguageSelectModal
        isOpen={isLangModalOpen}
        currentLang={lang}
        onSelectLanguage={handleSelectLanguage}
        onClose={() => setIsLangModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top duration-200">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-amber-400 hover:text-amber-300 underline cursor-pointer"
          >
            {t.cart}
          </button>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'products') {
            setSelectedCategory('All');
          }
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenManager={() => setIsManagerOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenLangModal={() => setIsLangModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {currentTab === 'home' && (
          <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <HeroSection
              lang={lang}
              onShopNow={() => {
                setCurrentTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Category Focus Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    {t.exploreCategory}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {t.exploreCategoryTitle}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentTab('products');
                  }}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
                >
                  <span>{t.viewAllProducts} ({products.length})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. KAYMAIRA F&B */}
                <div
                  onClick={() => {
                    setSelectedCategory('KAYMAIRA F&B');
                    setCurrentTab('products');
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-amber-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-amber-50">
                    <img
                      src="/src/assets/images/regenerated_image_1792072392831.jpg"
                      alt="KAYMAIRA Daging Dendeng"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider">
                      {t.fbTag}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      KAYMAIRA F&B
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.fbSub}
                    </p>
                    <div className="pt-2 text-xs font-bold text-amber-700 flex items-center gap-1">
                      <span>{t.fbCta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 2. KAYMAIRA BEAUTY */}
                <div
                  onClick={() => {
                    setSelectedCategory('KAYMAIRA BEAUTY');
                    setCurrentTab('products');
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-sky-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-sky-50">
                    <img
                      src="/src/assets/images/kaymaira_lipmatte_variants_1792071237207.jpg"
                      alt="KAYMAIRA BEAUTY"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-sky-500 text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider">
                      {t.beautyTag}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      KAYMAIRA BEAUTY
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.beautySub}
                    </p>
                    <div className="pt-2 text-xs font-bold text-sky-700 flex items-center gap-1">
                      <span>{t.beautyCta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 3. TVETMARA */}
                <div
                  onClick={() => {
                    setSelectedCategory('TVETMARA');
                    setCurrentTab('products');
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-50">
                    <img
                      src="/src/assets/images/raban_nature_artisan_soap_1792071237664.jpg"
                      alt="TVETMARA"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-800 text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider">
                      {t.tvetTag}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                      TVETMARA
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.tvetSub}
                    </p>
                    <div className="pt-2 text-xs font-bold text-slate-800 flex items-center gap-1">
                      <span>{t.tvetCta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Curated Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    {t.mainCollectionTag}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {t.mainCollectionTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {t.mainCollectionSub}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={SOCIAL_LINKS.whatsappCatalogue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{t.fullWaCatalog}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p, v) => handleAddToCart(p, 1, v)}
                    onViewProduct={(p) => setViewingProduct(p)}
                    lang={lang}
                  />
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm rounded-2xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.viewAllProducts} ({products.length})</span>
                </button>
              </div>
            </section>

            {/* Quick Affiliate Linktree Teaser Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-sky-300 border border-amber-200 shadow-lg text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                    {t.affiliateTeaserTag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black">
                    {t.affiliateTeaserTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800/80 max-w-xl">
                    {t.affiliateTeaserSub}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={SOCIAL_LINKS.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>{t.openLinktree}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setCurrentTab('affiliate');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 bg-white/80 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    {t.affiliatePageBtn}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PRODUCTS PAGE */}
        {currentTab === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-amber-100">
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                  {t.catalogTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                  {t.catalogSub}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <button
                  onClick={() => setIsManagerOpen(true)}
                  className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {t.manageProductsBtn}
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {categoriesList.map((category) => {
                  const isActive = selectedCategory === category;
                  const label = category === 'All' ? t.allProductsTab : category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-slate-900 shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px] md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-amber-400 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-amber-100 p-8 space-y-4">
                <div className="text-4xl">🔍</div>
                <h3 className="text-base font-bold text-slate-800">{t.noProductsFound}</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t.noProductsSub}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {t.resetFilterBtn}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p, v) => handleAddToCart(p, 1, v)}
                    onViewProduct={(p) => setViewingProduct(p)}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: AFFILIATE & SOCIAL LINKS PAGE */}
        {currentTab === 'affiliate' && <AffiliatePage lang={lang} />}

        {/* VIEW 4: ABOUT US PAGE */}
        {currentTab === 'about' && (
          <AboutPage
            lang={lang}
            onNavigateToProducts={() => {
              setCurrentTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: CONTACT PAGE */}
        {currentTab === 'contact' && <ContactPage lang={lang} />}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Product Manager Modal (Admin / Owner) */}
      <ProductManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetDefault={handleResetDefaultProducts}
      />

      {/* Mobile Bottom Quick Bar */}
      <BottomMobileBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenManager={() => setIsManagerOpen(true)}
        lang={lang}
      />
    </div>
  );
}
