import type { ResumeData, ExperienceItem, ProjectItem, EducationItem, SkillCategory, ResponsibilityItem, BulletItem } from '../types';

const newBullet = (text = ''): BulletItem => ({ id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text, visible: true });

export function useResumeEditor(setData: React.Dispatch<React.SetStateAction<ResumeData>>) {
  // ── PERSONAL INFO ──────────────────────────────────────────
  const updatePersonal = (field: string, value: string) =>
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  // ── EXPERIENCE ─────────────────────────────────────────────
  const updateExp = (id: string, field: string, value: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const addExpBullet = (expId: string, text = '') =>
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId ? { ...e, bullets: [...e.bullets, newBullet(text)] } : e),
    }));

  const updateExpBullet = (expId: string, bId: string, text: string) =>
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId
        ? { ...e, bullets: e.bullets.map(b => b.id === bId ? { ...b, text } : b) }
        : e),
    }));

  const removeExpBullet = (expId: string, bId: string) =>
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId
        ? { ...e, bullets: e.bullets.filter(b => b.id !== bId) }
        : e),
    }));

  const addExperience = () => {
    const n: ExperienceItem = { id: `e-${Date.now()}`, visible: true, company: 'Company Name', title: 'Your Role', location: '', period: 'Month YYYY – Present', bullets: [newBullet('Describe your key achievement here')] };
    setData(prev => ({ ...prev, experience: [...prev.experience, n] }));
  };

  const removeExperience = (id: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  // ── PROJECTS ────────────────────────────────────────────────
  const updateProj = (id: string, field: string, value: string) =>
    setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p) }));

  const addProjBullet = (projId: string, text = '') =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projId ? { ...p, bullets: [...p.bullets, newBullet(text)] } : p),
    }));

  const updateProjBullet = (projId: string, bId: string, text: string) =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projId
        ? { ...p, bullets: p.bullets.map(b => b.id === bId ? { ...b, text } : b) }
        : p),
    }));

  const removeProjBullet = (projId: string, bId: string) =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projId
        ? { ...p, bullets: p.bullets.filter(b => b.id !== bId) }
        : p),
    }));

  const addProject = () => {
    const n: ProjectItem = { id: `p-${Date.now()}`, visible: true, title: 'Project Name', subtitle: 'Technologies', link: '', bullets: [newBullet('Describe what you built and its impact')] };
    setData(prev => ({ ...prev, projects: [...prev.projects, n] }));
  };

  const removeProject = (id: string) =>
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

  // ── EDUCATION ───────────────────────────────────────────────
  const updateEdu = (id: string, field: string, value: string) =>
    setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const addEducation = () => {
    const n: EducationItem = { id: `edu-${Date.now()}`, visible: true, institution: 'University Name', degree: 'Bachelor of Technology', period: '2020 – 2024', gpa: '' };
    setData(prev => ({ ...prev, education: [...prev.education, n] }));
  };

  const removeEducation = (id: string) =>
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  // ── SKILLS ──────────────────────────────────────────────────
  const updateSkill = (id: string, field: string, value: string) =>
    setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, [field]: value } : s) }));

  const addSkill = () => {
    const n: SkillCategory = { id: `s-${Date.now()}`, visible: true, category: 'New Category', items: 'Skill 1, Skill 2' };
    setData(prev => ({ ...prev, skills: [...prev.skills, n] }));
  };

  const removeSkill = (id: string) =>
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));

  // ── RESPONSIBILITIES ────────────────────────────────────────
  const updateResp = (id: string, text: string) =>
    setData(prev => ({ ...prev, responsibilities: prev.responsibilities.map(r => r.id === id ? { ...r, text } : r) }));

  const addResp = () => {
    const n: ResponsibilityItem = { id: `r-${Date.now()}`, visible: true, text: 'Position Title, Organization — Description of your role' };
    setData(prev => ({ ...prev, responsibilities: [...prev.responsibilities, n] }));
  };

  const removeResp = (id: string) =>
    setData(prev => ({ ...prev, responsibilities: prev.responsibilities.filter(r => r.id !== id) }));

  return {
    updatePersonal,
    updateExp, addExpBullet, updateExpBullet, removeExpBullet, addExperience, removeExperience,
    updateProj, addProjBullet, updateProjBullet, removeProjBullet, addProject, removeProject,
    updateEdu, addEducation, removeEducation,
    updateSkill, addSkill, removeSkill,
    updateResp, addResp, removeResp,
  };
}
