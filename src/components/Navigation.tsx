import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { config } from '@/config';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9997] transition-all duration-500`}
        style={{
          background: scrolled ? 'var(--plaster-ivory)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(7,7,7,0.08)' : '1px solid transparent',
          transition: 'background 0.5s ease, border-color 0.5s ease',
        }}
      >
        <nav className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="font-serif-display font-bold tracking-display text-near-black"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--near-black)' }}
          >
            {config.resortName}
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {config.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="font-serif-display text-near-black hover:opacity-60 transition-opacity"
                  style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--near-black)' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#enquiry"
              onClick={(e) => { e.preventDefault(); handleNavClick('#enquiry'); }}
              className="hidden sm:inline-block font-serif-display transition-opacity hover:opacity-80"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--plaster-ivory)',
                background: 'var(--near-black)',
                padding: '0.7rem 1.5rem',
              }}
            >
              Plan Your Wedding
            </a>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ color: 'var(--near-black)' }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          <button
            className="absolute top-5 right-5"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: 'var(--near-black)' }}
          >
            <X size={24} />
          </button>
          <ul className="flex flex-col items-center gap-6">
            {config.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="font-serif-display"
                  style={{ color: 'var(--near-black)', fontSize: '1.5rem', letterSpacing: '-0.02em' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-4">
              <a
                href="#enquiry"
                onClick={(e) => { e.preventDefault(); handleNavClick('#enquiry'); }}
                className="font-serif-display"
                style={{
                  color: 'var(--plaster-ivory)',
                  background: 'var(--near-black)',
                  padding: '0.9rem 2rem',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                }}
              >
                Plan Your Wedding
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export function ScrollProgressRail() {
  return <div className="scroll-progress-rail" aria-hidden="true" />;
}
