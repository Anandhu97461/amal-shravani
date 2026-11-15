/**
 * DOM Renderer Module
 * Hydrates markup using invitationConfig data so all text, media, events, venues and links
 * are centrally controlled by src/config.js.
 */

export function renderContent(config) {
  // 1. Gate Overlay
  const gateBadge = document.querySelector('#gate .cap');
  const gateTitle = document.querySelector('#gate .script');
  const gateBtn = document.querySelector('#open');
  if (gateBadge) gateBadge.textContent = config.couple.gateBadge;
  if (gateTitle) gateTitle.textContent = config.couple.title;
  if (gateBtn) gateBtn.textContent = config.couple.gateButton;

  // 2. Hero Section
  const heroTagline = document.querySelector('#hero .hero-tagline');
  const heroGroom = document.querySelector('#hero .hero-groom');
  const heroBride = document.querySelector('#hero .hero-bride');
  const heroQuote = document.querySelector('#hero .hero-quote');
  const heroDates = document.querySelector('#hero .hero-dates');

  if (heroTagline) heroTagline.textContent = config.couple.tagline;
  if (heroGroom) heroGroom.textContent = config.couple.groom;
  if (heroBride) heroBride.textContent = config.couple.bride;
  if (heroQuote) heroQuote.textContent = config.couple.quote;
  if (heroDates) heroDates.textContent = config.couple.datesHeader;

  // 3. Our Story Section
  const storyLabel = document.querySelector('#story .story-label');
  const storyHeading = document.querySelector('#story .story-heading');
  const carouselContainer = document.querySelector('.car');

  if (storyLabel) storyLabel.textContent = config.story.label;
  if (storyHeading) {
    storyHeading.innerHTML = `${config.story.headingMain}<br><span class="script" style="font-size:1.3em">${config.story.headingScript}</span>`;
  }

  if (carouselContainer && config.story.chapters) {
    carouselContainer.innerHTML = config.story.chapters.map((ch, idx) => `
      <article class="sl ${idx === 0 ? 'on' : ''}" role="group" aria-roledescription="slide" aria-label="Chapter ${idx + 1} of ${config.story.chapters.length}">
        <div class="fr">
          <img 
            alt="${ch.alt}" 
            src="${ch.image}" 
            width="${ch.width}" 
            height="${ch.height}"
            ${idx > 0 ? 'loading="lazy"' : ''}
            decoding="async"
          >
        </div>
        <h3>${ch.title}</h3>
        <p>${ch.text}</p>
      </article>
    `).join('');
  }

  // 4. Moments Section
  const momentsLabel = document.querySelector('#moments .moments-label');
  const momentsHeading = document.querySelector('#moments .moments-heading');
  const colsContainer = document.querySelector('#moments .cols');

  if (momentsLabel) momentsLabel.textContent = config.moments.label;
  if (momentsHeading) {
    momentsHeading.innerHTML = `${config.moments.headingMain} <span class="script" style="font-size:1.3em">${config.moments.headingScript}</span>`;
  }

  if (colsContainer && config.moments.items) {
    colsContainer.innerHTML = config.moments.items.map((m) => `
      <figure class="mo" data-rv style="--r:${m.rotation}">
        <div class="pl" role="button" tabindex="0" style="--ar:${m.aspectRatio};--d:${m.delay}" aria-label="Enlarge photo: ${m.caption}">
          <img 
            alt="${m.alt}" 
            src="${m.image}" 
            loading="lazy" 
            decoding="async"
          >
          <span>${m.caption}</span>
        </div>
      </figure>
    `).join('');
  }

  // 5. Events Sections (e1, e2, e3)
  config.events.forEach((ev) => {
    const sec = document.getElementById(ev.id);
    if (!sec) return;

    const col = sec.querySelector('.col');
    if (!col) return;

    // Check if venue fields should be displayed
    const hasVenue = Boolean(ev.venueName || ev.venueAddress);
    const venueHtml = hasVenue ? `
      <p class="venue rv" style="--i:5">
        ${ev.venueName ? `<strong>${ev.venueName}</strong><br>` : ''}
        ${ev.venueAddress || ''}
      </p>
    ` : '';

    const iOffset = hasVenue ? 1 : 0;

    col.innerHTML = `
      <p class="cap rv" style="--i:0;${ev.id === 'e1' ? 'color:#8a6a2a' : ev.id === 'e3' ? 'color:#8a5a1a' : ''}">${ev.category}</p>
      <h2 class="rv" style="--i:1;margin-top:.4rem">
        ${ev.titleMain}<br><span class="script" style="font-size:1.3em;${ev.id === 'e1' ? 'color:#a47a2c' : ev.id === 'e3' ? 'color:#a8741f' : ''}">${ev.titleScript}</span>
      </h2>
      <svg class="orn rv" style="--i:2" viewBox="0 0 160 22" aria-hidden="true">
        <path d="M0 11h60M100 11h60" stroke="${ev.id === 'e2' ? '#e6c36b' : '#b8872e'}"/>
        <g transform="translate(69 0)"><use href="#lotus"/></g>
      </svg>
      <p class="big rv" style="--i:3">${ev.date.replace('\n', '<br>')}</p>
      <p class="meta rv" style="--i:4">${ev.time}</p>
      ${ev.note ? `<p class="meta rv" style="--i:5;font-style:italic;font-size:1.1em">${ev.note}</p>` : ''}
      ${venueHtml}
      <a class="btn rv" style="--i:${(ev.note ? 6 : 5) + iOffset}" href="${ev.shareLink}" target="_blank" rel="noopener">
        VIEW LOCATION
      </a>
    `;
  });

  // 6. RSVP Section
  const seal = document.querySelector('#rsvp .seal');
  if (seal && config.rsvp?.sealMonogram) {
    seal.textContent = config.rsvp.sealMonogram;
  }

  // 7. Footer Content
  const footerScript = document.querySelector('footer .footer-title');
  const footerCountdownTitle = document.querySelector('footer .footer-cd-title');
  const footerBlessing = document.querySelector('footer .footer-blessing');

  if (footerScript) footerScript.textContent = config.couple.title;
  if (footerCountdownTitle) footerCountdownTitle.textContent = config.countdown.title;
  if (footerBlessing) footerBlessing.textContent = config.countdown.blessing;
}

