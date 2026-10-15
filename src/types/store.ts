export type Language = 'ms' | 'en';

export type ProductCategory = 'KAYMAIRA F&B' | 'KAYMAIRA BEAUTY' | 'TVETMARA';

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionEn?: string;
  features: string[];
  featuresEn?: string[];
  image: string;
  badge?: string;
  badgeEn?: string;
  inStock: boolean;
  weightOrSize?: string;
  variants?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export type DeliveryMethod = 'semenanjung' | 'borneo' | 'pickup' | 'cod';

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  deliveryMethod: DeliveryMethod;
  notes: string;
}

export type PageTab = 'home' | 'products' | 'affiliate' | 'about' | 'contact';

export const SOCIAL_LINKS = {
  whatsappPhoneDisplay: '011 2923 2843',
  whatsappRawNumber: '601129232843',
  whatsappChat: 'https://wa.me/601129232843',
  whatsappCatalogue: 'https://wa.me/c/601129232843',
  linktree: 'https://linktr.ee/rafiquedan',
  instagram: 'https://www.instagram.com/rafiquebeli',
  tiktok: 'https://www.tiktok.com/@rafiquebeli',
  facebook: 'https://www.facebook.com/profile.php?id=61594782176856&mibextid=wwXIfr&rdid=JowGkHYHWhb7hi95&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dvq1BfWud%2F%3Fmibextid%3DwwXIfr#',
  email: 'rafiquedan@gmail.com',
};

export const DELIVERY_RATES: Record<
  DeliveryMethod,
  { labelMs: string; labelEn: string; price: number; noteMs: string; noteEn: string }
> = {
  semenanjung: {
    labelMs: 'Pos Laju / J&T (Semenanjung)',
    labelEn: 'Standard Postage (Peninsular Malaysia)',
    price: 8,
    noteMs: 'Percuma untuk pesanan RM80 ke atas',
    noteEn: 'Free for orders RM80 and above',
  },
  borneo: {
    labelMs: 'Pos Udara (Sabah & Sarawak)',
    labelEn: 'Air Postage (Sabah & Sarawak)',
    price: 15,
    noteMs: 'Pengeposan terus ke Malaysia Timur',
    noteEn: 'Direct air parcel to East Malaysia',
  },
  cod: {
    labelMs: 'Cash On Delivery (COD Kawasan Terpilih)',
    labelEn: 'Cash On Delivery (Selected Areas)',
    price: 5,
    noteMs: 'Bayar tunai semasa penghantaran',
    noteEn: 'Pay cash upon delivery',
  },
  pickup: {
    labelMs: 'Ambil Sendiri / Self-Pickup',
    labelEn: 'Self-Pickup',
    price: 0,
    noteMs: 'Hubungi Rafique untuk masa & lokasi pickup',
    noteEn: 'Contact Rafique for pickup time & location',
  },
};
