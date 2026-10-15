import React, { useState } from 'react';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';
import { Product, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant?: string) => void;
  onViewProduct: (product: Product) => void;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewProduct,
  lang,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If multiple variants exist, prefer opening the modal or add the first variant
    const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : undefined;
    onAddToCart(product, defaultVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const displayName = lang === 'en' && product.nameEn ? product.nameEn : product.name;
  const displayDesc = lang === 'en' && product.descriptionEn ? product.descriptionEn : product.description;
  const displayBadge = lang === 'en' && product.badgeEn ? product.badgeEn : product.badge;

  return (
    <article
      onClick={() => onViewProduct(product)}
      className="group relative bg-white rounded-2xl border border-amber-100/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {/* Badge */}
        {displayBadge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide bg-amber-400 text-slate-900 rounded-lg shadow-xs">
            {displayBadge}
          </div>
        )}

        {/* Fallback pattern container if image is loading or error */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-amber-50 to-sky-50">
            <span className="text-2xl mb-1">
              {product.category === 'KAYMAIRA F&B' ? '🍲' : product.category === 'KAYMAIRA BEAUTY' ? '✨' : '🛠️'}
            </span>
            <span className="text-xs font-bold text-slate-600 line-clamp-2">{displayName}</span>
          </div>
        )}

        {!imageError && (
          <img
            src={product.image}
            alt={displayName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-slate-900 text-xs font-bold rounded-lg shadow-sm">
            <Eye className="w-3.5 h-3.5" /> {t.viewDetails}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category & Weight Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-amber-800 font-semibold">{product.category}</span>
            {product.weightOrSize && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{product.weightOrSize}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
            {displayName}
          </h3>

          {/* Variants chip if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{product.variants.join(' • ')}</span>
            </div>
          )}

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Price with tabular numerals */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                RM {product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                  RM {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">{t.readyStock}</span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer ${
              justAdded
                ? 'bg-emerald-500 text-white shadow-emerald-200'
                : 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-amber-200'
            }`}
            aria-label={`Tambah ${displayName} ke troli`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>{t.addedToCart}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
