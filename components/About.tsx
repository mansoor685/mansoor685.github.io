'use client';

import { personalInfo, education, languages } from '@/data/portfolio-data';
import { FaGraduationCap, FaLanguage, FaCode, FaRocket, FaBrain, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Passionate about building innovative solutions that make a difference
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Bio Card */}
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 5 }}
              className="glass-effect rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
                    <FaCode className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Full Stack Developer</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {personalInfo.bio.split('.')[0]}. Specializing in Python, JavaScript ecosystem, and cloud technologies.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10, scale: 1.02 }}
                className="glass-effect rounded-xl p-5 border-l-4 border-blue-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FaRocket className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-gray-200 font-medium flex-1">Scalable web applications & REST APIs</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10, scale: 1.02 }}
                className="glass-effect rounded-xl p-5 border-l-4 border-purple-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FaBrain className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-gray-200 font-medium flex-1">AI-powered solutions & automation</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10, scale: 1.02 }}
                className="glass-effect rounded-xl p-5 border-l-4 border-pink-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <FaCog className="w-6 h-6 text-pink-400" />
                  </div>
                  <p className="text-gray-200 font-medium flex-1">Microservices & CI/CD pipelines</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Education, Languages & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Education Card */}
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 5 }}
              className="glass-effect rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-glow">
                    <FaGraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Education</h3>
                  <p className="text-lg font-semibold text-gray-200 mb-2">{education.degree}</p>
                  <a
                    href={education.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center gap-2 group"
                  >
                    {education.institution}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Languages Card */}
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 5 }}
              className="glass-effect rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow-purple">
                    <FaLanguage className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-200 font-semibold">{lang.name}</span>
                        <span className="px-4 py-1.5 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-full border border-purple-500/30">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="glass-effect rounded-xl p-6 text-center border border-white/10"
              >
                <div className="text-3xl font-bold gradient-text mb-1">
                  2+
                </div>
                <div className="text-xs text-gray-400 font-medium">Years Experience</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="glass-effect rounded-xl p-6 text-center border border-white/10"
              >
                <div className="text-3xl font-bold gradient-text mb-1">
                  7+
                </div>
                <div className="text-xs text-gray-400 font-medium">Major Projects</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="glass-effect rounded-xl p-6 text-center border border-white/10"
              >
                <div className="text-3xl font-bold gradient-text mb-1">
                  20+
                </div>
                <div className="text-xs text-gray-400 font-medium">Technologies</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
