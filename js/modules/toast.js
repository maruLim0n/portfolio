/* Single toast element shared across the app. */

const el = document.getElementById('toast');
let timer = null;

export const showToast = (message, ms = 1800) => {
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('is-visible'), ms);
};
