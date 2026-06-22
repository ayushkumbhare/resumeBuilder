export interface PersonalInfo {
  name: string;
  headline: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  location: string;
  summary: string;
}

export interface BulletItem {
  id: string;
  text: string;
  visible: boolean;
  isSubheading?: boolean;
}

export interface ExperienceItem {
  id: string;
  visible: boolean;
  company: string;
  location: string;
  title: string;
  period: string;
  bullets: BulletItem[];
}

export interface ProjectItem {
  id: string;
  visible: boolean;
  title: string;
  subtitle: string;
  link: string;
  bullets: BulletItem[];
}

export interface EducationItem {
  id: string;
  visible: boolean;
  institution: string;
  period: string;
  degree: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  visible: boolean;
  category: string;
  items: string;
}

export interface ResponsibilityItem {
  id: string;
  visible: boolean;
  text: string;
}

export type ThemeId = 'classic' | 'slate' | 'modern' | 'executive' | 'minimal' | 'startup' | 'elegant';

export interface ResumeData {
  id: string;
  internalName: string;
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  responsibilities: ResponsibilityItem[];
}

export interface StyleOptions {
  themeId: ThemeId;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export interface ThemeProps {
  data: ResumeData;
  styles: StyleOptions;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}
