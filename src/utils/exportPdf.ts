import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPdf(elementId: string, filename: string = 'resume') {
  const el = document.getElementById(elementId);
  if (!el) {
    alert('Could not find the resume to export.');
    return;
  }

  // Show a loading indicator on the button (optional, caller handles UX)
  const A4_WIDTH_MM  = 210;
  const A4_HEIGHT_MM = 297;
  const DPI_SCALE    = 3; // 3x for high-resolution — sharp text on retina/print

  // Provide robust dimension fallbacks for flex/grid themes (Slate, Modern)
  const widthPx = el.offsetWidth || el.scrollWidth || 794;
  const heightPx = el.offsetHeight || el.scrollHeight || 1123;

  const canvas = await html2canvas(el, {
    scale: DPI_SCALE,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: widthPx,
    height: heightPx,
    windowWidth: widthPx,
    windowHeight: heightPx,
  });

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    console.error('html2canvas returned empty canvas', { widthPx, heightPx });
    alert('Failed to render PDF. The theme layout could not be captured.');
    return;
  }

  // Calculate how many A4 pages we need
  const pxPerMm = canvas.width / A4_WIDTH_MM;
  const pageHeightPx = A4_HEIGHT_MM * pxPerMm;
  const totalPages = Math.ceil(canvas.height / pageHeightPx);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) pdf.addPage();

    // Crop the canvas to this page's slice
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width  = Math.floor(canvas.width);
    pageCanvas.height = Math.floor(Math.min(pageHeightPx, canvas.height - page * pageHeightPx));

    if (pageCanvas.width <= 0 || pageCanvas.height <= 0) continue;

    const ctx = pageCanvas.getContext('2d');
    if (!ctx) continue;

    ctx.drawImage(
      canvas,
      0, page * pageHeightPx,          // sx, sy — source y offset
      canvas.width, pageCanvas.height,  // sw, sh
      0, 0,                             // dx, dy
      canvas.width, pageCanvas.height   // dw, dh
    );

    const sliceData = pageCanvas.toDataURL('image/jpeg', 1.0);
    const sliceHeightMm = (pageCanvas.height / canvas.width) * A4_WIDTH_MM;

    pdf.addImage(sliceData, 'JPEG', 0, 0, A4_WIDTH_MM, sliceHeightMm);
  }

  pdf.save(`${filename}.pdf`);
}
