/* Star-field constellation across the whole page.
   Density scales with document area; positions are cached in document space
   so per-frame cursor reactivity never reads layout. */

const GLYPHS = ['✦', '✶', '✧', '✷', '⋆', '✸'];
const COLORS = [
  'var(--violet)', 'var(--cherry)', 'var(--mustard)',
  'var(--leaf)',   'var(--lilac)',  'var(--sky)', 'var(--accent)',
];

const REACH = 220;
const REACH2 = REACH * REACH;

const buildStars = (host, root) => {
  host.innerHTML = '';
  host.style.height = root.scrollHeight + 'px';

  const docH = root.scrollHeight;
  const docW = window.innerWidth;
  const target = Math.min(180, Math.max(60, Math.round((docW * docH) / 14000)));

  const out = [];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < target; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];

    const xPct = Math.random() * 100;
    const yDoc = Math.random() * docH;
    const size = 10 + Math.random() * 20;
    const rot  = Math.random() * 60 - 30;
    const col  = COLORS[(Math.random() * COLORS.length) | 0];
    const op   = 0.45 + Math.random() * 0.5;

    s.style.setProperty('--x', xPct + '%');
    s.style.setProperty('--y', yDoc + 'px');
    s.style.setProperty('--size', size + 'px');
    s.style.setProperty('--rot', rot + 'deg');
    s.style.setProperty('--col', col);
    s.style.setProperty('--op', op.toFixed(2));
    frag.appendChild(s);

    out.push({
      el: s,
      cx: (xPct / 100) * docW,
      cy: yDoc,
      baseRot: rot,
      baseOp: op,
    });
  }
  host.appendChild(frag);
  return out;
};

export const initStars = () => {
  const host = document.getElementById('stars');
  if (!host) return;
  const root = document.documentElement;

  let stars = buildStars(host, root);

  /* rebuild after fonts/images settle and on resize */
  window.addEventListener('load', () => { stars = buildStars(host, root); });
  let resizeT = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { stars = buildStars(host, root); }, 200);
  });

  /* mouse position in DOCUMENT space (cx/cy are doc-space too) */
  let mx = -9999, my = -9999;
  let raf = null;

  const update = () => {
    raf = null;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const dx = mx - s.cx;
      const dy = my - s.cy;
      const d2 = dx * dx + dy * dy;
      if (d2 < REACH2) {
        const k = 1 - Math.sqrt(d2) / REACH;
        s.el.style.setProperty('--s', (1 + k * 0.9).toFixed(2));
        s.el.style.setProperty('--op', Math.min(1, s.baseOp + k * 0.5).toFixed(2));
        s.el.style.setProperty('--rot', (s.baseRot + k * 30).toFixed(1) + 'deg');
      } else if (s.el.style.getPropertyValue('--s') !== '1') {
        s.el.style.setProperty('--s', '1');
        s.el.style.setProperty('--op', s.baseOp.toFixed(2));
        s.el.style.setProperty('--rot', s.baseRot + 'deg');
      }
    }
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX + window.scrollX;
    my = e.clientY + window.scrollY;
    schedule();
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; schedule(); });
  window.addEventListener('scroll', schedule, { passive: true });
};
