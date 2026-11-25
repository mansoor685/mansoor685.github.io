'use client';

import { motion } from 'framer-motion';

type Props = { eyebrow: string; title: string; highlight: string; subtitle?: string };

const SectionHeader = ({ eyebrow, title, highlight, subtitle }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-14"
  >
    <span className="inline-flex items-center gap-3 mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
      <span className="w-8 h-px bg-gold/50" />
      {eyebrow}
      <span className="w-8 h-px bg-gold/50" />
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
      {title} <span className="gradient-text">{highlight}</span>
    </h2>
    {subtitle && (
      <p className="text-mist max-w-2xl mx-auto text-sm md:text-base">{subtitle}</p>
    )}
  </motion.div>
);

export default SectionHeader;
