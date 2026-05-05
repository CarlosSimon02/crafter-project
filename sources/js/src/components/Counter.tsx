import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-counter-btn]');
    if (!btn) return;
    const handleClick = () => setCount((c) => c + 1);
    btn.addEventListener('click', handleClick);
    return () => btn.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const display = document.querySelector<HTMLElement>('[data-counter-display]');
    if (display) display.textContent = `${count} click${count !== 1 ? 's' : ''}`;
  }, [count]);

  return null;
}
