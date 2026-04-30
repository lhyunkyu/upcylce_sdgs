import { HeroSection }        from '@/components/sections/HeroSection';
import { ChallengesSection }  from '@/components/sections/ChallengesSection';
import { GallerySection }     from '@/components/sections/GallerySection';
import { StatsSection }       from '@/components/sections/StatsSection';
import { PracticesSection }   from '@/components/sections/PracticesSection';
import { SuccessCasesSection } from '@/components/sections/SuccessCasesSection';
import { CtaSection }         from '@/components/sections/CtaSection';
import { Footer }             from '@/components/sections/Footer';

export default function SDG12Page() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ChallengesSection />
      <GallerySection />
      <StatsSection />
      <PracticesSection />
      <SuccessCasesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
