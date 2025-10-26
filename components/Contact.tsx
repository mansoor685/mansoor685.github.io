'use client';

import { personalInfo } from '@/data/portfolio-data';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {

  return (
    <section id="contact" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-3 rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Email */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-3 shadow-glow">
                <FaEnvelope className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Email</h4>
              <a href={`mailto:${personalInfo.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                {personalInfo.email}
              </a>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mb-3 shadow-glow-purple">
                <FaPhone className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Phone</h4>
              <a href={`tel:${personalInfo.phone}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Social Links & Actions */}
          <div className="flex flex-col items-center gap-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center text-white transition-all border border-white/20"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center text-white transition-all border border-white/20"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center text-white transition-all border border-white/20"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="/mansoor.pdf"
              download="Mansoor_Ahmed_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-glow transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>

            {/* Availability Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-white text-sm font-medium">Available for opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
