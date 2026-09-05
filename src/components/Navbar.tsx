import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, personalInfo } from '@/data/resume';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = navLinks.map((l) => l.href.slice(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 80 && rect.bottom >= 80;
      });
      if (current) setActive(`#${current}`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    setActive(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0b]/85 backdrop-blur-2xl border-b border-white/[0.04] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className="text-white font-semibold tracking-tight text-base transition-opacity hover:opacity-80 flex items-center gap-1.5"
        >
          <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] text-amber-400 font-mono">
            GS
          </span>
          <span className="hidden sm:inline">{personalInfo.name}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
              className={`px-3 py-2 text-[13px] rounded-lg transition-all duration-200 ${
                active === link.href
                  ? 'text-amber-400/90'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-gray-400 p-2 -mr-2 relative w-8 h-8 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu — animated */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? '500px' : '0px' }}
      >
        <div className="bg-[#0a0a0b]/95 backdrop-blur-2xl border-t border-white/[0.04]">
          <div className="flex flex-col px-6 py-4 gap-0.5">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={`px-3 py-2.5 text-sm rounded-lg transition-all ${
                  active === link.href
                    ? 'text-amber-400/90 bg-white/[0.03]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                }`}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.3s ease ${i * 0.03}s, transform 0.3s ease ${i * 0.03}s`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
