import type { ThemeProps } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Slate.css';

export function Slate({ data, styles, setData }: ThemeProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--sl-primary': styles.primaryColor,
    '--sl-accent': styles.accentColor,
    '--sl-font': styles.fontFamily,
  } as React.CSSProperties;

  return (
    <div className="sl-page" style={css}>
      {/* ── SIDEBAR ── */}
      <aside className="sl-sidebar">
        <div className="sl-sidebar-name edit-section">
          <InlineEdit tag="h1" className="sl-name sl-ie-white" value={pi.name.split(' ')[0] || pi.name} onChange={v => ed.updatePersonal('name', v + ' ' + pi.name.split(' ').slice(1).join(' '))} />
          <h1 className="sl-name sl-name-last">{pi.name.split(' ').slice(1).join(' ')}</h1>
          <InlineEdit tag="p" className="sl-headline sl-ie-muted" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} />
        </div>

        <div className="sl-sidebar-section edit-section">
          <h3 className="sl-sidebar-title">Contact</h3>
          {['email','phone','location','linkedin','github','website'].map(f => {
            const val = (pi as any)[f];
            return (
              <p key={f} className="sl-contact-item">
                <span className="sl-ci-label">{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                <InlineEdit tag="span" className="sl-ie-muted" value={val} onChange={v => ed.updatePersonal(f, v)} placeholder={`Add ${f}`} />
              </p>
            );
          })}
        </div>

        {data.skills.filter(s => s.visible).length > 0 && (
          <div className="sl-sidebar-section edit-section">
            <h3 className="sl-sidebar-title">Skills</h3>
            {data.skills.filter(s => s.visible).map(s => (
              <div key={s.id} className="sl-skill edit-block" style={{ position: 'relative' }}>
                <InlineEdit tag="p" className="sl-skill-cat sl-ie-white" value={s.category} onChange={v => ed.updateSkill(s.id, 'category', v)} />
                <InlineEdit tag="p" className="sl-skill-items sl-ie-muted ie block" multiline value={s.items} onChange={v => ed.updateSkill(s.id, 'items', v)} />
                <button className="del-entry-btn sl-del" onClick={() => ed.removeSkill(s.id)} title="Remove">×</button>
              </div>
            ))}
            <button className="section-add-entry sl-add-btn" onClick={ed.addSkill}>+ Add Skill</button>
          </div>
        )}

        {data.education.filter(e => e.visible).length > 0 && (
          <div className="sl-sidebar-section edit-section">
            <h3 className="sl-sidebar-title">Education</h3>
            {data.education.filter(e => e.visible).map(edu => (
              <div key={edu.id} className="sl-edu edit-block" style={{ position: 'relative' }}>
                <InlineEdit tag="p" className="sl-edu-degree sl-ie-white" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} />
                <InlineEdit tag="p" className="sl-edu-inst sl-ie-muted" value={edu.institution} onChange={v => ed.updateEdu(edu.id, 'institution', v)} />
                <InlineEdit tag="p" className="sl-edu-period sl-ie-muted" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} />
                <button className="del-entry-btn sl-del" onClick={() => ed.removeEducation(edu.id)} title="Remove">×</button>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <main className="sl-main">
        <section className="sl-section edit-section">
          <h2 className="sl-section-title">About Me</h2>
          <InlineEdit tag="p" className="sl-body ie block" multiline value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} />
        </section>

        {data.experience.filter(e => e.visible).length > 0 && (
          <section className="sl-section edit-section">
            <h2 className="sl-section-title">Work Experience</h2>
            {data.experience.filter(e => e.visible).map(exp => (
              <div key={exp.id} className="sl-exp edit-block">
                <div className="sl-exp-header">
                  <div>
                    <InlineEdit tag="span" className="sl-company" value={exp.company} onChange={v => ed.updateExp(exp.id, 'company', v)} />
                    {exp.location && <><span className="sl-meta"> · </span><InlineEdit tag="span" className="sl-meta" value={exp.location} onChange={v => ed.updateExp(exp.id, 'location', v)} /></>}
                  </div>
                  <InlineEdit tag="span" className="sl-period" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} />
                </div>
                <InlineEdit tag="p" className="sl-job-title" value={exp.title} onChange={v => ed.updateExp(exp.id, 'title', v)} />
                <BulletList bullets={exp.bullets} className="sl-bullets" liClassName="sl-bullet-li"
                  onUpdate={(bId, t) => ed.updateExpBullet(exp.id, bId, t)}
                  onAdd={() => ed.addExpBullet(exp.id)}
                  onRemove={(bId) => ed.removeExpBullet(exp.id, bId)}
                />
                <button className="del-entry-btn" onClick={() => ed.removeExperience(exp.id)} title="Remove">×</button>
              </div>
            ))}
            <button className="section-add-entry" onClick={ed.addExperience}>+ Add Experience</button>
          </section>
        )}

        {data.projects.filter(p => p.visible).length > 0 && (
          <section className="sl-section edit-section">
            <h2 className="sl-section-title">Projects</h2>
            {data.projects.filter(p => p.visible).map(proj => (
              <div key={proj.id} className="sl-exp edit-block">
                <div className="sl-exp-header">
                  <span>
                    <InlineEdit tag="span" className="sl-company" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} />
                    {proj.subtitle && <><span className="sl-meta"> · </span><InlineEdit tag="span" className="sl-meta" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} /></>}
                  </span>
                </div>
                <BulletList bullets={proj.bullets} className="sl-bullets" liClassName="sl-bullet-li"
                  onUpdate={(bId, t) => ed.updateProjBullet(proj.id, bId, t)}
                  onAdd={() => ed.addProjBullet(proj.id)}
                  onRemove={(bId) => ed.removeProjBullet(proj.id, bId)}
                />
                <button className="del-entry-btn" onClick={() => ed.removeProject(proj.id)} title="Remove">×</button>
              </div>
            ))}
            <button className="section-add-entry" onClick={ed.addProject}>+ Add Project</button>
          </section>
        )}

        {data.responsibilities.filter(r => r.visible).length > 0 && (
          <section className="sl-section edit-section">
            <h2 className="sl-section-title">Responsibilities</h2>
            <ul className="sl-bullets">
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
      </main>
    </div>
  );
}
