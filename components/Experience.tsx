'use client';

import { experience } from '@/data/portfolio-data';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-navy-950 relative overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-12 h-px bg-gold/60 mx-auto mb-4"></div>
          <p className="text-mist max-w-2xl mx-auto text-sm md:text-base">
            Professional journey building scalable solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gold opacity-40"></div>

          {/* Experience Items */}
          <div className="space-y-16">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8"
                >
                  <div className="w-6 h-6 bg-gold rounded-full border-4 border-navy-950"></div>
                </motion.div>

                <div className={`md:w-11/12 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'}`}>
                  <motion.div
                    className="glass-effect rounded-2xl p-8 border border-navy-800 hover:border-gold/50 transition-all"
                  >
                    {/* Company Header */}
                    <div className="flex items-start gap-5 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center">
                          <FaBriefcase className="w-8 h-8 text-gold" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-cream mb-2">{job.role}</h3>
                        <p className="text-lg font-medium text-gold mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-cream/75">
                          <span className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4 text-gold" />
                            <span className="font-medium">{job.duration}</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="w-4 h-4 text-gold" />
                            <span className="font-medium">{job.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      {job.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 group"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-gold rounded-full mt-2 group-hover:scale-150 transition-transform"></span>
                          <p className="text-cream/75 leading-relaxed">{achievement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
