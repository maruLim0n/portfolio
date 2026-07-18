/* Pupils inside .eye elements track the cursor with a small max offset. */

const MAX = 3;   // px — cap pupil offset
const RAMP = 30; // distance / RAMP saturates the offset

export const initEyes = () => {
  const eyes = Array.from(document.querySelectorAll('.eye'));
  if (!eyes.length) return;

  let mx = 0, my = 0, raf = null;

  const update = () => {
    raf = null;
    for (let i = 0; i < eyes.length; i++) {
      const eye = eyes[i];
      const r = eye.getBoundingClientRect();
      const ex = r.left + r.width / 2;
      const ey = r.top + r.height / 2;
      const dx = mx - ex;
      const dy = my - ey;
      const dist = Math.hypot(dx, dy) || 1;
      const mag = Math.min(MAX, dist / RAMP);
      const px = (dx / dist) * mag;
      const py = (dy / dist) * mag;

      const pupil = eye.firstElementChild;
      if (pupil) {
        pupil.style.setProperty('--px', px.toFixed(2) + 'px');
        pupil.style.setProperty('--py', py.toFixed(2) + 'px');
      }
    }
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    schedule();
  }, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
};
