import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function WeddingSpaces() {
  const { spaces } = config;

  const handleEnquire = (spaceName: string) => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Pre-fill the details field with the space name
      setTimeout(() => {
        const detailsField = document.getElementById('details') as HTMLTextAreaElement | null;
        if (detailsField && !detailsField.value) {
          detailsField.value = `I'm interested in ${spaceName}.`;
          detailsField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 600);
    }
  };

  return (
    <section
      id="spaces"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--warm-paper)' }}
      aria-label="Wedding Spaces"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span
            className="font-serif-display block mb-6"
            style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--secondary-grey)' }}
            data-rev
          >
            {spaces.label}
          </span>
          <WordReveal
            text={spaces.headline}
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
        </div>

        <div className="space-y-24 md:space-y-32">
          {spaces.items.map((space, i) => (
            <div
              key={space.name}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
            >
              <Reveal
                delay={0}
                className="md:[direction:ltr]"
                as="div"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
                    style={{ aspectRatio: '4/3', transitionTimingFunction: 'var(--ease-editorial)' }}
                  />
                </div>
              </Reveal>

              <Reveal
                delay={150}
                className="md:[direction:ltr]"
                as="div"
              >
                <span
                  className="font-serif-display block mb-4"
                  style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--dusty-pink)' }}
                >
                  {space.type}
                </span>
                <h3
                  className="font-serif-display font-bold tracking-tight-display mb-5"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--near-black)' }}
                >
                  {space.name}
                </h3>
                <p
                  className="font-serif-display mb-8"
                  style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--near-black)', opacity: 0.75 }}
                >
                  {space.description}
                </p>

                {space.capacity && (
                  <p
                    className="font-serif-display mb-6"
                    style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--secondary-grey)' }}
                  >
                    Capacity — up to {space.capacity} guests
                  </p>
                )}

                <button
                  onClick={() => handleEnquire(space.name)}
                  className="font-serif-display transition-opacity hover:opacity-60"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--near-black)',
                    borderBottom: '1px solid var(--dusty-pink)',
                    paddingBottom: '4px',
                  }}
                >
                  Enquire About This Space
                </button>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
