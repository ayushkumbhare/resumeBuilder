import type { ResumeData, StyleOptions } from '../types';
import { ClassicPdf } from './ClassicPdf';
import { SlatePdf } from './SlatePdf';
import { ModernPdf } from './ModernPdf';
import { ExecutivePdf } from './ExecutivePdf';
import { MinimalPdf } from './MinimalPdf';
import { StartupPdf } from './StartupPdf';
import { ElegantPdf } from './ElegantPdf';

interface PdfThemeProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function PdfThemeRenderer({ data, styles }: PdfThemeProps) {
  const props = { data, styles };
  switch (styles.themeId) {
    case 'slate':     return <SlatePdf     {...props} />;
    case 'modern':    return <ModernPdf    {...props} />;
    case 'executive': return <ExecutivePdf {...props} />;
    case 'minimal':   return <MinimalPdf   {...props} />;
    case 'startup':   return <StartupPdf   {...props} />;
    case 'elegant':   return <ElegantPdf   {...props} />;
    default:          return <ClassicPdf   {...props} />;
  }
}
