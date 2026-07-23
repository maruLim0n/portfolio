/* Hamburger toggle for the ≤760px nav dropdown. Toggles .is-open on the
   button + panel, syncs aria-expanded, closes on link click / outside click / Escape. */

export const initMobileNav = () => {
  const toggle = document.querySelector('.js-nav-toggle');
  const panel = document.querySelector('.js-nav-panel');
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    toggle.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('is-open') && !e.target.closest('.nav-bar')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
};
