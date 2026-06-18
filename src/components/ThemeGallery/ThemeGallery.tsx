import type { ThemeId } from '../../types';
import { THEMES } from '../../themes';
import { X, Check } from 'lucide-react';
import './ThemeGallery.css';

interface ThemeGalleryProps {
  currentTheme: ThemeId;
  onSelect: (id: ThemeId) => void;
  onClose: () => void;
}

export function ThemeGallery({ currentTheme, onSelect, onClose }: ThemeGalleryProps) {
  return (
    <div className="tg-overlay" onClick={onClose}>
      <div className="tg-modal" onClick={e => e.stopPropagation()}>
        <div className="tg-header">
          <h2>Choose a Template</h2>
          <button className="tg-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="tg-grid">
          {(Object.entries(THEMES) as [ThemeId, typeof THEMES[ThemeId]][]).map(([id, meta]) => (
            <button
              key={id}
              className={`tg-card ${currentTheme === id ? 'active' : ''}`}
              onClick={() => onSelect(id)}
            >
              <div className="tg-preview" data-theme={id}>
                <ThemeMiniPreview theme={id} colors={meta.colors} />
              </div>
              <div className="tg-card-footer">
                <div>
                  <span className="tg-card-name">{meta.name}</span>
                  <span className="tg-card-desc">{meta.description}</span>
                </div>
                {currentTheme === id && <Check size={16} className="tg-check" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemeMiniPreview({ theme, colors }: { theme: ThemeId; colors: string[] }) {
  const [primary, bg, accent] = colors;
  if (theme === 'slate') {
    return (
      <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="200" fill={bg} />
        <rect width="56" height="200" fill={primary} />
        <rect x="8" y="14" width="36" height="6" rx="2" fill="white" opacity="0.9" />
        <rect x="8" y="22" width="24" height="3" rx="1" fill="white" opacity="0.5" />
        <rect x="8" y="36" width="12" height="2" rx="1" fill={accent} opacity="0.8" />
        {[0,5,10,15].map(y => <rect key={y} x="8" y={42+y} width="36" height="2" rx="1" fill="white" opacity="0.3" />)}
        <rect x="8" y="70" width="12" height="2" rx="1" fill={accent} opacity="0.8" />
        {[0,5,10,15,20].map(y => <rect key={y} x="8" y={76+y} width="36" height="2" rx="1" fill="white" opacity="0.3" />)}
        <rect x="64" y="14" width="80" height="3" rx="1" fill="#333" opacity="0.7" />
        <rect x="64" y="20" width="60" height="2" rx="1" fill="#999" opacity="0.7" />
        <rect x="64" y="32" width="24" height="2" rx="1" fill={accent} />
        {[0,5,10,15,20,25].map(y => <rect key={y} x="64" y={38+y} width="80" height="2" rx="1" fill="#333" opacity="0.4" />)}
        <rect x="64" y="76" width="24" height="2" rx="1" fill={accent} />
        {[0,5,10,15].map(y => <rect key={y} x="64" y={82+y} width="80" height="2" rx="1" fill="#333" opacity="0.4" />)}
      </svg>
    );
  }
  if (theme === 'modern') {
    return (
      <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="200" fill={bg} />
        <rect width="160" height="36" fill={primary} />
        <rect x="8" y="9" width="60" height="6" rx="2" fill="white" opacity="0.9" />
        <rect x="8" y="18" width="42" height="3" rx="1" fill="white" opacity="0.5" />
        {[0,5].map(y => <rect key={y} x="110" y={10+y} width="40" height="2" rx="1" fill="white" opacity="0.4" />)}
        <rect y="36" width="160" height="3" fill={accent} />
        <rect x="0" y="39" width="58" height="161" fill="#f1f5f9" />
        {['Skills','Education'].map((t, i) => (
          <g key={t}>
            <rect x="6" y={50+i*50} width="20" height="2" rx="1" fill={accent} />
            {[0,5,10,15].map(y => <rect key={y} x="6" y={56+i*50+y} width="44" height="2" rx="1" fill="#888" opacity="0.5" />)}
          </g>
        ))}
        <rect x="64" y="46" width="32" height="2" rx="1" fill={accent} />
        {[0,5,10,15,20,25,30,35,40].map(y => <rect key={y} x="64" y={52+y} width="88" height="2" rx="1" fill="#333" opacity="0.35" />)}
        <rect x="64" y="100" width="32" height="2" rx="1" fill={accent} />
        {[0,5,10,15,20,25].map(y => <rect key={y} x="64" y={106+y} width="88" height="2" rx="1" fill="#333" opacity="0.35" />)}
      </svg>
    );
  }
  if (theme === 'executive') {
    return (
      <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="200" fill={bg} />
        <rect x="24" y="10" width="112" height="6" rx="1" fill="#1a1a1a" opacity="0.8" />
        <rect x="44" y="19" width="72" height="2" rx="1" fill="#888" />
        <rect x="10" y="26" width="140" height="1.5" fill="#1a1a1a" opacity="0.8" />
        <rect x="10" y="28" width="140" height="0.5" fill="#1a1a1a" opacity="0.4" />
        <rect x="30" y="32" width="100" height="2" rx="1" fill="#888" opacity="0.6" />
        <rect x="10" y="38" width="140" height="0.5" fill="#888" opacity="0.5" />
        {['Exp','Proj','Skills','Edu'].map((_, i) => (
          <g key={i}>
            <rect x="10" y={50+i*36} width="30" height="2" rx="1" fill="#1a1a1a" />
            <rect x="42" y={51+i*36} width="108" height="0.5" fill="#1a1a1a" />
            <rect x="10" y={56+i*36} width="80" height="1.5" rx="1" fill="#333" opacity="0.7" />
            {[0,4,8].map(y => <rect key={y} x="14" y={62+i*36+y} width="130" height="1.5" rx="0.5" fill="#555" opacity="0.4" />)}
          </g>
        ))}
      </svg>
    );
  }
  if (theme === 'minimal') {
    return (
      <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="200" fill={bg} />
        <rect x="12" y="12" width="90" height="8" rx="1" fill="#111" opacity="0.85" />
        <rect x="12" y="23" width="60" height="3" rx="1" fill="#888" />
        <rect x="12" y="29" width="110" height="1.5" rx="0.5" fill="#bbb" />
        <rect x="12" y="34" width="30" height="2" rx="1" fill={accent} />
        {['Exp','Proj','Skills','Edu','More'].map((_, i) => (
          <g key={i}>
            <rect x="12" y={44+i*30} width="18" height="1.5" rx="0.5" fill="#bbb" />
            <rect x="12" y={48+i*30} width="136" height="0.5" fill="#e5e7eb" />
            <rect x="12" y={52+i*30} width="80" height="2" rx="0.5" fill="#111" opacity="0.7" />
            {[0,5].map(y => <rect key={y} x="14" y={58+i*30+y} width="130" height="1.5" rx="0.5" fill="#888" opacity="0.4" />)}
          </g>
        ))}
      </svg>
    );
  }
  // Classic (default)
  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="200" fill={bg} />
      <rect x="40" y="10" width="80" height="6" rx="1" fill={primary} opacity="0.9" />
      <rect x="50" y="19" width="60" height="2" rx="1" fill="#888" />
      <rect x="30" y="24" width="100" height="1.5" rx="0.5" fill="#bbb" />
      {['Summary','Skills','Experience','Projects','Education'].map((_, i) => (
        <g key={i}>
          <rect x="10" y={32+i*32} width="20" height="2" rx="0.5" fill={primary} />
          <rect x="10" y={36+i*32} width="140" height="0.8" fill={primary} opacity="0.6" />
          <rect x="10" y={40+i*32} width="120" height="1.5" rx="0.5" fill="#444" opacity="0.6" />
          {[0,5].map(y => <rect key={y} x="12" y={45+i*32+y} width="136" height="1.5" rx="0.5" fill="#888" opacity="0.4" />)}
        </g>
      ))}
    </svg>
  );
}
