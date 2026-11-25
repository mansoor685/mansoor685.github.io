'use client';

import { services } from '@/data/portfolio-data';
import { FaBrain, FaLayerGroup, FaPlug, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';

const icons = [FaBrain, FaLayerGroup, FaPlug, FaMobileAlt];
const Services = () => (
  <section id="services" className="py-24 bg-navy-950 relative overflow-hidden">
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What I do"
        title="How I Can"
        highlight="Help You"
        subtitle="From idea to production: I handle architecture, backend, frontend, AI and deployment, so you work with one accountable engineer."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-effect rounded-xl p-6 border border-navy-800 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 mb-4 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-base font-semibold text-cream mb-2">{s.title}</h3>
              <p className="text-sm text-mist leading-relaxed">{s.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
