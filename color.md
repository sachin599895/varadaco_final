# 🎨 Makhana Website - Color Palette & Design Tokens

Yeh document website me use hone wale saare colors (Hex codes, Tailwind classes, CSS variables) aur unke usage ki complete reference guide hai.

---

## 1\. Core Brand Colors (Global Variables)

Yeh colors \[src/app/globals.css\](file:///Users/sonusingh/Makhana-Website/src/app/globals.css) me define kiye gaye hain:

| Token / Variable | Hex Code | Visual Name | Description & Usage |
| --- | --- | --- | --- |
| `--background` | `#FAF8F5` | Warm Organic Cream | Website ka default body background |
| `--foreground` | `#1E251F` | Deep Charcoal Pine | Default body text & typography |
| `--primary` | `#15803D` | Botanical Forest Green | Primary brand color, standard buttons & active states |
| `--secondary` | `#EAB308` | Makhana Gold / Turmeric | Secondary brand color & warm accents |
| `--accent` | `#F97316` | Roasted Spice Orange | Attention badges, micro-highlights & CTAs |

---

## 2\. Comprehensive Color Classification

### 🌿 A. Botanical Greens & Earthy Tones (Brand Identity)

-   `#7CA832` (Leaf / Lime Green) — *Used 95+ times*
    -   Role: Primary accent green, badges, decorative borders, active pill indicators, icon highlights.
    -   Locations: `Hero.tsx`, `FlavorExplorer.tsx`, `FarmPhilosophy.tsx`, `FarmStats.tsx`, `BlogAndPillars.tsx`, `about-us/page.tsx`, `products/page.tsx`, `contact/page.tsx`.
-   `#3B592D` (Deep Olive Green) — *Used 42 times*
    -   Role: Section subheadings, comparison table titles, active borders, running ticker badge text.
    -   Locations: `RunningTicker.tsx`, `FarmStats.tsx`, `FarmToFork.tsx`, `FlavorExplorer.tsx`, `products/page.tsx`.
-   `#2D5A27` (Dark Forest Green) — *Used 12 times*
    -   Role: Raw/Classic Makhana card titles, hero pill backgrounds.
-   `#1B3626` & `#0F3822` (Mithila Royal Green)
    -   Role: Makhana Offerings luxury card backgrounds, Journey milestone circle badges.
    -   Locations: `MakhanaOfferings.tsx`, `MakhanaJourney.tsx`, `privacy-policy/page.tsx`.
-   `#0D2619`, `#143B28`, `#173F2B`, `#1B4B34` (Luxury Dark Green Gradient)
    -   Role: Dark footer container background gradient, entry popup modal dark surface.
    -   Locations: `Footer.tsx`, `EntryPopupModal.tsx`.
-   `#25D366` (WhatsApp Official Green)
    -   Role: Floating WhatsApp widget & contact chat CTA.
    -   Locations: `WhatsAppWidget.tsx`, `contact/page.tsx`.
-   Other Natural Greens:
    -   `#688a29` (Hero button & badge)
    -   `#4d743a` (Farm stats counter icon)
    -   `#2d4322` (Dark olive hover states)
    -   `#8cb369` (Wave divider SVG)
    -   `#a3e635` (Makhana Magic lime card)

---

### 🍯 B. Golden, Amber & Roasted Flavors (Crispiness & Warmth)

-   `#E8A324` (Makhana Gold / Crunchy Corn) — *Used 31 times*
    -   Role: Aarogya Club premium membership badges, Gold glow rings, Women Farmer accents, rating stars.
    -   Locations: `AarogyaClub.tsx`, `WomenFarmers.tsx`, `FlavorExplorer.tsx`, `RunningTicker.tsx`.
-   `#C98C19` & `#8A5D14` (Deep Ochre / Honey Gold)
    -   Role: Gold button gradients, cheese/butter flavor card accents.
-   `#D97706` & `#B45309` & `#92400E` (Roasted Caramel / Amber)
    -   Role: Classic Himalayan Salt & Roasted flavor typography and borders.
    -   Locations: `Hero.tsx`, `products/page.tsx`.
-   `#FBBF24` & `#F59E0B` (Bright Sunflower Amber)
    -   Role: Review star ratings, flavor card highlights.

---

### 🌶️ C. Spicy Chili Red & Berry Tones (Peri-Peri & Tangy Flavors)

-   `#DC2626`, `#B91C1C`, `#991B1B`, `#851818` (Fiery Chili Red)
    -   Role: Peri-Peri flavor slides, YouTube media badges, error/notice highlights.
    -   Locations: `Hero.tsx`, `MakhanaMagic.tsx`, `TestimonialsAndMedia.tsx`.
-   `#FBE4E5`, `#F5D0D2`, `#F8D7D9` (Rose Pastel)
    -   Role: Referral Rewards card background & outer soft borders.
    -   Locations: `ReferralRewards.tsx`.
-   `#852932`, `#6E2D31` (Tangy Tomato Maroon)
    -   Role: Tomato flavor cards & Ayurveda pillar badges.
-   `#BE185D`, `#D946EF`, `#DB2777`, `#EC4899`, `#F472B6` (Lotus Magenta & Petal Pink)
    -   Role: Lotus flower botanical illustrations, cultivation step icons in `MakhanaJourney.tsx` and `FarmToFork.tsx`.

---

### 🌊 D. Aquatic, Mint & Teal (Fresh Pudina & Clean Water)

-   `#0284C7` & `#0369A1` (Clean Sky Blue)
    -   Role: Himalayan Salt / Cool Breeze hero slide accents.
-   `#0D9488`, `#0F766E`, `#115E59`, `#134E4A`, `#34D399`, `#38BDF8` (Pudina Mint & Teal)
    -   Role: Pudina flavor card gradients, mint badges, fresh organic indicators.
    -   Locations: `Hero.tsx`, `MakhanaMagic.tsx`, `contact/page.tsx`.
-   `#06B6D4` & `#0891B2` (Fresh Water Cyan)
    -   Role: Pond processing & natural wetland water harvesting icons in `FarmToFork.tsx`.

---

### 🥛 E. Warm Neutral, Cream & Surface Gradients

-   `#FAF8F5`: Global Default Background (`body`, `main` tags).
-   `#FDFDFB`, `#FDFDFA`, `#FDFBF7`, `#FCFBF9`: Soft off-white cards, testimonial quote containers.
-   `#FAFBFA`, `#FAF9F6`, `#F5F8F3`, `#F0F4EF`: FAQ accordions, nutrition tables, stat boxes.
-   `#F5F2EB`: Section bottom gradient blend.
-   Hero Slide Gradients:
    -   Classic Salt: `from-[#FFFDF5] via-[#FEF9E7] to-[#FDEFD0]`
    -   Peri Peri: `from-[#FFF5F4] via-[#FCE8E6] to-[#FADBD8]`
    -   Pudina Punch: `from-[#F2FBF9] via-[#E4F5F1] to-[#D5EFE9]`
    -   Natural Raw: `from-[#F4F9F1] via-[#EBF3E6] to-[#E2EEDC]`
-   `#F1F0EC` & `#D1CFC7`: Custom Webkit scrollbar track & thumb.

---

### 🌐 F. Social Media Gradients & Icons

-   WhatsApp: `#25D366`
-   Facebook: `#1877F2`
-   Twitter / X: `#1DA1F2`
-   Instagram Gradient: `bg-gradient-to-tr from-[#F9CE34] via-[#EE2A7B] to-[#6228D7]`

---

## 3\. Component-Wise Color Mapping

| Component | Main Background | Accent / Highlight | Text Colors |
| --- | --- | --- | --- |
| Header (`src/components/Header.tsx`) | `white/85` (backdrop blur) | `emerald-700`, `zinc-200` border | `emerald-900`, `zinc-800` |
| Footer (`src/components/Footer.tsx`) | `#0D2619` → `#143B28` → `#173F2B` | `emerald-400`, `amber-400` | `zinc-100`, `zinc-400` |
| Hero Slider (`src/components/home/Hero.tsx`) | Multi-flavor pastel gradients | `#7CA832`, `#E8A324`, `#DC2626` | Deep flavor-toned zincs |
| Aarogya Club (`src/components/home/AarogyaClub.tsx`) | `zinc-950` / `zinc-900` | `#E8A324` (Gold), `#C98C19` | `amber-100`, `zinc-400` |
| Offerings (`src/components/home/MakhanaOfferings.tsx`) | `#FAF8F5` & `#F0F7F2` | `#1B3626`, `teal-900/15` | `emerald-950`, `zinc-700` |
| WhatsApp Widget (`src/components/WhatsAppWidget.tsx`) | `#25D366` (Floating bubble) | `emerald-500` pulse | White `#FFFFFF` |
| Referral Rewards (`src/components/home/ReferralRewards.tsx`) | `#FBE4E5` & `#F8D7D9` | `#F5D0D2`, `red-500` | `zinc-900`, `zinc-600` |
| Journey (`src/components/about/MakhanaJourney.tsx`) | `#F9F7F1` | `#0F3822`, `#15803D`, `#F472B6` | `zinc-800`, `zinc-500` |
| Products Page (`src/app/products/page.tsx`) | `#FAF8F5` | `#7CA832`, `#3B592D`, `emerald-700` | `zinc-900`, `zinc-600` |

---

## 4\. Tailwind CSS Utility Scales Used

Website me in standard Tailwind color families ka use kiya gaya hai:

-   `zinc-*` (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950): Universal neutrals, borders, body text.
-   `emerald-*` (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950): Buttons, pills, badges, success states.
-   `amber-*` (50, 100, 200, 300, 400, 500, 700, 900): Rating stars, warmth indicators, Gold tier badges.
-   `teal-*` (100, 200, 500, 600, 700, 900): Mint & fresh organic sections.
-   `red-*` (200, 500, 600, 700): Referral banners, spicy tags.