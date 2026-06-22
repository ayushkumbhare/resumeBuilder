import type { ThemeProps } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Classic.css';

export function Classic({ data, styles, setData }: ThemeProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--cl-primary': styles.primaryColor,
    '--cl-accent': styles.accentColor,
    '--cl-font': styles.fontFamily,
  } as React.CSSProperties;



  return (
    <div className="cl-page" style={css}>
      {/* HEADER */}
      <header className="cl-header edit-section">
        <InlineEdit tag="h1" className="cl-name" value={pi.name} onChange={v => ed.updatePersonal('name', v)} placeholder="Your Name" />
        <InlineEdit tag="div" className="cl-headline" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} placeholder="Professional Headline" />
        <p className="cl-contacts">
          {['phone','email','linkedin','github','website','location'].map((f, i, arr) => {
            const val = (pi as any)[f];
            if (!val) return null;
            return (
              <span key={f}>
                <InlineEdit tag="span" value={val} onChange={v => ed.updatePersonal(f, v)} placeholder={f} />
                {i < arr.length - 1 && arr.slice(i+1).some(k => (pi as any)[k]) && <span className="cl-dot"> · </span>}
              </span>
            );
          })}
        </p>
      </header>

      {/* SUMMARY */}
      <section className="cl-section edit-section">
        <h2 className="cl-section-title">Professional Summary</h2>
        <InlineEdit tag="p" className="cl-body ie block" multiline value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} placeholder="Write your professional summary here..." />
      </section>

      {/* SKILLS */}
      {data.skills.filter(s => s.visible).length > 0 && (
        <section className="cl-section edit-section">
          <h2 className="cl-section-title">Technical Skills</h2>
          {data.skills.filter(s => s.visible).map(s => (
            <div key={s.id} className="cl-skill-row edit-block" style={{ position: 'relative' }}>
              <InlineEdit tag="span" className="cl-skill-key" value={s.category} onChange={v => ed.updateSkill(s.id, 'category', v)} placeholder="Category" />
              <span className="cl-skill-colon">: </span>
              <InlineEdit tag="span" className="cl-skill-val" value={s.items} onChange={v => ed.updateSkill(s.id, 'items', v)} placeholder="Skill 1, Skill 2, ..." />
              <button className="del-entry-btn" onClick={() => ed.removeSkill(s.id)} title="Remove row">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addSkill}>+ Add Skill Category</button>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience.filter(e => e.visible).length > 0 && (
        <section className="cl-section edit-section">
          <h2 className="cl-section-title">Work Experience</h2>
          {data.experience.filter(e => e.visible).map(exp => (
            <div key={exp.id} className="cl-exp edit-block">
              <div className="cl-exp-header">
                <div>
                  <InlineEdit tag="span" className="cl-company" value={exp.company} onChange={v => ed.updateExp(exp.id, 'company', v)} />
                  {exp.location && <><span className="cl-meta"> — </span><InlineEdit tag="span" className="cl-meta" value={exp.location} onChange={v => ed.updateExp(exp.id, 'location', v)} /></>}
                </div>
                <InlineEdit tag="span" className="cl-period" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} />
              </div>
              <InlineEdit tag="p" className="cl-job-title" value={exp.title} onChange={v => ed.updateExp(exp.id, 'title', v)} />
              <BulletList
                bullets={exp.bullets}
                className="cl-bullets ie-styled"
                liClassName="cl-bullet-li"
                onUpdate={(bId, text) => ed.updateExpBullet(exp.id, bId, text)}
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

      {/* PROJECTS */}
      {data.projects.filter(p => p.visible).length > 0 && (
        <section className="cl-section edit-section">
          <h2 className="cl-section-title">Personal Projects</h2>
          {data.projects.filter(p => p.visible).map(proj => (
            <div key={proj.id} className="cl-exp edit-block">
              <div className="cl-exp-header">
                <span>
                  <InlineEdit tag="span" className="cl-company" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} />
                  {proj.subtitle && <><span className="cl-meta"> — </span><InlineEdit tag="span" className="cl-meta" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} /></>}
                </span>
              </div>
              <BulletList
                bullets={proj.bullets}
                className="cl-bullets ie-styled"
                liClassName="cl-bullet-li"
                onUpdate={(bId, text) => ed.updateProjBullet(proj.id, bId, text)}
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

      {/* EDUCATION */}
      {data.education.filter(e => e.visible).length > 0 && (
        <section className="cl-section edit-section">
          <h2 className="cl-section-title">Education</h2>
          {data.education.filter(e => e.visible).map(edu => (
            <div key={edu.id} className="cl-exp edit-block">
              <div className="cl-exp-header">
                <InlineEdit tag="span" className="cl-company" value={edu.institution} onChange={v => ed.updateEdu(edu.id, 'institution', v)} />
                <InlineEdit tag="span" className="cl-period" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} />
              </div>
              <InlineEdit tag="p" className="cl-job-title" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} />
              <button className="del-entry-btn" onClick={() => ed.removeEducation(edu.id)} title="Remove">×</button>
            </div>
          ))}
          <button className="section-add-entry" onClick={ed.addEducation}>+ Add Education</button>
        </section>
      )}

      {/* RESPONSIBILITIES */}
      {data.responsibilities.filter(r => r.visible).length > 0 && (
        <section className="cl-section edit-section">
          <h2 className="cl-section-title">Positions of Responsibility</h2>
          <ul className="cl-bullets">
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
