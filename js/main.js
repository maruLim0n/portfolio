/* Entry point. Wires up every module.
   Loaded as <script type="module">. */

import { prefersReducedMotion } from './utils.js';

import { initCopyEmail }     from './modules/copy-email.js';
import { initReveal }        from './modules/reveal.js';
import { initScrollProgress } from './modules/scroll-progress.js';
import { initSmoothScroll }  from './modules/smooth-scroll.js';

import { initStars }         from './modules/stars.js';
import { initAvatarTilt }    from './modules/avatar-tilt.js';
import { initAvatarFlip }    from './modules/avatar-flip.js';
import { initMobileNav }     from './modules/mobile-nav.js';
import { initDecoStar }      from './modules/deco-star.js';
import { initMagneticPills } from './modules/magnetic-pills.js';
import { initTitleSkew }     from './modules/title-skew.js';

/* Always-on modules (work fine with or without motion). */
initCopyEmail();
initReveal();
initScrollProgress();
initSmoothScroll();
initAvatarFlip();
initMobileNav();

/* Reactive / animated modules: skip when the user prefers less motion. */
if (!prefersReducedMotion) {
  initStars();
  initAvatarTilt();
  initDecoStar();
  initMagneticPills();
  initTitleSkew();
}
