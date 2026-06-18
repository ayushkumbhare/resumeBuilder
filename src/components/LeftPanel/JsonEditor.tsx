import { useState, useEffect, useRef } from 'react';
import type { ResumeData } from '../../types';
import EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import './JsonEditor.css';

const Editor = (EditorModule as any).default || EditorModule;

interface JsonEditorProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function JsonEditor({ data, setData }: JsonEditorProps) {
  const [jsonStr, setJsonStr] = useState('');
  const [error, setError] = useState<string | null>(null);
  const lastAppliedRef = useRef(data);

  useEffect(() => {
    // If external data changes, sync it to the editor
    if (data !== lastAppliedRef.current) {
      setJsonStr(JSON.stringify(data, null, 2));
      setError(null);
      lastAppliedRef.current = data;
    }
  }, [data]);

  // Initial load
  useEffect(() => {
    if (!jsonStr) {
      setJsonStr(JSON.stringify(data, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (newVal: string) => {
    setJsonStr(newVal);
    
    try {
      const parsed = JSON.parse(newVal);
      setError(null);
      
      if (parsed && typeof parsed === 'object') {
        lastAppliedRef.current = parsed;
        setData(parsed);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="lp-json-container">
      {error && (
        <div className="lp-json-error">
          <span className="lp-error-icon">⚠️</span> 
          <span><strong>Invalid JSON:</strong> {error}</span>
        </div>
      )}
      <div className="lp-json-scroll-area">
        <Editor
          value={jsonStr}
          onValueChange={handleChange}
          highlight={(code: string) => Prism.highlight(code, Prism.languages.json, 'json')}
          padding={16}
          className="lp-json-editor-core"
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", Consolas, Monaco, "Courier New", monospace',
            fontSize: 13,
            lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  );
}
