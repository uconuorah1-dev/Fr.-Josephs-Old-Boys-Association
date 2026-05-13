import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) {
    return null; // hide if empty or loading
  }

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Voices of the Brotherhood</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our esteemed alumni on the impact of our association and the enduring legacy of our alma mater.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {testimonials.map((test, index) => (
            <motion.div 
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[400px] bg-secondary p-8 md:p-10 rounded-3xl snap-center flex-shrink-0 relative border border-gray-100"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/20" />
              
              <p className="text-lg text-gray-700 italic leading-relaxed mb-8 relative z-10">
                "{test.message}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/20 p-0.5">
                  {test.photo_url ? (
                    <img 
                      src={test.photo_url} 
                      alt={test.name} 
                      className="w-full h-full object-cover rounded-full filter grayscale"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                      {test.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-black">{test.name}</h4>
                  {test.profession && (
                    <p className="text-sm text-primary font-medium">{test.profession}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
