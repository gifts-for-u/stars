// main.ts - Entry point

import './styles/main.css';
import './styles/intro-screen.css';
import './styles/scroll-story.css';
import { initStars } from './stars';
import { initNavigation } from './navigation';
import { initAudio } from './audio';
import { initTapNavigation } from './tap-navigation';
// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initNavigation();
  initAudio();
  initTapNavigation();
});
