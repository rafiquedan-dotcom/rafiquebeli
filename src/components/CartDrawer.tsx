import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, AlertCircle, ShoppingBag, Truck, Check } from 'lucide-react';
import { CartItem, CustomerDetails, DeliveryMethod, DELIVERY_RATES, SOCIAL_LINKS, Language } from '../types/store';
import { TRANSLATIONS } from '../utils/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, variant?: string) => void;
  onRemoveItem: (productId: string, variant?: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    deliveryMethod: 'semenanjung',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [orderSent, setOrderSent] = useState(false);

  // Subtotal Calculation
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Free postage for Semenanjung if subtotal >= 80
  const isFreePostageEligible = customer.deliveryMethod === 'semenanjung' && subtotal >= 80;
  const shippingFee = isFreePostageEligible ? 0 : DELIVERY_RATES[customer.deliveryMethod].price;
  const grandTotal = subtotal + shippingFee;

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!customer.name.trim()) errors.name = t.errorName;
    if (!customer.phone.trim()) errors.phone = t.errorPhone;
    if (customer.deliveryMethod !== 'pickup' && !customer.address.trim()) {
      errors.address = t.errorAddress;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    if (!validateForm()) return;

    const deliveryInfo = DELIVERY_RATES[customer.deliveryMethod];
    const deliveryLabel = lang === 'en' ? deliveryInfo.labelEn : deliveryInfo.labelMs;

    const orderItemsList = items
      .map((item, idx) => {
        const prodName = lang === 'en' && item.product.nameEn ? item.product.nameEn : item.product.name;
        const qtyLabel = lang === 'en' ? 'Quantity' : 'Kuantiti';
        const variantText = item.selectedVariant
          ? `\n   ↳ ${lang === 'en' ? 'Variant' : 'Variasi'}: *${item.selectedVariant}*`
          : '';
        return `${idx + 1}. *${prodName}* [${item.product.category}]${variantText}\n   ↳ ${qtyLabel}: ${item.quantity} x RM ${item.product.price.toFixed(2)} = RM ${(
          item.product.price * item.quantity
        ).toFixed(2)}`;
      })
      .join('\n\n');

    let message = '';
    if (lang === 'en') {
      const shippingText = isFreePostageEligible
        ? 'RM 0.00 (FREE - Promo RM80+ order)'
        : `RM ${shippingFee.toFixed(2)} (${deliveryLabel})`;

      message = `🛍️ *NEW ORDER — RAFIQUEBELI*
----------------------------------------
👤 *CUSTOMER DETAILS:*
• *Name:* ${customer.name.trim()}
• *WhatsApp:* ${customer.phone.trim()}
• *Delivery Method:* ${deliveryLabel}
• *Address:* ${customer.deliveryMethod === 'pickup' ? 'Self-Pickup (To be arranged)' : customer.address.trim()}
${customer.notes.trim() ? `• *Special Notes:* ${customer.notes.trim()}\n` : ''}
📦 *ORDER SUMMARY:*
${orderItemsList}

----------------------------------------
💰 *PAYMENT SUMMARY:*
• Item Subtotal: *RM ${subtotal.toFixed(2)}*
• Delivery Fee: *${shippingText}*
⭐ *GRAND TOTAL: RM ${grandTotal.toFixed(2)}*
----------------------------------------

Hi Rafique! I would like to confirm this order via WhatsApp Business. Please send me your payment account number and next steps. Thank you!`;
    } else {
      const shippingText = isFreePostageEligible
        ? 'RM 0.00 (Percuma - Promosi Belanja RM80+)'
        : `RM ${shippingFee.toFixed(2)} (${deliveryLabel})`;

      message = `🛍️ *TEMPAHAN BARU / NEW ORDER — RAFIQUEBELI*
----------------------------------------
👤 *MAKLUMAT PELANGGAN:*
• *Nama:* ${customer.name.trim()}
• *No. WhatsApp:* ${customer.phone.trim()}
• *Kaedah Hantar:* ${deliveryLabel}
• *Alamat:* ${customer.deliveryMethod === 'pickup' ? 'Self-Pickup (Akan dihubungi)' : customer.address.trim()}
${customer.notes.trim() ? `• *Catatan:* ${customer.notes.trim()}\n` : ''}
📦 *SENARAI PESANAN:*
${orderItemsList}

----------------------------------------
💰 *RINGKASAN PEMBAYARAN:*
• Subtotal Barangan: *RM ${subtotal.toFixed(2)}*
• Kos Penghantaran: *${shippingText}*
⭐ *JUMLAH KESELURUHAN: RM ${grandTotal.toFixed(2)}*
----------------------------------------

Hai Rafique! Saya ingin mengesahkan tempahan ini melalui WhatsApp Business. Sila berikan no. akaun pembayaran / langkah seterusnya. Terima kasih!`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SOCIAL_LINKS.whatsappRawNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="relative w-full max-w-md sm:max-w-lg bg-[#FFFDF7] h-full shadow-2xl flex flex-col border-l border-amber-200 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {t.cartTitle}
              </h2>
              <span className="text-xs text-slate-500">
                {items.length} {t.selectedCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
                title={t.clearCart}
              >
                {t.clearCart}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Content / Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {items.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-600">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="text-base font-bold text-slate-800">{t.cartEmptyTitle}</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                {t.cartEmptySub}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                {t.startShopping}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.itemsListTag} ({items.length})
                </div>

                <div className="divide-y divide-amber-100/80 bg-white rounded-2xl border border-amber-100 shadow-xs overflow-hidden">
                  {items.map((item, idx) => {
                    const itemName = lang === 'en' && item.product.nameEn ? item.product.nameEn : item.product.name;
                    const itemKey = `${item.product.id}-${item.selectedVariant || 'default'}-${idx}`;
                    return (
                      <div key={itemKey} className="p-3.5 flex gap-3 items-center">
                        <img
                          src={item.product.image}
                          alt={itemName}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-amber-600 truncate">
                            {item.product.category}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {itemName}
                          </h4>
                          {item.selectedVariant && (
                            <div className="mt-0.5">
                              <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                {lang === 'en' ? 'Variant' : 'Variasi'}: {item.selectedVariant}
                              </span>
                            </div>
                          )}
                          <div className="text-xs font-extrabold text-slate-800 font-mono tabular-nums mt-0.5">
                            RM {(item.product.price * item.quantity).toFixed(2)}
                            <span className="text-[10px] text-slate-400 font-normal ml-1">
                              (RM {item.product.price.toFixed(2)}/unit)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                              className="p-1 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold font-mono tabular-nums text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                              className="p-1 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedVariant)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-md cursor-pointer"
                            title="Remove item"
                            aria-label={`Remove ${itemName}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Information & Shipping Form */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>{t.shippingDetailsTag}</span>
                  <span className="text-[10px] text-amber-600">*{t.required}</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.fullNameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => {
                        setCustomer({ ...customer, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      placeholder={t.namePlaceholder}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                        formErrors.name
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-slate-200 focus:border-amber-400'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.phoneLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => {
                        setCustomer({ ...customer, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                      }}
                      placeholder={t.phonePlaceholder}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                        formErrors.phone
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-slate-200 focus:border-amber-400'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Delivery Method Options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.deliveryOptionsLabel}
                    </label>
                    <div className="space-y-2">
                      {(Object.keys(DELIVERY_RATES) as DeliveryMethod[]).map((method) => {
                        const opt = DELIVERY_RATES[method];
                        const isSelected = customer.deliveryMethod === method;
                        const label = lang === 'en' ? opt.labelEn : opt.labelMs;
                        const note = lang === 'en' ? opt.noteEn : opt.noteMs;
                        const priceDisplay =
                          method === 'semenanjung' && isFreePostageEligible
                            ? t.freeLabel
                            : opt.price === 0
                            ? t.freeLabel
                            : `RM ${opt.price.toFixed(2)}`;

                        return (
                          <label
                            key={method}
                            onClick={() => setCustomer({ ...customer, deliveryMethod: method })}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold shadow-2xs'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="deliveryMethod"
                                checked={isSelected}
                                onChange={() => setCustomer({ ...customer, deliveryMethod: method })}
                                className="text-amber-500 focus:ring-amber-400"
                              />
                              <div>
                                <div>{label}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{note}</div>
                              </div>
                            </div>
                            <span className="font-mono font-bold">{priceDisplay}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Address (If not pickup) */}
                  {customer.deliveryMethod !== 'pickup' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.addressLabel} <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={customer.address}
                        onChange={(e) => {
                          setCustomer({ ...customer, address: e.target.value });
                          if (formErrors.address) setFormErrors({ ...formErrors, address: undefined });
                        }}
                        placeholder={t.addressPlaceholder}
                        className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                          formErrors.address
                            ? 'border-rose-400 focus:border-rose-500'
                            : 'border-slate-200 focus:border-amber-400'
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.address}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.notesLabel}
                    </label>
                    <input
                      type="text"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder={t.notesPlaceholder}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-amber-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-amber-100 bg-white space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t.itemsSubtotal}</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  RM {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.deliveryFee}</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {isFreePostageEligible ? (
                    <span className="text-emerald-600">{t.freeLabel}</span>
                  ) : (
                    `RM ${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>{t.totalPayment}</span>
                <span className="font-mono text-amber-600 tabular-nums">
                  RM {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Notification when WhatsApp launched */}
            {orderSent && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.orderSentNotice}</span>
              </div>
            )}

            {/* Trigger Button to WhatsApp */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.sendOrderWhatsApp}</span>
            </button>

            <p className="text-[10px] text-center text-slate-400">
              {t.orderDisclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
