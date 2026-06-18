import type { ResumeData, EducationItem } from '../../../types';
import { Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import '../LeftPanel.css';

interface Props { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>>; }

export function EducationForm({ data, setData }: Props) {
  const update = (id: string, field: keyof EducationItem, val: any) =>
    setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: val } : e) }));

  const remove = (id: string) =>
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  const toggleVis = (id: string) =>
    setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, visible: !e.visible } : e) }));

  const add = () => {
    const n: EducationItem = { id: `edu-${Date.now()}`, visible: true, institution: 'University Name', degree: 'Bachelor of Technology', period: '2020 – 2024', gpa: '' };
    setData(prev => ({ ...prev, education: [...prev.education, n] }));
  };

  return (
    <div>
      <p className="form-section-title">Education</p>
      <div className="card-list">
        {data.education.map(edu => (
          <div key={edu.id} className="card" style={{ opacity: edu.visible ? 1 : 0.55 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', gap: 8, borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div className="card-meta" style={{ flex: 1 }}>
                <div className="card-title">{edu.institution || 'Institution'}</div>
                <div className="card-subtitle">{edu.degree}{edu.period ? ` · ${edu.period}` : ''}</div>
              </div>
              <div className="card-actions">
                <button className="card-btn" onClick={() => toggleVis(edu.id)}>{edu.visible ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
                <button className="card-btn danger" onClick={() => remove(edu.id)}><Trash2 size={14}/></button>
              </div>
            </div>
            <div className="card-body">
              <div className="field"><label>Institution</label><input type="text" value={edu.institution} onChange={e => update(edu.id, 'institution', e.target.value)} /></div>
              <div className="field"><label>Degree / Certificate</label><input type="text" value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} /></div>
              <div className="field-grid-2">
                <div className="field"><label>Period</label><input type="text" value={edu.period} onChange={e => update(edu.id, 'period', e.target.value)} placeholder="2020 – 2024" /></div>
                <div className="field"><label>GPA (optional)</label><input type="text" value={edu.gpa} onChange={e => update(edu.id, 'gpa', e.target.value)} placeholder="9.1 / 10" /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={add}><Plus size={15}/> Add Education</button>
    </div>
  );
}
