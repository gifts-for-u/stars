// navigation.ts - Handle screen transitions

export function initNavigation() {
  const nextButton = document.getElementById('next-button');
  const introScreen = document.getElementById('intro-screen');
  const storyContainer = document.getElementById('story-container');

  if (!nextButton || !introScreen || !storyContainer) return;

  nextButton.addEventListener('click', () => {
    // Add fade-out animation to intro screen
    introScreen.classList.add('fade-out');

    // Wait for fade-out animation to complete (800ms)
    setTimeout(() => {
      // Hide intro screen and show story container
      introScreen.classList.add('hidden');
      storyContainer.classList.remove('hidden');
      
      // Animations are handled by tap-navigation.ts
    }, 800);
  });
}
