'use client';

import { skills } from '@/data/portfolio-data';
import { motion } from 'framer-motion';
import { FaCode, FaDesktop, FaServer, FaBrain, FaDatabase, FaCloud, FaPlug } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';

const icons = [FaCode, FaDesktop, FaServer, FaBrain, FaDatabase, FaCloud, FaPlug];

const Skills = () => (
  <section id="skills" className="py-24 bg-navy-950 relative overflow-hidden">
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Toolbox"
        title="Technical"
        highlight="Skills"
        subtitle="The languages, frameworks and services I use day to day to ship client projects."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`rounded-xl p-6 bg-navy-900 border border-navy-800 hover:border-gold/40 transition-colors ${
                i === skills.length - 1 && skills.length % 3 === 1 ? 'lg:col-span-3' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-base font-semibold text-cream">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm text-cream/90 bg-white/[0.04] border border-navy-800 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
