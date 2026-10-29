<div align="center">

<a href="https://mihiran.me">
  <img src=".github/assets/signature.svg" alt="Mihiran Thilakarathna" width="100%"/>
</a>

<br/>

### Personal portfolio of Mihiran Thilakarathna

An interactive, fully responsive portfolio built with React, TypeScript and three.js,<br/>
backed by a Firebase admin dashboard for managing content without redeploying.

<br/>

[![Live Site](https://img.shields.io/badge/LIVE_SITE-mihiran.me-CCFF00?style=for-the-badge&labelColor=0A0A0A)](https://mihiran.me)
[![Deploy](https://img.shields.io/github/actions/workflow/status/Mihiran-Thilakarathna/My-Portfolio/deploy.yml?branch=main&style=for-the-badge&label=DEPLOY&labelColor=0A0A0A&color=CCFF00)](https://github.com/Mihiran-Thilakarathna/My-Portfolio/actions)
[![License](https://img.shields.io/badge/LICENSE-MIT-CCFF00?style=for-the-badge&labelColor=0A0A0A)](LICENSE)

<br/>

![React](https://img.shields.io/badge/React_19-0A0A0A?style=flat-square&logo=react&logoColor=CCFF00)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-0A0A0A?style=flat-square&logo=typescript&logoColor=CCFF00)
![Vite](https://img.shields.io/badge/Vite_7-0A0A0A?style=flat-square&logo=vite&logoColor=CCFF00)
![three.js](https://img.shields.io/badge/three.js-0A0A0A?style=flat-square&logo=threedotjs&logoColor=CCFF00)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0A0A0A?style=flat-square&logo=framer&logoColor=CCFF00)
![Firebase](https://img.shields.io/badge/Firebase-0A0A0A?style=flat-square&logo=firebase&logoColor=CCFF00)
![Cloudinary](https://img.shields.io/badge/Cloudinary-0A0A0A?style=flat-square&logo=cloudinary&logoColor=CCFF00)

</div>

---

## ✨ Features

- ✍️ **Signature Intro** — The name is written stroke by stroke in lime ink, then a light runs along the letters while a dot loader counts to 100%
- 🪪 **3D Lanyard ID Card** — A three.js card on a physics-simulated strap that drops from the section divider; drag, flip, and swing it
- 💡 **Pull-Cord Desk Lamp** — Pull the lamp cord to light up the contact form
- 🏔️ **Interactive Terrain Footer** — A WebGL topography that lifts under the cursor and pulses on click
- 🎭 **Smooth Animations** — Framer Motion transitions, scroll-triggered section reveals, and Lenis smooth scrolling
- 📱 **Fully Responsive** — Seamless experience from mobile to desktop, with touch-friendly styling
- 🤖 **AI Chat Assistant** — Floating chatbot with quick prompts to explore projects, skills, and contact info
- 📩 **Working Contact Form** — Messages sent directly via EmailJS to the owner's inbox, with themed inline validation
- 📜 **Certificate Viewer** — View and download certifications as PDFs
- 🗂️ **Project Filtering** — Filter projects by category (AI/ML, Web, Mobile)
- 🧭 **Scroll Spy Navigation** — Active section highlighting in the navbar
- 🎛️ **Admin Dashboard** — Add, edit, and delete projects, certifications, education, work history, and achievements from `/admin`, no redeploy needed
- ☁️ **Live Content Sync** — Content is stored in Firestore and read straight from there, so dashboard edits appear on the site instantly

---

## 🏗️ Project Structure

```
.
├── .github/
│   ├── assets/                 README artwork
│   └── workflows/deploy.yml    GitHub Pages deployment
├── public/                     Certificates, photos, CNAME, SPA fallback
└── src/
    ├── admin/                  Dashboard: auth, protected routes, list and form editors
    ├── components/
    │   ├── LoadingScreen.tsx   Signature intro
    │   ├── Hero.tsx            Landing section
    │   ├── About.tsx           Profile, stats, tech stack and ID card
    │   ├── Lanyard/            three.js card and strap physics
    │   ├── Contact.tsx         Desk lamp and contact form
    │   ├── Footer.tsx          Terrain footer
    │   ├── Topography/         WebGL terrain
    │   └── ...                 Work, Education, Projects, Achievements, Chat assistant
    ├── lib/                    Intro timing gate, smooth-scroll helpers
    ├── hooks/                  Firestore data, scroll spy, form validation
    ├── services/               Firestore CRUD, Cloudinary uploads
    ├── data/                   Bundled fallback and seed content
    └── firebase.ts
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Core Framework | React 19 + TypeScript 5.9 |
| Build Tool | Vite 7 |
| 3D & WebGL | three.js (lanyard ID card), custom WebGL shaders (terrain footer) |
| Animations | Framer Motion, Lenis smooth scroll, Canvas 2D (signature intro) |
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

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

<div align="center">

**Mihiran Thilakarathna**<br/>
<sub>IT Undergraduate · AI/ML Enthusiast · Full Stack Developer</sub>

<br/>

[![Portfolio](https://img.shields.io/badge/Portfolio-mihiran.me-CCFF00?style=for-the-badge&labelColor=0A0A0A)](https://mihiran.me)
[![GitHub](https://img.shields.io/badge/GitHub-Mihiran--Thilakarathna-CCFF00?style=for-the-badge&logo=github&logoColor=CCFF00&labelColor=0A0A0A)](https://github.com/Mihiran-Thilakarathna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mihiran_Thilakarathna-CCFF00?style=for-the-badge&logo=linkedin&logoColor=CCFF00&labelColor=0A0A0A)](https://www.linkedin.com/in/mihiran-thilakarathna)

<br/>

<sub>© 2026 Mihiran Thilakarathna · Released under the [MIT License](LICENSE)</sub>

</div>
