import { createRoot } from 'react-dom/client';
import './main.css';
import Header from './components/Header';
import Hero from './components/Hero';

function mountComponent<T extends HTMLElement>(
  selector: string,
  Component: React.ComponentType
) {
  const el = document.querySelector<T>(selector);
  if (!el) return;
  const root = document.createElement('div');
  root.style.display = 'contents';
  el.appendChild(root);
  createRoot(root).render(<Component />);
}

function init() {
  mountComponent('[data-header]', Header);
  mountComponent('[data-hero]', Hero);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
