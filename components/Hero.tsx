'use client';

import { personalInfo, stats, projects } from '@/data/portfolio-data';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' });
};

const Hero = () => {
  const showcase = projects.filter((p) => p.featured).map((p) => p.title.split(':')[0].split(' (')[0]);
  const whatsapp = `https://wa.me/${personalInfo.phoneRaw.replace('+', '')}`;

  return (
    <section id="home" className="relative pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,106,0.10),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="visible" className="text-center max-w-4xl mx-auto">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-500/30 bg-green-500/10 text-emerald-300 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Available for freelance & full-time projects
          </motion.div>

          <motion.p variants={item} className="text-mist text-lg mb-2">Hi, I&apos;m {personalInfo.name}</motion.p>

          <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-5">
            {personalInfo.title.split(' & ')[0]} &amp; <span className="gradient-text">{personalInfo.title.split(' & ')[1]}</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-cream/75 max-w-2xl mx-auto mb-8 leading-relaxed">
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 justify-center mb-10">
            <motion.button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy-950 font-semibold rounded-lg shadow-lg shadow-gold/25"
            >
              Start a Project <FaArrowRight className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo('projects')}
              className="px-7 py-3.5 bg-white/[0.03] border border-navy-700 text-cream font-semibold rounded-lg hover:bg-white/10"
            >
              See My Work
            </motion.button>
          </motion.div>

          <motion.div variants={item} className="flex justify-center gap-3 mb-14">
            {[
              { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: FaWhatsapp, href: whatsapp, label: 'WhatsApp' },
              { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 bg-white/[0.03] border border-navy-800 rounded-lg flex items-center justify-center text-mist hover:text-cream hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-navy-800 mb-12">
            {stats.map((st) => (
              <div key={st.label} className="bg-navy-900 px-4 py-5">
                <div className="font-serif text-2xl md:text-3xl font-medium text-gold">{st.value}</div>
                <div className="text-xs text-mist mt-1">{st.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <p className="text-xs uppercase tracking-widest text-mist mb-4">Recently shipped</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {showcase.map((name) => (
                <span key={name} className="text-cream/75 font-semibold text-sm md:text-base">{name}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
