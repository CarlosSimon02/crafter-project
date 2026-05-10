import { useState, useRef, useEffect } from 'react';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', label: 'EN',   flag: '/static-assets/images/hongkong-flag.svg' },
  { code: 'zh', label: '中文', flag: '/static-assets/images/hongkong-flag.svg' },
];

const KNOWN_LOCALES = new Set(languages.map(l => l.code));

function switchLocale(newCode: string) {
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

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const el = document.querySelector<HTMLElement>('[data-header]');
  if (!el) return null;

  const logoSrc       = el.dataset.logoSrc       ?? '/static-assets/images/gotyme-logo-black.svg';
  const location      = el.dataset.location      ?? 'Hong Kong';
  const ctaLabel      = el.dataset.ctaLabel      ?? 'Partner with us';
  const ctaUrl        = el.dataset.ctaUrl        ?? '#';
  const currentLocale = el.dataset.currentLocale ?? 'en';

  const current = languages.find(l => l.code === currentLocale) ?? languages[0];

  return (
    <header className="bg-cool-grey sticky top-0 z-50 rounded-2xl mx-4 mt-8 mb-6 max-w-[1216px] lg:mx-auto h-[90px] flex items-center px-10">
      <div className="flex items-center justify-between gap-5 w-full h-full">

        <a href={`/${currentLocale}/`} className="flex items-center gap-5 no-underline text-charcoal w-[19rem] shrink-0">
          <img src={logoSrc} alt="GoTyme" className="h-8 w-auto max-w-[129px]" />
          <span className="font-medium text-2xl leading-tight text-charcoal whitespace-nowrap">{location}</span>
        </a>

        <div className="flex items-center gap-3 flex-1 justify-end">

          <div ref={ref} className="relative inline-block">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-2 bg-white rounded-full px-7 h-[60px] w-[168px] justify-center border-none cursor-pointer hover:bg-light-grey transition-colors"
            >
              <img src={current.flag} alt="" className="w-6 h-6 rounded-full object-cover" />
              <span className="font-inter text-xs font-bold text-[#545464]">{current.label}</span>
              <svg
                className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
                viewBox="0 0 12 8" fill="none"
              >
                <path d="M1 1l5 5 5-5" stroke="#545464" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {open && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden min-w-[168px]">
                {languages.map((lang, i) => (
                  <div key={lang.code}>
                    <button
                      onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-3 px-5 py-4 border-none bg-transparent cursor-pointer hover:bg-light-grey transition-colors text-left ${current.code === lang.code ? 'font-bold' : 'font-medium'}`}
                    >
                      <img src={lang.flag} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                      <span className="font-inter text-base text-[#545464] flex-1">{lang.label}</span>
                      {current.code === lang.code && (
                        <svg className="w-4 h-4 text-charcoal" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    {i < languages.length - 1 && <div className="h-px bg-[#e5e5e5] mx-5" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a
            href={ctaUrl}
            className="bg-purple text-white font-bold text-xl rounded-full px-6 h-[60px] flex items-center justify-center no-underline hover:bg-[#3a0bc7] transition-colors whitespace-nowrap"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
