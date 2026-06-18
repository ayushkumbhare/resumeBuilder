import type { ThemeId } from '../../types';
import { Palette, Download, RotateCcw, FileText, Loader, Undo2, Redo2, Sun, Moon } from 'lucide-react';
import './TopBar.css';

const THEME_LABELS: Record<ThemeId, string> = {
  classic: 'Classic',
  slate: 'Slate',
  modern: 'Modern',
  executive: 'Executive',
  minimal: 'Minimal',
  startup: 'Startup',
  elegant: 'Elegant',
};

interface TopBarProps {
  resumeName: string;
  themeId: ThemeId;
  onOpenThemes: () => void;
  onReset: () => void;
  onExport: () => void;
  exporting: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  uiTheme: 'light' | 'dark';
  onToggleUiTheme: () => void;
}

export function TopBar({ resumeName, themeId, onOpenThemes, onReset, onExport, exporting, onUndo, onRedo, canUndo, canRedo, uiTheme, onToggleUiTheme }: TopBarProps) {
  return (
    <header className="topbar no-print">
      <div className="topbar-left">
        <div className="topbar-logo">
          <FileText size={20} className="topbar-logo-icon" />
          <span className="topbar-logo-text">ResumeForge</span>
        </div>
        <div className="topbar-divider" />
        <span className="topbar-resume-name">{resumeName}</span>
      </div>

      <div className="topbar-right">
        <div className="topbar-group">
          <button className="topbar-btn icon-only" onClick={onUndo} disabled={!canUndo} title="Undo (Cmd+Z)">
            <Undo2 size={16} />
          </button>
          <button className="topbar-btn icon-only" onClick={onRedo} disabled={!canRedo} title="Redo (Cmd+Shift+Z)">
            <Redo2 size={16} />
          </button>
        </div>

        <div className="topbar-divider" />

        <button className="topbar-btn icon-only" onClick={onToggleUiTheme} title={uiTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
          {uiTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button className="topbar-btn" onClick={onOpenThemes} id="open-themes-btn">
          <Palette size={15} />
          <span>Template: {THEME_LABELS[themeId]}</span>
        </button>

        <button className="topbar-btn danger-btn" onClick={onReset} title="Reset to default">
          <RotateCcw size={15} />
        </button>

        <button
          className={`topbar-btn export-btn ${exporting ? 'loading' : ''}`}
          onClick={onExport}
          disabled={exporting}
          id="export-pdf-btn"
        >
          {exporting
            ? <><Loader size={15} className="spin" /><span>Generating...</span></>
            : <><Download size={15} /><span>Export PDF</span></>
          }
        </button>
      </div>
    </header>
  );
}
