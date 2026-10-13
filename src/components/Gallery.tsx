import { useState } from 'react';
import { X } from 'lucide-react';
import { config } from '@/config';
import { WordReveal } from '@/components/Reveal';

export function Gallery() {
  const { gallery } = config;
  const [lightbox, setLightbox] = useState<string | null>(null);

  const getColSpan = (span: string) => {
    switch (span) {
      case 'lg': return 'md:col-span-2 md:row-span-2';
      case 'wide': return 'md:col-span-2';
      case 'tall': return 'md:row-span-2';
      default: return '';
    }
  };

  const getAspectRatio = (span: string) => {
    switch (span) {
      case 'lg': return '1/1';
      case 'wide': return '2/1';
      case 'tall': return '2/3';
      default: return '4/3';
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--plaster-ivory)' }}
      aria-label="Gallery"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span
            className="font-serif-display block mb-6"
            style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--secondary-grey)' }}
            data-rev
          >
            The Visual Story
          </span>
          <WordReveal
            text="Moments, beautifully remembered."
            as="h2"
            className="font-serif-display font-bold tracking-display"
            stagger={40}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
          {gallery.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(img.src)}
              className={`relative overflow-hidden group cursor-zoom-in ${getColSpan(img.span)}`}
              data-rev
              style={{ ['--rev-delay' as string]: `${i * 60}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ transitionTimingFunction: 'var(--ease-editorial)' }}
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Image viewer"
        >
          <button
            className="absolute top-6 right-6"
            onClick={() => setLightbox(null)}
            aria-label="Close image viewer"
            style={{ color: 'var(--plaster-ivory)' }}
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt="Gallery image enlarged"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
