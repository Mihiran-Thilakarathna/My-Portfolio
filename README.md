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

<br/>

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Deployment](#deployment) · [Admin](#admin-dashboard) · [Contact](#contact)

</div>

<br/>

## Overview

This repository holds the source for [mihiran.me](https://mihiran.me). It presents my work, education, certifications and achievements in AI/ML and software engineering. All content comes from Firestore and is managed through a protected admin dashboard. A bundled copy of the data keeps the site working even when Firebase isn't configured.

<br/>

## Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h4>Signature intro</h4>
      The name is written stroke by stroke in canvas ink, followed by a light pass along the letters and a dot loader. Heavy work is deferred until the intro finishes.
    </td>
    <td width="50%" valign="top">
      <h4>3D lanyard ID card</h4>
      A three.js card hanging from the section divider on a physics-simulated strap. It can be dragged, flipped and swung.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <h4>Interactive contact lamp</h4>
      Pulling the desk-lamp cord reveals the contact form. Messages are delivered through EmailJS with inline validation.
    </td>
    <td valign="top">
      <h4>WebGL terrain footer</h4>
      A topographic terrain shader that lifts under the cursor and pulses on click.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <h4>Content management</h4>
      A Firebase-authenticated dashboard at <code>/admin</code> for projects, certifications, education, work and achievements, with live Firestore sync.
    </td>
    <td valign="top">
      <h4>Polished experience</h4>
      Lenis smooth scrolling, scroll-triggered reveals, scroll-spy navigation, an AI chat assistant and a layout tuned for mobile and touch.
    </td>
  </tr>
</table>

<br/>

## Tech Stack

| Area | Technologies |
|---|---|
| Framework | React 19, TypeScript 5.9 |
| Build tooling | Vite 7, ESLint |
| Graphics | three.js, custom WebGL shaders, Canvas 2D |
| Motion | Framer Motion, Lenis |
| Styling | CSS custom properties, Flexbox, Grid |
| Routing | React Router |
| Backend services | Firebase Firestore, Firebase Authentication, Cloudinary, EmailJS |
| Hosting & CI | GitHub Pages via GitHub Actions, Firebase Hosting |

<br/>

## Project Structure

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

<br/>

## Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/Mihiran-Thilakarathna/My-Portfolio.git
cd My-Portfolio
npm install
npm run dev
```

### Configuration

Create `.env` for EmailJS:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Copy `.env.local.example` to `.env.local` for Firebase and Cloudinary:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Firebase values are in the [Firebase Console](https://console.firebase.google.com/) under Project Settings → General. Cloudinary needs an **unsigned** upload preset from the [Cloudinary dashboard](https://cloudinary.com/console).

> [!NOTE]
> These variables are optional for local development. Without them the site runs on the bundled data in `src/data/portfolio.ts`. Only the admin dashboard needs them.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint the codebase |
| `npm run deploy` | Build and deploy to Firebase Hosting |

<br/>

## Deployment

**GitHub Pages:** every push to `main` is built and deployed to [mihiran.me](https://mihiran.me) by GitHub Actions. To set it up:

1. Under **Settings → Pages**, set the source to **GitHub Actions**.
2. Under **Settings → Secrets and variables → Actions**, add every variable listed in [Configuration](#configuration).

**Firebase Hosting:** `npm run deploy` publishes the site together with the Firestore rules. One-time setup:

```bash
npx firebase-tools login
npx firebase-tools use <project-id> --alias default
```

Both targets read from the same Firestore project, so changes made in the dashboard appear on either one.

<br/>

## Admin Dashboard

Sign in at `/admin/login` with the project's Firebase Auth account to manage:

`Projects` · `Certifications` · `Education` · `Work Experience` · `Achievements`

Each section has an **Import Existing Data** action that seeds Firestore from the bundled content on first use. Security rules allow public reads and writes only from signed-in users.

<br/>

## Contributing

Bug reports and suggestions are welcome through [issues](https://github.com/Mihiran-Thilakarathna/My-Portfolio/issues). To propose a change, fork the repository, create a feature branch and open a pull request.

<br/>

## Contact

<div align="center">

**Mihiran Thilakarathna**<br/>
<sub>IT Undergraduate · AI/ML Enthusiast · Full Stack Developer</sub>

<br/>

[![Portfolio](https://img.shields.io/badge/Portfolio-mihiran.me-CCFF00?style=for-the-badge&labelColor=0A0A0A)](https://mihiran.me)
[![GitHub](https://img.shields.io/badge/GitHub-Mihiran--Thilakarathna-CCFF00?style=for-the-badge&logo=github&logoColor=CCFF00&labelColor=0A0A0A)](https://github.com/Mihiran-Thilakarathna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mihiran_Thilakarathna-CCFF00?style=for-the-badge&logo=linkedin&logoColor=CCFF00&labelColor=0A0A0A)](https://www.linkedin.com/in/mihiran-thilakarathna-9478302a8)

<br/>

<sub>© 2026 Mihiran Thilakarathna · Released under the [MIT License](LICENSE)</sub>

</div>
