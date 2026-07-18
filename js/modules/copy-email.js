/* Copy-to-clipboard for any element matching .js-copy-email[data-email]. */

import { showToast } from './toast.js';

const writeClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // legacy fallback for browsers without the async clipboard API
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  }
};

const handleClick = async (btn) => {
  const email = btn.dataset.email;
  if (!email) return;

  await writeClipboard(email);

  btn.classList.add('is-copied');
  const hint = btn.querySelector('em');
  const original = hint ? hint.textContent : '';
  if (hint) hint.textContent = '(copied ✦)';

  showToast(`copied ${email} ✦`);

  setTimeout(() => {
    btn.classList.remove('is-copied');
    if (hint) hint.textContent = original;
  }, 1800);
};

export const initCopyEmail = () => {
  document.querySelectorAll('.js-copy-email').forEach((btn) => {
    btn.addEventListener('click', () => handleClick(btn));
  });
};
