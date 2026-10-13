import { Instagram, Phone, Mail } from 'lucide-react';
import { config } from '@/config';

export function Footer() {
  const { contact } = config;
  const year = new Date().getFullYear();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      className="px-6 md:px-10 py-20"
      style={{ background: 'var(--near-black)', color: 'var(--plaster-ivory)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p
              className="font-serif-display font-bold tracking-display mb-4"
              style={{ fontSize: '1.8rem', color: 'var(--plaster-ivory)' }}
            >
              {config.resortName}
            </p>
            <p
              className="font-serif-display italic max-w-sm"
              style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(247,247,244,0.6)' }}
            >
              {config.tagline}
            </p>

            <div className="mt-8">
              <span
                className="font-script"
                style={{
                  color: 'var(--dusty-pink)',
                  fontSize: '1.4rem',
                  transform: 'rotate(-1.5deg)',
                  display: 'inline-block',
                }}
              >
                with love, {config.resortName}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="font-serif-display mb-5"
              style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(247,247,244,0.4)' }}
            >
              Explore
            </p>
            <ul className="space-y-3">
              {config.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                    className="font-serif-display transition-opacity hover:opacity-60"
                    style={{ fontSize: '0.95rem', color: 'rgba(247,247,244,0.8)' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#enquiry"
                  onClick={(e) => { e.preventDefault(); handleNav('#enquiry'); }}
                  className="font-serif-display transition-opacity hover:opacity-60"
                  style={{ fontSize: '0.95rem', color: 'var(--dusty-pink)' }}
                >
                  Plan Your Wedding
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-serif-display mb-5"
              style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(247,247,244,0.4)' }}
            >
              Contact
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="font-serif-display inline-flex items-center gap-3 transition-opacity hover:opacity-60"
                  style={{ fontSize: '0.9rem', color: 'rgba(247,247,244,0.8)' }}
                >
                  <Phone size={15} style={{ color: 'var(--dusty-pink)' }} /> {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-serif-display inline-flex items-center gap-3 transition-opacity hover:opacity-60"
                  style={{ fontSize: '0.9rem', color: 'rgba(247,247,244,0.8)' }}
                >
                  <Mail size={15} style={{ color: 'var(--dusty-pink)' }} /> {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif-display inline-flex items-center gap-3 transition-opacity hover:opacity-60"
                  style={{ fontSize: '0.9rem', color: 'rgba(247,247,244,0.8)' }}
                >
                  <Instagram size={15} style={{ color: 'var(--dusty-pink)' }} /> Instagram
                </a>
              </li>
              <li>
                <p
                  className="font-serif-display"
                  style={{ fontSize: '0.85rem', color: 'rgba(247,247,244,0.5)', lineHeight: 1.5 }}
                >
                  {contact.address.line1}
                  <br />
                  {contact.address.city}, {contact.address.region}
                  <br />
                  {contact.address.country}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline-light mt-16 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="font-serif-display"
            style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(247,247,244,0.4)' }}
          >
            © {year} {config.resortName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-serif-display transition-opacity hover:opacity-60"
              style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(247,247,244,0.4)' }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-serif-display transition-opacity hover:opacity-60"
              style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(247,247,244,0.4)' }}
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
