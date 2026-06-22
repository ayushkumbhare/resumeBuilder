import { useRef } from 'react';
import type { BulletItem } from '../../types';
import './InlineEdit.css';

interface BulletListProps {
  bullets: BulletItem[];
  className?: string;
  liClassName?: string;
  onUpdate: (id: string, text: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onToggleSubheading?: (id: string) => void;
}

export function BulletList({ bullets, className = '', liClassName = '', onUpdate, onAdd, onRemove, onToggleSubheading }: BulletListProps) {
  return (
    <>
      <ul className={`ie-bullet-list ${className}`}>
        {bullets.filter(b => b.visible).map(b => (
          <BulletItem key={b.id} bullet={b} liClassName={liClassName} onUpdate={onUpdate} onRemove={onRemove} onAdd={onAdd} onToggleSubheading={onToggleSubheading} />
        ))}
      </ul>
      <button className="ie-add-bullet" onClick={onAdd}>+ Add bullet</button>
    </>
  );
}

function BulletItem({ bullet, liClassName, onUpdate, onRemove, onAdd, onToggleSubheading }: {
  bullet: BulletItem;
  liClassName: string;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  onToggleSubheading?: (id: string) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isEditing = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd(); // Create a new bullet below
    }
    if (e.key === 'Backspace' && ref.current?.innerText === '') {
      e.preventDefault();
      onRemove(bullet.id);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    isEditing.current = false;
    const newText = e.currentTarget.innerText.trim();
    if (newText !== bullet.text) onUpdate(bullet.id, newText);
  };

  return (
    <li className={`ie-bullet-item ${liClassName} ${bullet.isSubheading ? 'is-subheading' : ''}`}>
      <span
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="ie-bullet-text"
        spellCheck={false}
        onFocus={() => { isEditing.current = true; }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: bullet.text }}
      />
      <div className="ie-bullet-actions">
        {onToggleSubheading && (
          <button className="ie-bullet-btn ie-bullet-toggle" onClick={() => onToggleSubheading(bullet.id)} title="Toggle Subheading" tabIndex={-1}>
            {bullet.isSubheading ? '¶' : 'H'}
          </button>
        )}
        <button className="ie-bullet-btn ie-bullet-del" onClick={() => onRemove(bullet.id)} title="Delete bullet" tabIndex={-1}>×</button>
      </div>
    </li>
  );
}
