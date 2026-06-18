import type { ResumeData } from '../../../types';
import '../LeftPanel.css';

interface Props { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>>; }

export function ProfileForm({ data, setData }: Props) {
  const pi = data.personalInfo;
  const set = (field: string, value: string) =>
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  return (
    <div>
      <div className="field">
        <label>Full Name</label>
        <input className="name-input" type="text" value={pi.name} onChange={e => set('name', e.target.value)} placeholder="AYUSH KUMBHARE" />
      </div>
      <div className="field">
        <label>Professional Headline</label>
        <input type="text" value={pi.headline} onChange={e => set('headline', e.target.value)} placeholder="Full-Stack Software Engineer" />
      </div>
      <hr className="form-divider" />
      <p className="form-section-title">Contact Info</p>
      <div className="field-grid-2">
        <div className="field">
          <label>Email</label>
          <input type="email" value={pi.email} onChange={e => set('email', e.target.value)} />
        </div>
        <div className="field">
          <label>Phone</label>
          <input type="tel" value={pi.phone} onChange={e => set('phone', e.target.value)} />
        </div>
        <div className="field">
          <label>LinkedIn</label>
          <input type="text" value={pi.linkedin} onChange={e => set('linkedin', e.target.value)} />
        </div>
        <div className="field">
          <label>GitHub</label>
          <input type="text" value={pi.github} onChange={e => set('github', e.target.value)} />
        </div>
        <div className="field">
          <label>Website</label>
          <input type="text" value={pi.website} onChange={e => set('website', e.target.value)} placeholder="portfolio.dev" />
        </div>
        <div className="field">
          <label>Location</label>
          <input type="text" value={pi.location} onChange={e => set('location', e.target.value)} />
        </div>
      </div>
      <hr className="form-divider" />
      <p className="form-section-title">Professional Summary</p>
      <div className="field">
        <textarea
          rows={7}
          value={pi.summary}
          onChange={e => set('summary', e.target.value)}
          placeholder="Briefly describe your experience, key strengths, and what makes you stand out..."
        />
      </div>
      <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: -8 }}>
        💡 Tip: 2–4 sentences highlighting your core expertise and impact.
      </p>
    </div>
  );
}
