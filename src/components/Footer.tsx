import React from 'react';
import { ExternalLink, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { PageTab, SOCIAL_LINKS, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenManager: () => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenManager, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-white border-t border-amber-100/90 pt-12 pb-24 md:pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showSlogan={true} />
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'rafiquebeli — Curated premier products for smart and happy shoppers. Featuring authentic KAYMAIRA F&B delicacies, KAYMAIRA BEAUTY botanical skincare, and TVETMARA artisan craft with direct WhatsApp Business ordering.'
                : 'rafiquebeli — Platform kurasi produk pilihan terbaik untuk rakyat Malaysia. Membawakan hidangan lazat KAYMAIRA F&B, siri kecantikan KAYMAIRA BEAUTY, dan kraf kemahiran TVETMARA dengan pesanan pantas terus ke WhatsApp Business.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition-colors text-sm font-bold"
                title="Instagram @rafiquebeli"
              >
                IG
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
                title="TikTok @rafiquebeli"
              >
                TT
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors text-sm font-bold"
                title="Facebook rafiquebeli"
              >
                FB
              </a>
              <a
                href={SOCIAL_LINKS.whatsappChat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 flex items-center justify-center transition-colors text-sm font-bold"
                title="WhatsApp 011 2923 2843"
              >
                WA
              </a>
              <a
                href={SOCIAL_LINKS.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-200 hover:text-emerald-800 flex items-center justify-center transition-colors text-sm font-bold"
                title="Linktree rafiquedan"
              >
                LT
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {lang === 'en' ? 'Quick Navigation' : 'Halaman Kedai'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('products')}
                  className="hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {t.navProducts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('affiliate')}
                  className="hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {t.navAffiliate}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Business & Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {lang === 'en' ? 'Customer Support' : 'Khidmat Pelanggan'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-800">WhatsApp Business:</div>
              <a
                href={SOCIAL_LINKS.whatsappChat}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-mono font-bold hover:underline block"
              >
                {SOCIAL_LINKS.whatsappPhoneDisplay}
              </a>
              <a
                href={SOCIAL_LINKS.whatsappCatalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 underline block"
              >
                {lang === 'en' ? 'Official WhatsApp Catalogue' : 'Katalog WhatsApp Rasmi'}
              </a>
              <div className="pt-1">
                <span className="text-slate-400">{lang === 'en' ? 'Email:' : 'E-mel:'}</span>
                <span className="block text-slate-700 font-medium">{SOCIAL_LINKS.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Admin Link */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>rafiquebeli</strong>. {lang === 'en' ? 'All Rights Reserved.' : 'Hak Cipta Terpelihara.'}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenManager}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Panel Pengurusan Katalog Produk"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.adminCatalog}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
