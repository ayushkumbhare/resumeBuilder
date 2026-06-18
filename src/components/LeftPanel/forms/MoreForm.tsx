import type { ResumeData, ResponsibilityItem } from '../../../types';
import { Trash2, Plus } from 'lucide-react';
import '../LeftPanel.css';

interface Props { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>>; }

export function MoreForm({ data, setData }: Props) {
  const update = (id: string, text: string) =>
    setData(prev => ({ ...prev, responsibilities: prev.responsibilities.map(r => r.id === id ? { ...r, text } : r) }));

  const remove = (id: string) =>
    setData(prev => ({ ...prev, responsibilities: prev.responsibilities.filter(r => r.id !== id) }));

  const add = () => {
    const n: ResponsibilityItem = { id: `r-${Date.now()}`, visible: true, text: '' };
    setData(prev => ({ ...prev, responsibilities: [...prev.responsibilities, n] }));
  };

  return (
    <div>
      <p className="form-section-title">Positions of Responsibility</p>
      <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 16 }}>
        Add leadership roles, committee memberships, awards, or volunteer activities.
      </p>
      <div className="bullet-list-editor">
        {data.responsibilities.map(r => (
          <div key={r.id} className="bullet-item">
            <textarea
              value={r.text}
              onChange={e => update(r.id, e.target.value)}
              placeholder="Event Manager, AXIS'24 — Led a team of 12 in organizing..."
              rows={2}
            />
            <button className="bullet-item-btn" onClick={() => remove(r.id)}><Trash2 size={13}/></button>
          </div>
        ))}
        <button className="add-btn" onClick={add}><Plus size={14}/> Add Entry</button>
      </div>
    </div>
  );
}
