import type { Project, WorkExperience, Education, Certification, Skill } from '../types';

// Import profile images
import foodordering from '../assets/foodordering.png';
import lumo from '../assets/lumo.png';
import moodtune from '../assets/moodtune.png';
import facial from '../assets/facial.png';
import portfolio from '../assets/portfolio.png';

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
  {
  id: 1,
  title: 'Google AI Essential Specialization',
  provider: 'Coursera',
  date: 'Nov 2025',
  certificateUrl: 'https://www.coursera.org/account/accomplishments/specialization/F5EEQMFC08S1',
  },

  {
  id: 2,
  title: 'Supervised Machine Learning: Regression and  Classification',
  provider: 'DeepLearning.AI',
  date: 'Nov 2025',
  certificateUrl: 'https://www.coursera.org/account/accomplishments/verify/3VIPRPZ8VKZ1?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
  },

  {
  id: 3,
  title: 'Machine Learning I',
  provider: 'Columbia University',
  date: 'Nov 2025',
  certificateUrl: 'https://badges.plus.columbia.edu/03dccaeb-7eba-4099-9b0b-efeba35b9f11#acc.U3C6r4FQ',
  },

  {
    id: 4,
    title: 'AI Security & Governance',
    provider: 'Securiti',
    date: 'Sep 2025',
    certificateUrl: 'https://education.securiti.ai/verification/13EF93075-13EF92EE4-1336A0CFD/',
  },

  {
    id: 5,
    title: 'LFS169: Introduction to GitOps',
    provider: 'The Linux Foundation',
    date: 'Mar 2026',
    certificateUrl: 'https://www.credly.com/badges/724d690d-d720-45d8-b7f4-25f993406725/public_url',
  },
  
  {
    id: 6,
    title: ' Introduction to Kubernetes',
    provider: 'The Linux Foundation',
    date: 'Feb 2026',
    certificateUrl: 'https://www.credly.com/badges/cc11904e-bba4-4a93-aeaa-7b082f5a3833/linked_in_profile',
  },

  {
    id: 7,
    title: 'Postman API Fundamentals Student Expert',
    provider: 'Postman',
    date: 'Nov 2025',
    certificateUrl: 'https://badges.parchment.com/public/assertions/bOBqRDENSP-V6Q-cq2teMQ?identity__email=thmthilakarathna2%40gmail.com',
  },

  

];

export const projects: Project[] = [
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
    description: 'Responsive React + TypeScript portfolio with theme switching, smooth animations, and a curated project grid.',
    image: portfolio,
    categories: ['Web Application'],
    tags: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    codeUrl: 'https://github.com/Mihiran-Thilakarathna/My-Portfolio.git',
  },
];
