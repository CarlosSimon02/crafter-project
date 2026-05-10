/*
 * Header dropdown enhancer.
 *
 * The header HTML (logo, location, CTA, language trigger, dropdown menu)
 * is fully rendered server-side in templates/web/components/header.ftl
 * to avoid FOUC. This module only adds the interactive bits:
 *   - toggling the language dropdown open/closed,
 *   - closing it on outside click or Escape,
 *   - navigating to the equivalent path in the chosen locale on item click.
 */

const KNOWN_LOCALES = new Set(['en', 'zh']);

function navigateToLocale(newCode: string): void {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0 && KNOWN_LOCALES.has(parts[0])) {
    parts[0] = newCode;
  } else {
    parts.unshift(newCode);
  }
  const newPath = '/' + parts.join('/') + (path.endsWith('/') ? '/' : '');
  window.location.href = newPath + window.location.search + window.location.hash;
}

export function initHeader(): void {
  const switcher = document.querySelector<HTMLElement>('[data-language-switcher]');
  if (!switcher) return;

  const trigger  = switcher.querySelector<HTMLButtonElement>('[data-language-trigger]');
  const dropdown = switcher.querySelector<HTMLElement>('[data-language-dropdown]');
  const chevron  = switcher.querySelector<HTMLElement>('[data-chevron]');
  if (!trigger || !dropdown) return;

  function setOpen(open: boolean): void {
    if (open) {
      dropdown!.removeAttribute('hidden');
      trigger!.setAttribute('aria-expanded', 'true');
      chevron?.classList.add('rotate-180');
    } else {
      dropdown!.setAttribute('hidden', '');
      trigger!.setAttribute('aria-expanded', 'false');
      chevron?.classList.remove('rotate-180');
    }
  }

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  document.addEventListener('mousedown', (e) => {
    if (!switcher.contains(e.target as Node)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  switcher.querySelectorAll<HTMLButtonElement>('[data-language-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.languageOption;
      if (code) navigateToLocale(code);
    });
  });
}
