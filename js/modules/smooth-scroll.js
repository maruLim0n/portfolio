/* Smooth-scroll for in-page anchors, with an offset clearing the fixed topbar + nav bar. */

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
