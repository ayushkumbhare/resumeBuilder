import { useRef, useEffect, useCallback } from 'react';
import './InlineEdit.css';

interface InlineEditProps {
  value: string;
  onChange: (val: string) => void;
  tag?: keyof React.JSX.IntrinsicElements;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function InlineEdit({
  value,
  onChange,
  tag = 'span',
  placeholder = 'Click to edit',
  multiline = false,
  className = '',
  style,
}: InlineEditProps) {
  const ref = useRef<HTMLElement>(null);
  const isEditing = useRef(false);

  // Sync external value changes into the DOM (not while user is typing)
  useEffect(() => {
    if (ref.current && !isEditing.current) {
      const safeValue = value ?? '';
      if (ref.current.innerText !== safeValue) {
        ref.current.innerText = safeValue;
      }
    }
  }, [value]);

  // Set initial content on mount
  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = value ?? '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFocus = () => {
    isEditing.current = true;
  };

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      isEditing.current = false;
      const newVal = e.currentTarget.innerText.trim();
      if (newVal !== value) onChange(newVal);
    },
    [value, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
    if (e.key === 'Escape') {
      isEditing.current = false;
      if (ref.current) ref.current.innerText = value ?? '';
      (e.currentTarget as HTMLElement).blur();
    }
  };

  const Tag = tag as any;

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={`ie ${className}`}
      style={style}
      data-placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
}
