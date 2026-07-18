/* Drives the violet fill inside the top yellow stripe.
   Sets --scroll on <html> as a percentage of the document scrolled. */

import { rafThrottle } from '../utils.js';

export const initScrollProgress = () => {
  const root = document.documentElement;
  const update = rafThrottle(() => {
    const max = root.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    root.style.setProperty('--scroll', pct.toFixed(2) + '%');
  });
  window.addEventListener('scroll', update, { passive: true });
  update();
};
