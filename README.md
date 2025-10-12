# 🌟 Yousef Ayman - Portfolio Website

A modern, responsive portfolio website showcasing my expertise as a Front-end Developer. Built with cutting-edge technologies and featuring comprehensive internationalization support.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC)

## 🚀 Live Demo

Visit the live portfolio: [yusif-ayman.vercel.app](https://yusif-ayman.vercel.app)

## ✨ Features

### 🎨 **Design & UX**

- **Modern UI/UX** with clean, professional design
- **Responsive Design** - Perfect on all devices (mobile, tablet, desktop)
- **Dark/Light Theme** with smooth transitions
- **Smooth Animations** using Framer Motion
- **Gradient Themes** with blue-slate color scheme

### 🌍 **Internationalization**

- **Bilingual Support** - English & Arabic
- **RTL Layout** support for Arabic
- **Direction-aware** components and layouts
- **Localized Content** with proper translations

### 📱 **Sections & Components**

- **Hero Section** - Professional introduction with CTA buttons
- **Skills & Technologies** - Comprehensive tech stack showcase
- **Experience Timeline** - Professional work history with detailed descriptions
- **Education Timeline** - Academic background and certifications
- **Featured Projects** - Interactive project showcase with modal details
- **Client Testimonials** - Social proof from satisfied clients
- **Contact Form** - Professional contact section with social links

### 🎯 **Interactive Features**

- **Project Modals** - Detailed project information with tech stacks
- **Technology Filtering** - Filter projects by technology
- **Loading Animations** - Professional loading states
- **Hover Effects** - Smooth micro-interactions
- **Keyboard Navigation** - Full accessibility support

### ⚡ **Performance & SEO**

- **Server-Side Rendering (SSR)** with Next.js App Router
- **Image Optimization** with Next.js Image component
- **SEO Optimized** with proper meta tags and structure
- **Fast Loading** with optimized assets and code splitting
- **Lighthouse Score 90+** for performance and accessibility

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5.x** - Type safety and better developer experience

### **Styling & UI**

- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Framer Motion 12.x** - Animation library
- **Lucide React** - Beautiful icon library
- **Custom Components** - Reusable, accessible components

### **Internationalization**

- **next-intl 4.x** - Comprehensive i18n solution
- **Custom Routing** - Language-based URL routing
- **RTL Support** - Right-to-left layout support

### **Development Tools**

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Turbopack** - Fast development server

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   ├── projects/      # Projects page
│   │   ├── blog/          # Blog section
│   │   ├── contact/       # Contact page
│   │   └── services/      # Services page
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header
│   ├── ProjectModal.tsx  # Project detail modal
│   ├── ThemeSwitcher.jsx # Theme toggle
│   └── LanguageSelector.tsx
├── sections/             # Page sections
│   ├── Hero.tsx         # Hero section
│   ├── Skills.tsx       # Skills showcase
│   ├── experience.tsx   # Work experience
│   ├── education.tsx    # Education timeline
│   └── testimonials.tsx # Client testimonials
├── data/                # Static data
├── messages/            # Translation files
│   ├── en.json         # English translations
│   └── ar.json         # Arabic translations
├── public/             # Static assets
└── i18n/              # Internationalization config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yussif20/yusif-ayman.git
   cd yusif-ayman
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🌐 Internationalization

The portfolio supports English and Arabic with:

- **URL-based routing**: `/en/` and `/ar/` routes
- **Automatic direction**: LTR for English, RTL for Arabic
- **Translated content**: All text content is localized
- **Cultural adaptation**: Proper formatting for each language

### Adding New Languages

1. Create translation file in `messages/[locale].json`
2. Add locale to `i18n/routing.ts`
3. Update middleware configuration
4. Test RTL/LTR layouts if needed

## 🎨 Customization

### Theme Colors

The portfolio uses a blue-slate gradient theme. To customize:

1. **Update Tailwind classes** in components
2. **Modify CSS variables** for consistent theming
3. **Update theme switcher** logic if needed

### Content Updates

- **Personal info**: Update `messages/` translation files
- **Projects**: Modify `data/ProjectsData.ts`
- **Images**: Replace files in `public/` directory

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for FCP, LCP, CLS
- **Image Optimization**: WebP format with lazy loading
- **Code Splitting**: Automatic with Next.js
- **Bundle Analysis**: Optimized dependencies

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code quality
- **Component-based** architecture
- **Semantic HTML** for accessibility
- **WCAG 2.1 AA** compliance

## 🚀 Deployment

The portfolio is optimized for deployment on:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - With build settings
- **Custom servers** - Using `npm run build && npm run start`

### Environment Variables

No environment variables required for basic functionality.

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Yousef Ayman**

- **Email**: yousef.ayman.dev@gmail.com
- **LinkedIn**: [linkedin.com/in/yousef-ayman](https://linkedin.com/in/yousef-ayman)
- **GitHub**: [github.com/Yussif20](https://github.com/Yussif20)
- **Portfolio**: [yusif-ayman.vercel.app](https://yusif-ayman.vercel.app)

---

⭐ **If you like this portfolio, please give it a star!** ⭐

_Built with ❤️ using Next.js, TypeScript, and Tailwind CSS_
