import type { ResumeData, SkillCategory } from '../../../types';
import { Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import '../LeftPanel.css';

interface Props { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>>; }

export function SkillsForm({ data, setData }: Props) {
  const update = (id: string, field: keyof SkillCategory, val: any) =>
    setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, [field]: val } : s) }));

  const remove = (id: string) =>
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));

  const toggleVis = (id: string) =>
    setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, visible: !s.visible } : s) }));

  const add = () => {
    const n: SkillCategory = { id: `s-${Date.now()}`, visible: true, category: 'New Category', items: '' };
    setData(prev => ({ ...prev, skills: [...prev.skills, n] }));
  };

  return (
    <div>
      <p className="form-section-title">Technical Skills</p>
      <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 16 }}>
        Enter comma-separated items for each category. They appear as a labeled row on your resume.
      </p>
      <div className="card-list">
        {data.skills.map(skill => (
          <div key={skill.id} className="card" style={{ opacity: skill.visible ? 1 : 0.55 }}>
            <div className="card-body" style={{ borderTop: 'none', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="card-title">{skill.category || 'Category'}</span>
                <div className="card-actions">
                  {!skill.visible && <span className="vis-badge hidden">Hidden</span>}
                  <button className="card-btn" onClick={() => toggleVis(skill.id)}>{skill.visible ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
                  <button className="card-btn danger" onClick={() => remove(skill.id)}><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Category Name</label>
                <input type="text" value={skill.category} onChange={e => update(skill.id, 'category', e.target.value)} placeholder="Languages, Tools, etc." />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Items (comma separated)</label>
                <textarea value={skill.items} onChange={e => update(skill.id, 'items', e.target.value)} rows={2} placeholder="JavaScript, TypeScript, Go..." />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={add}><Plus size={15}/> Add Skill Category</button>
    </div>
  );
}
