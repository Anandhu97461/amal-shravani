/**
 * Petals Module
 * Smooth canvas animation of falling wedding flower petals with tab-visibility awareness
 */

export function initPetals() {
  const canvas = document.getElementById('petals');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let animFrameId = null;

  const colors = ['#f6d98a', '#fff3d6', '#e8a0a0', '#d9b85a'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particleCount = window.innerWidth < 600 ? 14 : 28;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 3 + Math.random() * 4,
      s: 0.4 + Math.random() * 0.9,
      d: Math.random() * 6,
      c: colors[i % colors.length]
    });
  }

  function loop() {
    if (document.visibilityState === 'hidden') {
      animFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.s;
      p.d += 0.02;
      p.x += Math.sin(p.d) * 0.8;

      if (p.y > height + 10) {
        p.y = -10;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.d);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animFrameId = requestAnimationFrame(loop);
  }

  // Start animation loop
  animFrameId = requestAnimationFrame(loop);

  // Pause / resume on visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(loop);
      }
    } else {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }
  });
}

