import { useState, useEffect } from 'react';
import type { ResumeData, StyleOptions } from './types';
import { initialData, initialStyle } from './data/initialData';
import { TopBar } from './components/TopBar/TopBar';
import { LeftPanel } from './components/LeftPanel/LeftPanel';
import { ThemeGallery } from './components/ThemeGallery/ThemeGallery';
import { ThemeRenderer } from './themes';
import { exportToPdf } from './utils/exportPdf';
import { useHistory } from './hooks/useHistory';
import './App.css';

interface AppState {
  data: ResumeData;
  styles: StyleOptions;
}

export default function App() {
  const getInitialState = (): AppState => {
    let data = initialData;
    let styles = initialStyle;
    try {
      const savedData = localStorage.getItem('rb_data_v2');
      if (savedData) data = JSON.parse(savedData);
      const savedStyles = localStorage.getItem('rb_styles_v2');
      if (savedStyles) styles = JSON.parse(savedStyles);
    } catch {}
    return { data, styles };
  };

  const [uiTheme, setUiTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('rb_uitheme') as 'light' | 'dark') || 'light';
  });

  const { state, set, undo, redo, canUndo, canRedo } = useHistory<AppState>(getInitialState());

  const setData = (action: React.SetStateAction<ResumeData>) => {
    set(prev => ({
      ...prev,
      data: typeof action === 'function' ? (action as any)(prev.data) : action
    }));
  };

  const setStyles = (action: React.SetStateAction<StyleOptions>) => {
    set(prev => ({
      ...prev,
      styles: typeof action === 'function' ? (action as any)(prev.styles) : action
    }));
  };

  const { data, styles } = state;

  const [showThemeGallery, setShowThemeGallery] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    localStorage.setItem('rb_data_v2', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('rb_styles_v2', JSON.stringify(styles));
  }, [styles]);

  useEffect(() => {
    localStorage.setItem('rb_uitheme', uiTheme);
  }, [uiTheme]);

  // Global Keyboard Shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is actively typing inside a contenteditable
      // so native text undo works.
      if (e.target instanceof HTMLElement && e.target.isContentEditable) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleExport = async () => {
    (document.activeElement as HTMLElement)?.blur?.();
    const root = document.getElementById('resume-root');
    root?.classList.add('is-exporting');

    setExporting(true);
    try {
      await new Promise(r => requestAnimationFrame(r));
      await exportToPdf('resume-root', data.internalName || 'resume');
    } finally {
      root?.classList.remove('is-exporting');
      setExporting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all data to the default resume? This cannot be undone.')) {
      set({ data: initialData, styles: initialStyle });
    }
  };

  return (
    <div className="app-shell" data-theme={uiTheme}>
      <TopBar
        resumeName={data.internalName}
        themeId={styles.themeId}
        onOpenThemes={() => setShowThemeGallery(true)}
        onReset={handleReset}
        onExport={handleExport}
        exporting={exporting}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        uiTheme={uiTheme}
        onToggleUiTheme={() => setUiTheme(t => t === 'light' ? 'dark' : 'light')}
      />

      <div className="app-body">
        <LeftPanel
          data={data}
          setData={setData}
          styles={styles}
          setStyles={setStyles}
        />

        <div className="canvas-area no-print">
          <div className="canvas-inner">
            <div id="resume-root">
              <ThemeRenderer data={data} styles={styles} setData={setData} />
            </div>
          </div>
        </div>
      </div>

      {showThemeGallery && (
        <ThemeGallery
          currentTheme={styles.themeId}
          onSelect={(id) => { setStyles(s => ({ ...s, themeId: id })); setShowThemeGallery(false); }}
          onClose={() => setShowThemeGallery(false)}
        />
      )}
    </div>
  );
}
