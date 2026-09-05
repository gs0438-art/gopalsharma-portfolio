import { Check } from 'lucide-react';
import { personalInfo } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">01</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">About</h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left — large statement */}
          <Reveal delay={80} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs text-gray-600 font-mono mb-3 tracking-widest uppercase">Experience</p>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                7<span className="text-amber-400">+</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-400">Years</span>
              </h3>
              <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-xs">
                In lead generation, customer coordination, CRM, and marketing
                within the manufacturing industry.
              </p>
            </div>
          </Reveal>

          {/* Right — professional summary + tools */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={150}>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light">
                {personalInfo.professionalSummary}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="h-px w-full bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
            </Reveal>

            <Reveal delay={300}>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-600 mb-5 font-mono">
                  Tools &amp; Capabilities
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                  {personalInfo.tools.map((tool) => (
                    <div key={tool} className="flex items-center gap-3 group">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full border border-amber-400/30 flex items-center justify-center transition-colors group-hover:bg-amber-400/10">
                        <Check size={9} className="text-amber-400/70" />
                      </span>
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
