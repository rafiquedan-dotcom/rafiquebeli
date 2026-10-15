import React from 'react';
import { ShoppingBag, MessageCircle, Home, Sparkles, Grid } from 'lucide-react';
import { PageTab, SOCIAL_LINKS, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface BottomMobileBarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  lang: Language;
}

export const BottomMobileBar: React.FC<BottomMobileBarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-amber-200/80 shadow-lg px-2 py-1.5 flex items-center justify-around h-15">
      {/* Home */}
      <button
        onClick={() => {
          onSelectTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'home' ? 'text-amber-700 font-bold' : 'text-slate-500'
        }`}
      >
        <Home className="w-4 h-4" />
        <span className="text-[10px] mt-0.5">{t.navHome}</span>
      </button>

      {/* Products Catalog */}
      <button
        onClick={() => {
          onSelectTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'products' ? 'text-amber-700 font-bold' : 'text-slate-500'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span className="text-[10px] mt-0.5">{lang === 'en' ? 'Products' : 'Produk'}</span>
      </button>

      {/* Cart Center Floating Button */}
      <button
        onClick={onOpenCart}
        className="relative -top-2 flex flex-col items-center justify-center p-3 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 bg-rose-600 text-white text-[10px] font-black rounded-full shadow-xs">
            {cartCount}
          </span>
        )}
      </button>

      {/* Affiliate */}
      <button
        onClick={() => {
          onSelectTab('affiliate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'affiliate' ? 'text-amber-700 font-bold' : 'text-slate-500'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-[10px] mt-0.5">Affiliate</span>
      </button>

      {/* WhatsApp Chat */}
      <a
        href={SOCIAL_LINKS.whatsappChat}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-1 px-3 text-emerald-600 font-medium rounded-xl transition-colors"
        title="Chat WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-emerald-600" />
        <span className="text-[10px] mt-0.5">WhatsApp</span>
      </a>
    </div>
  );
};
