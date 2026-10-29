import { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const activeSectionRef = useRef(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          // page offset; offsetTop is relative to the transformed reveal wrappers
          const box = section.getBoundingClientRect();
          const sectionTop = box.top + window.scrollY;
          const sectionBottom = sectionTop + box.height;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (activeSectionRef.current !== sectionIds[i]) {
              activeSectionRef.current = sectionIds[i];
              setActiveSection(sectionIds[i]);
            }
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};
