/* ==========================================================================
   Typing Animation for Hero Subtitle
   ========================================================================== */

(() => {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = [
    'AI Engineer',
    'Machine Learning Engineer',
    'Biomedical AI Researcher',
    'LLM Developer',
    'AI Automation Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const HOLD_TIME = 1400;
  const SWITCH_DELAY = 400;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, SWITCH_DELAY);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
})();
