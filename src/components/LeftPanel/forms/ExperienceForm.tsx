import { useState } from 'react';
import type { ResumeData, ExperienceItem, BulletItem } from '../../../types';
import { ChevronDown, ChevronRight, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import '../LeftPanel.css';

interface Props { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>>; }

export function ExperienceForm({ data, setData }: Props) {
  const [open, setOpen] = useState<string | null>(data.experience[0]?.id ?? null);

  const update = (id: string, field: keyof ExperienceItem, val: any) =>
    setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: val } : e) }));

  const remove = (id: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  const toggleVis = (id: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, visible: !e.visible } : e) }));

  const addExp = () => {
    const newItem: ExperienceItem = {
      id: `e-${Date.now()}`, visible: true, company: 'Company Name', location: '', title: 'Your Role', period: 'Month YYYY – Present', bullets: [],
    };
    setData(prev => ({ ...prev, experience: [...prev.experience, newItem] }));
    setOpen(newItem.id);
  };

  const addBullet = (expId: string) => {
    const newB: BulletItem = { id: `b-${Date.now()}`, text: '', visible: true };
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId ? { ...e, bullets: [...e.bullets, newB] } : e),
    }));
  };

  const updateBullet = (expId: string, bId: string, text: string) =>
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId
        ? { ...e, bullets: e.bullets.map(b => b.id === bId ? { ...b, text } : b) }
        : e),
    }));

  const removeBullet = (expId: string, bId: string) =>
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId
        ? { ...e, bullets: e.bullets.filter(b => b.id !== bId) }
        : e),
    }));

  return (
    <div>
      <p className="form-section-title">Work Experience</p>
      <div className="card-list">
        {data.experience.map(exp => (
          <div key={exp.id} className="card" style={{ opacity: exp.visible ? 1 : 0.55 }}>
            <div className="card-header" onClick={() => setOpen(open === exp.id ? null : exp.id)}>
              <div className="card-meta">
                <div className="card-title">{exp.company || 'Untitled Company'}</div>
                <div className="card-subtitle">{exp.title}{exp.period ? ` · ${exp.period}` : ''}</div>
              </div>
              <div className="card-actions" onClick={e => e.stopPropagation()}>
                {!exp.visible && <span className="vis-badge hidden">Hidden</span>}
                <button className="card-btn" onClick={() => toggleVis(exp.id)} title="Toggle visibility">
                  {exp.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button className="card-btn danger" onClick={() => remove(exp.id)} title="Delete"><Trash2 size={14} /></button>
              </div>
              {open === exp.id ? <ChevronDown size={16} style={{ color: '#94a3b8', flexShrink: 0 }} /> : <ChevronRight size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />}
            </div>

            {open === exp.id && (
              <div className="card-body">
                <div className="field">
                  <label>Company</label>
                  <input type="text" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} />
                </div>
                <div className="field-grid-2">
                  <div className="field">
                    <label>Job Title</label>
                    <input type="text" value={exp.title} onChange={e => update(exp.id, 'title', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Location</label>
                    <input type="text" value={exp.location} onChange={e => update(exp.id, 'location', e.target.value)} />
                  </div>
                </div>
                <div className="field">
                  <label>Period</label>
                  <input type="text" value={exp.period} onChange={e => update(exp.id, 'period', e.target.value)} placeholder="Jan 2023 – Present" />
                </div>
                <div className="bullet-list-editor">
                  <div className="section-label">Bullet Points</div>
                  {exp.bullets.map(b => (
                    <div key={b.id} className="bullet-item">
                      <textarea value={b.text} onChange={e => updateBullet(exp.id, b.id, e.target.value)} placeholder="Describe your achievement..." />
                      <button className="bullet-item-btn" onClick={() => removeBullet(exp.id, b.id)}><Trash2 size={13} /></button>
                    </div>
                  ))}
                  <button className="add-btn" style={{ marginTop: 6 }} onClick={() => addBullet(exp.id)}>
                    <Plus size={14} /> Add Bullet
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addExp}><Plus size={15} /> Add Experience</button>
    </div>
  );
}
