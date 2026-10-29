import { useState, useEffect } from 'react';
import { scrollToY } from '../lib/smoothScroll';

export const useScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      setShowButton(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollToY(0);
  };

  return { showButton, scrollToTop };
};
