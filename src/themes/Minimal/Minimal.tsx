import type { ThemeProps } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Minimal.css';

export function Minimal({ data, styles, setData }: ThemeProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--mn-primary': styles.primaryColor,
    '--mn-accent': styles.accentColor,
    '--mn-font': styles.fontFamily,
    '--body-size': `${(styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0)}pt`,
    '--heading-size': `${(styles.headingSize || 12) + (styles.globalFontScale || 0)}pt`,
    '--name-size': `${(styles.nameSize || 22) + (styles.globalFontScale || 0)}pt`,
    lineHeight: styles.lineHeight || 1.4,
    '--section-spacing': `${styles.sectionSpacing ?? 12}px`,
    padding: `${styles.documentMargin || 14}mm 20mm`,
  } as React.CSSProperties;

  return (
    <div className="mn-page" style={css}>
      <header className="mn-header edit-section">
        <InlineEdit tag="h1" className="mn-name" value={pi.name} onChange={v => ed.updatePersonal('name', v)} />
        <InlineEdit tag="p" className="mn-headline" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} />
        <p className="mn-contacts">
          {['email','phone','location','linkedin','github'].map((f, i, arr) => {
            const val = (pi as any)[f];
            if (!val) return null;
            return <span key={f}><InlineEdit tag="span" value={val} onChange={v => ed.updatePersonal(f, v)} />{i < arr.length - 1 && arr.slice(i+1).some(k => (pi as any)[k]) ? <span className="mn-dot"> · </span> : null}</span>;
          })}
        </p>
        <div className="mn-accent-line" />
      </header>

      <section className="mn-section edit-section">
        <InlineEdit tag="p" className="mn-summary ie block" multiline value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} />
      </section>

      {data.experience.filter(e => e.visible).length > 0 && (
        <section className="mn-section edit-section">
          <h2 className="mn-section-title">Experience</h2>
          {data.experience.filter(e => e.visible).map(exp => (
            <div key={exp.id} className="mn-entry edit-block">
              <div className="mn-entry-header">
                <div>
                  <InlineEdit tag="span" className="mn-entry-title" value={exp.title} onChange={v => ed.updateExp(exp.id, 'title', v)} />
                  <span className="mn-sep"> — </span>
                  <InlineEdit tag="span" className="mn-entry-org" value={exp.company} onChange={v => ed.updateExp(exp.id, 'company', v)} />
                  {exp.location && <span className="mn-meta">, {exp.location}</span>}
                </div>
                <InlineEdit tag="span" className="mn-date" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} />
              </div>
              <BulletList bullets={exp.bullets} className="mn-bullets" liClassName="mn-bullet-li"
                onUpdate={(bId, t) => ed.updateExpBullet(exp.id, bId, t)}
                onAdd={() => ed.addExpBullet(exp.id)}
                onRemove={(bId) => ed.removeExpBullet(exp.id, bId)}
                onToggleSubheading={(bId) => ed.toggleExpBulletSubheading(exp.id, bId)}
              />
              <button className="del-entry-btn" onClick={() => ed.removeExperience(exp.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addExperience}>+ Add Experience</button>
        </section>
      )}

      {data.projects.filter(p => p.visible).length > 0 && (
        <section className="mn-section edit-section">
          <h2 className="mn-section-title">Projects</h2>
          {data.projects.filter(p => p.visible).map(proj => (
            <div key={proj.id} className="mn-entry edit-block">
              <div className="mn-entry-header">
                <div>
                  <InlineEdit tag="span" className="mn-entry-title" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} />
                  {proj.subtitle && <><span className="mn-sep"> — </span><InlineEdit tag="span" className="mn-meta" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} /></>}
                </div>
              </div>
              <BulletList bullets={proj.bullets} className="mn-bullets" liClassName="mn-bullet-li"
                onUpdate={(bId, t) => ed.updateProjBullet(proj.id, bId, t)}
                onAdd={() => ed.addProjBullet(proj.id)}
                onRemove={(bId) => ed.removeProjBullet(proj.id, bId)}
                onToggleSubheading={(bId) => ed.toggleProjBulletSubheading(proj.id, bId)}
              />
              <button className="del-entry-btn" onClick={() => ed.removeProject(proj.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addProject}>+ Add Project</button>
        </section>
      )}

      {data.skills.filter(s => s.visible).length > 0 && (
        <section className="mn-section edit-section">
          <h2 className="mn-section-title">Skills</h2>
          {data.skills.filter(s => s.visible).map(s => (
            <div key={s.id} className="mn-skill-line edit-block" style={{ position: 'relative' }}>
              <InlineEdit tag="span" className="mn-skill-cat" value={s.category} onChange={v => ed.updateSkill(s.id, 'category', v)} />
              <span className="mn-skill-colon">: </span>
              <InlineEdit tag="span" className="mn-skill-items" value={s.items} onChange={v => ed.updateSkill(s.id, 'items', v)} />
              <button className="del-entry-btn" onClick={() => ed.removeSkill(s.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addSkill}>+ Add Skill</button>
        </section>
      )}

      {data.education.filter(e => e.visible).length > 0 && (
        <section className="mn-section edit-section">
          <h2 className="mn-section-title">Education</h2>
          {data.education.filter(e => e.visible).map(edu => (
            <div key={edu.id} className="mn-entry edit-block">
              <div className="mn-entry-header">
                <div>
                  <InlineEdit tag="span" className="mn-entry-title" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} />
                  <span className="mn-sep"> — </span>
                  <InlineEdit tag="span" className="mn-entry-org" value={edu.institution} onChange={v => ed.updateEdu(edu.id, 'institution', v)} />
                </div>
                <InlineEdit tag="span" className="mn-date" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} />
              </div>
              <button className="del-entry-btn" onClick={() => ed.removeEducation(edu.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addEducation}>+ Add Education</button>
        </section>
      )}

      {data.responsibilities.filter(r => r.visible).length > 0 && (
        <section className="mn-section edit-section">
          <h2 className="mn-section-title">Positions of Responsibility</h2>
          <ul className="mn-bullets">
            {data.responsibilities.filter(r => r.visible).map(r => (
              <li key={r.id} className="edit-block" style={{ position: 'relative' }}>
                <InlineEdit tag="span" className="ie block" multiline value={r.text} onChange={v => ed.updateResp(r.id, v)} />
                <button className="del-entry-btn" onClick={() => ed.removeResp(r.id)} title="Remove">×</button>
              </li>
            ))}
          </ul>
          <button className="section-add-entry" onClick={ed.addResp}>+ Add Entry</button>
        </section>
      )}
    </div>
  );
}
