import { useState, useCallback } from 'react';

export function useHistory<T>(initialState: T, maxHistory = 50) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialState);
  const [future, setFuture] = useState<T[]>([]);

  const set = useCallback((newPresent: T | ((current: T) => T)) => {
    setPresent(currentPresent => {
      const resolvedNewPresent = typeof newPresent === 'function' ? (newPresent as any)(currentPresent) : newPresent;
      
      // Don't save if state hasn't changed (shallow check is usually enough, but here we assume if set is called, it's a new reference)
      if (currentPresent === resolvedNewPresent) return currentPresent;

      setPast(p => {
        const newPast = [...p, currentPresent];
        if (newPast.length > maxHistory) {
          return newPast.slice(newPast.length - maxHistory);
        }
        return newPast;
      });
      setFuture([]); // Clear future on new action
      return resolvedNewPresent;
    });
  }, [maxHistory]);

  const undo = useCallback(() => {
    setPast(p => {
      if (p.length === 0) return p;
      const previous = p[p.length - 1];
      const newPast = p.slice(0, p.length - 1);
      
      setPresent(current => {
        setFuture(f => [current, ...f]);
        return previous;
      });
      
      return newPast;
    });
  }, []);

  const redo = useCallback(() => {
    setFuture(f => {
      if (f.length === 0) return f;
      const next = f[0];
      const newFuture = f.slice(1);
      
      setPresent(current => {
        setPast(p => [...p, current]);
        return next;
      });
      
      return newFuture;
    });
  }, []);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return { state: present, set, undo, redo, canUndo, canRedo };
}
