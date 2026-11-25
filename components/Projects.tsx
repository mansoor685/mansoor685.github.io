'use client';

import { projects, type Project } from '@/data/portfolio-data';
import { FaExternalLinkAlt, FaGithub, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';

const a = { chip: 'bg-gold/10 text-gold border-gold/20', dot: 'text-gold', text: 'text-gold' };

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-3">
    {project.link && (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy-950 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all"
      >
        {project.linkLabel ?? 'Live Demo'} <FaExternalLinkAlt className="w-3 h-3" />
      </a>
    )}
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-navy-700 text-cream rounded-lg font-semibold text-sm hover:bg-white/10 transition-all"
      >
        <FaGithub className="w-4 h-4" /> Source Code
      </a>
    )}
  </div>
);

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      className="group relative glass-effect rounded-2xl overflow-hidden border border-navy-800 hover:border-gold/40 transition-all duration-300 flex flex-col"
    >
      <div className="h-px w-full bg-gold/40" />

      <div className="relative p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`text-xs font-semibold uppercase tracking-wider ${a.text}`}>{project.category}</span>
          {project.link && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Live
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-cream mb-1">{project.title}</h3>
        <p className="text-cream/75 font-medium mb-4">{project.tagline}</p>
        <p className="text-sm text-mist leading-relaxed mb-5">{project.description}</p>

        <ul className="space-y-2.5 mb-6">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-cream/75 leading-relaxed">
              <FaCheckCircle className={`flex-shrink-0 w-3.5 h-3.5 mt-1 ${a.dot}`} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-5">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${a.chip}`}>{t}</span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
};

const CompactCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="glass-effect rounded-xl p-6 border border-navy-800 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <span className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${a.text}`}>{project.category}</span>
      <h3 className="text-lg font-bold text-cream mb-2">{project.title}</h3>
      <p className="text-sm text-mist leading-relaxed mb-4">{project.tagline}</p>
      <ul className="space-y-1.5 mb-4">
        {project.highlights.slice(0, 2).map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-mist leading-relaxed">
            <span className={`mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0 ${a.dot}`} />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.techStack.map((t) => (
          <span key={t} className="px-2 py-0.5 text-[11px] text-cream/75 bg-white/[0.03] border border-navy-800 rounded">{t}</span>
        ))}
      </div>
      {(project.link || project.github) && <div className="mt-4"><ProjectLinks project={project} /></div>}
    </motion.article>
  );
};

const Projects = () => {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-navy-950 relative overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured"
          highlight="Work"
          subtitle="Real products built for real businesses: AI platforms, SaaS, marketplaces, mobile apps and company websites."
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {featured.map((p, i) => <FeaturedCard key={p.title} project={p} index={i} />)}
        </div>

        {other.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-cream mb-6 text-center">More Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {other.map((p, i) => <CompactCard key={p.title} project={p} index={i} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
