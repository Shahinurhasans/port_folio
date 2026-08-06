/* ==========================================================================
   Main App Logic: Loading, Navbar, Scroll Progress, Contact Form, Back-to-Top
   ========================================================================== */

(() => {
  /* ---- Loading Screen ---- */
  /* Uses DOMContentLoaded + a fixed timer rather than window 'load', so a
     missing/failing image can never delay or block the reveal. */
  function hideLoader() {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }

  function runLoader() {
    const bar = document.querySelector('.loader-bar span');
    if (bar) {
      bar.style.transition = 'width 0.9s ease';
      requestAnimationFrame(() => { bar.style.width = '100%'; });
    }
    setTimeout(hideLoader, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLoader);
  } else {
    runLoader();
  }

  /* ---- Footer Year ---- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scroll state ---- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');

  function onScroll() {
    const scrollTop = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    Utils.qsa('.nav-link', navLinks).forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active Nav Link on Scroll ---- */
  const sections = Utils.qsa('section[id]');
  const navLinkEls = Utils.qsa('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---- Back to Top ---- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Contact Form (front-end only) ---- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Sending...';

      setTimeout(() => {
        status.textContent = `Thanks for reaching out! I'll get back to you soon.`;
        form.reset();
        setTimeout(() => { status.textContent = ''; }, 5000);
      }, 900);
    });
  }
})();
