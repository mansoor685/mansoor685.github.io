'use client';

import { personalInfo, education, languages, stats } from '@/data/portfolio-data';
import { FaGraduationCap, FaLanguage, FaCode, FaRocket, FaBrain, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-navy-950 relative overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-12 h-px bg-gold/60 mx-auto mb-4"></div>
          <p className="text-mist max-w-2xl mx-auto text-sm md:text-base">
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
              className="glass-effect rounded-2xl p-8 border border-navy-800"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center">
                    <FaCode className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cream mb-3">{personalInfo.title}</h3>
                  <p className="text-cream/75 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="space-y-4">
              <motion.div
                className="glass-effect rounded-xl p-5 border-l-4 border-gold"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                    <FaRocket className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-cream/90 font-medium flex-1">Scalable SaaS platforms, dashboards & REST APIs</p>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-xl p-5 border-l-4 border-gold"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                    <FaBrain className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-cream/90 font-medium flex-1">RAG, voice AI & AI document automation</p>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-xl p-5 border-l-4 border-gold"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                    <FaCog className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-cream/90 font-medium flex-1">ERP, payment & calendar integrations, CI/CD</p>
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
              className="glass-effect rounded-2xl p-8 border border-gold/20"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center">
                    <FaGraduationCap className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-cream mb-2">Education</h3>
                  <p className="text-lg font-semibold text-cream/90 mb-2">{education.degree}</p>
                  <a
                    href={education.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-light transition-colors font-medium inline-flex items-center gap-2 group"
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
              className="glass-effect rounded-2xl p-8 border border-gold/20"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center">
                    <FaLanguage className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-cream mb-4">Languages</h3>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-cream/90 font-semibold">{lang.name}</span>
                        <span className="px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full border border-gold/30">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((st) => (
                <div key={st.label} className="glass-effect rounded-xl p-5 text-center border border-navy-800">
                  <div className="font-serif text-2xl font-medium text-gold mb-1">{st.value}</div>
                  <div className="text-xs text-mist font-medium">{st.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
