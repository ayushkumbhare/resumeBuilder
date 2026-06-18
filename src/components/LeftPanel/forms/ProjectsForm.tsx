import { useState } from 'react';
import type { ResumeData, ProjectItem, BulletItem } from '../../../types';
import { ChevronDown, ChevronRight, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import '../LeftPanel.css';

interface Props { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>>; }

export function ProjectsForm({ data, setData }: Props) {
  const [open, setOpen] = useState<string | null>(data.projects[0]?.id ?? null);

  const update = (id: string, field: keyof ProjectItem, val: any) =>
    setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, [field]: val } : p) }));

  const remove = (id: string) =>
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

  const toggleVis = (id: string) =>
    setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, visible: !p.visible } : p) }));

  const addProject = () => {
    const n: ProjectItem = { id: `p-${Date.now()}`, visible: true, title: 'Project Name', subtitle: '', link: '', bullets: [] };
    setData(prev => ({ ...prev, projects: [...prev.projects, n] }));
    setOpen(n.id);
  };

  const addBullet = (pid: string) => {
    const nb: BulletItem = { id: `b-${Date.now()}`, text: '', visible: true };
    setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === pid ? { ...p, bullets: [...p.bullets, nb] } : p) }));
  };

  const updateBullet = (pid: string, bId: string, text: string) =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === pid ? { ...p, bullets: p.bullets.map(b => b.id === bId ? { ...b, text } : b) } : p),
    }));

  const removeBullet = (pid: string, bId: string) =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === pid ? { ...p, bullets: p.bullets.filter(b => b.id !== bId) } : p),
    }));

  return (
    <div>
      <p className="form-section-title">Personal Projects</p>
      <div className="card-list">
        {data.projects.map(proj => (
          <div key={proj.id} className="card" style={{ opacity: proj.visible ? 1 : 0.55 }}>
            <div className="card-header" onClick={() => setOpen(open === proj.id ? null : proj.id)}>
              <div className="card-meta">
                <div className="card-title">{proj.title || 'Untitled Project'}</div>
                <div className="card-subtitle">{proj.subtitle || 'Add technologies...'}</div>
              </div>
              <div className="card-actions" onClick={e => e.stopPropagation()}>
                {!proj.visible && <span className="vis-badge hidden">Hidden</span>}
                <button className="card-btn" onClick={() => toggleVis(proj.id)}>{proj.visible ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
                <button className="card-btn danger" onClick={() => remove(proj.id)}><Trash2 size={14}/></button>
              </div>
              {open === proj.id ? <ChevronDown size={16} style={{ color: '#94a3b8', flexShrink: 0 }} /> : <ChevronRight size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />}
            </div>
            {open === proj.id && (
              <div className="card-body">
                <div className="field"><label>Project Title</label><input type="text" value={proj.title} onChange={e => update(proj.id, 'title', e.target.value)} /></div>
                <div className="field"><label>Technologies / Subtitle</label><input type="text" value={proj.subtitle} onChange={e => update(proj.id, 'subtitle', e.target.value)} placeholder="React, Node.js, MongoDB" /></div>
                <div className="field"><label>Link (optional)</label><input type="url" value={proj.link} onChange={e => update(proj.id, 'link', e.target.value)} placeholder="https://github.com/..." /></div>
                <div className="bullet-list-editor">
                  <div className="section-label">Bullet Points</div>
                  {proj.bullets.map(b => (
                    <div key={b.id} className="bullet-item">
                      <textarea value={b.text} onChange={e => updateBullet(proj.id, b.id, e.target.value)} placeholder="Describe what you built and its impact..." />
                      <button className="bullet-item-btn" onClick={() => removeBullet(proj.id, b.id)}><Trash2 size={13}/></button>
                    </div>
                  ))}
                  <button className="add-btn" style={{ marginTop: 6 }} onClick={() => addBullet(proj.id)}><Plus size={14}/> Add Bullet</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addProject}><Plus size={15}/> Add Project</button>
    </div>
  );
}
