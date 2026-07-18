/* Pill buttons get a small magnetic pull toward the cursor on hover. */

const STRENGTH_X = 0.18;
const STRENGTH_Y = 0.25;

export const initMagneticPills = () => {
  document.querySelectorAll('.pill').forEach((pill) => {
    pill.addEventListener('mousemove', (e) => {
      const r = pill.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      pill.style.setProperty('--mx', (dx * STRENGTH_X).toFixed(1) + 'px');
      pill.style.setProperty('--my', (dy * STRENGTH_Y).toFixed(1) + 'px');
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.setProperty('--mx', '0px');
      pill.style.setProperty('--my', '0px');
    });
  });
};
