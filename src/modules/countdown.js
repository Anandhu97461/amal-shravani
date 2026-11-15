/**
 * Countdown Module
 * Real-time wedding countdown with animated digit pop
 */

export function initCountdown(targetIsoDate) {
  const targetTime = new Date(targetIsoDate || '2027-01-06T15:00:00+05:30').getTime();
  const dayEl = document.getElementById('d');
  const hourEl = document.getElementById('h');
  const minEl = document.getElementById('m');
  const secEl = document.getElementById('s');

  const elements = [dayEl, hourEl, minEl, secEl];
  if (!dayEl || !hourEl || !minEl || !secEl) return;

  function update() {
    const diff = Math.max(0, targetTime - Date.now());
    const values = [
      Math.floor(diff / 864e5),
      Math.floor(diff / 36e5) % 24,
      Math.floor(diff / 6e4) % 60,
      Math.floor(diff / 1e3) % 60
    ];

    elements.forEach((el, index) => {
      const valStr = String(values[index]);
      if (el.textContent !== valStr) {
        el.textContent = valStr;
        el.style.transform = 'scale(1.2)';
        setTimeout(() => {
          el.style.transform = '';
        }, 180);
      }
    });
  }

  update();
  setInterval(update, 1000);
}

