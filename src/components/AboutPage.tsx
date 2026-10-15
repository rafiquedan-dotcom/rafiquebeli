import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, HeartHandshake, Users } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types/store';

interface AboutPageProps {
  onNavigateToProducts: () => void;
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToProducts, lang }) => {
  const isEn = lang === 'en';

  return (
    <div className="py-10 sm:py-16 bg-[#FFFDF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Banner */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <Logo size="lg" showSlogan={true} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {isEn ? 'The Story & Mission of rafiquebeli' : 'Kisah & Misi rafiquebeli'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {isEn
              ? '"Shop smarter, happier." — A transparent, direct, and joyful shopping journey connecting you with verified authentic Malaysian delicacies, natural beauty, and artisan craftsmanship.'
              : '"Shop smarter, happier." — Pengalaman membeli-belah yang mudah, telus, dan menghubungkan anda dengan produk asli tempatan yang terbukti berkualiti.'}
          </p>
        </div>

        {/* Narrative Section with Split Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-amber-100 shadow-sm">
          <div className="space-y-4">
            <div className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
              {isEn ? 'Who We Are' : 'Siapakah Kami?'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {isEn
                ? 'More than a Store, We Are Your Curators for Quality'
                : 'Bukan Sekadar Kedai, Tetapi Kurator Produk Terbaik Untuk Anda'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isEn
                ? 'rafiquebeli was founded with a genuine passion: to make it effortless for Malaysians and global shoppers to discover delicious traditional foods, healthy botanical skincare, and master craftsmanship without doubt or hassle.'
                : 'rafiquebeli diasaskan dengan satu matlamat murni: memudahkan rakyat Malaysia mendapatkan produk makanan sedap, penjagaan diri semulajadi, dan kraftangan bermutu tinggi tanpa rasa ragu-ragu.'}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isEn
                ? 'We collaborate with local culinary artisans for KAYMAIRA F&B, natural beauty pioneers for KAYMAIRA BEAUTY, and celebrate vocational excellence by bringing TVETMARA student craftsmanship straight to market.'
                : 'Kami bekerjasama rapat dengan pengeluar KAYMAIRA F&B untuk hidangan tradisional asli, siri kecantikan herba moden KAYMAIRA BEAUTY, serta mengangkat kemahiran para pengrajin dan penuntut vokasional TVETMARA ke pasaran arus perdana.'}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/src/assets/images/regenerated_image_1792072708279.png"
              alt="rafiquebeli shop interior"
              className="w-full h-72 sm:h-80 object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3 Main Pillars Section */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {isEn ? 'Our 3 Signature Categories' : '3 Kategori Kebanggaan Kami'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isEn
                ? 'Each product is handpicked and taste-tested for guaranteed satisfaction.'
                : 'Setiap kategori dipilih dengan teliti bagi menjamin kepuasan setiap pelanggan.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KAYMAIRA F&B */}
            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
                  🍲
                </div>
                <h4 className="text-lg font-bold text-slate-900">KAYMAIRA F&B</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'KAYMAIRA Daging Dendeng: authentic slow-cooked tender caramelized spiced beef in ready-to-eat travel-friendly retort packaging.'
                    : 'KAYMAIRA Daging Dendeng: hidangan daging lembu lembut dimasak pekat karamel pedas manis warisan, pek sedia dimakan yang tahan lama & mudah dibawa ke mana-mana.'}
                </p>
              </div>
              <div className="text-xs font-semibold text-amber-700 pt-2 border-t border-slate-100">
                {isEn ? '100% Halal & Hygienic' : '100% Halal & Bersih'}
              </div>
            </div>

            {/* KAYMAIRA BEAUTY */}
            <div className="p-6 rounded-2xl bg-white border border-sky-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h4 className="text-lg font-bold text-slate-900">KAYMAIRA BEAUTY</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'KAYMAIRA Lipmatte in 2 trendy shades (01 & 02) with a smooth velvety finish, plus refreshing Sweet Floral Aromatherapy Oil in an elegant roll-on bottle.'
                    : 'KAYMAIRA Lipmatte dalam 2 variasi warna (01 & 02) dengan tekstur baldu lembut, serta Minyak Aromaterapi (Sweet Floral) roll-on yang menenangkan minda.'}
                </p>
              </div>
              <div className="text-xs font-semibold text-sky-700 pt-2 border-t border-slate-100">
                {isEn ? 'Safe & Long-Lasting' : 'Kualiti Selamat & Tahan Lama'}
              </div>
            </div>

            {/* TVETMARA */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center text-2xl">
                  🛠️
                </div>
                <h4 className="text-lg font-bold text-slate-900">TVETMARA</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'RABAN Natural Soap: Handcrafted cold-processed botanical artisan soap formulated with natural herbs, free from harsh chemicals, celebrating TVET student craftsmanship.'
                    : 'RABAN Natural Soap: Sabun herba artisan buatan tangan semulajadi (cold-processed) yang bebas bahan kimia keras, mengangkat inovasi kemahiran anak tempatan TVETMARA.'}
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                {isEn ? 'Handmade Artisan Quality' : 'Kraf Artisan Buatan Tangan'}
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-amber-100 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
            <div className="text-sm font-bold text-slate-900">{isEn ? '100% Authentic' : '100% Tulen'}</div>
            <p className="text-[11px] text-slate-500">{isEn ? 'Verified products from trusted makers' : 'Dijamin produk asli dari pengeluar sah'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-100 space-y-2">
            <Truck className="w-6 h-6 text-amber-600 mx-auto" />
            <div className="text-sm font-bold text-slate-900">{isEn ? 'Fast Shipping' : 'Pos Pantas'}</div>
            <p className="text-[11px] text-slate-500">{isEn ? 'Reliable delivery across all states' : 'Pengeposan selamat ke Semenanjung & Borneo'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-100 space-y-2">
            <HeartHandshake className="w-6 h-6 text-rose-500 mx-auto" />
            <div className="text-sm font-bold text-slate-900">{isEn ? 'Friendly WhatsApp' : 'Mesra WhatsApp'}</div>
            <p className="text-[11px] text-slate-500">{isEn ? 'Direct, personal customer support' : 'Perkhidmatan terus dan mesra bersama Rafique'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-100 space-y-2">
            <Users className="w-6 h-6 text-sky-600 mx-auto" />
            <div className="text-sm font-bold text-slate-900">{isEn ? 'Local Community' : 'Komuniti Tempatan'}</div>
            <p className="text-[11px] text-slate-500">{isEn ? 'Empowering local entrepreneurs & students' : 'Menyokong usahawan & pelajar kemahiran'}</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center p-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl text-slate-900 space-y-4 shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-black">
            {isEn ? 'Ready to Shop Smarter & Happier?' : 'Bersedia Untuk Membeli-Belah Lebih Bijak?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-800 max-w-lg mx-auto font-medium">
            {isEn
              ? 'Select your favorite item today and enjoy prompt WhatsApp Business ordering.'
              : 'Pilih barangan kegemaran anda hari ini dan nikmati pesanan pantas melalui WhatsApp Business rasmi kami.'}
          </p>
          <button
            onClick={onNavigateToProducts}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            {isEn ? 'Explore Our Products' : 'Jelajahi Produk Kami Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
};
