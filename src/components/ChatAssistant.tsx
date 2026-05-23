import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import {
  personalInfo,
  projects,
  skills,
  workExperience,
  education,
  certifications,
  competitions,
} from '../data/portfolio';
import './ChatAssistant.css';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
};

const formatTimestamp = (date: Date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const createMessage = (sender: 'user' | 'assistant', text: string): Message => ({
  id: `${sender}-${Date.now()}-${Math.random()}`,
  sender,
  text,
  timestamp: formatTimestamp(new Date()),
});

// Lookbehind-only match: "skill" matches "skills" but "hi" won't match inside "mihiran"
const has = (msg: string, ...words: string[]) =>
  words.some((w) =>
    new RegExp(`(?<![a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(msg)
  );

// Patterns for off-topic questions — unrelated to the portfolio
const OFF_TOPIC_PATTERNS = [
  /\b(weather|temperature|forecast|climate)\b/,
  /\b(recipe|cook|food|restaurant|eat)\b/,
  /\b(movie|film|series|netflix|tv show|song|music|artist|album)\b/,
  /\b(sport|football|cricket|game|player|match|score|team)\b/,
  /\b(news|politics|election|government|president|minister)\b/,
  /\b(stock|crypto|bitcoin|invest|finance|forex)\b/,
  /\b(joke|funny|meme|prank|riddle)\b/,
  /\b(relationship|love|girlfriend|boyfriend|marriage|dating)\b/,
  /\b(religion|god|prayer|church|temple|mosque)\b/,
  /\b(health|medicine|doctor|hospital|disease|symptom|drug)\b/,
  /\b(translate|language|grammar|spell)\b/,
  /\b(fight|war|conflict|army|weapon|violence)\b/,
  /\b(animal|pet|dog|cat|bird)\b/,
  /\b(travel|hotel|flight|vacation|tour)\b/,
  /\b(solve|calculate|equation|math|homework|assignment)\b/,
  /\b(elon|musk|bill gates|zuckerberg|bezos|obama|trump)\b/,
];

function isOffTopic(msg: string): boolean {
  return OFF_TOPIC_PATTERNS.some((re) => re.test(msg));
}

function generateResponse(rawMessage: string): string {
  const msg = rawMessage.toLowerCase().trim();

  // greetings
  if (has(msg, 'hello', 'hi', 'hey', 'ayubowan', 'good morning', 'good evening', 'good afternoon', 'howdy', 'sup')) {
    return `Hello! 👋 I'm Mihiran's AI assistant.\n\nI can help you explore his professional profile — projects, skills, education, work experience, certifications, and contact info.\n\nWhat would you like to know?`;
  }

  // education
  if (has(msg, 'education', 'study', 'degree', 'university', 'college', 'school', 'qualification', 'academic', 'gce', 'a level', 'o level', 'rajarata')) {
    const eduList = education.map((e) =>
      `🎓 **${e.degree}**\n🏫 ${e.institution}\n📅 ${e.startDate} – ${e.endDate} ${e.status === 'ONGOING' ? '*(Ongoing)*' : '*(Completed)*'}`
    ).join('\n\n');
    return `🎓 **Educational Background**\n\n${eduList}`;
  }

  // skills
  if (has(msg, 'skill', 'technology', 'tech stack', 'tools', 'framework', 'stack', 'programming', 'knowledge')) {
    const allSkills = skills.map((s) => s.name).join(', ');
    return `🛠️ **Technical Skills**\n\n${allSkills}\n\n🔹 AI/ML: Python, TensorFlow, PyTorch, Scikit-learn, ML Kit\n🔹 Web: React, TypeScript, Node.js, Flask, Next.js\n🔹 Mobile: Kotlin, Jetpack Compose, React Native\n🔹 Databases: MongoDB, MySQL, Firebase\n🔹 DevOps: Git, Docker, GitOps, Kubernetes`;
  }

  // work experience
  if (has(msg, 'experience', 'career', 'employment', 'internship', 'trainee', 'peoples bank', "people's bank")) {
    const expList = workExperience.map((w) =>
      `🏢 **${w.role}** @ ${w.company}\n📅 ${w.startDate} – ${w.current ? 'Present' : w.endDate}\n📍 ${w.location}\n\n${w.description}`
    ).join('\n\n──────\n\n');
    return `💼 **Work Experience**\n\n${expList}`;
  }

  // certifications
  if (has(msg, 'certification', 'certificate', 'course', 'credential', 'coursera', 'udemy', 'moratuwa', 'deeplearning', 'aws', 'postman', 'cisco')) {
    const certList = certifications
      .slice(0, 8)
      .map((c) => `• **${c.title}** — ${c.provider} (${c.date})`)
      .join('\n');
    return `🏅 **Certifications & Courses**\n\n${certList}\n${certifications.length > 8 ? `\n...and ${certifications.length - 8} more! Check the Achievements section for the full list.` : '\nView all certificates in the Achievements section!'}`;
  }

  // competitions & achievements
  if (has(msg, 'competition', 'achievement', 'award', 'hackathon', 'innovatex', 'finalist', 'contest', 'challenge')) {
    const compList = competitions.map((c) =>
      `🏆 **${c.name}** (${c.year})\n🎖️ Result: ${c.result}\n🏢 Organiser: ${c.organizer}\n📍 Venue: ${c.venue}\n👥 Team: ${c.team}\n\n${c.description}`
    ).join('\n\n');
    return `🏆 **Competition Achievements**\n\n${compList}`;
  }

  // contact info
  if (has(msg, 'contact', 'email', 'phone', 'reach', 'touch', 'telegram', 'messenger', 'discord', 'whatsapp')) {
    return `📬 **Contact Mihiran**\n\n📧 Email: ${personalInfo.email}\n📱 Phone: ${personalInfo.phone}\n💼 LinkedIn: ${personalInfo.linkedin}\n🐙 GitHub: ${personalInfo.github}\n✈️ Telegram: ${personalInfo.telegram}\n💬 Messenger: ${personalInfo.messenger}\n🎮 Discord: ${personalInfo.discord}\n\nHe's always open to new opportunities, collaborations, or just a tech chat!`;
  }

  // location
  if (has(msg, 'location', 'country', 'based', 'city')) {
    return `📍 Mihiran is based in **${personalInfo.location}**.\n\nHe is open to remote opportunities and global collaborations!`;
  }

  // github
  if (has(msg, 'github', 'git hub', 'repository', 'repo', 'source code')) {
    return `🐙 **GitHub Profile**\n\n${personalInfo.github}\n\nHis GitHub showcases all his projects — AI/ML models, web apps, and mobile apps with 12+ repositories!`;
  }

  // linkedin
  if (has(msg, 'linkedin', 'linked in', 'network')) {
    return `💼 **LinkedIn Profile**\n\n${personalInfo.linkedin}\n\nConnect with Mihiran to stay updated on his professional journey!`;
  }

  // cv / resume
  if (has(msg, 'resume', 'curriculum', 'download cv', 'download resume')) {
    return `📄 **Mihiran's CV**\n\nYou can download his CV by clicking the **"Download CV"** button in the hero section at the top of the page.\n\nIt includes his full education history, work experience, skills, projects, and certifications.`;
  }

  // specific project by name or tag
  const matchedProject = projects.find((p) =>
    msg.includes(p.title.toLowerCase()) ||
    p.tags.some((t) => msg.includes(t.toLowerCase()))
  );
  if (matchedProject) {
    return `📦 **${matchedProject.title}**\n\n📝 ${matchedProject.description}\n\n🏷️ Tech Stack: ${matchedProject.tags.join(', ')}\n🗂️ Category: ${matchedProject.categories.join(', ')}${matchedProject.liveUrl ? `\n🌐 Live Demo: ${matchedProject.liveUrl}` : ''}${matchedProject.codeUrl ? `\n🐙 Source: ${matchedProject.codeUrl}` : ''}`;
  }

  // all projects
  if (has(msg, 'project', 'portfolio')) {
    const list = projects
      .map((p) => `• **${p.title}** — ${p.categories.join(', ')}\n  ${p.description.slice(0, 80)}...`)
      .join('\n\n');
    return `🚀 **Mihiran's Projects (${projects.length})**\n\n${list}\n\nVisit the Projects section above for live demos and source code links!`;
  }

  // ai / ml
  if (has(msg, 'artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'tensorflow', 'pytorch', 'computer vision')) {
    const aiProjects = projects.filter((p) => p.categories.includes('AI/ML'));
    const aiList = aiProjects.map((p) => `• **${p.title}** — ${p.description.slice(0, 90)}...`).join('\n');
    return `🤖 **AI/ML Expertise**\n\nMihiran is deeply passionate about AI & Machine Learning!\n\n🔬 AI/ML Projects:\n${aiList}\n\n🛠️ AI Tools: Python, TensorFlow, PyTorch, Scikit-learn, ML Kit, TensorFlow Lite, MobileNetV2, Gemini API\n\n📜 Relevant Certifications: Google AI Essential Specialization, Supervised ML (DeepLearning.AI), ML I (Columbia University)`;
  }

  // web development
  if (has(msg, 'website', 'frontend', 'backend', 'fullstack', 'full stack', 'next.js', 'vite', 'web app')) {
    const webProjects = projects.filter((p) => p.categories.includes('Web Application'));
    const webList = webProjects.map((p) => `• **${p.title}**${p.liveUrl ? ` → ${p.liveUrl}` : ''}`).join('\n');
    return `🌐 **Web Development**\n\nMihiran builds modern, high-performance web applications!\n\n🖥️ Web Projects:\n${webList}\n\n🛠️ Stack: React, TypeScript, Next.js, Node.js, Express.js, Flask, MongoDB, Tailwind CSS, Vite, Framer Motion`;
  }

  // mobile apps
  if (has(msg, 'mobile', 'android', 'kotlin', 'jetpack', 'react native')) {
    const mobileProjects = projects.filter((p) => p.categories.includes('Mobile Application'));
    const mobileList = mobileProjects.map((p) => `• **${p.title}** — ${p.description.slice(0, 80)}...`).join('\n');
    return `📱 **Mobile App Development**\n\nMihiran develops native & cross-platform mobile apps!\n\n📱 Mobile Projects:\n${mobileList}\n\n🛠️ Stack: Kotlin, Jetpack Compose, Java, Android Studio, React Native, Firebase, SQLite, Material Design`;
  }

  // hire / collaborate
  if (has(msg, 'hire', 'collaborate', 'work together', 'opportunity', 'freelance', 'recruit')) {
    return `🤝 **Open to Opportunities!**\n\nMihiran is open to:\n• Full-time roles in AI/ML or Full-Stack development\n• Freelance & contract projects\n• Research collaborations\n• Open-source contributions\n\n📧 Reach out: ${personalInfo.email}\n💼 LinkedIn: ${personalInfo.linkedin}`;
  }

  // stats
  if (has(msg, 'how many', 'stats', 'statistic', 'number of', 'count', 'total')) {
    return `📊 **Profile Stats**\n\n• 🚀 Projects: ${projects.length} featured projects\n• 🏅 Certifications: ${certifications.length} completed courses\n• 🏆 Competitions: ${competitions.length} major competition (Grand Finalist)\n• 💼 Work Experience: ${workExperience.length} professional role\n• 🛠️ Skills: ${skills.length}+ technologies\n• 📚 GitHub Repos: 12+`;
  }

  // general "who is" — checked last so specific topics take priority
  if (has(msg, 'who is', 'about mihiran', 'introduce', 'tell me about', 'describe')) {
    return `👨‍💻 **${personalInfo.name}**\n\n${personalInfo.bio}\n\n🎯 Specialisations: ${personalInfo.tagline.join(' • ')}\n📍 Based in: ${personalInfo.location}\n\nHe is passionate about building intelligent systems that solve real-world problems using cutting-edge AI and web technologies.`;
  }

  // thank you
  if (has(msg, 'thank', 'thanks', 'appreciate', 'awesome', 'well done')) {
    return `You're very welcome! 😊\n\nI'm always here if you have more questions about Mihiran's work, skills, or how to get in touch. Feel free to explore the portfolio too!`;
  }

  // goodbye
  if (has(msg, 'bye', 'goodbye', 'see you', 'take care', 'cya')) {
    return `Goodbye! 👋 Thanks for visiting Mihiran's portfolio. Feel free to come back anytime. Have a great day! 😊`;
  }

  // off-topic guard
  if (isOffTopic(msg)) {
    return `I appreciate your curiosity! 😊 However, I'm specifically designed to assist with questions about **Mihiran's professional profile**.\n\nI can help you with:\n• 🚀 His projects & technical work\n• 🛠️ Skills & tech stack\n• 🎓 Education & certifications\n• 💼 Work experience\n• 📬 Contact information\n• 🏆 Achievements & competitions\n\nWhat would you like to know about Mihiran?`;
  }

  // fallback
  return `I'm not quite sure about that, but I'm happy to help with anything related to **Mihiran's professional profile**! 🙂\n\nHere's what I can answer:\n• 🚀 **Projects** — "Show me all projects"\n• 🛠️ **Skills** — "What are your skills?"\n• 🎓 **Education** — "Tell me about your education"\n• 💼 **Experience** — "What is your work experience?"\n• 🏅 **Certifications** — "List your certifications"\n• 🏆 **Achievements** — "Tell me about competitions"\n• 📬 **Contact** — "How can I contact you?"\n\nTry one of the quick prompts below or type your question!`;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    createMessage(
      'assistant',
      `👋 Hi! I'm **Mihiran's AI assistant**.\n\nI can help you explore his professional profile — projects, skills, education, work experience, certifications, and more.\n\nWhat would you like to know?`
    ),
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = useMemo(
    () => [
      'Show me all projects',
      'What are your skills?',
      'Tell me about your education',
      'List your certifications',
      'How can I contact you?',
    ],
    []
  );

  const handleSend = useCallback(
    (text?: string) => {
      const trimmed = (text ?? inputValue).trim();
      if (!trimmed) return;

      setMessages((prev) => [...prev, createMessage('user', trimmed)]);
      setInputValue('');
      setIsThinking(true);

      const delay = 500 + Math.random() * 600;
      setTimeout(() => {
        const reply = generateResponse(trimmed);
        setMessages((prev) => [...prev, createMessage('assistant', reply)]);
        setIsThinking(false);
      }, delay);
    },
    [inputValue]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSend();
    },
    [handleSend]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  return (
    <>
      {/* Transparent backdrop — click outside to close */}
      {isOpen && (
        <div
          className="chat-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Mihiran AI assistant"
        >
          <div className="chat-header">
            <div className="assistant-meta">
              <div className="assistant-avatar" aria-hidden>
                <FaRobot />
              </div>
              <div>
                <h4>Mihiran AI</h4>
                <small>Always happy to guide you</small>
              </div>
            </div>
            <button
              type="button"
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat assistant"
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.sender}`}>
                <p>{message.text}</p>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            ))}
            {isThinking && (
              <div className="typing-indicator">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-quick-prompts">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="prompt-chip"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about Mihiran..."
              aria-label="Type your question"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputValue.trim() || isThinking}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <div className="chat-assistant" aria-live="polite">
        <button
          type="button"
          className={`chat-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle Mihiran AI chat assistant"
        >
          <FaRobot />
        </button>
      </div>
    </>
  );
};

export default ChatAssistant;
