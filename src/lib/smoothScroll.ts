import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Lenis smooth wheel scrolling. Programmatic scrolls should use the helpers below.
let lenis: Lenis | null = null;

export const startSmoothScroll = () => {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.085,
    wheelMultiplier: 0.95,
    // let nested scrollers (chat, modals) scroll natively
    allowNestedScroll: true,
  });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
};

export const scrollToY = (top: number) => {
  if (lenis) lenis.scrollTo(Math.max(0, top), { duration: 1.2 });
  else window.scrollTo({ top, behavior: 'smooth' });
};

// scrollIntoView equivalent; 'start' respects scroll-margin-top
export const scrollToElement = (el: Element, block: 'start' | 'end' = 'start') => {
  const box = el.getBoundingClientRect();
  if (block === 'end') {
    scrollToY(window.scrollY + box.bottom - window.innerHeight);
    return;
  }
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  scrollToY(window.scrollY + box.top - margin);
};

// Freeze page scroll behind modals
export const setPageScrollLocked = (locked: boolean) => {
  if (locked) lenis?.stop();
  else lenis?.start();
};
