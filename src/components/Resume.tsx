import { useRef, useState } from 'react';
import { Download, ExternalLink, Eye, FileText } from 'lucide-react';
import { personalInfo } from '@/data/resume';
import { Reveal } from '@/hooks/useReveal';
import { TiltCard } from '@/components/TiltCard';
import { MagneticButton } from '@/components/MagneticButton';
import ResumeDocument from '@/components/ResumeDocument';

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current?.innerHTML;
    if (!content) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!doctype html><html><head><title>${personalInfo.name} — Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; background: #fff; color: #1a1a1a; padding: 48px; line-height: 1.6; }
        h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
        h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin: 24px 0 10px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
        .title { font-size: 14px; color: #555; margin-bottom: 12px; }
        .contact { font-size: 12px; color: #888; display: flex; gap: 16px; flex-wrap: wrap; }
        ul { list-style: disc; padding-left: 18px; font-size: 13px; color: #333; }
        li { margin-bottom: 3px; }
        @media print { body { padding: 24px; } }
      </style></head><body>${content}</body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <section id="resume" className="py-20 sm:py-28 lg:py-32 relative z-10">
      {/* Hidden printable document */}
      <div className="hidden">
        <div ref={printRef}>
          <ResumeDocument />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-amber-400/80 tracking-widest">08</span>
            <div className="accent-line" />
            <h2 className="text-lg font-medium text-gray-500 tracking-wide uppercase">My Resume</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mb-12">
            A complete overview of my professional experience, skills and qualifications.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — floating document preview */}
          <Reveal delay={100}>
            <TiltCard maxTilt={6} className="rounded-2xl">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  transform: 'translateZ(0)',
                  animation: 'floatDoc 6s ease-in-out infinite',
                }}
              >
                {/* Paper shadow */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)' }}
                />
                {/* Document mockup */}
                <div className="relative bg-[#f5f5f3] rounded-2xl p-6 sm:p-8 aspect-[3/4] overflow-hidden">
                  <div className="h-full flex flex-col text-[#1a1a1a]">
                    {/* Mock header */}
                    <div className="border-b border-gray-300 pb-3 mb-3">
                      <div className="text-lg sm:text-xl font-bold text-gray-900">{personalInfo.name}</div>
                      <div className="text-xs text-gray-600 mb-1">{personalInfo.title}</div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-500">
                        <span>{personalInfo.location}</span>
                        <span>{personalInfo.phone}</span>
                        <span>{personalInfo.email}</span>
                      </div>
                    </div>
                    {/* Mock sections */}
                    <div className="space-y-2.5 flex-1 overflow-hidden">
                      {['Professional Summary', 'Core Skills', 'Experience', 'AI & Technology', 'Education'].map((s) => (
                        <div key={s}>
                          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">{s}</div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-gray-200 rounded-full w-full" />
                            <div className="h-1.5 bg-gray-200 rounded-full w-[85%]" />
                            {s === 'Experience' && <div className="h-1.5 bg-gray-200 rounded-full w-[70%]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Footer accent */}
                    <div className="flex justify-end mt-2">
                      <div className="h-0.5 w-12 bg-amber-400/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Right — actions */}
          <Reveal delay={200}>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                  {personalInfo.name}
                </h3>
                <p className="text-gray-400 text-sm mb-1">{personalInfo.title}</p>
                <p className="text-gray-600 text-xs font-mono">{personalInfo.resumeFileName}</p>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                Download a PDF copy or view the full resume online. The document
                contains the same professional information presented on this website.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <MagneticButton strength={0.2}>
                  <a
                    href={personalInfo.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-[#0a0a0b] font-semibold rounded-xl text-sm transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_8px_30px_rgba(251,191,36,0.25)]"
                  >
                    <Eye size={17} />
                    View Resume
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <a
                    href={personalInfo.resumePath}
                    download={personalInfo.resumeFileName}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 glass glass-hover text-white font-semibold rounded-xl text-sm"
                  >
                    <Download size={17} />
                    Download Resume
                  </a>
                </MagneticButton>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-400 transition-colors"
                >
                  <FileText size={13} />
                  {showPreview ? 'Hide preview' : 'Inline preview'}
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink size={13} />
                  Print / Save as PDF
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Inline PDF preview */}
        {showPreview && (
          <Reveal delay={100}>
            <div
              className="mt-8 glass rounded-2xl overflow-hidden"
              style={{ animation: 'scaleIn 0.5s ease forwards' }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <span className="text-xs text-gray-500 font-mono">
                  {personalInfo.resumeFileName}
                </span>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-xs text-gray-600 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="bg-gray-950/50">
                <object
                  data={personalInfo.resumePath}
                  type="application/pdf"
                  className="w-full h-[500px] sm:h-[650px]"
                  aria-label="Resume PDF preview"
                >
                  <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                    <p className="text-sm text-gray-500">
                      Unable to display PDF preview directly.
                    </p>
                    <a
                      href={personalInfo.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 glass glass-hover text-white rounded-xl text-xs font-medium"
                    >
                      <ExternalLink size={14} />
                      Open Resume
                    </a>
                  </div>
                </object>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
