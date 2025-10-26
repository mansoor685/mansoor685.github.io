'use client';

import { projects } from '@/data/portfolio-data';
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Showcasing excellence in full-stack development and AI integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Project Header with Gradient */}
              <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 p-6 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 group-hover:opacity-100 opacity-0 transition-opacity"></div>
                <h3 className="relative text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="relative text-sm text-gray-300 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Project Body */}
              <div className="p-6 bg-[#1a1a24]/80">
                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, expandedProject === index ? undefined : 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {!expandedProject && project.techStack.length > 4 && (
                      <span className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs font-semibold rounded-lg border border-white/10">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedProject === index ? 'max-h-96' : 'max-h-24'
                }`}>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className={`flex items-start gap-2 ${expandedProject !== index && i >= 2 ? 'hidden' : ''}`}>
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5"></span>
                        <span className="line-clamp-2">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expand Button */}
                <button
                  className="mt-4 w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors group/btn"
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                >
                  {expandedProject === index ? (
                    <>Show Less <FaChevronUp className="w-3 h-3 group-hover/btn:-translate-y-0.5 transition-transform" /></>
                  ) : (
                    <>Show More <FaChevronDown className="w-3 h-3 group-hover/btn:translate-y-0.5 transition-transform" /></>
                  )}
                </button>

                {/* Project Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm shadow-glow transition-all hover:shadow-blue-500/50"
                  >
                    View Project <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
