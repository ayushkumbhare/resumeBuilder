import type { ResumeData, StyleOptions } from '../../types';
import { InlineEdit } from '../../components/InlineEdit/InlineEdit';
import { BulletList } from '../../components/InlineEdit/BulletList';
import { useResumeEditor } from '../../hooks/useResumeEditor';
import './Elegant.css';

interface ElegantProps {
  data: ResumeData;
  styles: StyleOptions;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function Elegant({ data, styles, setData }: ElegantProps) {
  const pi = data.personalInfo;
  const ed = useResumeEditor(setData);
  const css = {
    '--el-primary': styles.primaryColor,
    '--el-accent': styles.accentColor,
    '--el-font': styles.fontFamily,
    '--body-size': `${(styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0)}pt`,
    '--heading-size': `${(styles.headingSize || 12) + (styles.globalFontScale || 0)}pt`,
    '--name-size': `${(styles.nameSize || 26) + (styles.globalFontScale || 0)}pt`,
    lineHeight: styles.lineHeight || 1.5,
    '--section-spacing': `${styles.sectionSpacing ?? 10}px`,
    padding: `${styles.documentMargin || 14}mm 18mm`,
  } as React.CSSProperties;

  return (
    <div className="el-page" style={css}>
      <header className="el-header edit-section">
        <InlineEdit tag="h1" className="el-name" value={pi.name} onChange={v => ed.updatePersonal('name', v)} placeholder="Your Name" />
        <InlineEdit tag="div" className="el-headline" value={pi.headline} onChange={v => ed.updatePersonal('headline', v)} placeholder="Professional Headline" />
        <div className="el-contacts">
          {['phone','email','linkedin','github','website','location'].map((f, i, arr) => {
            const val = (pi as any)[f];
            if (!val) return null;
            return (
              <span key={f}>
                <InlineEdit tag="span" value={val} onChange={v => ed.updatePersonal(f, v)} placeholder={f} />
                {i < arr.length - 1 && arr.slice(i+1).some(k => (pi as any)[k]) && <span className="el-dot"> • </span>}
              </span>
            );
          })}
        </div>
      </header>

      {pi.summary && (
        <section className="el-section edit-section">
          <InlineEdit tag="p" multiline className="el-summary" value={pi.summary} onChange={v => ed.updatePersonal('summary', v)} placeholder="Executive Summary" />
        </section>
      )}

      <section className="el-section edit-section">
        <h2 className="el-section-title">Professional Experience</h2>
        {data.experience.filter(e => e.visible).map(exp => (
          <div key={exp.id} className="el-exp edit-block">
            <button className="del-entry-btn no-print" onClick={() => ed.removeExperience(exp.id)}>×</button>
            <div className="el-exp-header">
              <h3 className="el-company">
                <InlineEdit tag="span" value={exp.company} onChange={v => ed.updateExp(exp.id, 'company', v)} placeholder="Company" />
              </h3>
              <div className="el-period">
                <InlineEdit tag="span" value={exp.period} onChange={v => ed.updateExp(exp.id, 'period', v)} placeholder="Period" />
              </div>
            </div>
            <div className="el-exp-sub">
              <span className="el-job-title">
                <InlineEdit tag="span" value={exp.title} onChange={v => ed.updateExp(exp.id, 'title', v)} placeholder="Title" />
              </span>
              {exp.location && (
                <span className="el-location">
                  , <InlineEdit tag="span" value={exp.location} onChange={v => ed.updateExp(exp.id, 'location', v)} placeholder="Location" />
                </span>
              )}
            </div>
            <BulletList bullets={exp.bullets} className="el-bullets" liClassName="el-bullet-li"
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
        <section className="el-section edit-section">
          <h2 className="el-section-title">Selected Projects</h2>
          {data.projects.filter(p => p.visible).map(proj => (
            <div key={proj.id} className="el-exp edit-block">
              <button className="del-entry-btn no-print" onClick={() => ed.removeProject(proj.id)}>×</button>
              <div className="el-exp-header">
                <h3 className="el-company">
                  <InlineEdit tag="span" value={proj.title} onChange={v => ed.updateProj(proj.id, 'title', v)} placeholder="Project Name" />
                </h3>
                <div className="el-period">
                  <InlineEdit tag="span" value={proj.link} onChange={v => ed.updateProj(proj.id, 'link', v)} placeholder="Link" />
                </div>
              </div>
              <div className="el-exp-sub">
                <span className="el-job-title">
                  <InlineEdit tag="span" value={proj.subtitle} onChange={v => ed.updateProj(proj.id, 'subtitle', v)} placeholder="Technologies" />
                </span>
              </div>
              <BulletList bullets={proj.bullets} className="el-bullets" liClassName="el-bullet-li"
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

      <section className="el-section edit-section">
        <h2 className="el-section-title">Education</h2>
        {data.education.filter(e => e.visible).map(edu => (
          <div key={edu.id} className="el-exp edit-block">
            <button className="del-entry-btn no-print" onClick={() => ed.removeEducation(edu.id)}>×</button>
            <div className="el-exp-header">
              <h3 className="el-company">
                <InlineEdit tag="span" value={edu.institution} onChange={v => ed.updateEdu(edu.id, 'institution', v)} placeholder="University" />
              </h3>
              <div className="el-period">
                <InlineEdit tag="span" value={edu.period} onChange={v => ed.updateEdu(edu.id, 'period', v)} placeholder="Period" />
              </div>
            </div>
            <div className="el-exp-sub">
              <span className="el-job-title">
                <InlineEdit tag="span" value={edu.degree} onChange={v => ed.updateEdu(edu.id, 'degree', v)} placeholder="Degree" />
              </span>
            </div>
          </div>
        ))}
        <button className="section-add-entry no-print" onClick={() => ed.addEducation()}>+ Add Education</button>
      </section>

      <section className="el-section edit-section">
        <h2 className="el-section-title">Core Competencies</h2>
        <div className="el-skills-grid">
          {data.skills.filter(s => s.visible).map(skill => (
            <div key={skill.id} className="el-skill-row edit-block">
              <button className="del-entry-btn no-print" onClick={() => ed.removeSkill(skill.id)}>×</button>
              <div className="el-skill-cat">
                <InlineEdit tag="span" value={skill.category} onChange={v => ed.updateSkill(skill.id, 'category', v)} placeholder="Category" />
              </div>
              <div className="el-skill-items">
                <InlineEdit tag="span" value={skill.items} onChange={v => ed.updateSkill(skill.id, 'items', v)} placeholder="Skills" />
              </div>
            </div>
          ))}
        </div>
        <button className="section-add-entry no-print" onClick={() => ed.addSkill()}>+ Add Skills</button>
      </section>
    </div>
  );
}
