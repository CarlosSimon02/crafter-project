import './main.css';
import { initHeader } from './header';

function init(): void {
  initHeader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
