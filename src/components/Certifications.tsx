import { GraduationCap, Award, Briefcase, Globe, Languages } from 'lucide-react';
import { education, certifications, languages } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';

const certIconMap: Record<string, typeof Award> = {
  Languages,
  Award,
  Briefcase,
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 sm:py-28 lg:py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">06</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">
              Education &amp; Certifications
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mb-12">
            Academic background, professional certifications, and languages.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Education — timeline cards */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-5 font-mono">Education</h3>
            <div className="relative">
              <div className="absolute left-2.5 top-1 bottom-1 w-px bg-white/[0.05]" />
              {education.map((edu, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="relative pl-10 pb-5 last:pb-0">
                    <div className="absolute left-0 top-0.5 w-5 h-5 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center">
                      <GraduationCap size={10} className="text-amber-400/60" />
                    </div>
                    <div className="glass glass-hover rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-white mb-0.5">{edu.degree}</h4>
                      <p className="text-xs text-gray-500 mb-1">{edu.institution}</p>
                      <p className="text-[11px] text-amber-400/60 font-mono">{edu.year}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications + Languages */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-5 font-mono">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => {
                  const Icon = certIconMap[cert.icon] ?? Award;
                  return (
                    <Reveal key={i} delay={i * 70}>
                      <div className="glass glass-hover rounded-xl p-4 flex items-center gap-3.5 group">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.05] flex items-center justify-center">
                          <Icon size={15} className="text-amber-400/70" />
                        </span>
                        <span className="text-[13px] text-gray-400 group-hover:text-gray-300 transition-colors">
                          {cert.name}
                        </span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-5 font-mono">Languages</h3>
              <Reveal delay={100}>
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <Globe size={16} className="text-amber-400/60 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1.5 text-xs text-gray-300 bg-white/[0.03] rounded-lg border border-white/[0.05]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
