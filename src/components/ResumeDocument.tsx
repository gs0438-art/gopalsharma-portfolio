import {
  personalInfo,
  skills,
  aiCapabilities,
  experiences,
  achievements,
  education,
  certifications,
  languages,
} from '@/data/resume';

/**
 * Printable resume document — renders a clean white resume layout.
 * Used inside a hidden div that gets extracted for print-to-PDF.
 * All content is sourced from the same data config as the website.
 */
export default function ResumeDocument() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1a1a1a', maxWidth: '720px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px', borderBottom: '2px solid #f0f0f0', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>{personalInfo.name}</h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{personalInfo.title}</p>
        <div style={{ fontSize: '12px', color: '#999', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span>{personalInfo.location}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.email}</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={headingStyle}>Professional Summary</h2>
        <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.6 }}>{personalInfo.professionalSummary}</p>
      </div>

      {/* Core Skills */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={headingStyle}>Core Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map((s) => (
            <span key={s.name} style={{ fontSize: '12px', padding: '3px 10px', background: '#f5f5f5', borderRadius: '4px', color: '#444' }}>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={headingStyle}>Experience</h2>
        {experiences.map((exp, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{exp.role}</h3>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              {exp.company} &nbsp;•&nbsp; {exp.period}
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '18px', fontSize: '13px', color: '#333' }}>
              {exp.responsibilities.map((r, j) => (
                <li key={j} style={{ marginBottom: '2px' }}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* AI & Technology */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={headingStyle}>AI &amp; Technology</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '18px', fontSize: '13px', color: '#333' }}>
          {aiCapabilities.map((c, i) => (
            <li key={i} style={{ marginBottom: '2px' }}>{c}</li>
          ))}
        </ul>
      </div>

      {/* Achievements */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={headingStyle}>Achievements</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '18px', fontSize: '13px', color: '#333' }}>
          {achievements.map((a, i) => (
            <li key={i} style={{ marginBottom: '2px' }}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Education + Certifications */}
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: 1, marginBottom: '16px' }}>
          <h2 style={headingStyle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600 }}>{edu.degree}</h3>
              <p style={{ fontSize: '12px', color: '#888' }}>{edu.institution} &nbsp;•&nbsp; {edu.year}</p>
            </div>
          ))}
          <h2 style={headingStyle}>Languages</h2>
          <p style={{ fontSize: '13px', color: '#333' }}>{languages.join(', ')}</p>
        </div>
        <div style={{ flex: 1, marginBottom: '16px' }}>
          <h2 style={headingStyle}>Certifications</h2>
          {certifications.map((cert, i) => (
            <p key={i} style={{ fontSize: '13px', color: '#333', marginBottom: '4px' }}>{cert.name}</p>
          ))}
          <h2 style={headingStyle}>Tools</h2>
          <p style={{ fontSize: '13px', color: '#333' }}>{personalInfo.tools.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

const headingStyle: React.CSSProperties = {
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#666',
  margin: '0 0 8px 0',
  borderBottom: '1px solid #e8e8e8',
  paddingBottom: '4px',
};
