/**
 * Main Application Entry Point
 * Orchestrates styles, data hydration from config.js, and initializes interactive modules
 */

import './styles/tokens.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/animations.css';

import { invitationConfig } from './src/config.js';
import { renderContent } from './src/modules/render.js';
import { initGate } from './src/modules/gate.js';
import { initReveal } from './src/modules/reveal.js';
import { initCarousel } from './src/modules/carousel.js';
import { initLightbox } from './src/modules/lightbox.js';
import { initCountdown } from './src/modules/countdown.js';
import { initPetals } from './src/modules/petals.js';
import { initNav } from './src/modules/nav.js';
import { initAudio } from './src/modules/audio.js';
import { initRsvp } from './src/modules/rsvp.js';

function initApp() {
  // 1. Render all dynamic content from config.js
  renderContent(invitationConfig);

  // 2. Initialize background audio controller
  const audio = initAudio();

  // 3. Initialize interactive features
  initGate(() => audio.play());
  initNav(invitationConfig.navigation);
  initPetals();
  initCountdown(invitationConfig.countdown.targetDate);
  initCarousel();
  initLightbox();
  initRsvp(invitationConfig);

  // 4. Initialize scroll-triggered reveals after DOM is fully populated
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

