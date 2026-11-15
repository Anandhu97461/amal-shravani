/**
 * Reveal Module
 * Handles scroll-triggered reveals, replaying animations on re-entry, and individual photo elements
 */

export function initReveal() {
  const gate = document.getElementById('gate');
  const sections = Array.from(document.querySelectorAll('section'));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    sections.forEach((sec) => sec.classList.add('in'));
    document.querySelectorAll('[data-rv]').forEach((el) => el.classList.add('in'));
    return;
  }

  // Section observer with threshold 0.4: adds .in when visible, removes .in when scrolling away
  // (replaying animations on re-entry as in the prototype)
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      const isGateOpen = !gate || gate.classList.contains('open');

      if (entry.isIntersecting && (target.id !== 'hero' || isGateOpen)) {
        target.classList.add('in');
      } else if (!entry.isIntersecting && target.id !== 'hero') {
        target.classList.remove('in');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((sec) => {
    if (sec.id !== 'moments') {
      sectionObserver.observe(sec);
    }
  });

  // Observe [data-rv] elements (e.g., Moments polaroid figures and section header)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-rv]').forEach((el) => {
    revealObserver.observe(el);
  });
}

