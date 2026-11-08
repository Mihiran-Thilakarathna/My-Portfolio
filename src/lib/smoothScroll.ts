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

// Space left between the fixed navbar and a section title after scrolling to it
const TITLE_GAP = 24;

// Page Y of an element's layout box. offsetTop ignores CSS transforms, so sections that are
// still shifted down by their reveal animation don't make the scroll overshoot.
const layoutTop = (el: HTMLElement) => {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
};

// Bottom edge of the fixed navbar (taller on mobile, where the logo sits above the icons)
const navBottom = () => document.querySelector('.header .nav')?.getBoundingClientRect().bottom ?? 0;

// scrollIntoView equivalent. 'start' lands the section's title just below the navbar;
// elements without a .section-header fall back to scroll-margin-top.
export const scrollToElement = (el: HTMLElement, block: 'start' | 'end' = 'start') => {
  if (block === 'end') {
    scrollToY(layoutTop(el) + el.offsetHeight - window.innerHeight);
    return;
  }
  const title = el.querySelector<HTMLElement>('.section-header');
  if (title) {
    scrollToY(layoutTop(title) - navBottom() - TITLE_GAP);
    return;
  }
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  scrollToY(layoutTop(el) - margin);
};

// Freeze page scroll behind modals
export const setPageScrollLocked = (locked: boolean) => {
  if (locked) lenis?.stop();
  else lenis?.start();
};
