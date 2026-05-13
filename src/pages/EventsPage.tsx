import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true }); // Showing all events, ordered by date
        
      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">All Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay up to date with our upcoming gatherings, reunions, and impact initiatives.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Found</h3>
            <p className="text-gray-500">There are currently no events listed.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={event.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 h-64 sm:h-auto relative bg-gray-100">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3 text-black">{event.title}</h3>
                  <div className="flex items-center text-primary font-semibold mb-4 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.event_date ? new Date(event.event_date).toLocaleString() : 'Date TBD'}
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
