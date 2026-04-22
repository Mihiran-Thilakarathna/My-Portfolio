import type { Project, WorkExperience, Education, Certification, Skill } from '../types';

// import all images for projects
import foodordering from '../assets/foodordering.png';
import lumo from '../assets/lumo.png';
import moodtune from '../assets/moodtune.png';
import facial from '../assets/facial.png';
import portfolio from '../assets/portfolio.png';
import omnimodel from '../assets/OmniModel.png';
import vendora from '../assets/vendora.png';

export const personalInfo = {
  name: 'Mihiran Thilakarathna',
  tagline: ['AI/ML Enthusiast', 'Full Stack Developer', 'IT Undergraduate'],
  bio: 'Passionate IT undergraduate at Rajarata University of Sri Lanka, focused on building intelligent systems with AI, Machine Learning, and modern web technologies.',
  email: 'thmthilakarathna@gmail.com',
  phone: '+94 76 045 3356',
  telegram: '+94760453356',
  messenger: 'mihiranthilakarathna',
  discord: 'mihiranthilakarathna',
  location: 'Sri Lanka',
  github: 'https://github.com/Mihiran-Thilakarathna',
  linkedin: 'https://www.linkedin.com/in/mihiran-thilakarathna-9478302a8',
  kaggle: 'https://www.kaggle.com',
  twitter: 'https://twitter.com',
  facebook: '#',
  instagram: '#',
  medium: '#',
  footerBio: 'Building intelligent solutions with AI, ML, and modern web technologies.',
  profileViews: 0,
  profileViewsUpdatedAt: '2025-10-19T06:00:00+05:30',
};

export const skills: Skill[] = [
  { name: 'Python', icon: 'FaPython' },
  { name: 'TensorFlow', icon: 'SiTensorflow' },
  { name: 'PyTorch', icon: 'SiPytorch' },
  { name: 'Scikit-learn', icon: 'SiScikitlearn' },
  { name: 'React', icon: 'FaReact' },
  { name: 'JavaScript', icon: 'SiJavascript' },
  { name: 'TypeScript', icon: 'SiTypescript' },
  { name: 'Node.js', icon: 'FaNodeJs' },
  { name: 'Flask', icon: 'SiFlask' },
  { name: 'MongoDB', icon: 'SiMongodb' },
  { name: 'MySQL', icon: 'SiMysql' },
  { name: 'Firebase', icon: 'SiFirebase' },
  { name: 'Git', icon: 'FaGitAlt' },
  { name: 'Docker', icon: 'FaDocker' },
  { name: 'HTML5', icon: 'FaHtml5' },
  { name: 'CSS3', icon: 'FaCss3Alt' },
];

export const stats = {
  yearsExperience: '2+',
  projects: '10+',
  repos: '12+',
};

export const workExperience: WorkExperience[] = [

  {
    id: 2,
    company: 'Peoples Bank',
    role: 'Trainee',
    startDate: 'Dec 2022',
    endDate: 'Jul 2023',
    location: 'Avissawella, Sri Lanka',
    description: "Before entering university, I had the opportunity to work as a trainee at the People's Bank of Sri Lanka. During this six-month training program, I gained valuable hands-on experience in banking operations, customer service, and financial documentation. This experience strengthened my communication, teamwork, and professional skills, giving me a strong foundation for my future academic and career journey.",
    current: false,
  },
  
];

export const education: Education[] = [
  {
    id: 1,
    institution: 'Rajarata University of Sri Lanka',
    degree: 'Bachelor of Information and Communication Technology',
    startDate: '2022',
    endDate: '2026',
    status: 'ONGOING',
  },
  {
    id: 2,
    institution: 'Eheliyagoda National School',
    degree: 'G.C.E. Advanced Level',
    startDate: '2019',
    endDate: '2021',
    status: 'COMPLETED',
  },
  {
    id: 3,
    institution: 'Eheliyagoda National School',
    degree: 'G.C.E. Ordinary Level',
    startDate: '2009',
    endDate: '2018',
    status: 'COMPLETED',
  },
];

export const certifications: Certification[] = [
  // top priority AI courses
  {
    id: 1,
    title: 'Python for Beginners',
    provider: 'University of Moratuwa',
    date: 'Apr 2026',
    certificateUrl: '/certificates/Python.pdf',
  },
  {
    id: 2,
    title: 'Google AI Essential Specialization',
    provider: 'Coursera',
    date: 'Nov 2025',
    certificateUrl: '/certificates/google-ai-essential.pdf',
  },
  {
    id: 3,
    title: 'Supervised Machine Learning: Regression and Classification',
    provider: 'DeepLearning.AI',
    date: 'Nov 2025',
    certificateUrl: '/certificates/supervised-ml.pdf',
  },
  {
    id: 4,
    title: 'Machine Learning I',
    provider: 'Columbia University',
    date: 'Nov 2025',
    certificateUrl: '/certificates/machine-learning-1.pdf',
  },
  {
    id: 5,
    title: 'AI Security & Governance',
    provider: 'Securiti',
    date: 'Sep 2025',
    certificateUrl: '/certificates/ai-security.pdf',
  },
  
  // other courses sorted by date
  {
    id: 6,
    title: 'Introduction to Android Mobile Application Development',
    provider: 'Meta',
    date: 'Apr 2026',
    certificateUrl: '/certificates/Mobile-Application.pdf',
  },
  {
    id: 7,
    title: 'Hypothesis-Based Problem Solving (Intermediate Level)',
    provider: 'SLASSCOM Academy',
    date: 'Apr 2026',
    certificateUrl: '/certificates/hypothesis-based-problem-solving.pdf',
  },
  {
    id: 8,
    title: 'Introduction to Cybersecurity',
    provider: 'Cisco Networking Academy',
    date: 'Apr 2026',
    certificateUrl: '/certificates/introduction-to-cybersecurity.pdf',
  },
  {
    id: 9,
    title: 'LFS169: Introduction to GitOps',
    provider: 'The Linux Foundation',
    date: 'Mar 2026',
    certificateUrl: '/certificates/gitops.pdf',
  },
  {
    id: 10,
    title: 'Introduction to Kubernetes',
    provider: 'The Linux Foundation',
    date: 'Feb 2026',
    certificateUrl: '/certificates/kubernetes.pdf',
  },
  {
    id: 11,
    title: 'Postman API Fundamentals Student Expert',
    provider: 'Postman',
    date: 'Nov 2025',
    certificateUrl: '/certificates/postman-api.pdf',
  },
  {
    id: 12,
    title: 'Designing Blockchain Solutions using Amazon Managed Blockchain',
    provider: 'AWS Training & Certification',
    date: 'Nov 2025',
    certificateUrl: '/certificates/Designing Blockchain Solutions.pdf',
  },
  {
    id: 13,
    title: 'ReactJs - The Complete Reacts Course For Beginners',
    provider: 'Udemy',
    date: 'Jun 2025',
    certificateUrl: '/certificates/REACTJs.pdf',
  },
];

export const projects: Project[] = [
  {
    id: 7,
    title: 'Vendora',
    description: 'A modern, full-stack e-commerce admin/staff dashboard designed to seamlessly manage products, orders, and operational notifications with strict role-based access control (RBAC).',
    image: vendora,
    categories: ['Web Application'],
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://vendora-saa-s-e-commerce-dashboard.vercel.app/',
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/Vendora----SaaS-E-Commerce-Dashboard.git',
  },
  {
    id: 6,
    title: 'OmniModel Converter',
    description: 'A production-grade, full-stack ML model conversion platform engineered to eliminate cross-framework deployment barriers. Automates translation across PyTorch, TensorFlow, ONNX, and TFLite using FastAPI and Next.js.',
    image: omnimodel,
    categories: ['AI/ML', 'Web Application'],
    tags: ['Next.js', 'FastAPI', 'PyTorch', 'TensorFlow', 'Python'],
    liveUrl: 'https://omnimodel-converter.vercel.app/',
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/omnimodel-converter.git',
  },
  {
    id: 1,
    title: 'Food Ordering App',
    description: 'Offline-first Android food app with browsing, cart, and profile management using Java, SQLite, and a clean UI.',
    image: foodordering,
    categories: ['Mobile Application'],
    tags: ['Java', 'SQLite', 'Android Studio', 'Material Design'],
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/FoodOrderingApp.git',
  },
  {
    id: 2,
    title: 'Lumo AI Assistant',
    description: 'Multimodal Android AI assistant in Jetpack Compose using Gemini for text, image, and PDF analysis with chat-style UX.',
    image: lumo,
    categories: ['Mobile Application'],
    tags: ['Kotlin', 'Jetpack Compose', 'Google Gemini API', 'Multimodal AI'],
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/Lumo-AI-assistant.git',
  },
  {
    id: 3,
    title: 'MoodTune',
    description: 'Android app that detects your emotion from facial cues and queues mood-matching music via ML Kit and TensorFlow Lite.',
    image: moodtune,
    categories: ['Mobile Application'],
    tags: ['Kotlin', 'TensorFlow Lite', 'ML Kit', 'Music Recommendation'],
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/MoodTune.git',
  },
  
  {
    id: 4,
    title: 'Facial Occlusion Classification for Restricted Environments',
    description: 'MobileNetV2 model classifying clear face, helmet, or mask to support restricted-area security monitoring.',
    image: facial,
    categories: ['AI/ML'],
    tags: ['Python', 'TensorFlow', 'MobileNetV2', 'Image Classification'],
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/Facial_Occlusion_Classification.git',
  },

  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Responsive React + TypeScript portfolio with smooth animations, an AI chatbot, working contact form, and a curated project grid.',
    image: portfolio,
    categories: ['Web Application'],
    tags: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/My-Portfolio.git',
    liveUrl: 'https://mihiran-thilakarathna.github.io/My-Portfolio/',
  },
];
