'use client';

import { personalInfo } from '@/data/portfolio-data';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {

  return (
    <section id="contact" className="py-20 bg-navy-950 relative overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
            Have a project in <span className="gradient-text">mind?</span>
          </h2>
          <p className="text-mist max-w-xl mx-auto">
            Tell me what you want to build. I usually reply within 24 hours with questions, a plan and an estimate.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Email */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/10 border border-gold/30 rounded-lg mb-3">
                <FaEnvelope className="w-6 h-6 text-gold" />
              </div>
              <h4 className="text-sm font-semibold text-mist mb-1">Email</h4>
              <a href={`mailto:${personalInfo.email}`} className="text-gold hover:text-gold-light transition-colors">
                {personalInfo.email}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-lg mb-3">
                <FaWhatsapp className="w-6 h-6 text-gold" />
              </div>
              <h4 className="text-sm font-semibold text-mist mb-1">WhatsApp</h4>
              <a href={`https://wa.me/${personalInfo.phoneRaw.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                Chat with me
              </a>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/10 border border-gold/30 rounded-lg mb-3">
                <FaPhone className="w-6 h-6 text-gold" />
              </div>
              <h4 className="text-sm font-semibold text-mist mb-1">Phone</h4>
              <a href={`tel:${personalInfo.phoneRaw}`} className="text-gold hover:text-gold-light transition-colors">
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
                className="w-12 h-12 bg-white/5 hover:bg-gold rounded-lg flex items-center justify-center text-cream/90 hover:text-navy-950 transition-all border border-navy-700"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 hover:bg-gold rounded-lg flex items-center justify-center text-cream/90 hover:text-navy-950 transition-all border border-navy-700"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 bg-white/5 hover:bg-gold rounded-lg flex items-center justify-center text-cream/90 hover:text-navy-950 transition-all border border-navy-700"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="/mansoor.pdf"
              download="Mansoor_Ahmed_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy-950 font-semibold rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>

            {/* Availability Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
              <span className="text-cream text-sm font-medium">Available for opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
