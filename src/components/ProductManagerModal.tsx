import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { Product, ProductCategory } from '../types/store';

interface ProductManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetDefault: () => void;
}

export const ProductManagerModal: React.FC<ProductManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetDefault,
}) => {
  if (!isOpen) return null;

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState<'All' | ProductCategory>('All');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'KAYMAIRA F&B' as ProductCategory,
    price: '',
    originalPrice: '',
    description: '',
    featuresText: '',
    image: '',
    badge: '',
    weightOrSize: '',
    inStock: true,
  });

  const [formError, setFormError] = useState('');

  const startAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'KAYMAIRA F&B',
      price: '',
      originalPrice: '',
      description: '',
      featuresText: '',
      image: '/src/assets/images/regenerated_image_1792072392831.jpg',
      badge: '',
      weightOrSize: '',
      inStock: true,
    });
    setIsAddingNew(true);
    setFormError('');
  };

  const startEdit = (product: Product) => {
    setIsAddingNew(false);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      description: product.description,
      featuresText: product.features ? product.features.join('\n') : '',
      image: product.image,
      badge: product.badge || '',
      weightOrSize: product.weightOrSize || '',
      inStock: product.inStock,
    });
    setFormError('');
  };

  const cancelForm = () => {
    setIsAddingNew(false);
    setEditingProduct(null);
    setFormError('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Sila isi nama produk');
      return;
    }
    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError('Sila masukkan harga produk yang sah');
      return;
    }

    const origPriceNum = formData.originalPrice ? parseFloat(formData.originalPrice) : undefined;
    const featuresList = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    // Default image if empty
    let imageUrl = formData.image.trim();
    if (!imageUrl) {
      if (formData.category === 'KAYMAIRA F&B') {
        imageUrl = '/src/assets/images/kaymaira_daging_dendeng_1791989649440.jpg';
      } else if (formData.category === 'KAYMAIRA BEAUTY') {
        imageUrl = '/src/assets/images/kaymaira_beauty_skincare_1791985461839.jpg';
      } else {
        imageUrl = '/src/assets/images/tvetmara_artisan_merch_1791985462532.jpg';
      }
    }

    if (isAddingNew) {
      onAddProduct({
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        originalPrice: origPriceNum,
        description: formData.description.trim(),
        features: featuresList,
        image: imageUrl,
        badge: formData.badge.trim() || undefined,
        weightOrSize: formData.weightOrSize.trim() || undefined,
        inStock: formData.inStock,
      });
      setSaveSuccessMsg('Produk baru berjaya ditambah!');
    } else if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        originalPrice: origPriceNum,
        description: formData.description.trim(),
        features: featuresList,
        image: imageUrl,
        badge: formData.badge.trim() || undefined,
        weightOrSize: formData.weightOrSize.trim() || undefined,
        inStock: formData.inStock,
      });
      setSaveSuccessMsg('Produk berjaya dikemaskini!');
    }

    cancelForm();
    setTimeout(() => setSaveSuccessMsg(''), 2500);
  };

  const filteredProducts =
    activeFilterCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeFilterCategory);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-4xl bg-[#FFFDF7] rounded-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-amber-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Pengurusan Produk Kedai</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Admin Mode
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tambah, sunting harga, atau kemaskini produk KAYMAIRA & TVETMARA anda.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup panel pengurusan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Status Banner */}
        {saveSuccessMsg && (
          <div className="bg-emerald-100 border-b border-emerald-200 text-emerald-900 px-4 py-2 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* If form is open */}
          {(isAddingNew || editingProduct) ? (
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {isAddingNew ? 'Tambah Produk Baru' : `Sunting: ${editingProduct?.name}`}
                </h3>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Batal
                </button>
              </div>

              {formError && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-1.5 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="cth: Sambal Rangup Bilis Spesial"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as ProductCategory })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none bg-white"
                    >
                      <option value="KAYMAIRA F&B">KAYMAIRA F&B</option>
                      <option value="KAYMAIRA BEAUTY">KAYMAIRA BEAUTY</option>
                      <option value="TVETMARA">TVETMARA</option>
                    </select>
                  </div>

                  {/* Weight / Size */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Berat / Saiz (cth: 200g, 30ml, Saiz M)
                    </label>
                    <input
                      type="text"
                      value={formData.weightOrSize}
                      onChange={(e) => setFormData({ ...formData, weightOrSize: e.target.value })}
                      placeholder="cth: 200g"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Harga Jualan (RM) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="18.00"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Original Price (for discount) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Harga Asal (RM) (Pilihan)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="22.00"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Badge */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Label Badge (cth: Terlaris, Best Seller, New)
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="cth: Terlaris"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Image URL / preset */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pautan Gambar (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://... atau biarkan untuk gambar lalai"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Penerangan Produk
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Keterangan ringkas tentang rasa, ramuan, atau kualiti produk..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Features */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kelebihan Produk (1 baris setiap satu)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.featuresText}
                      onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                      placeholder="100% Produk Halal&#10;Tahan Lama&#10;Resepi Warisan"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 font-bold text-xs text-slate-900 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan Produk</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Product List Toolbar */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Category filter tabs */}
                <div className="flex items-center gap-1 p-1 bg-amber-100/60 rounded-xl text-xs font-semibold">
                  {(['All', 'KAYMAIRA F&B', 'KAYMAIRA BEAUTY', 'TVETMARA'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activeFilterCategory === cat
                          ? 'bg-white text-slate-900 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Add button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={startAddNew}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Produk Baru</span>
                  </button>
                </div>
              </div>

              {/* Table / List */}
              <div className="bg-white rounded-2xl border border-amber-100 shadow-xs overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-amber-50/40 transition-colors"
                    >
                      {/* Left: Thumbnail & details */}
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold text-amber-700 uppercase">
                            {p.category} {p.badge ? `• ${p.badge}` : ''}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {p.name}
                          </div>
                          <div className="text-xs font-extrabold text-slate-800 font-mono tabular-nums">
                            RM {p.price.toFixed(2)}
                            {p.originalPrice && (
                              <span className="text-[10px] text-slate-400 line-through ml-1.5 font-normal">
                                RM {p.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-2 text-slate-500 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg transition-colors"
                          title="Sunting produk"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Adakah anda pasti mahu memadam "${p.name}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Padam produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset to Default Backup */}
              <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                <span>{filteredProducts.length} produk disenaraikan</span>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Adakah anda mahu memulihkan katalog asal? Semua perubahan tersuai akan diganti dengan data rasmi asal.'
                      )
                    ) {
                      onResetDefault();
                      setSaveSuccessMsg('Katalog telah dipulihkan ke asal!');
                      setTimeout(() => setSaveSuccessMsg(''), 2500);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Pulihkan Katalog Asal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
