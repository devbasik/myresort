import { config } from '@/config';
import { WordReveal } from '@/components/Reveal';

export function FAQ() {
  const { faq } = config;

  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--blush-pink)' }}
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="font-serif-display block mb-6"
            style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--near-black)', opacity: 0.5 }}
            data-rev
          >
            Questions
          </span>
          <WordReveal
            text="Good to know."
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
        </div>

        <div data-rev>
          {faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span
                  className="font-serif-display"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--near-black)' }}
                >
                  {item.q}
                </span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p
                className="font-serif-display pb-6 pr-8"
                style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--near-black)', opacity: 0.75 }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
