import { MapPin, Phone, Mail, MessageCircle, ExternalLink, Navigation as NavIcon } from 'lucide-react';
import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function Location() {
  const { contact } = config;

  const whatsappUrl = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}`
    : null;

  return (
    <section
      id="location"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--warm-paper)' }}
      aria-label="Location and Contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal as="div">
            <img
              src="https://images.pexels.com/photos/19970596/pexels-photo-19970596.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200"
              alt="Garden wedding venue"
              loading="lazy"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '3/2' }}
            />
          </Reveal>

          <Reveal delay={150} as="div">
            <span
              className="font-serif-display block mb-6"
              style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--secondary-grey)' }}
            >
              Visit Us
            </span>
            <WordReveal
              text="Find us here."
              as="h2"
              className="font-serif-display font-bold tracking-display mb-8"
              stagger={40}
            />

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin size={18} style={{ color: 'var(--dusty-pink)', flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <p className="font-serif-display" style={{ fontSize: '1rem', color: 'var(--near-black)', lineHeight: 1.5 }}>
                    {contact.address.line1}
                  </p>
                  <p className="font-serif-display" style={{ fontSize: '1rem', color: 'var(--near-black)', lineHeight: 1.5, opacity: 0.7 }}>
                    {contact.address.city}, {contact.address.region}
                  </p>
                  <p className="font-serif-display" style={{ fontSize: '1rem', color: 'var(--near-black)', lineHeight: 1.5, opacity: 0.7 }}>
                    {contact.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={18} style={{ color: 'var(--dusty-pink)', flexShrink: 0 }} />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="font-serif-display transition-opacity hover:opacity-60"
                  style={{ fontSize: '1rem', color: 'var(--near-black)' }}
                >
                  {contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={18} style={{ color: 'var(--dusty-pink)', flexShrink: 0 }} />
                <a
                  href={`mailto:${contact.email}`}
                  className="font-serif-display transition-opacity hover:opacity-60"
                  style={{ fontSize: '1rem', color: 'var(--near-black)' }}
                >
                  {contact.email}
                </a>
              </div>

              {whatsappUrl && (
                <div className="flex items-center gap-4">
                  <MessageCircle size={18} style={{ color: 'var(--dusty-pink)', flexShrink: 0 }} />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif-display transition-opacity hover:opacity-60"
                    style={{ fontSize: '1rem', color: 'var(--near-black)' }}
                  >
                    WhatsApp
                  </a>
                </div>
              )}

              {contact.nearbyTransport && (
                <p
                  className="font-serif-display italic pt-2"
                  style={{ fontSize: '0.95rem', color: 'var(--near-black)', opacity: 0.65, lineHeight: 1.5 }}
                >
                  {contact.nearbyTransport}
                </p>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif-display inline-flex items-center gap-2 transition-opacity hover:opacity-60"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--near-black)',
                    borderBottom: '1px solid var(--dusty-pink)',
                    paddingBottom: '4px',
                  }}
                >
                  <NavIcon size={14} /> Get Directions
                </a>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif-display inline-flex items-center gap-2 transition-opacity hover:opacity-60"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--secondary-grey)',
                  }}
                >
                  <ExternalLink size={14} /> View on Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
