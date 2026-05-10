import { useEffect, useRef, useState } from 'react';

const BADGE_ICONS: Record<number, string> = {
  1: '/static-assets/images/clock-icon-new.svg',
  2: '/static-assets/images/calendar-icon.svg',
  3: '/static-assets/images/fee-icon.svg',
};

export default function Hero() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState({
    headline: '',
    subtext: '',
    ctaLabel: '',
    ctaUrl: '#',
    bgImage: '',
    badge1: '',
    badge2: '',
    badge3: '',
  });

  useEffect(() => {
    const el = document.querySelector<HTMLDivElement>('[data-hero]');
    if (!el) return;
    elRef.current = el;
    setData({
      headline: el.dataset.headline ?? '',
      subtext: el.dataset.subtext ?? '',
      ctaLabel: el.dataset.ctaLabel ?? '',
      ctaUrl: el.dataset.ctaUrl ?? '#',
      bgImage: el.dataset.bgImage ?? '',
      badge1: el.dataset.badge1 ?? '',
      badge2: el.dataset.badge2 ?? '',
      badge3: el.dataset.badge3 ?? '',
    });
  }, []);

  const headlineParts = data.headline.split('|').map((p) => p.trim());

  const badges = [
    { label: data.badge1, icon: BADGE_ICONS[1] },
    { label: data.badge2, icon: BADGE_ICONS[2] },
    { label: data.badge3, icon: BADGE_ICONS[3] },
  ];

  return (
    <section
      className="relative min-h-[600px] lg:min-h-[680px] flex flex-col overflow-hidden bg-charcoal"
      style={data.bgImage ? { backgroundImage: `url(${data.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center left' } : {}}
    >
      {/* overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent lg:from-transparent" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 py-16 lg:py-24 gap-10 flex-1">
        {/* left spacer on desktop — bg image fills it */}
        <div className="hidden lg:block lg:flex-1" />

        {/* content card */}
        <div className="w-full lg:w-[480px] xl:w-[520px] bg-white rounded-3xl px-8 py-10 lg:px-10 lg:py-12 shadow-2xl flex flex-col gap-6">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-charcoal leading-tight">
            {headlineParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < headlineParts.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {data.subtext && (
            <p className="text-base lg:text-lg text-text-grey leading-relaxed">
              {data.subtext}
            </p>
          )}

          {data.ctaLabel && (
            <a
              href={data.ctaUrl}
              className="inline-flex items-center justify-center gap-2 bg-charcoal text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-charcoal/90 transition-colors w-fit"
            >
              {data.ctaLabel}
              <span aria-hidden="true">→</span>
            </a>
          )}

          {/* badges */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-light-grey">
            {badges.map(({ label, icon }, i) =>
              label ? (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-charcoal">
                  <img src={icon} alt="" className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
