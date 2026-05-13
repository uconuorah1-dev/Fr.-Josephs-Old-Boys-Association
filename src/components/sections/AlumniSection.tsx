import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';

export default function AlumniSection() {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      const { data, error } = await supabase
        .from('alumni_members')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setAlumni(data);
      }
      setLoading(false);
    };

    fetchAlumni();
  }, []);

  if (loading || alumni.length === 0) {
    return null;
  }

  return (
    <section id="alumni" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Alumni Directory</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Meet our distinguished alumni who are making an impact across various fields.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumni.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 relative h-64 overflow-hidden">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.full_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-4xl">
                    {member.full_name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-1">{member.full_name}</h3>
                <p className="text-primary font-medium mb-4">{member.profession}</p>
                {member.bio && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
