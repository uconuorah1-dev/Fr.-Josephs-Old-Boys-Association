import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel - Simplified for MVP, single image */}
      <div className="absolute inset-0 w-full h-full">
        {/* Placeholder for: village_school_walk */}
        <img 
          src="https://picsum.photos/seed/nigerianvillage/1920/1080?blur=2" 
          alt="African teenage boys walking to school" 
          className="object-cover w-full h-full scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </div>

      <div className="container relative z-10 px-4 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 mb-6 text-xs md:text-sm font-semibold tracking-wider text-black bg-primary uppercase rounded-full">
            Great Father Josephs, Great!
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            FR. JOSEPHS OLD BOYS <br className="hidden md:block"/> ASSOCIATION <span className="text-primary italic font-light">2004–2010</span>
          </h1>
          <h2 className="text-xl md:text-3xl text-gray-200 mb-6 font-medium">
            Reuniting Brothers. Building Legacy. <br className="hidden sm:block"/> Transforming Society.
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            A distinguished reunion association of old boys committed to unity, philanthropy, mentorship, and community development.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate('/register')} size="lg" className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 text-lg px-8 h-14 rounded-full font-semibold px-10">
              Join the Association
            </Button>
            <Button onClick={() => navigate('/events')} size="lg" variant="outline" className="w-full sm:w-auto border-white text-black hover:bg-white/10 hover:text-white text-lg h-14 rounded-full px-10 backdrop-blur-sm">
              View Events
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
