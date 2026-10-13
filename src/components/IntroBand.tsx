import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function IntroBand() {
  const { intro } = config;

  return (
    <section
      id="introduction"
      className="py-24 md:py-40 px-6 md:px-10"
      style={{ background: 'var(--blush-pink)' }}
      aria-label="Introduction"
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-4" data-rev>
          <span
            className="font-script"
            style={{
              color: 'var(--dusty-pink)',
              fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
              transform: 'rotate(-1.5deg)',
              display: 'inline-block',
            }}
          >
            {intro.script}
          </span>
        </div>

        <WordReveal
          text={intro.statement}
          as="h2"
          className="font-serif-display font-bold tracking-display"
          stagger={40}
          delay={100}
        />

        <p
          className="mt-6 font-serif-display italic"
          style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', color: 'var(--near-black)', opacity: 0.7 }}
          data-rev
        >
          {intro.italic}
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-0">
        {intro.columns.map((col, i) => (
          <Reveal
            key={col.title}
            delay={i * 150}
            className={`px-6 md:px-8 ${i > 0 ? 'md:border-l border-t md:border-t-0' : ''}`}
            as="div"
          >
            <div style={{ borderColor: 'rgba(7,7,7,0.12)' }}>
              <h3
                className="font-serif-display font-bold tracking-tight-display mb-4"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--near-black)' }}
              >
                {col.title}
              </h3>
              <p
                className="font-serif-display"
                style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--near-black)', opacity: 0.75 }}
              >
                {col.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
