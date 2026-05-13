import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

// Helper to calculate countdown
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function EventsSection() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true }) // Upcoming first
        .limit(3);
      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const mainEvent = events.length > 0 ? events[0] : null;
  const { days, hours, minutes, seconds } = useCountdown(mainEvent?.event_date || '');

  if (loading) return null;

  if (!mainEvent) return (
    <section id="events" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Events & Gatherings</h2>
        <p className="text-muted-foreground text-lg">Check back later for upcoming events.</p>
      </div>
    </section>
  );

  return (
    <section id="events" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Events & Gatherings</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay connected with the brotherhood through our annual reunions, symposiums, and community development programs.
          </p>
        </div>

        {/* Featured Event with Countdown */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black text-white rounded-3xl overflow-hidden shadow-2xl mb-12 flex flex-col lg:flex-row"
        >
          <div className="lg:w-1/2 relative h-64 lg:h-auto">
            {mainEvent.image_url ? (
              <img 
                src={mainEvent.image_url} 
                alt={mainEvent.title} 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center opacity-80">
                <Calendar className="w-16 h-16 text-gray-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent lg:bg-gradient-to-t"></div>
            <div className="absolute top-6 left-6 bg-primary text-black font-bold px-4 py-2 rounded-lg">
              Featured Event
            </div>
          </div>
          
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">{mainEvent.title}</h3>
            <p className="text-gray-400 mb-8 text-lg">{mainEvent.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Calendar className="text-primary w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-semibold">{mainEvent.event_date ? new Date(mainEvent.event_date).toLocaleDateString() : 'TBD'}</p>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            {mainEvent.event_date && new Date(mainEvent.event_date).getTime() > Date.now() && (
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-primary">{days}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Days</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-primary">{hours}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Hours</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-primary">{minutes}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Mins</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-primary">{seconds}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Secs</div>
                </div>
              </div>
            )}

            <Button className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 text-lg py-6 rounded-xl font-bold uppercase tracking-wide">
              RSVP Now
            </Button>
          </div>
        </motion.div>

        {/* Other Upcoming Events - if any */}
        {events.length > 1 && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
             {events.slice(1).map(event => (
                <div key={event.id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl mb-2">{event.title}</h4>
                  <p className="text-gray-500 mb-4">{new Date(event.event_date).toLocaleDateString()}</p>
                  <p className="text-gray-700 line-clamp-2">{event.description}</p>
                </div>
             ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button onClick={() => navigate('/events')} variant="outline" className="px-8 h-12 rounded-full border-gray-300 text-black hover:bg-gray-50 font-semibold">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
