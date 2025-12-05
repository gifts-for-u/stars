// stars.ts - Generate and animate twinkling stars

export function initStars() {
  const container = document.getElementById('stars-container');
  const introScreen = document.getElementById('intro-screen');
  
  if (!container) return;

  // Configuration
  const starCount = 150;
  const safeZoneWidthPercent = 60; // Percentage of viewport width
  const safeZoneHeightPercent = 40; // Percentage of viewport height

  // Calculate safe zone boundaries (centered)
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const safeZoneWidth = (viewportWidth * safeZoneWidthPercent) / 100;
  const safeZoneHeight = (viewportHeight * safeZoneHeightPercent) / 100;
  const safeZoneLeft = (viewportWidth - safeZoneWidth) / 2;
  const safeZoneRight = safeZoneLeft + safeZoneWidth;
  const safeZoneTop = (viewportHeight - safeZoneHeight) / 2;
  const safeZoneBottom = safeZoneTop + safeZoneHeight;

  // Check if intro screen is active
  const isIntroActive = introScreen && !introScreen.classList.contains('hidden');

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    let x, y;
    let attempts = 0;
    const maxAttempts = 50;

    // Generate position, avoiding safe zone if intro is active
    do {
      x = Math.random() * viewportWidth;
      y = Math.random() * viewportHeight;
      attempts++;

      // If intro is not active or max attempts reached, accept any position
      if (!isIntroActive || attempts >= maxAttempts) break;

      // Check if position is outside safe zone
      const isOutsideSafeZone = 
        x < safeZoneLeft || 
        x > safeZoneRight || 
        y < safeZoneTop || 
        y > safeZoneBottom;

      if (isOutsideSafeZone) break;
    } while (true);

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Random animation duration and delay for organic effect
    const duration = 2 + Math.random() * 4; // 2-6 seconds
    const delay = Math.random() * 3; // 0-3 seconds delay
    
    star.style.setProperty('--twinkle-duration', `${duration}s`);
    star.style.setProperty('--twinkle-delay', `${delay}s`);

    // Random star sizes for variation
    const size = 1.5 + Math.random() * 2; // 1.5-3.5px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    container.appendChild(star);
  }
}

// Function to intensify star animation for closing section
export function intensifyStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star) => {
    (star as HTMLElement).style.setProperty('--twinkle-duration', '1.5s');
  });
}
