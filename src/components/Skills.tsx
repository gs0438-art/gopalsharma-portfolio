import {
  Target,
  MessageSquare,
  Users,
  Search,
  TrendingUp,
  PhoneCall,
  MessageCircle,
  Table,
  Calculator,
  Mail,
  Globe,
  Database,
} from 'lucide-react';
import { skills } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';
import { TiltCard } from '@/components/TiltCard';

const iconMap: Record<string, typeof Target> = {
  Target,
  MessageSquare,
  Users,
  Search,
  TrendingUp,
  PhoneCall,
  MessageCircle,
  Table,
  Calculator,
  Mail,
  Globe,
  Database,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 lg:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">02</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">Core Skills</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mb-12">
            A practical toolkit built across seven years of customer coordination,
            marketing, and business development work.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] ?? Target;
            return (
              <Reveal key={skill.name} delay={i * 40}>
                <TiltCard maxTilt={6} className="h-full rounded-2xl">
                  <div className="glass glass-hover rounded-2xl p-4 sm:p-5 h-full relative overflow-hidden group">
                    {/* Subtle corner glow */}
                    <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-amber-500/[0.03] blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex flex-col gap-3 h-full">
                      <span
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/[0.05]"
                        style={{ transform: 'translateZ(25px)' }}
                      >
                        <Icon size={18} className="text-amber-400/80" />
                      </span>
                      <span
                        className="text-[13px] sm:text-sm text-gray-300 font-medium leading-tight"
                        style={{ transform: 'translateZ(15px)' }}
                      >
                        {skill.name}
                      </span>
                    </div>
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
