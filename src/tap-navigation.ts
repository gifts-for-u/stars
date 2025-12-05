// tap-navigation.ts - Handle tap to advance story

import { gsap } from 'gsap';

export function initTapNavigation() {
  const storyContainer = document.getElementById('story-container');
  const slides = document.querySelectorAll('.story-slide');
  let currentIndex = 0;
  let isAnimating = false;

  if (!storyContainer || slides.length === 0) return;

  // Initialize: Ensure first slide is active
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add('active');
      gsap.set(slide, { opacity: 1, scale: 1 });
    } else {
      slide.classList.remove('active');
      gsap.set(slide, { opacity: 0, scale: 0.95 });
    }
  });

  // Tap handler
  storyContainer.addEventListener('click', (e) => {
    // Don't advance if clicking on button
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    
    // Don't advance if already animating or at end
    if (isAnimating || currentIndex >= slides.length - 1) return;

    nextSlide();
  });

  function nextSlide() {
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[currentIndex + 1];

    // Animate out current
    gsap.to(currentSlide, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        currentSlide.classList.remove('active');
      }
    });

    // Animate in next
    nextSlide.classList.add('active');
    gsap.fromTo(nextSlide, 
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.1, // Slight overlap
        ease: 'power2.out',
        onComplete: () => {
          currentIndex++;
          isAnimating = false;
        }
      }
    );
  }

  // Hug Button Handler
  const hugButton = document.getElementById('final-button');
  if (hugButton) {
    hugButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent slide advance (handled by tagName check globally, but good practice)
      sprayHugs(hugButton);
    });
  }

  function sprayHugs(button: HTMLElement) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 15-20 emojis
    const count = 15;
    
    for (let i = 0; i < count; i++) {
      const emoji = document.createElement('div');
      emoji.textContent = '🤗';
      emoji.style.position = 'fixed';
      emoji.style.left = `${centerX}px`;
      emoji.style.top = `${centerY}px`;
      emoji.style.fontSize = '2rem';
      emoji.style.pointerEvents = 'none';
      emoji.style.zIndex = '100';
      document.body.appendChild(emoji);

      // Random angle and distance
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 150;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      gsap.to(emoji, {
        x: tx,
        y: ty,
        opacity: 0,
        rotation: Math.random() * 90 - 45,
        duration: 1 + Math.random() * 1,
        ease: 'power2.out',
        onComplete: () => {
          emoji.remove();
        }
      });
    }
  }
}
