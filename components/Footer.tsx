'use client';

import { personalInfo } from '@/data/portfolio-data';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="relative bg-navy-900 border-t border-navy-800 text-cream pt-16 pb-8 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-cream">{personalInfo.name}</h3>
            <p className="text-mist mb-6 leading-relaxed">
              {personalInfo.tagline}
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
                { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 hover:bg-gold rounded-lg flex items-center justify-center text-cream/90 hover:text-navy-950 transition-all duration-300 border border-navy-700"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in stagger-1">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-mist hover:text-cream transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-gold transition-all duration-300"></span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in stagger-2">
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <ul className="space-y-3 text-mist">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-cream transition-colors">
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.phoneRaw}`} className="hover:text-cream transition-colors">
                  {personalInfo.phone}
                </a>
              </li>
              <li className="mt-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-emerald-300 text-sm rounded-lg">
                  <span className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></span>
                  Available for Work
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-mist text-sm">
          <p className="flex items-center gap-2">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-mist">
            Built with Next.js, React & Tailwind CSS
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 bg-navy-900/90 border border-gold/40 text-gold hover:bg-gold hover:text-navy-950 rounded-full transition-colors flex items-center justify-center group z-40"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
};

export default Footer;
