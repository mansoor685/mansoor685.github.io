'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'projects', 'experience', 'skills', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-effect shadow-lg shadow-gold/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="font-serif text-2xl font-medium text-cream tracking-tight"
          >
            Mansoor Ahmed
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-navy-950'
                    : 'text-cream/75 hover:text-cream'
                }`}
              >
                {activeSection === link.href.replace('#', '') && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gold rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{link.label}</span>
              </motion.a>
            ))}
            
            {/* Download Resume Button */}
            <motion.a
              href="/mansoor.pdf"
              download="Mansoor_Ahmed_Resume.pdf"
              className="ml-2 px-4 py-2 bg-gold text-navy-950 text-sm font-medium rounded-lg shadow-lg hover:shadow-gold/50 transition-all"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-cream/75 hover:text-cream focus:outline-none"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu?.classList.toggle('hidden');
              }}
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden glass-effect border-t border-navy-800">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                scrollToSection(e, link.href);
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                activeSection === link.href.replace('#', '')
                  ? 'bg-gold text-navy-950'
                  : 'text-cream/75 hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
          
          {/* Download Resume Button - Mobile */}
          <a
            href="/mansoor.pdf"
            download="Mansoor_Ahmed_Resume.pdf"
            onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            className="block px-4 py-3 rounded-lg text-base font-medium bg-gold text-navy-950 text-center"
          >
            Download Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
