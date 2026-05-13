import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Our History</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              About Fr. Josephs <br/> Memorial High School
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Respected as one of the finest secondary schools in Aguleri, Anambra State, Fr. Josephs Memorial High School has a long-standing tradition of excellence, discipline, and moral distinction. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Guided by the timeless motto, <strong className="text-black font-semibold">“Nothing Without Labour”</strong>, the school has molded generations of young boys into responsible, hardworking, and accomplished men across various fields of human endeavor. It stands as a beacon of education and character formation in the region.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-secondary rounded-2xl -z-10 transform rotate-2"></div>
            {/* Placeholder for: Father Joe */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://i.ibb.co/v6Y6ks9Y/father-joe-2.jpg" 
                alt="Father Joe" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32 p-10 md:p-14 bg-secondary rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black">The 2004–2010 Reunion Class</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-left md:text-center">
              The Class of 2004–2010 represents a formidable assembly of successful and influential men who are making indelible marks across Nigeria, Africa, and beyond. From business moguls and politicians to real estate giants, construction engineers, legal luminaries, and community leaders, our class stands as a testament to the school's legacy.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-left md:text-center">
              Officially inaugurated in 2021, our reunion association is built on the pillars of unity, brotherhood, and collective progress. We proudly sponsor scholarships for indigent students in Aguleri, execute philanthropic outreach, and champion community development. We believe deeply in lifting each other up and giving back to the society that shaped us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
