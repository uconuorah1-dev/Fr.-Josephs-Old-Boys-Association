import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import ImpactSection from '@/components/sections/ImpactSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ContactSection from '@/components/sections/ContactSection';
import AlumniSection from '@/components/sections/AlumniSection';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <LeadershipSection />
      <ImpactSection />
      <EventsSection />
      <AlumniSection />
      <GallerySection />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
}
