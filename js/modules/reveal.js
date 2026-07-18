/* Reveal-on-scroll: adds .is-in to .block / .hello sections when they enter
   the viewport. Also seeds a stagger index (--i) on staggered children so
   their delay can be `calc(var(--i) * 90ms + 200ms)` etc. */

const STAGGER_SELECTORS = '.proj, .play__item, .cv__row, .howi li';

const seedStaggerIndices = () => {
  document.querySelectorAll('.block').forEach((block) => {
    block.querySelectorAll(STAGGER_SELECTORS).forEach((el, i) => {
      el.style.setProperty('--i', i);
    });
  });
};

export const initReveal = () => {
  seedStaggerIndices();

  const targets = document.querySelectorAll('.block, .hello');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  targets.forEach((t) => io.observe(t));
};
