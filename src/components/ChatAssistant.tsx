import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import {
  personalInfo,
  projects,
  skills,
  workExperience,
  education,
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

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    createMessage(
      'assistant',
      "👋 Hi! I'm Mihiran's AI assistant. I can help you learn about his projects, skills, work experience, education, and how to get in touch. What would you like to know?"
    ),
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = useMemo(
    () => [
      'Show me all projects',
      'What are your skills?',
      'Give me GitHub link',
      'How can I contact you?',
      'Tell me about your experience',
    ],
    []
  );

  const generateResponse = useCallback((rawMessage: string) => {
    const message = rawMessage.toLowerCase();

    const skillHighlights = skills
      .slice(0, 8)
      .map((skill) => skill.name)
      .join(', ');

    const workHighlights = workExperience
      .map(
        (work) =>
          `• ${work.role} @ ${work.company} (${work.startDate} – ${work.current ? 'Present' : work.endDate})`
      )
      .join('\n');

    const educationSummary = education
      .map((item) => `• ${item.degree} – ${item.institution} (${item.startDate} – ${item.endDate})`)
      .join('\n');

    // Greeting responses
    if (/(hello|hi|hey|ayubowan|good (morning|evening|afternoon))/i.test(message)) {
      return "Hello! Great to meet you. I'm Mihiran's AI assistant. I'm here to help you learn about his projects, skills, experience, and how to get in touch. What would you like to explore?";
    }

    // GitHub link request
    if (message.includes('github') || message.includes('git hub')) {
      return `You can find Mihiran on GitHub at: ${personalInfo.github}. His GitHub profile showcases various projects, including AI/ML applications, web development projects, and mobile apps. Feel free to explore and get in touch!`;
    }

    // LinkedIn request
    if (message.includes('linkedin') || message.includes('linked in')) {
      return `Connect with Mihiran on LinkedIn: ${personalInfo.linkedin}. He actively shares updates about his projects and professional journey.`;
    }

    // Projects
    if (message.includes('project')) {
      const allProjects = projects.map((p) => `• ${p.title} (${p.categories.join(', ')})`).join('\n');
      return `Here are Mihiran's featured projects:\n${allProjects}\n\nYou can explore detailed descriptions, live demos, and source code in the Projects section above. Each project showcases different aspects of his skills!`;
    }

    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech stack')) {
      return `Mihiran works with: ${skillHighlights}, and more!\n\nHe specializes in AI/ML development using Python, TensorFlow, and PyTorch, along with full-stack web development using React, TypeScript, and Node.js. He also builds mobile apps with React Native and Kotlin.`;
    }

    // Contact information
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach') || message.includes('touch')) {
      return `You can reach Mihiran through:\n\n📧 Email: ${personalInfo.email}\n📱 Phone: ${personalInfo.phone}\n💼 LinkedIn: ${personalInfo.linkedin}\n🐙 GitHub: ${personalInfo.github}\n\nHe's always open to discussing new opportunities, collaborations, or just chatting about tech!`;
    }

    // Work experience
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return `Here's Mihiran's professional experience:\n\n${workHighlights}\n\nHe has hands-on experience in education technology and banking operations. Currently, he's focused on building AI-driven solutions and modern web applications.`;
    }

    // Education
    if (message.includes('education') || message.includes('study') || message.includes('degree') || message.includes('university') || message.includes('college')) {
      return `Mihiran's educational background:\n\n${educationSummary}\n\nHe's currently pursuing his Bachelor's degree in Information and Communication Technology at Rajarata University of Sri Lanka, specializing in AI/ML and software development.`;
    }

    // Resume/CV request
    if (message.includes('resume') || message.includes('cv') || message.includes('download')) {
      return "You can download Mihiran's CV by clicking the 'Download CV' button in the hero section at the top of the page. It contains detailed information about his education, experience, skills, and projects.";
    }

    // AI/ML specific
    if (message.includes('ai') || message.includes('machine learning') || message.includes('ml') || message.includes('artificial intelligence')) {
      return "AI/ML is Mihiran's passion! He's working on:\n\n• AI Chat Assistant (Android app with Gemini AI)\n• Mood Music App (emotion-aware music recommendations)\n• Intelligent video editing tools\n\nHe uses Python, TensorFlow, PyTorch, and integrates AI APIs to build practical, real-world solutions.";
    }

    // Web development
    if (message.includes('web') || message.includes('website') || message.includes('react') || message.includes('frontend')) {
      return "Mihiran builds modern, responsive web applications using React, TypeScript, and Vite. This very portfolio showcases his web development skills with smooth animations, theme switching, and mobile-first design!";
    }

    // Mobile development
    if (message.includes('mobile') || message.includes('app') || message.includes('android') || message.includes('kotlin')) {
      return "Mihiran develops mobile applications using:\n\n• Kotlin & Jetpack Compose for Android\n• React Native for cross-platform apps\n• Firebase for backend services\n\nCheck out his AI Chat Assistant and Mood Music App projects!";
    }

    // Personal intro
    if (message.includes('who') || message.includes('about')) {
      return `${personalInfo.name} is a passionate IT undergraduate at Rajarata University of Sri Lanka. He specializes in AI/ML, full-stack development, and mobile app development. His goal is to build intelligent systems that solve real-world problems using cutting-edge technologies.`;
    }

    // Location
    if (message.includes('location') || message.includes('where') || message.includes('live')) {
      return `Mihiran is based in ${personalInfo.location}. He's open to remote opportunities and collaborations worldwide!`;
    }

    // Hire/collaborate
    if (message.includes('hire') || message.includes('collaborate') || message.includes('work together') || message.includes('opportunity')) {
      return `Mihiran is open to new opportunities and collaborations! You can reach out to him at ${personalInfo.email} or connect on LinkedIn: ${personalInfo.linkedin}. He's particularly interested in AI/ML projects, web development, and innovative tech solutions.`;
    }

    // Thank you response
    if (message.includes('thank')) {
      return "You're welcome! If you have any more questions about Mihiran's work, skills, or how to get in touch, just ask. I'm here to help!";
    }

    // Default fallback response
    return `I can help you learn about:\n\n• Mihiran's projects and technical skills\n• His work experience and education\n• How to contact him or view his GitHub/LinkedIn\n• Downloading his CV\n\nWhat would you like to know more about?`;
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const trimmed = (text ?? inputValue).trim();
      if (!trimmed) {
        return;
      }

      setMessages((prev) => [...prev, createMessage('user', trimmed)]);
      setInputValue('');
      setIsThinking(true);

      const typingDelay = 500 + Math.random() * 600;

      setTimeout(() => {
        const reply = generateResponse(trimmed);
        setMessages((prev) => [...prev, createMessage('assistant', reply)]);
        setIsThinking(false);
      }, typingDelay);
    },
    [generateResponse, inputValue]
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
    if (!isOpen) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  return (
    <div className="chat-assistant" aria-live="polite">
      {isOpen && (
        <div className="chat-window" role="dialog" aria-modal="true" aria-label="Mihiran AI assistant">
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
              onChange={(event) => setInputValue(event.target.value)}
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

      <button
        type="button"
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="chat-window"
        aria-label="Toggle Mihiran AI chat assistant"
      >
        <FaRobot />
      </button>
    </div>
  );
};

export default ChatAssistant;
