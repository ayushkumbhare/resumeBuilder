import type { ThemeProps } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Executive.css';

export function Executive({ data, styles, setData }: ThemeProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--ex-primary': styles.primaryColor,
    '--ex-accent': styles.accentColor,
    '--ex-font': styles.fontFamily,
  } as React.CSSProperties;

  const contacts = [pi.phone, pi.email, pi.linkedin, pi.github, pi.location].filter(Boolean);

  return (
    <div className="ex-page" style={css}>
      <header className="ex-header edit-section">
        <InlineEdit tag="h1" className="ex-name" value={pi.name} onChange={v => ed.updatePersonal('name', v)} />
        <InlineEdit tag="p" className="ex-headline" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} />
        <div className="ex-rule-double" />
        <p className="ex-contacts">{contacts.join('  ·  ')}</p>
        <div className="ex-rule-single" />
      </header>

      <section className="ex-section edit-section">
        <h2 className="ex-section-title"><span>Summary</span></h2>
        <InlineEdit tag="p" className="ex-summary ie block" multiline value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} />
      </section>

      {data.experience.filter(e => e.visible).length > 0 && (
        <section className="ex-section edit-section">
          <h2 className="ex-section-title"><span>Professional Experience</span></h2>
          {data.experience.filter(e => e.visible).map(exp => (
            <div key={exp.id} className="ex-exp edit-block">
              <div className="ex-exp-top">
                <InlineEdit tag="span" className="ex-company" value={exp.company.toUpperCase()} onChange={v => ed.updateExp(exp.id, 'company', v)} />
                <InlineEdit tag="span" className="ex-period" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} />
              </div>
              <InlineEdit tag="p" className="ex-job-title" value={`${exp.title}${exp.location ? ` · ${exp.location}` : ''}`} onChange={v => ed.updateExp(exp.id, 'title', v)} />
              <BulletList bullets={exp.bullets} className="ex-bullets" liClassName="ex-bullet-li"
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
        <section className="ex-section edit-section">
          <h2 className="ex-section-title"><span>Projects</span></h2>
          {data.projects.filter(p => p.visible).map(proj => (
            <div key={proj.id} className="ex-exp edit-block">
              <div className="ex-exp-top">
                <InlineEdit tag="span" className="ex-company" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} />
                {proj.subtitle && <InlineEdit tag="span" className="ex-period" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} />}
              </div>
              <BulletList bullets={proj.bullets} className="ex-bullets" liClassName="ex-bullet-li"
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

      {data.skills.filter(s => s.visible).length > 0 && (
        <section className="ex-section edit-section">
          <h2 className="ex-section-title"><span>Technical Expertise</span></h2>
          {data.skills.filter(s => s.visible).map(s => (
            <div key={s.id} className="ex-skill-row edit-block" style={{ position: 'relative' }}>
              <InlineEdit tag="span" className="ex-skill-key" value={s.category} onChange={v => ed.updateSkill(s.id, 'category', v)} />
              <InlineEdit tag="span" className="ex-skill-val" value={s.items} onChange={v => ed.updateSkill(s.id, 'items', v)} />
              <button className="del-entry-btn" onClick={() => ed.removeSkill(s.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addSkill}>+ Add Skill</button>
        </section>
      )}

      {data.education.filter(e => e.visible).length > 0 && (
        <section className="ex-section edit-section">
          <h2 className="ex-section-title"><span>Education</span></h2>
          {data.education.filter(e => e.visible).map(edu => (
            <div key={edu.id} className="ex-exp edit-block">
              <div className="ex-exp-top">
                <InlineEdit tag="span" className="ex-company" value={edu.institution.toUpperCase()} onChange={v => ed.updateEdu(edu.id, 'institution', v)} />
                <InlineEdit tag="span" className="ex-period" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} />
              </div>
              <InlineEdit tag="p" className="ex-job-title" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} />
              <button className="del-entry-btn" onClick={() => ed.removeEducation(edu.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addEducation}>+ Add Education</button>
        </section>
      )}
    </div>
  );
}
