/* ==========================================================================
   Utility helpers shared across scripts
   ========================================================================== */

const Utils = {
  qs: (sel, ctx = document) => ctx.querySelector(sel),
  qsa: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),

  debounce(fn, delay = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};
