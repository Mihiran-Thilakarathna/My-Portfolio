import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import About from './components/About';
import Work from './components/Work';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Achievements from './components/Achievements';
import CustomCursor from './components/CustomCursor';
import SectionReveal from './components/SectionReveal';
import { useScrollToTop } from './hooks/useScrollToTop';
import { startSmoothScroll } from './lib/smoothScroll';
import { markIntroDone } from './lib/introGate';
import './App.css';

function App() {
  // Site renders behind the intro: `entered` = revealed, `introDone` = intro unmounted
  const [entered, setEntered] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const { showButton, scrollToTop } = useScrollToTop();

  // Lock scrolling during the intro, enable smooth scroll after
  useEffect(() => {
    if (!entered) {
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
      };
    }
    return startSmoothScroll();
  }, [entered]);

  const handleReveal = useCallback(() => setEntered(true), []);

  const handleIntroFinish = useCallback(() => {
    setIntroDone(true);
    markIntroDone();
  }, []);

  return (
    <ThemeProvider>
      <div className="portfolio-shell">
      <CustomCursor />
      {!introDone && <LoadingScreen onReveal={handleReveal} onFinish={handleIntroFinish} />}

      <Header entered={entered} />
      <div className="app">
        <main>
          <Hero entered={entered} />
          <SectionDivider />
          {/* Not wrapped: About measures the divider right above it */}
          <About />
          <SectionDivider />
          <SectionReveal><Work /></SectionReveal>
          <SectionDivider />
          <SectionReveal><Education /></SectionReveal>
          <SectionDivider />
          <SectionReveal><Projects /></SectionReveal>
          <SectionDivider />
          <SectionReveal><Achievements /></SectionReveal>
          <SectionDivider />
          <SectionReveal><Contact /></SectionReveal>
        </main>
        <Footer />
      </div>

      {/* Prevent position:fixed elements from breaking due to parent transform */}
      <ChatAssistant />

      <AnimatePresence>
        {showButton && (
          <motion.button
            className="back-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
export default App;
