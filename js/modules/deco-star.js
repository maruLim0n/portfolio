/* Decorative violet star drifts toward the cursor when nearby. */

const REACH = 360;

export const initDecoStar = () => {
  const star = document.querySelector('.deco--star');
  if (!star) return;

  let tx = 0, ty = 0, cx = 0, cy = 0, rot = -12, raf = null;

  const loop = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    rot += ((tx * 0.5) - rot - 12) * 0.05;
    star.style.setProperty('--dx', cx.toFixed(1) + 'px');
    star.style.setProperty('--dy', cy.toFixed(1) + 'px');
    star.style.setProperty('--rot', rot.toFixed(1) + 'deg');
    if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  };

  window.addEventListener('mousemove', (e) => {
    const r = star.getBoundingClientRect();
    const sx = r.left + r.width / 2;
    const sy = r.top + r.height / 2;
    const dist = Math.hypot(e.clientX - sx, e.clientY - sy);
    if (dist < REACH) {
      const k = 1 - dist / REACH;
      tx = (e.clientX - sx) * 0.18 * k;
      ty = (e.clientY - sy) * 0.18 * k;
    } else {
      tx = 0; ty = 0;
    }
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
};
