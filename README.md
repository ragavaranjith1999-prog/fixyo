# FIXYO – Premium Home Appliance Service Website

Fixyo is a modern, high-performance, fully responsive, multi-page frontend website for a professional Home Appliance Service Center located in **Krishnapuram Colony, Madurai, Tamil Nadu – 625014, India**.

This project is built using pure **HTML5, CSS3, and Vanilla JavaScript (ES6+)** with zero external runtime dependencies, no backend, and no database requirement. All bookings are validated on the client side and dispatched directly through **WhatsApp (+91 8489492406)**.

---

## 1. Project Architecture & File Structure

```text
fixyo/
│
├── index.html                   # Homepage (Hero, Services, Why Us, Process, Reviews CTA, FAQ, Location)
├── services.html                # Services Catalog with dynamic client-side category filtering
├── why-choose-us.html           # Value proposition, comparison table, and standards
├── about.html                   # Mission, vision, service philosophy, and business roots
├── reviews.html                 # Genuine customer feedback and Google Review CTA portal
├── faq.html                     # Accessible FAQ accordion with schema markup
├── contact.html                 # Contact details, click-to-call, WhatsApp, map links, and social links
├── booking.html                 # Booking form with Indian mobile validation, summary modal & WhatsApp dispatch
│
├── ac-service-repair.html       # Dedicated AC repair, foam wash, gas filling, and install details
├── refrigerator-repair.html     # Dedicated single/double door & inverter fridge repair details
├── washing-machine-service.html # Dedicated washer spin repair & deep descaling details
├── electrical-service.html      # Dedicated residential electrical & MCB troubleshooting details
├── plumbing-service.html        # Dedicated residential plumbing & leak sealing details
│
├── privacy-policy.html          # Transparent privacy disclosure reflecting client-side WhatsApp workflow
├── 404.html                     # Custom 404 error page matching brand theme
│
├── assets/
│   ├── images/                  # All local image assets (Zero HTTPS hotlinked images)
│   │   ├── logo.png
│   │   ├── favicon.png
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   ├── home-background.png
│   │   ├── home-background.webp
│   │   ├── ac-service.png
│   │   ├── ac-general-service.png
│   │   ├── ac-foam-wash.png
│   │   ├── ac-gas-filling.png
│   │   ├── ac-install.png
│   │   ├── ac-uninstall.png
│   │   ├── fridge-repair.png
│   │   ├── fridge-gas-filling.png
│   │   ├── washing-machine-repair.png
│   │   ├── washing-machine-cleaning.png
│   │   ├── electrical-service.png
│   │   └── plumbing-service.png
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── style.css                # Design system tokens, typography, header, footer, cards, forms, modals
│   ├── responsive.css           # Breakpoints for mobile (<480px), tablet (<768px), and desktop (1024px+)
│   └── animations.css           # Cursor spotlight, scroll reveals, floating badges, reduced-motion overrides
│
├── js/
│   ├── main.js                  # Loader, sticky header, scroll-to-top, dynamic copyright year, FAQ accordion
│   ├── navigation.js            # Mobile drawer toggle, keyboard navigation, active page highlighting
│   ├── services.js              # Single source of truth dataset & interactive category filtering
│   ├── booking.js               # Form validation (phone regex, min date), summary preview, WhatsApp encoding
│   ├── animations.js            # Smooth cursor follower spotlight and IntersectionObserver scroll reveals
│   └── seo.js                   # Central Google Analytics 4, GTM, Google Ads, and consent banner config
│
├── robots.txt                   # Crawler permissions & sitemap reference
├── sitemap.xml                  # Canonical XML sitemap with 2026-11-14 timestamps
├── site.webmanifest             # PWA web manifest
├── browserconfig.xml            # Windows tile configuration
├── humans.txt                   # Site and author credits
├── security.txt                 # RFC 9116 security contact specification
├── llms.txt                     # AI / LLM crawler business summary
├── ads.txt                      # Monetization placeholder
├── .nojekyll                    # GitHub Pages routing compatibility
├── .gitignore                   # Git exclusion rules
├── vercel.json                  # Production Vercel headers, routing, and clean URLs
├── LICENSE                      # MIT License
└── README.md                    # Project documentation
```

---

## 2. How to Edit Business Information

Fixyo’s core business information is centralized:

1. **Address & Location:**
   - Address: `Krishnapuram Colony, Madurai, Tamil Nadu – 625014, India`
   - Mentioned in `index.html`, `contact.html`, `about.html`, and in all footers.
2. **Phone Number:**
   - `+91 8489492406` (Call links use `tel:+918489492406`)
3. **Social Links:**
   - Instagram: `https://www.instagram.com/fixyo.in/?hl=en`
   - Facebook: `https://www.facebook.com/profile.php?id=61594001221780`
   - Google Reviews: `https://g.page/r/CQqPJRdtw3aMEBM/review`

To change any contact number or address, use find and replace across the HTML files and update `js/seo.js`.

---

## 3. How to Replace Logo and Images

All graphics are 100% local. To replace any graphic:

1. **Logo:** Replace `assets/images/logo.png` (recommended dimensions: ~420x100px PNG with transparent background).
2. **Favicons:** Replace `assets/images/favicon.png` (192x192), `favicon.ico` in the root, and `apple-touch-icon.png` in the root.
3. **Hero Background:** Replace `assets/images/home-background.png` (1920x1080) and `assets/images/home-background.webp`.
4. **Service Images:** Replace the respective file inside `assets/images/` (e.g., `ac-service.png`, `fridge-repair.png`) maintaining 800x500px aspect ratio.

---

## 4. How to Edit Service Prices

All services and starting rates are defined in `js/services.js`:

```javascript
// Example in js/services.js:
{
  id: "ac-1",
  name: "AC Repair Service",
  category: "AC",
  price: "₹499",
  ...
}
```

Updating the `price` field in `js/services.js` updates the dynamic category grid on `services.html` and dropdown selections in `booking.html`. For static landing card references, update the corresponding `₹` value in the respective `.html` file.

---

## 5. How to Edit the Booking WhatsApp Number

The target WhatsApp number is controlled in `js/booking.js` and `js/seo.js`:

```javascript
// In js/booking.js:
const TARGET_WHATSAPP_NUMBER = "918489492406";
```

Provide the country code without `+` or spaces (e.g., `91` followed by the 10-digit mobile number).

---

## 6. How to Update SEO Titles & Descriptions

Every HTML file contains unique, carefully crafted meta tags in the `<head>` block:

```html
<title>Unique Page Title | Fixyo Madurai</title>
<meta name="description" content="Unique description for search engines.">
<meta name="keywords" content="Relevant keyword phrases">
<link rel="canonical" href="https://fixyo.in/page-name.html">
```

When editing, ensure:
- The title remains under 60 characters.
- The description remains between 130–160 characters.
- Update Open Graph (`og:title`, `og:description`) and Twitter Card tags to match.

---

## 7. Configuring Google Analytics (GA4), GTM & Google Ads

All tracking keys are located in **`js/seo.js`**:

```javascript
window.FIXYO_CONFIG = {
  GA4_MEASUREMENT_ID: "G-XXXXXXXXXX",         // Replace with your GA4 ID (e.g. G-8472948291)
  GTM_CONTAINER_ID: "GTM-XXXXXXX",             // Replace with your GTM ID (e.g. GTM-N5L3K9)
  GOOGLE_ADS_ID: "AW-XXXXXXXXXX",              // Replace with your Google Ads ID
  GOOGLE_ADS_LABEL: "XXXXXXXXXXXX",            // Replace with your Conversion Label
  GOOGLE_SEARCH_CONSOLE_CODE: "YOUR_CODE_HERE", // Search Console verification
  REQUIRE_CONSENT: true                        // Displays cookie banner before firing tags
};
```

*Note: The website will **not** attempt to load third-party Google scripts as long as placeholder values (`XXXXX`) are present, ensuring zero console errors or failed network requests during local testing.*

---

## 8. Google Search Console Verification

In `index.html`, locate the `<head>` section and add:

```html
<meta name="google-site-verification" content="YOUR_SEARCH_CONSOLE_VERIFICATION_CODE">
```

Alternatively, configure DNS TXT records with your domain registrar.

---

## 9. How to Upload Project to GitHub

1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Fixyo production website"
   ```
2. Create a new repository on [GitHub](https://github.com).
3. Connect your remote repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/fixyo.git
   git branch -M main
   git push -u origin main
   ```

---

## 10. How to Deploy to Vercel

### Method A: Deploy via Vercel Dashboard (Zero Build Required)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New... > Project**.
3. Import your `fixyo` GitHub repository.
4. Leave **Framework Preset** as **Other**.
5. Set **Build Command** to empty (None) and **Output Directory** to `.` (Root).
6. Click **Deploy**. Vercel will deploy the site with `vercel.json` routing within 10 seconds.

### Method B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

---

## 11. How to Configure a Custom Domain (e.g., fixyo.in)

1. In your Vercel Project Settings, navigate to **Domains**.
2. Enter your custom domain (e.g., `fixyo.in`).
3. Add the DNS records provided by Vercel into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **A Record:** `@` points to `76.76.21.21`
   - **CNAME Record:** `www` points to `cname.vercel-dns.com`
4. Vercel will automatically provision free SSL certificates via Let's Encrypt.

---

## 12. Quality & Accessibility Compliance (WCAG 2.2 AA)

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Contrast ratios exceed 4.5:1 for body copy and 3:1 for large headlines.
- Full keyboard operability with visible focus rings (`:focus-visible`).
- Accessible skip link to jump directly to main content.
- Complete ARIA attributes (`aria-expanded`, `aria-label`, `aria-haspopup`, `aria-modal`) on toggles, accordions, and dialogs.
- `prefers-reduced-motion` fully respected—disables cursor spotlight, smooth scrolls, and loading delays for users requesting reduced motion.

---

## 13. License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
