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
}

export function BulletList({ bullets, className = '', liClassName = '', onUpdate, onAdd, onRemove }: BulletListProps) {
  return (
    <>
      <ul className={`ie-bullet-list ${className}`}>
        {bullets.filter(b => b.visible).map(b => (
          <BulletItem key={b.id} bullet={b} liClassName={liClassName} onUpdate={onUpdate} onRemove={onRemove} onAdd={onAdd} />
        ))}
      </ul>
      <button className="ie-add-bullet" onClick={onAdd}>+ Add bullet</button>
    </>
  );
}

function BulletItem({ bullet, liClassName, onUpdate, onRemove, onAdd }: {
  bullet: BulletItem;
  liClassName: string;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
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
    <li className={`ie-bullet-item ${liClassName}`}>
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
      <button className="ie-bullet-del" onClick={() => onRemove(bullet.id)} title="Delete bullet">×</button>
    </li>
  );
}
