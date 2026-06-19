import React from 'react';
import { motion } from 'motion/react';
import { Users, Code, Library, Award, Trophy, Sparkles } from 'lucide-react';

interface GlanceCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  desc: string;
  index: number;
}

const GlanceCard: React.FC<GlanceCardProps> = ({ icon, value, label, desc, index }) => {
  return (
    <motion.div
      id={`glance-card-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-ivory border border-ivory-dark/60 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between group overflow-hidden relative"
    >
      {/* Background soft gold glow on hover */}
      <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-300" />
      
      <div>
        <div className="w-12 h-12 rounded-2xl bg-navy-800/10 flex items-center justify-center text-navy-800 mb-6 group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300 shadow-sm">
          {icon}
        </div>
        
        <h3 className="font-display text-4xl font-bold text-navy-800 tracking-tight mb-2 flex items-baseline">
          {value}
        </h3>
        
        <h4 className="font-sans font-semibold text-navy-700 text-md tracking-tight mb-1 group-hover:text-gold-dark transition-colors">
          {label}
        </h4>
      </div>
      
      <p className="font-sans text-xs text-navy-600/80 mt-2 border-t border-navy-800/5 pt-3 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export const AtAGlance: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "500+",
      label: "Student Members",
      desc: "An active, vibrant network of design thinking and engineering minds collaborating under ECE SRMIST."
    },
    {
      icon: <Code className="w-6 h-6" />,
      value: "100+",
      label: "Projects Developed",
      desc: "Innovative hardware-software designs, communication simulations, and digital products launched."
    },
    {
      icon: <Library className="w-6 h-6" />,
      value: "50+",
      label: "Technical Workshops",
      desc: "Hands-on sessions on embedded systems, SDR, UI/UX, VLSI design, signal intelligence, and visual design."
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "8+ Years",
      label: "Legacy of Excellence",
      desc: "Consistent history of building student leadership and fostering multidisciplinary research at Ramapuram campus."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: "Multiple",
      label: "Technical Achievements",
      desc: "National hackathon winners, patent files, and departmental accolades won across engineering symposia."
    }
  ];

  return (
    <section id="at-a-glance-section" className="py-20 relative overflow-hidden bg-navy-950">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-light text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Impact & Achievements
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight max-w-3xl"
          >
            DCDC <span className="text-gold font-sans font-medium">At A Glance</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory-light/70 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans"
          >
            Empowering students in electronics, hardware engineering, creative designs, and modern communication models. See our records so far.
          </motion.p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={index === 3 || index === 4 ? "col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2-dynamic" : ""}>
              <GlanceCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                desc={stat.desc}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
