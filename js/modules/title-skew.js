/* Section titles micro-skew based on scroll velocity. Capped to ±3°. */

const MAX = 3;

export const initTitleSkew = () => {
  const titles = document.querySelectorAll('.block__title');
  if (!titles.length) return;

  let lastY = window.scrollY;
  let vel = 0;
  let raf = null;

  const tick = () => {
    const y = window.scrollY;
    const dv = y - lastY;
    lastY = y;
    vel += (dv - vel) * 0.2;
    const skew = Math.max(-MAX, Math.min(MAX, -vel * 0.06));
    titles.forEach((t) => t.style.setProperty('--vskew', skew.toFixed(2) + 'deg'));
    if (Math.abs(vel) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      titles.forEach((t) => t.style.setProperty('--vskew', '0deg'));
      raf = null;
    }
  };

  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
};
