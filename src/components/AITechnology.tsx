import {
  Sparkles,
  Image,
  PenLine,
  Code2,
  GitBranch,
  Wrench,
  GraduationCap,
} from 'lucide-react';
import { aiCapabilities } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';
import { TiltCard } from '@/components/TiltCard';

const icons = [Sparkles, Image, PenLine, Code2, GitBranch, Wrench, GraduationCap];

export default function AITechnology() {
  return (
    <section id="ai-technology" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden z-10">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">03</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">AI &amp; Technology</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mb-10">
            Leveraging AI tools and modern technology platforms to enhance marketing,
            digital experiences, and day-to-day productivity.
          </p>
        </Reveal>

        {/* Tech visualization banner */}
        <Reveal delay={80}>
          <div className="glass rounded-2xl p-4 sm:p-6 mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-600">
            {['AI', 'Websites', 'Landing Pages', 'Digital Experiences', 'Creatives', 'Content', 'Research', 'Automation', 'GitHub', 'VS Code', 'Web Solutions'].map((tag, i) => (
              <span key={tag} className="flex items-center gap-x-3">
                <span className="text-gray-500 hover:text-amber-400/70 transition-colors duration-300 font-mono">{tag}</span>
                {i < 10 && <span className="text-gray-800">·</span>}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {aiCapabilities.map((capability, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={i} delay={i * 50}>
                <TiltCard maxTilt={4} className="h-full rounded-2xl">
                  <div className="glass glass-hover rounded-2xl p-5 sm:p-6 h-full flex gap-4 group">
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.05] flex items-center justify-center"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <Icon size={16} className="text-amber-400/70" />
                    </span>
                    <p
                      className="text-[13px] sm:text-sm text-gray-400 leading-relaxed"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {capability}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
