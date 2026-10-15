import React from 'react';
import { ArrowRight, ShoppingBag, ExternalLink, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS, ProductCategory, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface HeroSectionProps {
  onShopNow: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onSelectCategory,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-[#FFFDF7] to-amber-50/30 pt-8 pb-14 border-b border-amber-100">
      {/* Subtle background glow circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Friendly Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200 shadow-xs text-xs font-bold text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] text-balance">
              {t.heroHeadline1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-sky-500">
                {t.heroHeadline2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onShopNow}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-slate-900" />
                <span>{t.shopNow}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href={SOCIAL_LINKS.whatsappCatalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <span>{t.waCatalogueBtn}</span>
                <ExternalLink className="w-4 h-4 text-emerald-600" />
              </a>

              <a
                href={SOCIAL_LINKS.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-amber-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>{t.affiliateLinktreeBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Trust Markers Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-100/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <div className="font-bold text-slate-800">{t.fastShipping}</div>
                  <div className="text-slate-500">{t.fastShippingSub}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <div className="font-bold text-slate-800">{t.authentic}</div>
                  <div className="text-slate-500">{t.authenticSub}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <div className="font-bold text-slate-800">{t.friendlyService}</div>
                  <div className="text-slate-500">{t.friendlyServiceSub}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-200/50 bg-white">
              <img
                src="/src/assets/images/regenerated_image_1792072389497.png"
                alt="rafiquebeli curated store showcase"
                className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between text-xs font-medium text-amber-200 mb-1">
                  <span>{t.threeCategories}</span>
                  <span>WhatsApp 011 2923 2843</span>
                </div>
                <h3 className="text-lg font-bold text-white drop-shadow-sm">
                  KAYMAIRA F&B • BEAUTY • TVETMARA
                </h3>
                <p className="text-xs text-white/90 line-clamp-2 mt-0.5">
                  {t.heroImageSub}
                </p>
              </div>
            </div>

            {/* Floating Category Quick Chips */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
              <button
                onClick={() => onSelectCategory('KAYMAIRA F&B')}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
              >
                🍲 KAYMAIRA F&B
              </button>
              <button
                onClick={() => onSelectCategory('KAYMAIRA BEAUTY')}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-sky-900 hover:bg-sky-100 transition-colors shadow-xs cursor-pointer"
              >
                ✨ KAYMAIRA BEAUTY
              </button>
              <button
                onClick={() => onSelectCategory('TVETMARA')}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
              >
                🛠️ TVETMARA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
