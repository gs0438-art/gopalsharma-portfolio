import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import AITechnology from '@/components/AITechnology';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Certifications from '@/components/Certifications';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorGlow from '@/components/CursorGlow';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] relative">
      <AnimatedBackground />
      <CursorGlow />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <AITechnology />
          <Experience />
          <Achievements />
          <Certifications />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
