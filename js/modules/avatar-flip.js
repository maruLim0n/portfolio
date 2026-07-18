/* Click/tap toggles .is-flipped on .js-avatar-flip, revealing the real photo.
   Hover (desktop) is handled entirely in CSS; this covers touch devices. */

export const initAvatarFlip = () => {
  document.querySelectorAll('.js-avatar-flip').forEach((el) => {
    el.addEventListener('click', () => el.classList.toggle('is-flipped'));
  });
};
