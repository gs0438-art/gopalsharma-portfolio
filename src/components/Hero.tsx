import { useEffect, useState } from 'react';
import { FileText, Mail, ArrowDown, ArrowRight } from 'lucide-react';
import { personalInfo } from '@/data/resume';
import Hero3DVisual from '@/components/Hero3DVisual';
import { MagneticButton } from '@/components/MagneticButton';

const SPECIALTIES = [
  'Lead Generation',
  'Customer Communication',
  'CRM',
  'Market Research',
  'Digital Marketing',
  'AI & Technology',
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const textDepth = `translateZ(${Math.max(-60, -scrollY * 0.08)}px)`;
  const visualBlur = Math.min(6, scrollY / 80);
  const visualScale = Math.max(0.85, 1 - scrollY / 2000);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D visual — right side on desktop, behind on mobile */}
      <div
        className="absolute inset-0 lg:right-0 lg:w-1/2 pointer-events-none"
        style={{
          opacity: heroOpacity * 0.95,
          filter: `blur(${visualBlur}px)`,
          transform: `scale(${visualScale})`,
          transition: 'filter 0.1s linear',
        }}
      >
        <Hero3DVisual />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-transparent to-[#0a0a0b] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent pointer-events-none z-10 hidden lg:block" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="lg:max-w-[55%]">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass mb-8"
            style={{ animation: 'fadeUp 0.7s ease forwards' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400 tracking-wide">Available for opportunities</span>
          </div>

          {/* Name — large editorial typography */}
          <h1
            className="text-[2.75rem] sm:text-6xl lg:text-[4.5rem] font-bold text-white tracking-tight leading-[1.05] mb-3"
            style={{ animation: 'fadeUp 0.7s ease 0.1s both', transform: textDepth }}
          >
            {personalInfo.name}
          </h1>

          {/* Title */}
          <p
            className="text-base sm:text-xl text-gray-400 font-light mb-6 leading-relaxed"
            style={{ animation: 'fadeUp 0.7s ease 0.2s both', transform: textDepth }}
          >
            {personalInfo.title}
          </p>

          {/* Animated specialty line */}
          <div
            className="mb-10 overflow-hidden"
            style={{ animation: 'fadeUp 0.7s ease 0.3s both' }}
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              {SPECIALTIES.map((s, i) => (
                <span key={s} className="flex items-center gap-x-2">
                  <span
                    className="text-gray-400 hover:text-amber-400/80 transition-colors duration-300"
                    style={{
                      animation: `fadeUp 0.5s ease ${0.4 + i * 0.08}s both`,
                    }}
                  >
                    {s}
                  </span>
                  {i < SPECIALTIES.length - 1 && (
                    <span className="text-gray-700 text-xs">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}
          >
            <MagneticButton strength={0.2}>
              <a
                href="#resume"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-[#0a0a0b] font-semibold rounded-xl text-sm transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_8px_30px_rgba(251,191,36,0.25)]"
              >
                <FileText size={17} />
                View Resume
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 glass glass-hover text-white font-semibold rounded-xl text-sm"
              >
                <Mail size={17} />
                Contact Me
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-700 hover:text-amber-400 transition-colors z-20"
        aria-label="Scroll down"
        style={{ opacity: heroOpacity }}
      >
        <ArrowDown className="animate-bounce" size={20} />
      </a>
    </section>
  );
}
