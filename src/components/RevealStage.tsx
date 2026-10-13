import { config } from '@/config';
import { usePrefersReducedMotion } from '@/hooks/useScroll';
import { WordReveal } from '@/components/Reveal';

export function RevealStage() {
  const { revealStage } = config;
  const reduced = usePrefersReducedMotion();

  return (
    <section id="reveal-stage" className="reveal-stage pinned-stage" aria-label="A beautiful beginning">
      <div className="reveal-inner">
        <img
          src={revealStage.image}
          alt={revealStage.alt}
          className="reveal-image"
          loading="lazy"
        />

        <span className="reveal-location">
          {revealStage.location}
        </span>

        {reduced ? (
          <h2
            className="absolute inset-0 flex items-center justify-center z-[3] text-center px-6"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 9vw, 7rem)',
              letterSpacing: '-0.04em',
              color: 'var(--near-black)',
              lineHeight: 0.9,
            }}
          >
            {revealStage.headline}
          </h2>
        ) : (
          <h2 className="reveal-headline">
            <WordReveal text={revealStage.headline} as="span" stagger={50} soft delay={200} />
          </h2>
        )}

        <p className="reveal-caption">
          {revealStage.caption}
        </p>
      </div>
    </section>
  );
}
