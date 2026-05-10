import { useState, useRef, useEffect } from 'react';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English',   flag: '/static-assets/images/uk-flag.svg' },
  { code: 'zh', label: '繁體中文',   flag: '/static-assets/images/hongkong-flag.svg' },
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
    // .header — bg cool-grey, sticky, z-1000, rounded 1rem, margin 2rem auto 1.5rem, max-w 1216px, w calc(100% - 2rem), h 90px, padding 1rem 2.5rem
    <header className="bg-cool-grey sticky top-0 z-[1000] rounded-2xl mt-8 mb-6 max-w-[1216px] w-[calc(100%-2rem)] mx-auto h-[90px] flex items-center px-10 py-4">
      {/* .header-content — flex justify-between gap 1.375rem */}
      <div className="flex items-center justify-between gap-[1.375rem] w-full h-full">

        {/* .logo — gap 1.375rem, w 19rem */}
        <a href={`/${currentLocale}/`} className="flex items-center gap-[1.375rem] w-[19rem] shrink-0 no-underline text-charcoal">
          <img src={logoSrc} alt="GoTyme" className="h-8 w-auto max-w-[129px] cursor-pointer" />
          {/* .location — font-medium, leading-tight, text-2xl */}
          <span className="font-sans font-medium text-2xl leading-tight text-charcoal whitespace-nowrap">{location}</span>
        </a>

        {/* .header-actions — gap 0.75rem, flex-1, justify-end */}
        <div className="flex items-center gap-3 flex-1 justify-end min-w-0">

          {/* CTA — .btn-large-desktop: w 207, h 60, p 16/22, font 20/700, rounded-full purple */}
          <a
            href={ctaUrl}
            className="inline-flex items-center justify-center gap-4 bg-purple text-white font-sans font-bold text-xl leading-[1.4] no-underline rounded-full w-[207px] h-[60px] px-[22px] py-4 hover:bg-[#3a0bc7] hover:-translate-y-px transition-all duration-200"
          >
            {ctaLabel}
          </a>

          {/* Language switcher — .language-selector: w 168, h 60, gap 0.5rem, white bg, rounded-full */}
          <div ref={ref} className="relative inline-block">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-2 bg-white rounded-full w-[168px] h-[60px] justify-center border-none cursor-pointer hover:bg-light-grey transition-colors duration-200"
            >
              {/* .language-flag w/h 24, drop-shadow */}
              <span className="w-6 h-6 flex items-center justify-center" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.16))' }}>
                {/* .flag-image 25x25 rounded-full */}
                <img src={current.flag} alt="" className="w-[25px] h-[25px] object-cover rounded-full" />
              </span>
              {/* .language-text: Inter 12/700, color #545464 */}
              <span className="font-inter text-xs font-bold leading-[1.4] text-[#545464]">{current.label}</span>
              <span className={`flex items-center justify-center ml-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                <svg className="w-3 h-3" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1l5 5 5-5" stroke="#545464" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
            </button>

            {open && (
              // .language-dropdown-menu — top 100%, white, rounded 12, shadow, mt 0.5rem, min-w 168
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-[1000] overflow-hidden min-w-[168px]">
                {languages.map((lang, i) => {
                  const selected = current.code === lang.code;
                  return (
                    <div key={lang.code}>
                      <button
                        onClick={() => switchLocale(lang.code)}
                        className="w-full bg-transparent border-none p-0 cursor-pointer hover:bg-light-grey transition-colors duration-200"
                      >
                        {/* .language-option-content — gap 0.75rem, padding 1rem 1.25rem */}
                        <div className="flex items-center gap-3 px-5 py-4 w-full">
                          <span
                            className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.16))' }}
                          >
                            <img src={lang.flag} alt="" className="w-full h-full object-cover" />
                          </span>
                          {/* .language-option-text Inter 16/500, color #545464; selected => 700 */}
                          <span className={`font-inter text-base leading-[1.4] text-[#545464] flex-1 text-left ${selected ? 'font-bold' : 'font-medium'}`}>
                            {lang.label}
                          </span>
                          {selected && (
                            <span className="flex items-center justify-center w-4 h-4 shrink-0">
                              <svg className="w-4 h-4 text-charcoal" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          )}
                        </div>
                      </button>
                      {/* .language-separator — 1px #e5e5e5, mx 1.25rem */}
                      {i < languages.length - 1 && <div className="h-px bg-[#e5e5e5] mx-5" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
