import { motion } from 'motion/react';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-primary"></div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Leadership</h3>
            <div className="h-px w-12 bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">Guiding Our Vision</h2>
        </div>

        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative w-full max-w-sm"
          >
            {/* Elegant border and background */}
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-transparent rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            
            <div className="relative bg-[#111] rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-colors duration-500 text-center overflow-hidden h-full flex flex-col items-center">
              
              {/* Image Container with Gold Border */}
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-primary to-black overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#111]">
                  <img 
                    src="https://picsum.photos/seed/chairman/400/400" 
                    alt="High Chief Celestine Chinedu Udemezue"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Current Chairman
              </div>

              <h3 className="text-2xl font-bold mb-2">High Chief Celestine Chinedu Udemezue</h3>
              <p className="text-gray-400 text-sm font-medium italic mb-6">
                (A.K.A OBEDEPLAY, IGWE THREESOME)
              </p>
              
              <p className="text-gray-500 text-sm leading-relaxed mt-auto border-t border-white/10 pt-6 w-full">
                Leading the alumni association with vision, integrity, and a deep commitment to brotherhood and community development.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
