import { useState } from 'react';
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
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  const [animationFinished, setAnimationFinished] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setHasEntered(true);
      setTimeout(() => {
        setAnimationFinished(true);
      }, 1500);
    }, 50); // short delay to show content smoothly
  };

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <div className={`app ${hasEntered && !animationFinished ? 'app-fade-in' : ''}`}>
          <Header />
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
          <ChatAssistant />
        </div>
      )}
    </ThemeProvider>
  );
}
export default App;
