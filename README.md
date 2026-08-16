# ⚜️ Velnora — Luxury Saree & Apparel Storefront

Welcome to **Velnora**, a state-of-the-art, premium e-commerce web application designed for a luxury saree and fashion brand. Combining rich aesthetics, smooth animations, and a comprehensive management dashboard, Velnora offers an elite shopping experience.

---

## ✨ Features

### 🛍️ Client Storefront
* **Dynamic Hero Slideshow**: Smoothly transitioning background images highlighting luxury fabric collections with a "Freedom Sale" call-to-action overlay.
* **Curated Fresh Drops**: A dedicated section for new arrivals with dynamic filters, real-time discount calculations, wishlist toggles, and interactive color swatches.
* **Editorial Highlights**: Curated sections like "Velnora Collection" (Internet's Favourites), "Trend Translation", and a dedicated "Blog Journal" for editorial content.
* **Interactive Cart Drawer**: A slide-out panel allowing users to adjust quantities, see instant subtotal updates, and view free shipping progress bars.
* **Quick Detail Modal**: Clicking on products triggers a rich overlay modal with size selectors, detailed descriptions, and image zooming.

### 🔔 Custom Notification System (Toasts & Alerts)
* **Interactive Toast Stack**: Floating glassmorphic notifications with slide-in animations. Features specific color-coded levels: success (emerald/rose-gold), warning (amber), error (sunset red), and info (blue) with custom Lucide icons and countdown timeline progress bars.
* **Themed Modal Dialogs**: Standard blocking alerts are replaced with elegant, centered overlay cards featuring blur backdrops and premium action buttons.
* **Robust Global Interception**: Overrides the native browser `window.alert()` to guarantee consistent, high-end styling even for unmigrated alerts or console-triggered scripts.
* **Dual-Theme Adaptive**: Automatically matches the active theme — whether using the primary Ivory style or the dark Midnight Lounge aesthetic.

### 🛡️ Admin Suite
* **Secure Login**: Dedicated login panel for site administrators.
* **Interactive Dashboard**: Control panel displaying total sales, product counts, and active promotions.
* **Inventory Control**: Add new products (with categories, images, and pricing) or update existing catalogs in real-time.

### 🎨 Design & Interactions
* **Mobile-First Optimization**: Designed primarily with a mobile-first philosophy for modern smartphones and touch screens. While fully compatible and responsive on desktop/laptop screens, the layout offers the most seamless, native-app-like experience on mobile.
* **Smooth Micro-animations**: Subtle hover transitions, fade-in lists, rotating coupon badges, and loading states.
* **Vibrant Styling**: Custom Vanilla CSS system with carefully selected typography (Bodoni Moda & Inter) and a warm coral/gold color palette.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite 8](https://vite.dev/)
* **Iconography**: [Lucide React](https://lucide.dev/)
* **Styling**: Vanilla CSS with customized variable tokens.
* **Code Quality**: [Oxlint](https://oxc.rs/) for rapid code linting.

---

## 📂 Project Structure

```bash
├── public/                     # Static assets (images, icons, robots.txt)
│   ├── images/                 # Saree and apparel images
│   ├── fresh_drops_banner.jpg  # Banner assets
│   └── favicon.svg             # Webapp logo
├── src/
│   ├── assets/                 # App assets (CSS, logos)
│   ├── components/             # Reusable UI Components
│   │   ├── AdminDashboard.jsx  # Inventory and sales admin suite
│   │   ├── CartDrawer.jsx      # Shopping cart sliding panel
│   │   ├── FreshDrops.jsx      # New arrivals grid & campaign banner
│   │   ├── Hero.jsx            # Slideshow header & Freedom Sale banner
│   │   ├── Navbar.jsx          # Header navigation, search, & wishlist
│   │   ├── NotificationProvider.jsx # Custom themed toast & alert modal context provider
│   │   ├── Notification.css    # Responsive toast and alert styles (Ivory / Midnight Lounge)
│   │   ├── ProductDetailView.jsx# Deep-dive product details and reviews
│   │   ├── SpecialOffers.jsx   # Interactive coupon badges
│   │   └── WelcomePopup.jsx    # First-visit promotional trigger
│   ├── data/
│   │   └── defaultProducts.js  # Sample luxury inventory data
│   ├── App.jsx                 # Main state coordinator & view router
│   ├── index.css               # Global CSS variables, reset, & keyframes
│   └── main.jsx                # React application entry point (bootstraps NotificationProvider)
├── package.json                # Project dependencies and script runner
└── vite.config.js              # Vite compiler configurations
```

---

## 🚀 Getting Started

To get a local copy of this project running, follow these steps:

### Prerequisites

* Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).
* Ensure `npm` is configured on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stefinmathew66-lab/saree-new.git
   ```
2. Navigate to the project folder:
   ```bash
   cd saree-new
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To compile the application into production-ready static assets:
```bash
npm run build
```
The compiled build output will be located in the `dist/` directory.

---

## 📄 License

This project is configured for demonstration and commercial cataloguing purposes. All rights reserved.
