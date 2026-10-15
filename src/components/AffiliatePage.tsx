import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Sparkles, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS, Language } from '../types/store';

interface AffiliatePageProps {
  lang: Language;
}

export const AffiliatePage: React.FC<AffiliatePageProps> = ({ lang }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isEn = lang === 'en';

  const socialChannels = [
    {
      name: isEn ? "Rafique's Official Linktree" : 'Linktree Rasmi Rafique',
      handle: 'linktr.ee/rafiquedan',
      url: SOCIAL_LINKS.linktree,
      description: isEn
        ? "The central hub for all of Rafique's affiliate links, exclusive discounts, and community collaborations."
        : 'Hab utama semua pautan affiliate, tawaran eksklusif, dan projek komuniti Rafique.',
      badge: isEn ? 'Primary Affiliate Link' : 'Pautan Affiliate Utama',
      color: 'bg-emerald-500 text-white',
      hoverBorder: 'hover:border-emerald-400',
      iconText: '🌲',
    },
    {
      name: isEn ? 'WhatsApp Business & Catalog' : 'WhatsApp Business & Katalog',
      handle: '011 2923 2843',
      url: SOCIAL_LINKS.whatsappCatalogue,
      description: isEn
        ? 'Browse our verified digital WhatsApp catalog and chat directly with customer support.'
        : 'Semak katalog penuh produk kami dan hubungi khidmat pelanggan secara terus.',
      badge: isEn ? 'Official Catalogue' : 'Katalog Rasmi',
      color: 'bg-green-600 text-white',
      hoverBorder: 'hover:border-green-400',
      iconText: '💬',
    },
    {
      name: 'Instagram',
      handle: '@rafiquebeli',
      url: SOCIAL_LINKS.instagram,
      description: isEn
        ? 'Unboxing clips, smart shopping advice, daily lifestyle tips, and newest item reviews.'
        : 'Video unboxing, tips membeli-belah pintar, perkongsian harian, dan ulasan produk terkini.',
      badge: '@rafiquebeli',
      color: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      hoverBorder: 'hover:border-pink-300',
      iconText: '📸',
    },
    {
      name: 'TikTok',
      handle: '@rafiquebeli',
      url: SOCIAL_LINKS.tiktok,
      description: isEn
        ? 'Live streams, trending product demos, authentic honest reviews, and shopping guides.'
        : 'Siaran langsung, video racun beli-belah berfaedah, dan tutorial penggunaan produk!',
      badge: '@rafiquebeli',
      color: 'bg-slate-900 text-white',
      hoverBorder: 'hover:border-slate-400',
      iconText: '🎵',
    },
    {
      name: 'Facebook Page',
      handle: 'rafiquebeli Official',
      url: SOCIAL_LINKS.facebook,
      description: isEn
        ? 'Community announcements, monthly discount updates, and real customer testimonials.'
        : 'Kemas kini berita komuniti, promosi bulanan, dan maklum balas pelanggan setia.',
      badge: isEn ? 'Facebook Community' : 'Facebook Komuniti',
      color: 'bg-blue-600 text-white',
      hoverBorder: 'hover:border-blue-400',
      iconText: '📘',
    },
  ];

  return (
    <div className="py-10 sm:py-14 bg-[#FFFDF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isEn ? 'Official Links & Social Channels' : 'Pautan Rasmi & Media Sosial'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Affiliate Hub & Official Channels' : 'Pautan Affiliate & Saluran Rasmi'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isEn
              ? 'Get instant access to Rafique’s hand-picked affiliate recommendations, special promotions, and follow our official social channels.'
              : 'Dapatkan akses segera ke pautan affiliate pilihan Rafique, promosi khas, dan ikuti akaun media sosial rasmi kami untuk info produk dan tawaran istimewa.'}
          </p>
        </div>

        {/* Featured Big Linktree Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-400 via-amber-300 to-sky-300 p-1 shadow-xl">
          <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-extrabold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isEn ? 'Featured Affiliate Link' : 'Pautan Pilihan Utama'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Linktree: linktr.ee/rafiquedan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {isEn
                  ? 'The complete collection of affiliate links curated by Rafique — from daily household bargains, lifestyle gadgets, to beauty essentials and local craft.'
                  : 'Koleksi penuh pautan affiliate yang disyorkan oleh Rafique — daripada tawaran barangan runcit harian, gajet pintar, hingga ke produk kecantikan dan kraf tempatan.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href={SOCIAL_LINKS.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{isEn ? 'Open Linktree' : 'Buka Linktree Sekarang'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => handleCopy(SOCIAL_LINKS.linktree)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'Link Copied!' : 'Pautan Disalin!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>{isEn ? 'Copy Link' : 'Salin Pautan'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              {isEn ? 'Social Media & Direct Channels' : 'Saluran Media Sosial & Hubungan Terus'}
            </h3>
            <span className="text-xs text-slate-500">{isEn ? 'Tap to open in new tab' : 'Ketik untuk membuka tab baharu'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialChannels.map((channel, idx) => (
              <a
                key={idx}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl bg-white border border-amber-100/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${channel.hoverBorder}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl shrink-0 p-2 rounded-xl bg-amber-50">
                      {channel.iconText}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {channel.name}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-amber-700">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                  <span className="p-2 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {channel.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="text-[11px] text-slate-400">{channel.badge}</span>
                  <span className="text-amber-600 group-hover:underline inline-flex items-center gap-1">
                    {isEn ? 'Open Channel' : 'Buka Saluran'} <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Affiliate Partnership Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200 text-center space-y-4">
          <Heart className="w-8 h-8 text-rose-500 mx-auto fill-rose-500" />
          <h3 className="text-xl font-black text-slate-900">
            {isEn ? 'Interested in Partnering with Rafiquebeli?' : 'Berminat Mengesyorkan Produk Bersama Rafiquebeli?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {isEn
              ? 'We welcome collaborations with creators, affiliate partners, and local brand ambassadors. Contact us to discuss partnership opportunities.'
              : 'Kami sentiasa membuka peluang kerjasama bersama pencipta kandungan, dropshipper, dan komuniti usahawan tempatan. Hubungi kami untuk program kolaborasi.'}
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${SOCIAL_LINKS.whatsappRawNumber}?text=${encodeURIComponent(
                isEn
                  ? 'Hi Rafique, I am interested in collaborating or joining an affiliate program with rafiquebeli.'
                  : 'Hai Rafique, saya berminat untuk berbincang mengenai peluang kolaborasi / program affiliate bersama rafiquebeli.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Discuss on WhatsApp' : 'Bincang Kerjasama di WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
