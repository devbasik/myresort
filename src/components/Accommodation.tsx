import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function Accommodation() {
  const { accommodation } = config;

  if (!accommodation.enabled) return null;

  const handleEnquire = (roomName: string) => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const detailsField = document.getElementById('details') as HTMLTextAreaElement | null;
        if (detailsField && !detailsField.value) {
          detailsField.value = `I'm interested in ${roomName}.`;
          detailsField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 600);
    }
  };

  return (
    <section
      id="stay"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--plaster-ivory)' }}
      aria-label="Accommodation"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span
            className="font-serif-display block mb-6"
            style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--secondary-grey)' }}
            data-rev
          >
            Accommodation
          </span>
          <WordReveal
            text={accommodation.headline}
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {accommodation.rooms.map((room, i) => (
            <Reveal
              key={room.name}
              delay={i * 150}
              as="article"
              className="group"
            >
              <div className="relative overflow-hidden mb-6">
                <img
                  src={room.image}
                  alt={room.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ aspectRatio: '3/2', transitionTimingFunction: 'var(--ease-editorial)' }}
                />
              </div>
              <h3
                className="font-serif-display font-bold tracking-tight-display mb-3"
                style={{ fontSize: 'clamp(1.3rem, 2vw, 1.6rem)', color: 'var(--near-black)' }}
              >
                {room.name}
              </h3>
              <p
                className="font-serif-display mb-5"
                style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--near-black)', opacity: 0.7 }}
              >
                {room.description}
              </p>

              {room.capacity && (
                <p
                  className="font-serif-display mb-4"
                  style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--secondary-grey)' }}
                >
                  Sleeps up to {room.capacity}
                </p>
              )}

              {room.amenities && room.amenities.length > 0 && (
                <ul className="mb-5 space-y-1">
                  {room.amenities.map((a) => (
                    <li
                      key={a}
                      className="font-serif-display"
                      style={{ fontSize: '0.9rem', color: 'var(--near-black)', opacity: 0.65 }}
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => handleEnquire(room.name)}
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
                Enquire
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
