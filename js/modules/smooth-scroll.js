/* Smooth-scroll for in-page anchors, with an offset clearing the fixed topbar + nav bar. */

// OFFSET accounts for the fixed topbar (19px) + nav-bar (60px) = 79px.
// Both stay constant across breakpoints (mobile nav reuses the same 60px bar
// height for its hamburger button) — if either height ever changes, update this.
const OFFSET = 100;

export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};
