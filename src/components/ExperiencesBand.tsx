import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function ExperiencesBand() {
  const { experiences } = config;

  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--blush-pink)' }}
      aria-label="Wedding Experiences"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <WordReveal
            text={experiences.headline}
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {experiences.columns.map((col, i) => (
            <Reveal
              key={col.title}
              delay={i * 150}
              className={`px-6 md:px-8 ${i > 0 ? 'md:border-l border-t md:border-t-0' : ''}`}
              as="div"
            >
              <div style={{ borderColor: 'rgba(7,7,7,0.12)' }}>
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-auto object-cover mb-6"
                  style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
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

        <hr className="hairline mt-20" />
      </div>
    </section>
  );
}
