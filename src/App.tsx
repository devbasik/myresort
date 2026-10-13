import { useEffect } from 'react';
import { useScrollChoreography, useRevealObserver } from '@/hooks/useScroll';
import { Navigation, ScrollProgressRail } from '@/components/Navigation';
import { HeroStage } from '@/components/HeroStage';
import { IntroBand } from '@/components/IntroBand';
import { RevealStage } from '@/components/RevealStage';
import { WeddingSpaces } from '@/components/WeddingSpaces';
import { ExperienceStage } from '@/components/ExperienceStage';
import { ExperiencesBand } from '@/components/ExperiencesBand';
import { Accommodation } from '@/components/Accommodation';
import { Packages } from '@/components/Packages';
import { Gallery } from '@/components/Gallery';
import { Location } from '@/components/Location';
import { FAQ } from '@/components/FAQ';
import { EnquirySection } from '@/components/EnquirySection';
import { Footer } from '@/components/Footer';

function App() {
  useScrollChoreography();
  useRevealObserver();

  // Re-run reveal observer after all components mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-rev]:not(.revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('revealed');
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollProgressRail />
      <Navigation />

      <main>
        <HeroStage />
        <IntroBand />
        <RevealStage />
        <WeddingSpaces />
        <ExperienceStage />
        <ExperiencesBand />
        <Accommodation />
        <Packages />
        <Gallery />
        <Location />
        <FAQ />
        <EnquirySection />
      </main>

      <Footer />
    </>
  );
}

export default App;
