import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-950">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <Services />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
