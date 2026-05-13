import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)] pointer-events-none"></div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">FR. JOSEPHS OLD BOYS ASSOCIATION 2004–2010</h2>
          <p className="text-gray-400 max-w-md">Reuniting Brothers, Building Legacy.</p>
          <p className="text-primary italic mt-2">Motto: Nothing Without Labour.</p>
        </div>

        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
            {/* @ts-ignore */}
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
            {/* @ts-ignore */}
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
            {/* @ts-ignore */}
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
            {/* @ts-ignore */}
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-white/10 pt-6 max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Fr. Josephs Old Boys Association 2004–2010. All rights reserved.
      </div>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-transform hover:scale-110 z-50"
      >
        {/* @ts-ignore */}
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </footer>
  );
}
