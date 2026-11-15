/**
 * Lightbox Module
 * Accessible photo modal with keyboard navigation, focus trap, and smooth entry/exit
 */

export function initLightbox() {
  const lb = document.getElementById('lb');
  const lbImg = lb ? lb.querySelector('img') : null;
  const lbCaption = lb ? lb.querySelector('figcaption') : null;
  const closeBtn = lb ? lb.querySelector('.lb-close') : null;
  const polaroids = document.querySelectorAll('.pl');

  if (!lb || !lbImg) return;

  let activeTrigger = null;

  function openLightbox(triggerEl) {
    activeTrigger = triggerEl;
    const img = triggerEl.querySelector('img');
    const span = triggerEl.querySelector('span');

    if (img) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
    }
    if (lbCaption) {
      lbCaption.textContent = span ? span.textContent : '';
    }

    lb.classList.add('on');
    lb.setAttribute('aria-hidden', 'false');

    // Focus close button for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  function closeLightbox() {
    if (!lb.classList.contains('on')) return;
    lb.classList.remove('on');
    lb.setAttribute('aria-hidden', 'true');

    if (activeTrigger) {
      activeTrigger.focus();
      activeTrigger = null;
    }
  }

  polaroids.forEach((polaroid) => {
    polaroid.addEventListener('click', () => openLightbox(polaroid));
    polaroid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(polaroid);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  lb.addEventListener('click', (e) => {
    // Click outside figure or on figure backdrop closes
    if (e.target === lb || e.target.classList.contains('lb-backdrop') || e.target === lbImg) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('on')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'Tab') {
      // Simple focus trap between close button and image/container
      const focusableElements = lb.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

