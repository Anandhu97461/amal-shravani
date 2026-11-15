/**
 * Navigation Module
 * Fixed 6-dot navigation tracking the active section at the viewport center
 */

export function initNav(navItems) {
  const navContainer = document.querySelector('.nav');
  if (!navContainer) return;

  const sections = Array.from(document.querySelectorAll('section'));
  
  // Render accessible dot links if not already present or replace them
  navContainer.innerHTML = '';
  const dots = (navItems || []).map((item, index) => {
    const link = document.createElement('a');
    link.href = item.target;
    link.setAttribute('aria-label', item.label);
    if (index === 0) link.classList.add('on');
    navContainer.appendChild(link);
    return link;
  });

  // Observe sections with rootMargin -50% 0px -50% 0px so the section in the viewport center is highlighted
  const centerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dots.forEach((dot, idx) => {
          const isActive = sections[idx] === entry.target;
          dot.classList.toggle('on', isActive);
          if (isActive) {
            dot.setAttribute('aria-current', 'location');
          } else {
            dot.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach((sec) => centerObserver.observe(sec));
}

