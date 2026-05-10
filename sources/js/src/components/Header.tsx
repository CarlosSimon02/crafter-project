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
    /*
     * Responsive header — values come from gotyme.com.hk's bundled CSS.
     *  default (< 640px):   .5rem margin, .5rem .75rem padding, h auto
     *  sm (≥ 640px):        1rem margin, .75rem 1rem padding (480-768 range)
     *  md (≥ 768px):        2rem auto 1.5rem margin, 1rem 2.5rem padding, h 90px
     */
    <header className="
      bg-cool-grey sticky top-0 z-[1000] rounded-2xl
      mx-2 my-2 px-3 py-2 w-[calc(100%-1rem)] h-auto
      sm:mx-4 sm:my-4 sm:px-4 sm:py-3 sm:w-[calc(100%-2rem)]
      md:mt-8 md:mb-6 md:mx-auto md:px-10 md:py-4 md:h-[90px]
      max-w-[1216px]
      flex items-center
    ">
      {/* .header-content gap: .375 → .5 → 1.375rem */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-[1.375rem] w-full h-full">

        {/* .logo — w 8rem → 10rem → 19rem; max-w 60% on mobile */}
        <a
          href={`/${currentLocale}/`}
          className="
            flex items-center
            gap-1.5 sm:gap-2 md:gap-[1.375rem]
            w-32 sm:w-40 md:w-[19rem]
            max-w-[60%] md:max-w-none
            shrink-0 no-underline text-charcoal min-w-0
          "
        >
          {/* .logo-image: h 20 → 24 → 32; max-w 60 → 80 → 129 */}
          <img
            src={logoSrc}
            alt="GoTyme"
            className="h-5 sm:h-6 md:h-8 w-auto max-w-[60px] sm:max-w-[80px] md:max-w-[129px] cursor-pointer"
          />
          {/* .location: 14 → 16 → 24 */}
          <span className="font-sans font-medium text-sm sm:text-base md:text-2xl leading-tight text-charcoal whitespace-nowrap truncate">
            {location}
          </span>
        </a>

        {/* .header-actions — gap .25 → .375 → .5 → .75rem; flex-1 on mobile */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-3 flex-shrink-0 flex-grow basis-0 md:flex-1 justify-end min-w-0">

          {/* CTA — 13px text mobile, 20px desktop; no fixed dims under md */}
          <a
            href={ctaUrl}
            className="
              inline-flex items-center justify-center
              bg-purple text-white font-sans font-bold leading-[1.4]
              no-underline rounded-full whitespace-nowrap
              text-[13px] px-4 py-3
              md:text-xl md:gap-4 md:w-[207px] md:h-[60px] md:px-[22px] md:py-4
              hover:bg-[#3a0bc7] hover:-translate-y-px transition-all duration-200
            "
          >
            {ctaLabel}
          </a>

          {/* Language switcher container */}
          <div ref={ref} className="relative inline-block">
            <button
              onClick={() => setOpen(o => !o)}
              className="
                flex items-center justify-center cursor-pointer transition-colors duration-200
                bg-transparent border-none p-0.5 w-7 h-7 rounded-full
                sm:p-1 sm:w-9 sm:h-9
                md:bg-white md:hover:bg-light-grey md:rounded-full md:gap-2 md:w-[168px] md:h-[60px] md:p-0
              "
            >
              {/* Flag */}
              <span
                className="w-6 h-6 flex items-center justify-center"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.16))' }}
              >
                <img src={current.flag} alt="" className="w-[25px] h-[25px] object-cover rounded-full" />
              </span>
              {/* Text + chevron — hidden below md, matches real site's display:none rule */}
              <span className="hidden md:inline font-inter text-xs font-bold leading-[1.4] text-[#545464]">
                {current.label}
              </span>
              <span className={`hidden md:flex items-center justify-center ml-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                <svg className="w-3 h-3" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1l5 5 5-5" stroke="#545464" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
            </button>

            {open && (
              // .language-dropdown-menu — min-w 100 → 120 → 140 → 168
              <div className="
                absolute top-full mt-2 right-0
                bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-[1000] overflow-hidden
                min-w-[100px] sm:min-w-[120px] md:min-w-[168px] md:left-0 md:right-0
              ">
                {languages.map((lang, i) => {
                  const selected = current.code === lang.code;
                  return (
                    <div key={lang.code}>
                      <button
                        onClick={() => switchLocale(lang.code)}
                        className="w-full bg-transparent border-none p-0 cursor-pointer hover:bg-light-grey transition-colors duration-200"
                      >
                        {/* .language-option-content padding: .375rem .5rem → .5rem .75rem → 1rem 1.25rem */}
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 py-1.5 sm:px-3 sm:py-2 md:px-5 md:py-4 w-full">
                          <span
                            className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.16))' }}
                          >
                            <img src={lang.flag} alt="" className="w-full h-full object-cover" />
                          </span>
                          {/* .language-option-text 11px → 12px → 14px → 16px */}
                          <span className={`font-inter text-[11px] sm:text-xs md:text-base leading-[1.4] text-[#545464] flex-1 text-left ${selected ? 'font-bold' : 'font-medium'}`}>
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
                      {/* .language-separator — mx 1.25rem on desktop, narrower on mobile */}
                      {i < languages.length - 1 && <div className="h-px bg-[#e5e5e5] mx-2 sm:mx-3 md:mx-5" />}
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
