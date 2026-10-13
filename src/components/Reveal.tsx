import { type ReactNode } from 'react';
import { useWordReveal } from '@/hooks/useScroll';

interface WordRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  stagger?: number; // ms between words
  soft?: boolean; // use soft variant (no overflow hidden) for italics/descenders
  delay?: number; // initial delay
}

/**
 * Splits text into word spans and animates each from translateY(0.4em)
 * with staggered delays. Uses overflow:hidden wrappers by default,
 * soft variant for italic/descender text.
 */
export function WordReveal({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 38,
  soft = false,
  delay = 0,
}: WordRevealProps) {
  const ref = useWordReveal();
  const words = text.split(' ');

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ overflow: 'visible' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={soft ? 'word-reveal-soft' : 'word-reveal-wrapper'}
          style={{ ['--word-delay' as string]: `${delay + i * stagger}ms` }}
        >
          {soft ? word : <span className="word-reveal-inner">{word}</span>}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'tr' | 'article';
}

/** Simple data-rev wrapper with optional delay */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  return (
    <Tag
      data-rev
      className={className}
      style={{ ['--rev-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
