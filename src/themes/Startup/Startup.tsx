import type { ResumeData, StyleOptions } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Startup.css';

interface StartupProps {
  data: ResumeData;
  styles: StyleOptions;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function Startup({ data, styles, setData }: StartupProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--st-primary': styles.primaryColor,
    '--st-accent': styles.accentColor,
    '--st-font': styles.fontFamily,
    '--body-size': `${(styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0)}pt`,
    '--heading-size': `${(styles.headingSize || 12) + (styles.globalFontScale || 0)}pt`,
    '--name-size': `${(styles.nameSize || 22) + (styles.globalFontScale || 0)}pt`,
    lineHeight: styles.lineHeight || 1.5,
    '--section-spacing': `${styles.sectionSpacing ?? 12}px`,
    padding: `${styles.documentMargin || 14}mm 20mm`,
  } as React.CSSProperties;

  return (
    <div className="st-page" style={css}>
      <aside className="st-sidebar">
        <div className="st-sidebar-header edit-section">
          <InlineEdit tag="h1" className="st-name" value={pi.name} onChange={v => ed.updatePersonal('name', v)} placeholder="Your Name" />
          <InlineEdit tag="p" className="st-headline" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} placeholder="Professional Headline" />
        </div>

        <div className="st-sidebar-content edit-section">
          <h2 className="st-sidebar-title">Contact</h2>
          <div className="st-contacts">
            {['phone','email','linkedin','github','website','location'].map(f => {
              const val = (pi as any)[f];
              if (!val) return null;
              return (
                <div key={f} className="st-contact-item">
                  <span className="st-ci-label">{f}</span>
                  <InlineEdit tag="span" value={val} onChange={v => ed.updatePersonal(f, v)} placeholder={f} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="st-sidebar-content edit-section">
          <h2 className="st-sidebar-title">Education</h2>
          {data.education.filter(e => e.visible).map(edu => (
            <div key={edu.id} className="st-edu edit-block">
              <button className="del-entry-btn no-print" onClick={() => ed.removeEducation(edu.id)}>×</button>
              <h3 className="st-edu-degree">
                <InlineEdit tag="span" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} placeholder="Degree" />
              </h3>
              <p className="st-edu-inst">
                <InlineEdit tag="span" value={edu.institution} onChange={v => ed.updateEdu(edu.id, 'institution', v)} placeholder="University" />
              </p>
              <p className="st-edu-period">
                <InlineEdit tag="span" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} placeholder="Period" />
              </p>
            </div>
          ))}
          <button className="section-add-entry no-print" onClick={() => ed.addEducation()}>+ Add Education</button>
        </div>

        <div className="st-sidebar-content edit-section">
          <h2 className="st-sidebar-title">Skills</h2>
          {data.skills.filter(s => s.visible).map(skill => (
            <div key={skill.id} className="st-skill edit-block">
              <button className="del-entry-btn no-print" onClick={() => ed.removeSkill(skill.id)}>×</button>
              <div className="st-skill-cat">
                <InlineEdit tag="span" value={skill.category} onChange={v => ed.updateSkill(skill.id, 'category', v)} placeholder="Category" />
              </div>
              <div className="st-skill-pills">
                <InlineEdit tag="div" multiline value={skill.items} onChange={v => ed.updateSkill(skill.id, 'items', v)} placeholder="Comma separated skills" className="st-pills-edit" />
              </div>
            </div>
          ))}
          <button className="section-add-entry no-print" onClick={() => ed.addSkill()}>+ Add Skills</button>
        </div>
      </aside>

      <main className="st-main">
        {pi.summary && (
          <section className="st-section edit-section">
            <h2 className="st-section-title">Summary</h2>
            <InlineEdit tag="p" multiline className="st-body" value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} placeholder="Executive Summary" />
          </section>
        )}

        <section className="st-section edit-section">
          <h2 className="st-section-title">Experience</h2>
          {data.experience.filter(e => e.visible).map(exp => (
            <div key={exp.id} className="st-exp edit-block">
              <button className="del-entry-btn no-print" onClick={() => ed.removeExperience(exp.id)}>×</button>
              <div className="st-exp-header">
                <div>
                  <h3 className="st-company">
                    <InlineEdit tag="span" value={exp.company} onChange={v => ed.updateExp(exp.id, 'company', v)} placeholder="Company" />
                  </h3>
                  <div className="st-job-title">
                    <InlineEdit tag="span" value={exp.title} onChange={v => ed.updateExp(exp.id, 'title', v)} placeholder="Title" />
                  </div>
                </div>
                <div className="st-exp-meta">
                  <InlineEdit tag="span" value={exp.location} onChange={v => ed.updateExp(exp.id, 'location', v)} placeholder="Location" />
                  {' | '}
                  <InlineEdit tag="span" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} placeholder="Period" />
                </div>
              </div>
              <BulletList bullets={exp.bullets} className="st-bullets" liClassName="st-bullet-li"
                onUpdate={(bId, t) => ed.updateExpBullet(exp.id, bId, t)}
                onAdd={() => ed.addExpBullet(exp.id)}
                onRemove={(bId) => ed.removeExpBullet(exp.id, bId)}
                onToggleSubheading={(bId) => ed.toggleExpBulletSubheading(exp.id, bId)}
              />
            </div>
          ))}
          <button className="section-add-entry no-print" onClick={() => ed.addExperience()}>+ Add Experience</button>
        </section>

        {data.projects.some(p => p.visible) && (
          <section className="st-section edit-section">
            <h2 className="st-section-title">Projects</h2>
            {data.projects.filter(p => p.visible).map(proj => (
              <div key={proj.id} className="st-exp edit-block">
                <button className="del-entry-btn no-print" onClick={() => ed.removeProject(proj.id)}>×</button>
                <div className="st-exp-header">
                  <div>
                    <h3 className="st-company">
                      <InlineEdit tag="span" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} placeholder="Project Name" />
                    </h3>
                    <div className="st-job-title">
                      <InlineEdit tag="span" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} placeholder="Technologies" />
                    </div>
                  </div>
                  <div className="st-exp-meta">
                    <InlineEdit tag="span" value={proj.link} onChange={v => ed.updateProj(proj.id, 'link', v)} placeholder="Link" />
                  </div>
                </div>
                <BulletList bullets={proj.bullets} className="st-bullets" liClassName="st-bullet-li"
                  onUpdate={(bId, t) => ed.updateProjBullet(proj.id, bId, t)}
                  onAdd={() => ed.addProjBullet(proj.id)}
                  onRemove={(bId) => ed.removeProjBullet(proj.id, bId)}
                  onToggleSubheading={(bId) => ed.toggleProjBulletSubheading(proj.id, bId)}
                />
              </div>
            ))}
            <button className="section-add-entry no-print" onClick={() => ed.addProject()}>+ Add Project</button>
          </section>
        )}
      </main>
    </div>
  );
}
