import { createRoot } from 'react-dom/client';
import './main.css';
import Counter from './components/Counter';

function init() {
  const el = document.createElement('div');
  el.style.display = 'contents';
  document.body.appendChild(el);
  createRoot(el).render(<Counter />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
