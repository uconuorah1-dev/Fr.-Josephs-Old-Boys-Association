import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Leadership', href: '/#leadership' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Alumni', href: '/#alumni' },
    { name: 'Events', href: '/#events' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary text-black flex items-center justify-center font-bold rounded text-lg">FJ</div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-sm md:text-base leading-tight">FR. JOSEPHS OLD BOYS</h1>
            <p className="text-xs text-muted-foreground">AGULERI 2004–2010</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <Button onClick={() => navigate('/register')} className="bg-primary text-black hover:bg-primary/90 font-semibold rounded-full px-6">
            Join Us
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-lg font-medium hover:text-primary transition-colors">
                    {link.name}
                  </a>
                ))}
                <Button onClick={() => navigate('/register')} className="w-full bg-primary text-black hover:bg-primary/90 font-semibold mt-4">
                  Join Us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
