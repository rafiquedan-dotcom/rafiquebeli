import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, ExternalLink, Sparkles, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { PageTab, SOCIAL_LINKS, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenManager: () => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenLangModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenManager,
  lang,
  onToggleLang,
  onOpenLangModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'products', label: t.navProducts },
    { id: 'affiliate', label: t.navAffiliate },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-amber-100 shadow-xs transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>{t.announcement}</span>
        <a
          href={SOCIAL_LINKS.whatsappCatalogue}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/70 hover:decoration-white font-bold inline-flex items-center gap-1 ml-1 text-white"
        >
          {t.viewCatalogue} <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-18">
          {/* Zone 1: Single element Brand wordmark with Mascot */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus-visible:outline-2 focus-visible:outline-amber-500 rounded-lg group cursor-pointer"
            aria-label="rafiquebeli laman utama"
          >
            <Logo size="md" showSlogan={true} />
          </button>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                    isActive
                      ? 'text-amber-600 font-bold'
                      : 'hover:text-slate-900 text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Language switcher, WhatsApp, Cart) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher Pill Button */}
            <button
              onClick={onOpenLangModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl transition-all shadow-2xs cursor-pointer"
              title={t.switchLangTooltip}
              aria-label="Pilih bahasa / Select language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-extrabold uppercase tracking-wider">
                {lang === 'ms' ? '🇲🇾 BM' : '🇬🇧 EN'}
              </span>
            </button>

            {/* WhatsApp Chat link */}
            <a
              href={SOCIAL_LINKS.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all shadow-xs"
              title="Chat WhatsApp 011 2923 2843"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span className="whitespace-nowrap">011 2923 2843</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-800 bg-amber-400 hover:bg-amber-500 active:scale-95 rounded-xl transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-amber-600 cursor-pointer"
              aria-label={`Buka troli belian, ${cartCount} barangan`}
            >
              <ShoppingBag className="w-4 h-4 text-slate-900" />
              <span className="hidden xs:inline text-xs font-extrabold uppercase tracking-wide">{t.cart}</span>
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-black text-amber-950 bg-white rounded-full tabular-nums shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-amber-100/60 transition-colors focus-visible:outline-2 focus-visible:outline-amber-500 cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-100 bg-[#FFFDF7] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-600" /> Bahasa / Language:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (lang !== 'ms') onToggleLang();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                  lang === 'ms'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                🇲🇾 BM
              </button>
              <button
                onClick={() => {
                  if (lang !== 'en') onToggleLang();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                  lang === 'en'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>

          <div className="grid gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-amber-100/80 flex flex-col gap-2">
            <a
              href={SOCIAL_LINKS.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Kami (011 2923 2843)
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManager();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 text-center py-1.5 transition-colors cursor-pointer"
            >
              {t.adminCatalog}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
