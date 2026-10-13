import { useEffect, useRef, useState } from 'react';

/**
 * Single scroll handler using requestAnimationFrame throttling.
 * Writes scroll-derived CSS custom properties to document root:
 *   --scroll-progress: 0..1 (whole page)
 *   --hero-scale, --hero-drift, --hero-lift, --hero-opacity
 *   --reveal-p, --reveal-headline-opacity, --reveal-caption-opacity
 *   --exp-scale, --exp-active-index
 */
export function useScrollChoreography() {
  const rafRef = useRef<number | null>(null);
  const heroElRef = useRef<HTMLElement | null>(null);
  const revealElRef = useRef<HTMLElement | null>(null);
  const expElRef = useRef<HTMLElement | null>(null);
  const expActiveRef = useRef(0);

  useEffect(() => {
    heroElRef.current = document.getElementById('home');
    revealElRef.current = document.getElementById('reveal-stage');
    expElRef.current = document.getElementById('experiences-stage');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const update = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`);

      // --- HERO STAGE ---
      const hero = heroElRef.current;
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        const heroHeight = hero.offsetHeight;
        // progress within hero: 0 at top, 1 when scrolled past
        const heroP = Math.max(0, Math.min(-heroRect.top / (heroHeight - window.innerHeight), 1));
        const scale = 1.04 + heroP * 0.06;
        const drift = heroP * 6;
        const lift = heroP * 46;
        const opacity = 1 - heroP * 0.9;
        document.documentElement.style.setProperty('--hero-scale', scale.toFixed(4));
        document.documentElement.style.setProperty('--hero-drift', `${drift.toFixed(2)}%`);
        document.documentElement.style.setProperty('--hero-lift', `${lift.toFixed(0)}px`);
        document.documentElement.style.setProperty('--hero-opacity', opacity.toFixed(3));
      }

      // --- REVEAL STAGE ---
      const reveal = revealElRef.current;
      if (reveal) {
        const rRect = reveal.getBoundingClientRect();
        const rHeight = reveal.offsetHeight;
        const rP = Math.max(0, Math.min(-rRect.top / (rHeight - window.innerHeight), 1));
        document.documentElement.style.setProperty('--reveal-p', rP.toFixed(4));
        // headline fades as image climbs past 20%
        const headOpacity = rP < 0.2 ? 1 : Math.max(0, 1 - (rP - 0.2) / 0.25);
        document.documentElement.style.setProperty('--reveal-headline-opacity', headOpacity.toFixed(3));
        // caption appears after 45%
        const captionOpacity = rP > 0.45 ? Math.min(1, (rP - 0.45) / 0.15) : 0;
        document.documentElement.style.setProperty('--reveal-caption-opacity', captionOpacity.toFixed(3));
      }

      // --- EXPERIENCE STAGE ---
      const exp = expElRef.current;
      if (exp) {
        const eRect = exp.getBoundingClientRect();
        const eHeight = exp.offsetHeight;
        const eP = Math.max(0, Math.min(-eRect.top / (eHeight - window.innerHeight), 1));
        const scale = 1.08 - eP * 0.08;
        document.documentElement.style.setProperty('--exp-scale', scale.toFixed(4));

        // Active row index based on progress
        const activeIdx = Math.min(3, Math.floor(eP * 4));
        if (activeIdx !== expActiveRef.current) {
          expActiveRef.current = activeIdx;
          document.documentElement.style.setProperty('--exp-active-index', String(activeIdx));
          // Dispatch custom event for component to pick up
          window.dispatchEvent(new CustomEvent('exp-active-change', { detail: activeIdx }));
        }
      }

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Delay first measurement to ensure all components have rendered
    const initTimer = setTimeout(update, 50);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      clearTimeout(initTimer);
    };
  }, []);

  return { expActiveRef };
}

/**
 * IntersectionObserver-based reveal for [data-rev] elements.
 * Triggers once, unobserves after reveal.
 */
export function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-rev]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * Word-level reveal for headings. Splits text into word spans
 * and animates them with staggered delays. Respects reduced motion.
 */
export function useWordReveal() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.querySelectorAll('.word-reveal-inner, .word-reveal-soft').forEach(w => w.classList.add('revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      el.querySelectorAll('.word-reveal-inner, .word-reveal-soft').forEach(w => w.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.word-reveal-inner, .word-reveal-soft').forEach(w => w.classList.add('revealed'));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Detect reduced motion preference */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/** Detect mobile viewport (below 768px) */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}
