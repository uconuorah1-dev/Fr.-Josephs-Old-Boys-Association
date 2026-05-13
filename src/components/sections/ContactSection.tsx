import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 text-lg mb-12">
              Whether you're an old boy looking to reconnect, or a sponsor wanting to support our philanthropic programs, we'd love to hear from you.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                  <a href="mailto:info@fjoba2004-2010.org" className="text-gray-400 hover:text-primary transition-colors">info@fjoba2004-2010.org</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Call Us</h4>
                  <a href="tel:+2348000000000" className="text-gray-400 hover:text-primary transition-colors">+234 800 000 0000</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Headquarters</h4>
                  <p className="text-gray-400">Fr. Josephs Memorial High School,<br/>Aguleri, Anambra State, Nigeria.</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.04547908323!2d6.862299899388062!3d6.331206190806456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043f1b4028dcb97%3A0xb3ba1dd1502bc117!2sAguleri%2C%20Anambra!5e0!3m2!1sen!2sng!4v1715600000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/5"
          >
            <h3 className="text-2xl font-bold mb-8 text-white">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                <Input id="name" placeholder="E.g. Chukwudi Nweke" className="bg-black/50 border-white/10 focus-visible:ring-primary text-white h-12" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                <Input id="email" type="email" placeholder="E.g. chukwudi@example.com" className="bg-black/50 border-white/10 focus-visible:ring-primary text-white h-12" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-400">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="bg-black/50 border-white/10 focus-visible:ring-primary text-white h-12" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-400">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." className="bg-black/50 border-white/10 focus-visible:ring-primary text-white min-h-[150px] resize-none" />
              </div>

              <Button className="w-full bg-primary text-black hover:bg-primary/90 h-14 text-lg font-bold">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
