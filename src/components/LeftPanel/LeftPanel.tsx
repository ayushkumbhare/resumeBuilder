import type React from 'react';
import { useState } from 'react';
import type { ResumeData, StyleOptions } from '../../types';
import { Eye, EyeOff, Palette, Layers, Info, Code } from 'lucide-react';
import { JsonEditor } from './JsonEditor';
import './LeftPanel.css';

interface LeftPanelProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  styles: StyleOptions;
  setStyles: React.Dispatch<React.SetStateAction<StyleOptions>>;
}

const SECTIONS = [
  { key: 'personalInfo', label: 'Profile & Header', icon: '👤', alwaysOn: true },
  { key: 'experience',   label: 'Work Experience',  icon: '💼' },
  { key: 'projects',     label: 'Projects',          icon: '💡' },
  { key: 'skills',       label: 'Skills',            icon: '🛠' },
  { key: 'education',    label: 'Education',         icon: '🎓' },
  { key: 'responsibilities', label: 'Leadership',    icon: '🏆' },
];

const FONT_OPTIONS = [
  { label: 'Inter (Sans-Serif)', value: 'Inter, Arial, sans-serif' },
  { label: 'Merriweather (Serif)', value: 'Merriweather, Georgia, serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Georgia (Elegant)', value: 'Georgia, serif' },
  { label: 'Calibri-style', value: '"Segoe UI", Calibri, sans-serif' },
];

export function LeftPanel({ data, setData, styles, setStyles }: LeftPanelProps) {
  const [tab, setTab] = useState<'sections' | 'design' | 'json'>('sections');

  const getSectionCount = (key: string): number => {
    const arr = (data as any)[key];
    if (!Array.isArray(arr)) return -1;
    return arr.filter((i: any) => i.visible).length;
  };

  const toggleSection = (key: string) => {
    const arr = (data as any)[key];
    if (!Array.isArray(arr)) return;
    const allVisible = arr.every((i: any) => i.visible);
    setData(prev => ({
      ...prev,
      [key]: arr.map((i: any) => ({ ...i, visible: !allVisible })),
    }));
  };

  const isSectionVisible = (key: string): boolean => {
    const arr = (data as any)[key];
    if (!Array.isArray(arr)) return true;
    return arr.some((i: any) => i.visible);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ data, styles }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${data.internalName}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const obj = JSON.parse(ev.target?.result as string);
        if (obj.data) setData(obj.data);
        if (obj.styles) setStyles(obj.styles);
      } catch { alert('Invalid file'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <aside className={`left-panel no-print ${tab === 'json' ? 'wide-panel' : ''}`}>
      {/* Tab nav */}
      <nav className="lp-tabs">
        <button className={`lp-tab ${tab === 'sections' ? 'active' : ''}`} onClick={() => setTab('sections')}>
          <Layers size={15} /><span>Sections</span>
        </button>
        <button className={`lp-tab ${tab === 'design' ? 'active' : ''}`} onClick={() => setTab('design')}>
          <Palette size={15} /><span>Design</span>
        </button>
        <button className={`lp-tab ${tab === 'json' ? 'active' : ''}`} onClick={() => setTab('json')}>
          <Code size={15} /><span>JSON</span>
        </button>
      </nav>

      <div className={`lp-body ${tab === 'json' ? 'no-padding' : ''}`}>
        {tab === 'sections' && (
          <div>
            {/* Editing tip */}
            <div className="lp-tip">
              <Info size={13} className="lp-tip-icon" />
              <p>Click directly on any text in the resume to edit it in place.</p>
            </div>

            <p className="lp-label">Manage Sections</p>
            <div className="lp-section-list">
              {SECTIONS.map(sec => {
                const visible = sec.alwaysOn || isSectionVisible(sec.key);
                const count = getSectionCount(sec.key);
                return (
                  <div key={sec.key} className={`lp-section-item ${!visible && !sec.alwaysOn ? 'hidden-sec' : ''}`}>
                    <span className="lp-sec-icon">{sec.icon}</span>
                    <div className="lp-sec-meta">
                      <span className="lp-sec-label">{sec.label}</span>
                      {count >= 0 && <span className="lp-sec-count">{count} item{count !== 1 ? 's' : ''}</span>}
                    </div>
                    {!sec.alwaysOn && (
                      <button
                        className="lp-vis-btn"
                        onClick={() => toggleSection(sec.key)}
                        title={visible ? 'Hide section' : 'Show section'}
                      >
                        {visible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'design' && (
          <div>
            <p className="lp-label">Colors</p>
            <div className="lp-color-grid">
              <label className="lp-color-item">
                <span className="lp-color-label">Primary</span>
                <div className="lp-color-row">
                  <input type="color" value={styles.primaryColor} onChange={e => setStyles(s => ({ ...s, primaryColor: e.target.value }))} />
                  <span className="lp-color-hex">{styles.primaryColor}</span>
                </div>
              </label>
              <label className="lp-color-item">
                <span className="lp-color-label">Accent</span>
                <div className="lp-color-row">
                  <input type="color" value={styles.accentColor} onChange={e => setStyles(s => ({ ...s, accentColor: e.target.value }))} />
                  <span className="lp-color-hex">{styles.accentColor}</span>
                </div>
              </label>
            </div>

            <div className="lp-divider" />
            <p className="lp-label">Font Family</p>
            <div className="lp-font-list">
              {FONT_OPTIONS.map(f => (
                <button
                  key={f.value}
                  className={`lp-font-btn ${styles.fontFamily === f.value ? 'active' : ''}`}
                  style={{ fontFamily: f.value }}
                  onClick={() => setStyles(s => ({ ...s, fontFamily: f.value }))}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="lp-divider" />
            <p className="lp-label">Resume Name</p>
            <input
              type="text"
              className="lp-text-input"
              value={data.internalName}
              onChange={e => setData(d => ({ ...d, internalName: e.target.value }))}
              placeholder="My Resume"
            />
          </div>
        )}

        {tab === 'json' && (
          <JsonEditor data={data} setData={setData} />
        )}
      </div>

      <div className="lp-footer">
        <button className="lp-footer-btn" onClick={handleExport}>Save JSON</button>
        <label className="lp-footer-btn">
          Load JSON
          <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
        </label>
      </div>
    </aside>
  );
}
