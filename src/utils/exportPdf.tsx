import { pdf } from '@react-pdf/renderer';
import { PdfThemeRenderer } from '../pdf-themes';
import type { ResumeData, StyleOptions } from '../types';

export async function exportToPdf(data: ResumeData, styles: StyleOptions, filename: string = 'resume') {
  try {
    const doc = <PdfThemeRenderer data={data} styles={styles} />;
    const asPdf = pdf([]); // Create pdf instance
    asPdf.updateContainer(doc);
    
    const blob = await asPdf.toBlob();
    
    // Download the blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Failed to generate PDF', error);
    alert('Failed to generate PDF. Check console for details.');
  }
}
