/* Shared utilities. */

export const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lerp = (a, b, t) => a + (b - a) * t;

/* Run cb on the next animation frame, but coalesce repeated calls
   so we never schedule more than one frame at a time. Returns a
   "request" function. */
export const rafThrottle = (cb) => {
  let scheduled = false;
  return () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      cb();
    });
  };
};
