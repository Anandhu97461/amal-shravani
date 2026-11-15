/**
 * Gate Overlay Module
 * Controls the animated opening doors and initial entry reveal
 */

export function initGate(onOpen) {
  const gate = document.getElementById('gate');
  const openBtn = document.getElementById('open');
  const hero = document.getElementById('hero');

  if (!gate || !openBtn) return;

  // Lock scrolling initially
  document.body.style.overflow = 'hidden';

  const openGate = () => {
    gate.classList.add('open');
    gate.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Trigger audio / custom callback immediately on user click
    if (typeof onOpen === 'function') {
      onOpen();
    }

    // Trigger hero reveal after doors slide open
    setTimeout(() => {
      if (hero) {
        hero.classList.add('in');
      }
    }, 700);
  };

  openBtn.addEventListener('click', openGate);

  // Allow Enter / Space if focused
  openBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGate();
    }
  });
}

