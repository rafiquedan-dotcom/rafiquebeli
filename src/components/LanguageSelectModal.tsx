import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types/store';
import { Check, Globe, Sparkles } from 'lucide-react';

interface LanguageSelectModalProps {
  isOpen: boolean;
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isOpen,
  currentLang,
  onSelectLanguage,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-[#FFFDF7] rounded-3xl shadow-2xl border-2 border-amber-300 p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Logo Emblem */}
        <div className="flex justify-center pt-2">
          <Logo size="lg" showSlogan={true} />
        </div>

        {/* Friendly Greetings */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Pilih Bahasa / Select Language</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            Selamat Datang! / Welcome!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
            Sila pilih bahasa pilihan anda sebelum memasuki kedai rasmi rafiquebeli.
            <br />
            <span className="text-slate-400 text-xs">
              (Please select your preferred language)
            </span>
          </p>
        </div>

        {/* Language Selection Buttons */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {/* Bahasa Melayu Option */}
          <button
            type="button"
            onClick={() => {
              onSelectLanguage('ms');
              onClose();
            }}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
              currentLang === 'ms'
                ? 'border-amber-500 bg-amber-50/80 shadow-sm'
                : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/40'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <span className="text-3xl shrink-0">🇲🇾</span>
              <div>
                <div className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                  Bahasa Melayu
                </div>
                <div className="text-[11px] text-slate-500">
                  Katalog & Pesanan dalam Bahasa Malaysia
                </div>
              </div>
            </div>

            {currentLang === 'ms' && (
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </button>

          {/* English Option */}
          <button
            type="button"
            onClick={() => {
              onSelectLanguage('en');
              onClose();
            }}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
              currentLang === 'en'
                ? 'border-sky-500 bg-sky-50/80 shadow-sm'
                : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/40'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <span className="text-3xl shrink-0">🇬🇧</span>
              <div>
                <div className="text-sm font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  English
                </div>
                <div className="text-[11px] text-slate-500">
                  Catalog & WhatsApp Order in English
                </div>
              </div>
            </div>

            {currentLang === 'en' && (
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-slate-400">
          Anda boleh menukar bahasa pada bila-bila masa di menu atas.
          <br />
          You can change the language anytime in the top menu.
        </p>
      </div>
    </div>
  );
};
