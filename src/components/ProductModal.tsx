import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, MessageCircle } from 'lucide-react';
import { Product, SOCIAL_LINKS, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  lang: Language;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!product) return null;

  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [added, setAdded] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (product) {
      setQty(1);
      setSelectedVariant(
        product.variants && product.variants.length > 0 ? product.variants[0] : undefined
      );
    }
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, qty, selectedVariant);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const displayName = lang === 'en' && product.nameEn ? product.nameEn : product.name;
  const displayDesc = lang === 'en' && product.descriptionEn ? product.descriptionEn : product.description;
  const displayBadge = lang === 'en' && product.badgeEn ? product.badgeEn : product.badge;
  const displayFeatures = lang === 'en' && product.featuresEn ? product.featuresEn : product.features;

  const variantSuffix = selectedVariant ? ` [Variasi: ${selectedVariant}]` : '';

  const inquiryMessage =
    lang === 'en'
      ? `Hi Rafique, I'd like to ask more about: *${displayName}*${variantSuffix} (RM ${product.price.toFixed(2)}) from the *${product.category}* category. Is it still in stock?`
      : `Hai Rafique, saya berminat nak tanya lanjut tentang produk: *${displayName}*${variantSuffix} (RM ${product.price.toFixed(2)}) daripada kategori *${product.category}*. Adakah stok masih ada?`;

  const directWhatsAppInquiryUrl = `https://wa.me/${SOCIAL_LINKS.whatsappRawNumber}?text=${encodeURIComponent(
    inquiryMessage
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-900 bg-white/80 hover:bg-white rounded-full shadow-xs transition-colors cursor-pointer"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-4/3 md:aspect-auto bg-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={displayName}
              className="w-full h-full object-cover object-center max-h-80 md:max-h-full"
              referrerPolicy="no-referrer"
            />
            {displayBadge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-slate-900 font-extrabold text-xs rounded-lg shadow-xs uppercase">
                {displayBadge}
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Category & Weight */}
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {product.category} {product.weightOrSize ? `• ${product.weightOrSize}` : ''}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {displayName}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  RM {product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    RM {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {displayDesc}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Pilihan Variasi / Variant:' : 'Pilihan Variasi:'}</span>
                    <span className="text-amber-800 font-semibold">{selectedVariant}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-500 bg-amber-100 text-amber-950 ring-2 ring-amber-400 shadow-2xs'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Features List */}
              {displayFeatures && displayFeatures.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="text-xs font-bold text-slate-700">{t.featuresTitle}</div>
                  <ul className="space-y-1">
                    {displayFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add Action */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{t.quantity}</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold font-mono tabular-nums bg-white">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-400 hover:bg-amber-500 text-slate-900 active:scale-98'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-[13px]">{added ? t.addedToCart : `${t.addToCart} • RM ${(product.price * qty).toFixed(2)}`}</span>
                </button>

                <a
                  href={directWhatsAppInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  title="Inquire on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.askWhatsApp}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
