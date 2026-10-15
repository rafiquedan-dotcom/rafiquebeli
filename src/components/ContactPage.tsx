import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Clock, ExternalLink, Check } from 'lucide-react';
import { SOCIAL_LINKS, Language } from '../types/store';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryType, setInquiryType] = useState(
    isEn ? 'Product & Stock Availability' : 'Pertanyaan Produk & Stok'
  );
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleSendWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;

    let formattedText = '';
    if (isEn) {
      formattedText = `👋 *INQUIRY VIA RAFIQUEBELI WEBSITE*
----------------------------------------
• *Sender Name:* ${inquiryName.trim()}
• *Inquiry Type:* ${inquiryType}
• *Message:*
${inquiryMessage.trim()}

----------------------------------------
(Sent via rafiquebeli quick web inquiry)`;
    } else {
      formattedText = `👋 *PERTANYAAN MELALUI LAMAN WEB RAFIQUEBELI*
----------------------------------------
• *Nama Pengirim:* ${inquiryName.trim()}
• *Jenis Pertanyaan:* ${inquiryType}
• *Mesej:*
${inquiryMessage.trim()}

----------------------------------------
(Dihantar melalui borang pantas laman web rafiquebeli)`;
    }

    const url = `https://wa.me/${SOCIAL_LINKS.whatsappRawNumber}?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FFFDF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold shadow-xs">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isEn ? 'Direct Customer Service' : 'Khidmat Pelanggan Terus'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Contact Rafiquebeli' : 'Hubungi Rafiquebeli'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isEn
              ? 'Have questions about your order, KAYMAIRA or TVETMARA products, or bulk deals? We are ready to help via our official WhatsApp Business.'
              : 'Ada pertanyaan tentang tempahan, produk KAYMAIRA & TVETMARA, atau tawaran borong? Kami sedia membantu anda melalui WhatsApp Business rasmi.'}
          </p>
        </div>

        {/* Contact Information & Interactive Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Business Card */}
            <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-emerald-600 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isEn ? 'Official WhatsApp Business' : 'WhatsApp Business Rasmi'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Primary communication channel for orders and catalog.' : 'Saluran komunikasi utama untuk semakan pesanan dan katalog.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-800 font-mono">
                  {SOCIAL_LINKS.whatsappPhoneDisplay}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={SOCIAL_LINKS.whatsappChat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors text-center inline-flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>{isEn ? 'Message WhatsApp' : 'Mesej WhatsApp'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.whatsappCatalogue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors text-center inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{isEn ? 'Catalogue' : 'Katalog'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Details */}
            <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">{isEn ? 'Official Email' : 'E-mel Rasmi'}</div>
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="text-sm font-bold text-slate-800 hover:text-amber-600 transition-colors"
                  >
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">{isEn ? 'Response Hours' : 'Waktu Respon'}</div>
                  <div className="text-xs font-semibold text-slate-700">
                    {isEn ? 'Mon - Sun: 9:00 AM - 10:00 PM' : 'Isnin - Ahad: 9:00 AM - 10:00 PM'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isEn ? 'Quick response on WhatsApp' : 'Respon pantas melalui WhatsApp Business'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">{isEn ? 'Delivery Coverage' : 'Liputan Pengeposan'}</div>
                  <div className="text-xs font-semibold text-slate-700">
                    {isEn ? 'Nationwide Malaysia (Peninsular, Sabah & Sarawak)' : 'Seluruh Malaysia (Semenanjung, Sabah & Sarawak)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct WhatsApp Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {isEn ? 'Quick WhatsApp Inquiry' : 'Hantar Pertanyaan Pantas ke WhatsApp'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isEn
                    ? 'Fill this quick form and we will open WhatsApp with your pre-filled inquiry.'
                    : 'Isi borang ringkas ini dan kami akan membuka WhatsApp anda dengan mesej pra-isi secara automatik.'}
                </p>
              </div>

              <form onSubmit={handleSendWhatsAppInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isEn ? 'Your Full Name *' : 'Nama Penuh Anda *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g. Sarah Jenkins' : 'cth: Siti Nurhaliza'}
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isEn ? 'Inquiry Type *' : 'Jenis Pertanyaan *'}
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-300 focus:outline-none bg-white"
                  >
                    {isEn ? (
                      <>
                        <option value="Product & Stock Availability">Product & Stock Availability</option>
                        <option value="Bulk & Wholesale Orders">Bulk & Wholesale Orders</option>
                        <option value="Affiliate Collaboration">Affiliate Collaboration</option>
                        <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                        <option value="General Inquiries & Feedback">General Inquiries & Feedback</option>
                      </>
                    ) : (
                      <>
                        <option value="Pertanyaan Produk & Stok">Pertanyaan Produk & Stok</option>
                        <option value="Tempahan Khas / Borong">Tempahan Khas / Pukal (Borong)</option>
                        <option value="Kerjasama Affiliate & Promosi">Kerjasama Affiliate & Promosi</option>
                        <option value="Status Penghantaran Pesanan">Status Penghantaran Pesanan</option>
                        <option value="Cadangan & Maklum Balas">Cadangan & Maklum Balas</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isEn ? 'Your Message *' : 'Mesej / Butiran Pertanyaan *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={isEn ? 'Write your questions or notes for Rafique...' : 'Tuliskan soalan atau butiran yang ingin ditanyakan kepada Rafique...'}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-300 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isEn ? 'Send Inquiry via WhatsApp' : 'Hantar Pertanyaan Melalui WhatsApp'}</span>
                </button>

                {formSent && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'WhatsApp opened! You can tap Send now.' : 'WhatsApp dibuka! Anda boleh terus klik Send di WhatsApp anda.'}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
