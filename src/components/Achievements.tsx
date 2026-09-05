import { Trophy } from 'lucide-react';
import { achievements } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 sm:py-28 lg:py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">05</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">Achievements</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mb-12">
            Key contributions and milestones from seven years of professional work.
          </p>
        </Reveal>

        <div className="relative">
          {/* Horizontal connecting line */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="relative group">
                  {/* Node dot */}
                  <div className="hidden lg:flex absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/[0.06] border border-white/[0.1] items-center justify-center z-10">
                    <div className="w-1 h-1 rounded-full bg-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="glass glass-hover rounded-2xl p-5 h-full lg:mt-12">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.05] flex items-center justify-center mb-3 lg:hidden">
                      <Trophy size={15} className="text-amber-400/70" />
                    </span>
                    <span className="text-[10px] font-mono text-gray-700 mb-2 block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      {a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
