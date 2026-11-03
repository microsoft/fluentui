import { useMemo, useCallback } from 'react';

export function MixedComponent({ items }: { items: string[] }) {
  const filtered = useMemo(() => items.filter(Boolean), [items]);
  const sorted = useMemo(() => [...filtered].sort(), [filtered]);
  const handleClick = useCallback(() => void 0, []);

  return <div onClick={handleClick}>{sorted.join(', ')}</div>;
}
