# rafiquebeli — Official E-Commerce & Affiliate Web Store

A modern, mobile-responsive e-commerce and affiliate storefront for **rafiquebeli** ("shop smarter, happier"). Features seamless product browsing across KAYMAIRA F&B, KAYMAIRA BEAUTY, and TVETMARA, an interactive cart that generates pre-formatted WhatsApp Business checkout orders with customer delivery information, an integrated product catalog editor for the business owner, and a dedicated affiliate and social media showcase.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Choices from Phase 1 Interview:**
> - **Product Catalog & Management**: Pre-populates with realistic Malaysian bestsellers across KAYMAIRA F&B, KAYMAIRA BEAUTY, and TVETMARA, paired with an integrated in-app **Product Manager** (pin-code protected or quick-toggle) allowing the owner to add, edit, or adjust items, prices, and stock on the fly.
> - **WhatsApp Order Details**: Checkout form collects Customer Full Name, WhatsApp Phone Number, Delivery Address, Delivery Method (PosLaju/J&T Postage, COD, or Self-Pickup), and Order Notes before firing the formatted WhatsApp message.
> - **Brand Aesthetic**: Warm, playful, and approachable aesthetic inspired by the uploaded logo badge (warm golden honey `#F59E0B` / `#FBBF24`, soft sky blue `#38BDF8`, clean cream backdrop `#FFFDF8`, and friendly typography).
> - **Social & External Links**: Direct new-tab access (`target="_blank" rel="noopener noreferrer"`) for:
>   - WhatsApp Business: `011 2923 2843` / `https://wa.me/601129232843`
>   - WhatsApp Catalogue: `https://wa.me/c/601129232843`
>   - Affiliate Link: `https://linktr.ee/rafiquedan`
>   - Instagram: `@rafiquebeli` (`https://www.instagram.com/rafiquebeli`)
>   - TikTok: `@rafiquebeli` (`https://www.tiktok.com/@rafiquebeli`)
>   - Facebook: Official page (`https://www.facebook.com/profile.php?id=61594782176856...`)

---

## 1. Overview & Core Concept

### What It Does
**rafiquebeli** provides a fast, frictionless retail and affiliate shopping experience:
1. **Multi-Category Storefront**: Easy tabbed browsing across **KAYMAIRA F&B** (curated Malaysian delicacies, sambal, snacks, beverages), **KAYMAIRA BEAUTY** (skincare serums, botanical soaps, lip care, beauty sets), and **TVETMARA** (vocational craftsmanship, local artisan merchandise, apparel, student enterprise products).
2. **Interactive Cart & Instant WhatsApp Checkout**: Customers can adjust quantities, select delivery method, enter shipping details, and tap **"Send Order to WhatsApp"**. The system instantly builds a clean Malaysian WhatsApp message formatted with itemized lists, pricing in RM, customer details, and total, opening WhatsApp directly.
3. **Owner Catalog Manager**: A dedicated management modal allowing Rafique to add new products, edit pricing, upload image URLs or select product badges, and toggle active status saved to local storage.
4. **Affiliate & Linktree Hub**: A dedicated page and banner highlighting `https://linktr.ee/rafiquedan` with quick-copy referral links, featured partner deals, and direct social cards.
5. **About Us & Contact**: Inspiring brand backstory about rafiquebeli's mission ("shop smarter, happier"), direct contact cards, business hours, and interactive WhatsApp and social links.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Discovery & Browsing**:
   - Header with rafiquebeli logo mark, navigation (Home, Products, Affiliate, About Us, Contact), and floating/header Cart trigger with badge count.
   - Hero banner introducing the brand slogan *"shop smarter, happier"* with quick-action buttons to "Browse Catalog" or "View WhatsApp Catalogue".
   - Category selector pills (All, KAYMAIRA F&B, KAYMAIRA BEAUTY, TVETMARA) with instant live filtering and search bar.
2. **Cart & WhatsApp Checkout**:
   - Slide-over cart drawer showing selected items, unit prices, quantity increment/decrement, and subtotal.
   - Form fields: Customer Name, Phone Number, Shipping Address, Delivery Option (Pos Laju / J&T postage RM8 / East Malaysia RM15 / Self-Pickup RM0 / COD area), and Customer Notes.
   - Primary Action: Large green WhatsApp checkout button that launches `https://wa.me/601129232843?text=...` with complete URL-encoded order specifications.
3. **Affiliate & Social Hub**:
   - Featured Linktree button card (`https://linktr.ee/rafiquedan`).
   - Grid of social channels (Instagram, TikTok, Facebook, WhatsApp Business) with follower badges and tap-to-open actions.
4. **Owner Management Mode**:
   - Subtle "Store Admin / Manage Catalog" trigger in footer or settings icon.
   - Modal to add new product, edit existing product name/price/category/image/description, or reset to default curated catalog.

### Visual Identity & Theme Tokens
- **Palette**:
  - Dominant Neutral Canvas (60%): `#FFFDF7` (Warm cream ivory), `#FFFFFF` for product card surfaces, `#F8F6F0` for section contrasts.
  - Structural Tones (30%): `#1E293B` (Deep slate for crisp legibility), `#64748B` (Muted metadata), `#F1EDE4` (Hairline dividers).
  - Brand Accents (10%): Warm Honey Golden Amber `#F59E0B` & `#FBBF24` paired with Sky Blue `#0284C7` & `#38BDF8` reflecting the logo's dual yellow & blue bubbly lettering, plus WhatsApp Emerald `#25D366` for direct WhatsApp conversions.
- **Typography**:
  - Display & Headings: `Plus Jakarta Sans` / `Outfit` (Friendly geometric neo-grotesque with clean curved terminals).
  - Body & Reading: `Plus Jakarta Sans` (15px-16px, 1.6 line height).
  - Prices & Numbers: `tabular-nums font-mono` for pristine RM currency baselines.
- **Top Bar Contract**:
  - Zone 1: Circular Logo Badge + "rafiquebeli" wordmark.
  - Zone 2: Navigation Links (Home, Products, Affiliate, About, Contact).
  - Zone 3: Cart Trigger (with item badge) + "WhatsApp Chat" quick action.
- **Mobile Touch Governance**:
  - Bottom mobile action bar with Cart trigger, WhatsApp quick button, and Category jump button within the 15% mobile viewport sticky height budget.

---

## 3. Key Product Decisions & Trade-Offs

- **WhatsApp Deep Linking over Traditional Gateway**:
  - *Chosen Approach*: Standard Malaysian e-commerce WhatsApp checkout protocol (`https://wa.me/601129232843?text=...`).
  - *Why*: Direct, high trust, no payment gateway fees or merchant account delays, allowing customer to talk directly with Rafique, send payment receipts, or request customized bundling.
- **In-App Persistent Catalog Management**:
  - *Chosen Approach*: Reactive state pre-populated with Malaysian bestsellers across all three categories, backed by `localStorage` persistence and export/import capability.
  - *Why*: Allows the owner to customize products immediately from their phone or browser without redeploying code.
- **Single Page Navigation with Seamless Tab Switching**:
  - *Chosen Approach*: Fast, zero-reload multi-page router with smooth transitions between Home, Catalog, Affiliate, About, and Contact.
  - *Why*: Blazing performance on mobile web without broken routes or page reloads.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          rafiquebeli Web App                           │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Navigation Header (Logo, Nav Links, Cart Counter, Socials)        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                    │
│        ┌──────────────────────────┼─────────────────────────┐          │
│        ▼                          ▼                         ▼          │
│  ┌───────────────┐        ┌───────────────┐        ┌────────────────┐  │
│  │ Storefront /  │        │ Affiliate Hub │        │ About & Contact│  │
│  │ Catalog View  │        │ (Linktree +   │        │ (Brand Story,  │  │
│  │ - F&B         │        │ Social Cards) │        │ Social Grid,   │  │
│  │ - Beauty      │        └───────────────┘        │ Direct Message)│  │
│  │ - TVETMARA    │                                 └────────────────┘  │
│  └───────┬───────┘                                                     │
│          │                                                             │
│          ▼                                                             │
│  ┌───────────────┐        ┌─────────────────────────────────────────┐  │
│  │ Shopping Cart │ ───►   │ WhatsApp Order Generator                │  │
│  │ & Delivery    │        │ (Formats itemized bill + delivery info  │  │
│  │ Modal Drawer  │        │  and opens wa.me/601129232843)          │  │
│  └───────────────┘        └─────────────────────────────────────────┘  │
│          │                                                             │
│          ▼                                                             │
│  ┌───────────────┐                                                     │
│  │ Owner Catalog │ ◄── [Add / Edit / Remove Products / LocalStorage]   │
│  │ Manager Modal │                                                     │
│  └───────────────┘                                                     │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Schema
- **Product**:
  - `id: string`
  - `name: string`
  - `category: 'KAYMAIRA F&B' | 'KAYMAIRA BEAUTY' | 'TVETMARA'`
  - `price: number` (in MYR)
  - `originalPrice?: number`
  - `description: string`
  - `features: string[]`
  - `image: string`
  - `badge?: string`
  - `inStock: boolean`
- **CartItem**:
  - `product: Product`
  - `quantity: number`
- **CustomerDetails**:
  - `name: string`
  - `phone: string`
  - `address: string`
  - `deliveryMethod: 'postage' | 'pickup' | 'cod'`
  - `notes: string`

### WhatsApp Message Template Format
```text
🛍️ *TEMPAHAN BARU / NEW ORDER - RAFIQUEBELI*
----------------------------------------
Pelanggan: [Customer Name]
No Telefon: [Phone Number]
Kaedah Penghantaran: [Postage / COD / Self-Pickup]
Alamat Penghantaran: [Delivery Address]

*SENARAI PESANAN:*
1. [Product Name] x [Qty] - RM [Subtotal]
2. [Product Name] x [Qty] - RM [Subtotal]

Subtotal Produk: RM [Subtotal]
Kos Penghantaran: RM [Shipping]
*JUMLAH KESELURUHAN: RM [Total]*
----------------------------------------
Nota Tambahan: [Notes]

Terima kasih Rafique! Sila sahkan akaun pembayaran dan maklumat penghantaran.
```

---

## 5. Verification & Quality Steps
- [ ] Cart item addition, subtraction, deletion, and subtotal calculation with delivery options.
- [ ] WhatsApp message payload construction and verification of direct URL triggering.
- [ ] Verification of all outbound social links (`target="_blank" rel="noopener noreferrer"`):
  - WhatsApp Business chat: `https://wa.me/601129232843`
  - WhatsApp Catalogue: `https://wa.me/c/601129232843`
  - Affiliate: `https://linktr.ee/rafiquedan`
  - Instagram: `https://www.instagram.com/rafiquebeli`
  - TikTok: `https://www.tiktok.com/@rafiquebeli`
  - Facebook: direct user URL
- [ ] Owner catalog management modal testing: adding new items and modifying existing products.
- [ ] Responsive testing across desktop (1440px) and mobile viewport touch targets.
- [ ] Zero build/compilation errors.
