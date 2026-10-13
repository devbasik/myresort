import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function HeroStage() {
  const hero = config.hero;

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="hero-stage pinned-stage" aria-label="Hero">
      <div className="hero-inner">
        <img
          src={hero.image}
          alt={hero.alt}
          className="hero-image"
          fetchPriority="high"
        />

        <div className="hero-content">
          <span
            className="hero-overline"
            data-rev
            style={{ ['--rev-delay' as string]: '100ms' }}
          >
            {hero.overline}
          </span>

          <h1 className="hero-wordmark">
            <WordReveal text={hero.wordmark} as="span" stagger={42} soft delay={200} />
          </h1>

          <p
            className="mt-6 max-w-xl font-serif-display italic"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: 'var(--near-black)', lineHeight: 1.5, opacity: 0.8 }}
            data-rev
          >
            {hero.supporting}
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            data-rev
            style={{ ['--rev-delay' as string]: '600ms' }}
          >
            <button
              onClick={() => handleNav('#enquiry')}
              className="font-serif-display transition-opacity hover:opacity-80"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--plaster-ivory)',
                background: 'var(--near-black)',
                padding: '1rem 2.2rem',
              }}
            >
              Plan Your Wedding
            </button>
            <button
              onClick={() => handleNav('#spaces')}
              className="font-serif-display transition-opacity hover:opacity-60"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--near-black)',
                background: 'transparent',
                border: '1px solid var(--near-black)',
                padding: '1rem 2.2rem',
              }}
            >
              Explore the Venue
            </button>
          </div>
        </div>

        {/* Bottom straps */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] flex justify-between items-center px-6 md:px-10 py-5"
          style={{ borderTop: '1px solid rgba(7,7,7,0.08)' }}
        >
          {hero.straps.map((strap, i) => (
            <Reveal
              key={strap}
              delay={800 + i * 120}
              className="flex-1 text-center first:text-left last:text-center md:last:text-right"
            >
              <span
                className="hero-strap"
                style={{ ['--rev-delay' as string]: `${800 + i * 120}ms` }}
              >
                {strap}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
