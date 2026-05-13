import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GraduationCap, Users, HeartHandshake, CalendarDays } from 'lucide-react';

function Counter({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ImpactSection() {
  const impacts = [
    {
      icon: GraduationCap,
      value: 50,
      suffix: '+',
      label: 'Scholarships Sponsored',
      desc: 'Supporting indigent students in Aguleri to achieve their educational dreams.'
    },
    {
      icon: Users,
      value: 500,
      suffix: '+',
      label: 'Alumni Members',
      desc: 'A growing network of professionals united by brotherhood.'
    },
    {
      icon: HeartHandshake,
      value: 15,
      suffix: '+',
      label: 'Community Projects',
      desc: 'Philanthropic outreach programs and youth empowerment initiatives.'
    },
    {
      icon: CalendarDays,
      value: 10,
      suffix: '',
      label: 'Annual Events',
      desc: 'Gatherings, mentoring sessions, and networking symposiums.'
    }
  ];

  return (
    <section id="impact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Our Impact & Philanthropy</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We measure our success not just by individual achievements, but by how much we lift others up. Our commitment to giving back to the society that shaped us remains unflinching.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100 text-center flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-black mb-2">
                <Counter end={item.value} suffix={item.suffix} />
              </h3>
              <div className="h-px w-12 bg-primary my-4"></div>
              <h4 className="text-lg font-semibold text-black mb-3">{item.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
