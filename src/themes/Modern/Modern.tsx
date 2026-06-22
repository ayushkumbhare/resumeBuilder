import type { ThemeProps } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Modern.css';

export function Modern({ data, styles, setData }: ThemeProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--mo-primary': styles.primaryColor,
    '--mo-accent': styles.accentColor,
    '--mo-font': styles.fontFamily,
  } as React.CSSProperties;

  return (
    <div className="mo-page" style={css}>
      <header className="mo-header edit-section">
        <div className="mo-header-left">
          <InlineEdit tag="h1" className="mo-name mo-ie-white" value={pi.name} onChange={v => ed.updatePersonal('name', v)} />
          <InlineEdit tag="p" className="mo-headline mo-ie-muted" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} />
        </div>
        <div className="mo-header-right">
          {['email','phone','location','linkedin','github'].map(f => (
            <InlineEdit key={f} tag="p" className="mo-contact mo-ie-muted" value={(pi as any)[f]} onChange={v => ed.updatePersonal(f, v)} placeholder={f} />
          ))}
        </div>
      </header>

      <div className="mo-body">
        <div className="mo-left">
          {data.skills.filter(s => s.visible).length > 0 && (
            <section className="mo-section edit-section">
              <h2 className="mo-section-title">Skills</h2>
              {data.skills.filter(s => s.visible).map(s => (
                <div key={s.id} className="mo-skill edit-block" style={{ position: 'relative' }}>
                  <InlineEdit tag="p" className="mo-skill-cat" value={s.category} onChange={v => ed.updateSkill(s.id, 'category', v)} />
                  <InlineEdit tag="p" className="mo-skill-items ie block" multiline value={s.items} onChange={v => ed.updateSkill(s.id, 'items', v)} />
                  <button className="del-entry-btn" onClick={() => ed.removeSkill(s.id)} title="Remove">×</button>
                </div>
              ))}
              <button className="section-add-entry" onClick={ed.addSkill}>+ Add</button>
            </section>
          )}

          {data.education.filter(e => e.visible).length > 0 && (
            <section className="mo-section edit-section">
              <h2 className="mo-section-title">Education</h2>
              {data.education.filter(e => e.visible).map(edu => (
                <div key={edu.id} className="mo-edu edit-block" style={{ position: 'relative' }}>
                  <InlineEdit tag="p" className="mo-edu-inst" value={edu.institution} onChange={v => ed.updateEdu(edu.id, 'institution', v)} />
                  <InlineEdit tag="p" className="mo-edu-deg" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} />
                  <InlineEdit tag="p" className="mo-edu-period" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} />
                  <button className="del-entry-btn" onClick={() => ed.removeEducation(edu.id)} title="Remove">×</button>
                </div>
              ))}
              <button className="section-add-entry" onClick={ed.addEducation}>+ Add</button>
            </section>
          )}
        </div>

        <div className="mo-right">
          <section className="mo-section edit-section">
            <h2 className="mo-section-title">Summary</h2>
            <InlineEdit tag="p" className="mo-body-text ie block" multiline value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} />
          </section>

          {data.experience.filter(e => e.visible).length > 0 && (
            <section className="mo-section edit-section">
              <h2 className="mo-section-title">Experience</h2>
              {data.experience.filter(e => e.visible).map(exp => (
                <div key={exp.id} className="mo-exp edit-block">
                  <div className="mo-exp-row">
                    <span>
                      <InlineEdit tag="span" className="mo-company" value={exp.company} onChange={v => ed.updateExp(exp.id, 'company', v)} />
                      {exp.location && <span className="mo-period"> · {exp.location}</span>}
                    </span>
                    <InlineEdit tag="span" className="mo-period" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} />
                  </div>
                  <InlineEdit tag="p" className="mo-job-title" value={exp.title} onChange={v => ed.updateExp(exp.id, 'title', v)} />
                  <BulletList bullets={exp.bullets} className="mo-bullets" liClassName="mo-bullet-li"
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
            <section className="mo-section edit-section">
              <h2 className="mo-section-title">Projects</h2>
              {data.projects.filter(p => p.visible).map(proj => (
                <div key={proj.id} className="mo-exp edit-block">
                  <div className="mo-exp-row">
                    <InlineEdit tag="span" className="mo-company" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} />
                    {proj.subtitle && <InlineEdit tag="span" className="mo-period" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} />}
                  </div>
                  <BulletList bullets={proj.bullets} className="mo-bullets" liClassName="mo-bullet-li"
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
        </div>
      </div>
    </div>
  );
}
