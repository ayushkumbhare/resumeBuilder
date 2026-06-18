import type { ThemeId, ResumeData, StyleOptions } from '../types';
import { Classic } from './Classic/Classic';
import { Slate } from './Slate/Slate';
import { Modern } from './Modern/Modern';
import { Executive } from './Executive/Executive';
import { Minimal } from './Minimal/Minimal';
import { Startup } from './Startup/Startup';
import { Elegant } from './Elegant/Elegant';
import type React from 'react';

export const THEMES: Record<ThemeId, { name: string; description: string; colors: string[] }> = {
  classic:   { name: 'Classic',   description: 'ATS-Friendly · Traditional',   colors: ['#0F2A4A', '#f5f5f5', '#1a1a1a'] },
  slate:     { name: 'Slate',     description: 'Dark Sidebar · Modern',         colors: ['#1e293b', '#ffffff', '#1A6FC4'] },
  modern:    { name: 'Modern',    description: '2-Column Grid · Fresh',         colors: ['#0F2A4A', '#f8fafc', '#1A6FC4'] },
  executive: { name: 'Executive', description: 'Serif · Formal · Refined',     colors: ['#1a1a1a', '#ffffff', '#888888'] },
  minimal:   { name: 'Minimal',   description: 'Typographic · Ultra-Clean',    colors: ['#111111', '#ffffff', '#1A6FC4'] },
  startup:   { name: 'Startup',   description: 'Bold · High-Energy · Pill Tags',colors: ['#0f172a', '#e2e8f0', '#3b82f6'] },
  elegant:   { name: 'Elegant',   description: 'Premium Serif · Editorial',    colors: ['#1c1c1c', '#ffffff', '#111111'] },
};

interface ThemeRendererProps {
  data: ResumeData;
  styles: StyleOptions;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ThemeRenderer({ data, styles, setData }: ThemeRendererProps) {
  const props = { data, styles, setData };
  switch (styles.themeId) {
    case 'slate':     return <Slate     {...props} />;
    case 'modern':    return <Modern    {...props} />;
    case 'executive': return <Executive {...props} />;
    case 'minimal':
      return <Minimal data={data} styles={styles} setData={setData} />;
    case 'startup':
      return <Startup data={data} styles={styles} setData={setData} />;
    case 'elegant':
      return <Elegant data={data} styles={styles} setData={setData} />;
    default:
      return <Classic data={data} styles={styles} setData={setData} />;
  }
}
