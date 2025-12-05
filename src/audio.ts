// audio.ts - Handle background audio playback

export function initAudio() {
  const audioToggle = document.getElementById('audio-toggle');
  const audio = document.getElementById('background-audio') as HTMLAudioElement;

  if (!audioToggle || !audio) return;

  let isPlaying = false;

  audioToggle.addEventListener('click', () => {
    if (isPlaying) {
      // Pause audio
      audio.pause();
      audioToggle.textContent = 'nyalain audio';
      isPlaying = false;
    } else {
      // Play audio
      audio.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
      audioToggle.textContent = 'matikan audio';
      isPlaying = true;
    }
  });

  // Update state if audio ends (for non-looping audio)
  audio.addEventListener('ended', () => {
    audioToggle.textContent = 'nyalain audio';
    isPlaying = false;
  });
}
