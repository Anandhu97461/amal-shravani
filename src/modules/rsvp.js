/**
 * RSVP Module
 * Handles RSVP form interactions, attendance toggling, guest count stepper,
 * validation, WhatsApp message formatting, and celebratory petal burst
 */

import { burstPetals } from './petals.js';

export function initRsvp(config) {
  const rsvpContainer = document.getElementById('rs');
  const tyContainer = document.getElementById('ty');
  const nameInput = document.getElementById('rn');
  const msgInput = document.getElementById('rm');
  const errorEl = document.getElementById('er');
  const sendBtn = document.getElementById('sd');
  const guestMinusBtn = document.getElementById('gm');
  const guestPlusBtn = document.getElementById('gp');
  const guestCountEl = document.getElementById('gn');
  const evq = document.getElementById('evq');

  const attendChips = document.querySelectorAll('#att .chip');
  const eventChips = document.querySelectorAll('#evs .chip');

  if (!rsvpContainer || !sendBtn) return;

  const phone = (config?.rsvp?.phone || '').replace(/[^\d]/g, '');

  let isAttending = 1;
  let guestCount = 1;

  // Attendance chips (Joyfully Accept / Regretfully Decline)
  attendChips.forEach((btn) => {
    btn.addEventListener('click', () => {
      isAttending = Number(btn.getAttribute('data-v') || '1');
      attendChips.forEach((c) => c.classList.toggle('on', c === btn));
      if (evq) {
        evq.classList.toggle('off', !isAttending);
      }
    });
  });

  // Event selection chips
  eventChips.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('on');
    });
  });

  // Guest count stepper
  if (guestMinusBtn && guestCountEl) {
    guestMinusBtn.addEventListener('click', () => {
      guestCount = Math.max(1, guestCount - 1);
      guestCountEl.textContent = String(guestCount);
    });
  }

  if (guestPlusBtn && guestCountEl) {
    guestPlusBtn.addEventListener('click', () => {
      guestCount = Math.min(10, guestCount + 1);
      guestCountEl.textContent = String(guestCount);
    });
  }

  // Send RSVP on WhatsApp
  sendBtn.addEventListener('click', () => {
    const name = nameInput ? nameInput.value.trim() : '';

    if (!name) {
      if (errorEl) errorEl.textContent = 'Please enter your name.';
      if (nameInput) nameInput.focus();
      return;
    }

    const selectedEvents = Array.from(eventChips)
      .filter((c) => c.classList.contains('on'))
      .map((c) => c.textContent.trim());

    if (isAttending && selectedEvents.length === 0) {
      if (errorEl) errorEl.textContent = 'Please choose at least one celebration.';
      return;
    }

    if (errorEl) errorEl.textContent = '';
    const note = msgInput ? msgInput.value.trim() : '';

    const messageLines = [
      'RSVP for Amal & Shravani',
      `Name: ${name}`,
      isAttending
        ? `Attending: Yes\nGuests: ${guestCount}\nEvents: ${selectedEvents.join(', ')}`
        : 'Attending: No (regretfully declines)'
    ];

    if (note) {
      messageLines.push(`Message: ${note}`);
    }

    const fullMessage = messageLines.join('\n');
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;

    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Show Thank You message
    rsvpContainer.style.transition = 'opacity 0.5s';
    rsvpContainer.style.opacity = '0';
    setTimeout(() => {
      rsvpContainer.style.display = 'none';
      if (tyContainer) {
        tyContainer.classList.add('on');
      }
    }, 500);

    // Burst celebration petals!
    burstPetals(45);
  });
}
