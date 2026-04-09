<div align="center">

# Mihiran Thilakarathna | Portfolio 🚀

A modern, responsive portfolio showcasing AI/ML and software development projects.  
Built with React, TypeScript, and Vite — featuring smooth animations, a working contact form, and a built-in AI assistant.

[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br/>

[![View Live Demo](https://img.shields.io/badge/-View%20Live%20Demo-2ea44f?style=flat-square&logoColor=white&labelColor=2ea44f)](https://mihiran-thilakarathna.github.io/My-Portfolio/)

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

---

## 🏗️ Project Structure

```
My-Portfolio/
├── public/
│   ├── certificates/    # Certificate PDF files
│   └── favicon.svg
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # UI components
│   │   ├── Header.tsx        # Navigation bar with scroll spy
│   │   ├── Hero.tsx          # Landing section with circular text animation
│   │   ├── About.tsx         # Bio, stats, and skill carousel
│   │   ├── Work.tsx          # Work experience cards
│   │   ├── Education.tsx     # Education timeline & certifications grid
│   │   ├── Projects.tsx      # Filterable project gallery
│   │   ├── Contact.tsx       # Contact form (EmailJS) & social links
│   │   ├── Footer.tsx        # Footer with back-to-top button
│   │   ├── ChatAssistant.tsx # AI chat assistant
│   │   ├── LoadingScreen.tsx # Initialization loading animation
│   │   ├── AnimatedBackground.tsx
│   │   └── SectionDivider.tsx
│   ├── contexts/        # React context providers (Theme)
│   ├── data/            # Portfolio content & data
│   ├── hooks/           # Custom React hooks
│   │   ├── useScrollSpy.ts    # Active section detection
│   │   ├── useScrollToTop.ts  # Back-to-top button logic
│   │   └── useProfileViews.ts # Profile view counter
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── .github/workflows/
│   └── deploy.yml       # GitHub Pages auto-deploy
├── .env                 # EmailJS credentials (git-ignored)
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
| Contact Form | EmailJS |
| Deployment | GitHub Pages via GitHub Actions |

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

Create a `.env` file in the project root:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get these from [emailjs.com](https://www.emailjs.com/) — sign up, connect Gmail, create a template, and copy the IDs.

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

This portfolio deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

### Setup:

1. Go to your GitHub repo → **Settings** → **Pages** → set source to **GitHub Actions**
2. Go to **Settings** → **Secrets and variables** → **Actions** → add these repository secrets:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

The workflow automatically sets the correct base path for GitHub Pages and injects EmailJS credentials at build time.

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
