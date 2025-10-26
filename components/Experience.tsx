'use client';

import { experience } from '@/data/portfolio-data';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Professional journey building scalable solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-50"></div>

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
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-[#0a0a0f] shadow-glow animate-pulse"></div>
                </motion.div>

                <div className={`md:w-11/12 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, rotateX: 5, y: -10 }}
                    className="glass-effect rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all"
                  >
                    {/* Company Header */}
                    <div className="flex items-start gap-5 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
                          <FaBriefcase className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{job.role}</h3>
                        <p className="text-xl font-semibold gradient-text mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                          <span className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">{job.duration}</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="w-4 h-4 text-purple-400" />
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
                          whileHover={{ x: 5 }}
                          className="flex items-start gap-3 group"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 group-hover:scale-150 transition-transform"></span>
                          <p className="text-gray-300 leading-relaxed">{achievement}</p>
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
