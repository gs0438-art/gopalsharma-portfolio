import { Briefcase, ChevronRight } from 'lucide-react';
import { experiences } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';
import { TiltCard } from '@/components/TiltCard';

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">04</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">Experience</h2>
          </div>
          <p className="text-sm text-gray-600 mb-12 max-w-xl">
            A timeline of professional roles in customer coordination, marketing,
            and accounting within the manufacturing and services sectors.
          </p>
        </Reveal>

        <div className="relative">
          {/* Animated drawing line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/[0.05] overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-400/50 via-amber-400/15 to-transparent"
              style={{ height: '100%', animation: 'drawLine 2s ease forwards' }}
            />
          </div>

          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative pl-12 sm:pl-14 pb-10 last:pb-0">
                {/* Glowing node */}
                <div
                  className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center border ${
                    exp.current
                      ? 'bg-amber-400/10 border-amber-400/30'
                      : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
                >
                  {exp.current && (
                    <div className="absolute inset-0 rounded-full bg-amber-400/15 animate-ping-slow" />
                  )}
                  <Briefcase
                    size={12}
                    className={exp.current ? 'text-amber-400/80' : 'text-gray-600'}
                  />
                </div>

                <TiltCard maxTilt={3} className="rounded-2xl">
                  <div className="glass glass-hover rounded-2xl p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold text-white" style={{ transform: 'translateZ(15px)' }}>
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400/80 font-medium tracking-wide uppercase">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-5">
                      <span className="text-amber-400/70 text-xs sm:text-sm font-medium">
                        {exp.company}
                      </span>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-gray-500 text-xs sm:text-sm font-mono">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-gray-400 text-[13px] sm:text-sm leading-relaxed"
                          style={{ animation: `fadeUp 0.5s ease ${0.2 + j * 0.06}s both` }}
                        >
                          <ChevronRight size={14} className="flex-shrink-0 text-amber-400/40 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
