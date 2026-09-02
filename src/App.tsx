import { useState } from 'react';
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
import { useScrollToTop } from './hooks/useScrollToTop';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const { showButton, scrollToTop } = useScrollToTop();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setHasEntered(true);
    }, 50);
  };

  return (
    <ThemeProvider>
      <div className="portfolio-shell">
      <CustomCursor />
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          <Header />
          <div className={`app ${hasEntered ? 'app-fade-in' : ''}`}>
            <main>
              <Hero />
              <SectionDivider />
              <About />
              <SectionDivider />
              <Work />
              <SectionDivider />
              <Education />
              <SectionDivider />
              <Projects />
              <SectionDivider />
              <Achievements />
              <SectionDivider />
              <Contact />
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
        </>
      )}
      </div>
    </ThemeProvider>
  );
}
export default App;
