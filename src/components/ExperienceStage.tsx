import { useState, useEffect, useRef } from 'react';
import { config } from '@/config';
import { usePrefersReducedMotion, useIsMobile } from '@/hooks/useScroll';
import { WordReveal } from '@/components/Reveal';

export function ExperienceStage() {
  const { experienceStage } = config;
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || isMobile) return;
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail as number;
      setActiveIdx(idx);
    };
    window.addEventListener('exp-active-change', handler);
    return () => window.removeEventListener('exp-active-change', handler);
  }, [reduced, isMobile]);

  // Fallback: if no scroll event fires, use IntersectionObserver to set active based on visibility
  useEffect(() => {
    if (reduced || isMobile) return;
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number | null = null;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight;
      const p = Math.max(0, Math.min(-rect.top / (height - window.innerHeight), 1));
      const idx = Math.min(3, Math.floor(p * 4));
      setActiveIdx(idx);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced, isMobile]);

  // --- Mobile: static layout ---
  if (reduced || isMobile) {
    return (
      <section
        id="experiences-stage"
        ref={sectionRef}
        className="py-20 px-6 md:px-10"
        style={{ background: 'var(--near-black)' }}
        aria-label="The Details Make the Day"
      >
        <div className="max-w-4xl mx-auto text-center">
          <WordReveal
            text={experienceStage.headline}
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
          <p
            className="mt-5 font-serif-display italic"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#ffffff', opacity: 0.6 }}
            data-rev
          >
            {experienceStage.subheading}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-14 space-y-0">
          {experienceStage.rows.map((row, i) => (
            <div
              key={row.index}
              className="py-6 flex items-center justify-between gap-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              data-rev
            >
              <div className="flex items-baseline gap-4">
                <span className="font-serif-display" style={{ color: 'var(--dusty-pink)', fontSize: '1.2rem' }}>
                  {row.index}
                </span>
                <span className="font-serif-display" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
                  {row.title}
                </span>
              </div>
              <span
                className="font-serif-display"
                style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.4)' }}
              >
                {row.label}
              </span>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-14" data-rev>
          <img
            src={experienceStage.images[0]}
            alt="Wedding detail"
            loading="lazy"
            className="w-full"
            style={{ aspectRatio: '4/5', objectFit: 'cover' }}
          />
          <span
            className="block mt-4 font-serif-display"
            style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--dusty-pink)' }}
          >
            {experienceStage.imageLabel}
          </span>
        </div>
      </section>
    );
  }

  // --- Desktop: pinned two-column ---
  return (
    <section
      id="experiences-stage"
      ref={sectionRef}
      className="exp-stage pinned-stage"
      aria-label="The Details Make the Day"
    >
      <div className="exp-inner">
        {/* Left column */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-20">
          <h2 className="font-serif-display font-bold tracking-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', lineHeight: 0.95 }}>
            <WordReveal text={experienceStage.headline} as="span" stagger={40} soft />
          </h2>
          <p
            className="mt-5 font-serif-display italic"
            style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: '#ffffff', opacity: 0.5 }}
            data-rev
          >
            {experienceStage.subheading}
          </p>

          <div className="mt-12 space-y-0">
            {experienceStage.rows.map((row, i) => (
              <div
                key={row.index}
                className={`exp-row ${activeIdx === i ? 'active' : ''}`}
                style={{
                  padding: '1.8rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '2rem',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveIdx(i)}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-serif-display"
                    style={{ color: 'var(--dusty-pink)', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)' }}
                  >
                    {row.index}
                  </span>
                  <span
                    className="font-serif-display"
                    style={{ color: '#ffffff', fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', letterSpacing: '-0.02em' }}
                  >
                    {row.title}
                  </span>
                </div>
                <span
                  className="font-serif-display"
                  style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.4)' }}
                >
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: image */}
        <div className="relative overflow-hidden">
          {experienceStage.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Wedding detail ${i + 1}`}
              loading="lazy"
              className="exp-image absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: activeIdx === i ? 1 : 0,
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          ))}
          <span
            className="absolute z-[2] font-serif-display"
            style={{
              bottom: '2rem',
              left: '2rem',
              fontSize: '10.5px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--dusty-pink)',
            }}
          >
            {experienceStage.imageLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
