/* Avatar card tilts toward the cursor (eased perspective rotateX/Y). */

import { lerp } from '../utils.js';

export const initAvatarTilt = () => {
  const avatar = document.querySelector('.avatar');
  if (!avatar) return;

  let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

  const loop = () => {
    cx = lerp(cx, tx, 0.12);
    cy = lerp(cy, ty, 0.12);
    avatar.style.setProperty('--rx', cx.toFixed(2) + 'deg');
    avatar.style.setProperty('--ry', cy.toFixed(2) + 'deg');
    if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  };

  window.addEventListener('mousemove', (e) => {
    const r = avatar.getBoundingClientRect();
    const ax = r.left + r.width / 2;
    const ay = r.top + r.height / 2;
    tx = ((e.clientX - ax) / window.innerWidth) * 14;
    ty = -((e.clientY - ay) / window.innerHeight) * 10;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
};
