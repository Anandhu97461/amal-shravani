/**
 * Carousel Module
 * Handles Our Story carousel with auto-advance, swipe gestures, hover pause, tab visibility pause, and keyboard controls
 */

export function initCarousel() {
  const car = document.querySelector('.car');
  const slides = Array.from(document.querySelectorAll('.sl'));
  const dotsContainer = document.querySelector('.dts');
  const prevBtn = document.getElementById('pv');
  const nextBtn = document.getElementById('nx');
  const storySection = document.getElementById('story');
  const liveRegion = document.getElementById('story-live-region');

  if (!car || slides.length === 0 || !dotsContainer) return;

  let current = 0;
  let isHovered = false;

  // Clear existing dots and generate accessible buttons
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    if (i === 0) dot.classList.add('on');

    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function goTo(n) {
    if (slides.length <= 1) return;
    const oldSlide = slides[current];
    oldSlide.classList.remove('on');
    oldSlide.classList.add('out');

    setTimeout(() => {
      oldSlide.classList.remove('out');
    }, 950);

    current = (n + slides.length) % slides.length;
    slides[current].classList.add('on');

    dots.forEach((dot, idx) => {
      dot.classList.toggle('on', idx === current);
      dot.setAttribute('aria-pressed', idx === current ? 'true' : 'false');
    });

    if (liveRegion) {
      const heading = slides[current].querySelector('h3')?.textContent || '';
      liveRegion.textContent = `Slide ${current + 1} of ${slides.length}: ${heading}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goTo(current - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goTo(current + 1));
  }

  // Hover detection
  car.addEventListener('pointerenter', () => { isHovered = true; });
  car.addEventListener('pointerleave', () => { isHovered = false; });

  // Swipe gesture support
  let touchStartX = 0;
  car.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  car.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      goTo(current + (deltaX < 0 ? 1 : -1));
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      goTo(current + 1);
    } else if (e.key === 'ArrowLeft') {
      goTo(current - 1);
    }
  });

  // Auto advance every 6.5s (only when visible in viewport, tab active, and not hovered)
  setInterval(() => {
    const isVisibleInViewport = storySection && storySection.classList.contains('in');
    const isTabActive = document.visibilityState === 'visible';

    if (!isHovered && isVisibleInViewport && isTabActive) {
      goTo(current + 1);
    }
  }, 6500);
}

