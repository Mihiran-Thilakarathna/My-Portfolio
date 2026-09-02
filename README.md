<div align="center">

# Mihiran Thilakarathna | Portfolio 🚀

A modern, responsive portfolio showcasing AI/ML and software development projects.  
Built with React, TypeScript, and Vite — with a Firebase-backed admin dashboard for managing content without touching code.

[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

<br/>

[![View Live Demo](https://img.shields.io/badge/-View%20Live%20Demo-2ea44f?style=flat-square&logoColor=white&labelColor=2ea44f)](https://mihiran.me)

</div>

---

## ✨ Features

- 🎭 **Smooth Animations** — Framer Motion page transitions, scroll-triggered reveals, and typewriter effects
- 📱 **Fully Responsive** — Seamless experience from mobile to desktop
- 🤖 **AI Chat Assistant** — Floating chatbot with quick prompts to explore projects, skills, and contact info
- 📩 **Working Contact Form** — Messages sent directly via EmailJS to the owner's inbox
- 📜 **Certificate Viewer** — View and download certifications as PDFs
- 🗂️ **Project Filtering** — Filter projects by category (AI/ML, Web, Mobile)
- 🧭 **Scroll Spy Navigation** — Active section highlighting in the navbar
- 🎛️ **Admin Dashboard** — Add, edit, and delete projects, certifications, education, work history, and achievements from `/admin`, no redeploy needed
- ☁️ **Live Content Sync** — Content is stored in Firestore and read straight from there, so dashboard edits appear on the site instantly

---

## 🏗️ Project Structure

```
Portfolio/
├── public/
│   ├── certificates/    # Certificate PDF files
│   ├── competitions/    # Competition photos
│   ├── 404.html         # SPA fallback for GitHub Pages client-side routing
│   └── CNAME             # Custom domain (mihiran.me)
├── src/
│   ├── assets/           # Images bundled at build time
│   ├── admin/             # Admin dashboard
│   │   ├── AdminApp.tsx        # Routes: /admin/login + protected /admin/*
│   │   ├── AdminLogin.tsx      # Email/password sign-in
│   │   ├── AdminLayout.tsx     # Sidebar + page shell
│   │   ├── AuthContext.tsx     # Firebase Auth state
│   │   ├── ProtectedRoute.tsx  # Redirects to login when signed out
│   │   ├── EntityListPage.tsx  # Generic list view for any collection
│   │   ├── EntityForm.tsx      # Generic add/edit form, driven by entityConfig
│   │   ├── entityConfig.ts     # Field schema per content type
│   │   ├── seedData.ts         # Powers the "Import Existing Data" button
│   │   └── admin.css
│   ├── components/       # Portfolio UI components
│   │   ├── Header.tsx        # Navigation bar with scroll spy
│   │   ├── Hero.tsx          # Landing section with circular text animation
│   │   ├── About.tsx         # Bio, stats, and skill carousel
│   │   ├── Work.tsx          # Work experience cards
│   │   ├── Education.tsx     # Education timeline & certifications grid
│   │   ├── Projects.tsx      # Filterable project gallery
│   │   ├── Achievements.tsx  # Competitions & achievements
│   │   ├── Contact.tsx       # Contact form (EmailJS) & social links
│   │   ├── Footer.tsx        # Footer with back-to-top button
│   │   ├── ChatAssistant.tsx # AI chat assistant
│   │   ├── CustomCursor.tsx  # Custom pointer (portfolio pages only)
│   │   ├── LoadingScreen.tsx # Initialization loading animation
│   │   └── SectionDivider.tsx
│   ├── contexts/         # React context providers (Theme)
│   ├── data/             # Bundled portfolio content, used as Firestore fallback/seed
│   ├── hooks/
│   │   ├── usePortfolioData.ts # Live Firestore data with static fallback
│   │   ├── useScrollSpy.ts     # Active section detection
│   │   └── useScrollToTop.ts   # Back-to-top button logic
│   ├── services/
│   │   ├── firestoreCollection.ts # Firestore CRUD + realtime subscription
│   │   └── uploadFile.ts          # Cloudinary uploads for images/PDFs
│   ├── types/            # TypeScript type definitions
│   ├── firebase.ts       # Firebase app/auth/firestore init
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages auto-deploy
├── firebase.json          # Firebase Hosting + Firestore config
├── firestore.rules        # Public read, signed-in-only write
├── .env                   # EmailJS credentials (git-ignored)
├── .env.local             # Firebase + Cloudinary credentials (git-ignored)
├── .env.local.example     # Template for the above
├── package.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Core Framework | React 19 + TypeScript 5.9 |
| Build Tool | Vite 7 |
| Animations | Framer Motion, React Type Animation |
| Styling | Vanilla CSS with CSS Variables, Flexbox & Grid |
| Icons | React Icons (FontAwesome, Feather) |
| Routing | React Router (client-side `/admin` routes) |
| Content Database | Firebase Firestore |
| Admin Auth | Firebase Authentication (email/password) |
| File Uploads | Cloudinary (project images, certificate PDFs, event photos) |
| Contact Form | EmailJS |
| Deployment | Firebase Hosting (primary) + GitHub Pages via GitHub Actions |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Mihiran-Thilakarathna/My-Portfolio.git
cd My-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file for EmailJS:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Copy `.env.local.example` to `.env.local` and fill in Firebase + Cloudinary credentials:
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

- Firebase values come from Project Settings → General → Your apps, in the [Firebase Console](https://console.firebase.google.com/).
- Cloudinary values come from your [Cloudinary dashboard](https://cloudinary.com/console) and an **unsigned** upload preset under Settings → Upload.

Without these, the site still runs fine using the bundled data in `src/data/portfolio.ts` — the admin dashboard just won't be reachable.

### 4. Run in development mode
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 📦 Deployment

### Firebase Hosting (dashboard-connected site)

```bash
npm run deploy
```

Deploys the built site plus Firestore rules to Firebase Hosting. First-time setup:
```bash
npx firebase-tools login
npx firebase-tools use <your-project-id> --alias default
```

### GitHub Pages (`mihiran.me`)

Deploys automatically via GitHub Actions on every push to `main`.

1. Repo → **Settings** → **Pages** → source: **GitHub Actions**
2. Repo → **Settings** → **Secrets and variables** → **Actions** → add:
   - `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`
   - `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`

Both deploy targets serve the same codebase and read from the same Firestore project, so content managed in `/admin` appears on either domain.

---

## 🎛️ Admin Dashboard

Visit `/admin/login` and sign in with the Firebase Auth account created for this project. From there you can add, edit, and delete:

- Projects
- Certifications
- Education
- Work Experience
- Achievements & Competitions

Each section has an **Import Existing Data** button that seeds Firestore from `src/data/portfolio.ts` on first use. Firestore security rules restrict writes to signed-in users only; reads stay public so the portfolio itself needs no login.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/Mihiran-Thilakarathna/My-Portfolio/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Mihiran Thilakarathna**  
IT Undergraduate · AI/ML Enthusiast · Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-Mihiran--Thilakarathna-181717?style=for-the-badge&logo=github)](https://github.com/Mihiran-Thilakarathna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mihiran%20Thilakarathna-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mihiran-thilakarathna-9478302a8)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Designed & Developed by Mihiran Thilakarathna using React, TypeScript, and Vite</sub>
</div>
