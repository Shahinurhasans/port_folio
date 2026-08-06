/* ==========================================================================
   Project Filtering + Modal
   ========================================================================== */

(() => {
  /* ---- Filtering ---- */
  const filterBtns = Utils.qsa('.filter-btn');
  const projectCards = Utils.qsa('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hide');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ---- Project Modal ---- */
  const backdrop = document.getElementById('modal-backdrop');
  const readMoreBtns = Utils.qsa('.read-more-btn');
  let activeModal = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    activeModal = modal;
    backdrop.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (activeModal) activeModal.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    activeModal = null;
  }

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.target));
  });

  Utils.qsa('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
