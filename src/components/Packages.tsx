import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';

export function Packages() {
  const { packages } = config;

  const handleEnquire = (pkgName: string) => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const detailsField = document.getElementById('details') as HTMLTextAreaElement | null;
        if (detailsField && !detailsField.value) {
          detailsField.value = `I'd like to enquire about the ${pkgName} package.`;
          detailsField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 600);
    }
  };

  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--soft-stone)' }}
      aria-label="Celebration Options"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span
            className="font-serif-display block mb-6"
            style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--secondary-grey)' }}
            data-rev
          >
            {packages.label}
          </span>
          <WordReveal
            text={packages.headline}
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
        </div>

        <table className="pkg-table" data-rev>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Package</th>
              <th style={{ width: '40%' }}>Details</th>
              <th style={{ width: '20%' }}>Pricing</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {packages.items.map((pkg) => (
              <tr key={pkg.name}>
                <td>
                  <span
                    className="font-serif-display font-bold"
                    style={{ fontSize: '1.1rem', color: 'var(--near-black)' }}
                  >
                    {pkg.name}
                  </span>
                </td>
                <td>
                  <span
                    className="font-serif-display italic"
                    style={{ fontSize: '0.95rem', color: 'var(--near-black)', opacity: 0.7 }}
                  >
                    {pkg.description}
                  </span>
                </td>
                <td>
                  <span
                    className="font-serif-display"
                    style={{ color: 'var(--dusty-pink)', fontSize: '0.95rem' }}
                  >
                    {pkg.price || 'Enquire for Pricing'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEnquire(pkg.name)}
                    className="font-serif-display transition-opacity hover:opacity-60"
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: 'var(--near-black)',
                      borderBottom: '1px solid var(--near-black)',
                      paddingBottom: '2px',
                    }}
                  >
                    Enquire
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
