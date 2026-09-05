import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { navLinks, personalInfo } from '@/data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] pt-16 pb-8 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[11px] text-amber-400 font-mono">
                GS
              </span>
              <h3 className="text-white font-semibold text-base">
                {personalInfo.name}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">{personalInfo.title}</p>
            <p className="text-gray-700 text-xs leading-relaxed max-w-xs">
              {personalInfo.location}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-gray-600 mb-4 font-mono">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-600 hover:text-amber-400/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-gray-600 mb-4 font-mono">
              Get in Touch
            </h4>
            <div className="space-y-2.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-amber-400/80 transition-colors"
              >
                <Mail size={13} />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-amber-400/80 transition-colors"
              >
                <Phone size={13} />
                {personalInfo.phone}
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={13} />
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-amber-400/80 transition-colors group"
          >
            Back to top
            <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
