import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { personalInfo } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';
import { MagneticButton } from '@/components/MagneticButton';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('sending');
    setErrorMsg('');

    try {
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
  const body = encodeURIComponent(
    `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
  );

  window.location.href = mailto:${personalInfo.email}?subject=${subject}&body=${body};

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email directly.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">09</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">Contact</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mb-12">
            Get in touch for professional inquiries, collaborations, or opportunities.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — contact details */}
          <Reveal delay={80} className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {personalInfo.name}
                </h3>
                <p className="text-sm text-gray-500">{personalInfo.title}</p>
              </div>

              <div className="space-y-2.5">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-gray-500 hover:text-amber-400/80 transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg glass flex items-center justify-center group-hover:border-amber-400/20 transition-colors">
                    <Mail size={16} />
                  </span>
                  <span className="text-[13px]">{personalInfo.email}</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-gray-500 hover:text-amber-400/80 transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg glass flex items-center justify-center group-hover:border-amber-400/20 transition-colors">
                    <Phone size={16} />
                  </span>
                  <span className="text-[13px]">{personalInfo.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-gray-500">
                  <span className="w-9 h-9 rounded-lg glass flex items-center justify-center">
                    <MapPin size={16} />
                  </span>
                  <span className="text-[13px]">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={150} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 sm:p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs text-gray-500 mb-1.5 font-mono tracking-wide">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-amber-400/25 focus:bg-white/[0.03] transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-gray-500 mb-1.5 font-mono tracking-wide">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-amber-400/25 focus:bg-white/[0.03] transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-gray-500 mb-1.5 font-mono tracking-wide">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-amber-400/25 focus:bg-white/[0.03] transition-all resize-none"
                  placeholder="Your message"
                />
              </div>

              <MagneticButton strength={0.15}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-[#0a0a0b] font-semibold rounded-xl text-sm transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_8px_30px_rgba(251,191,36,0.25)] disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <Send size={15} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </MagneticButton>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle2 size={14} />
                  Message sent successfully.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
