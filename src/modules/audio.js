/**
 * Audio Module
 * Plays background music when invitation is opened, with smooth fade-in and a toggle control
 */

export function initAudio() {
  const audio = new Audio('/assets/music.mp3');
  audio.loop = true;
  audio.preload = 'auto';

  let isPlaying = false;
  let musicBtn = document.getElementById('music-toggle');

  // Fade-in volume helper for a soft, luxurious start
  function fadeIn(targetVolume = 0.75, duration = 1500) {
    audio.volume = 0;
    const startPlayPromise = audio.play();

    if (startPlayPromise !== undefined) {
      startPlayPromise.then(() => {
        isPlaying = true;
        updateButtonState(true);
        const steps = 30;
        const stepTime = duration / steps;
        const volumeIncrement = targetVolume / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
          currentStep++;
          audio.volume = Math.min(targetVolume, audio.volume + volumeIncrement);
          if (currentStep >= steps || audio.volume >= targetVolume) {
            audio.volume = targetVolume;
            clearInterval(interval);
          }
        }, stepTime);
      }).catch((err) => {
        console.warn('Audio play prevented or blocked:', err);
        updateButtonState(false);
      });
    }
  }

  function play() {
    fadeIn();
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    updateButtonState(false);
  }

  function toggle() {
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  }

  function updateButtonState(playing) {
    if (!musicBtn) return;
    musicBtn.classList.toggle('playing', playing);
    musicBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    musicBtn.setAttribute('aria-label', playing ? 'Mute background music' : 'Play background music');
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggle);
  }

  // Pause when tab is minimized/hidden to save bandwidth and battery
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      if (isPlaying) {
        audio.pause();
      }
    } else {
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    }
  });

  return {
    play,
    pause,
    toggle
  };
}

