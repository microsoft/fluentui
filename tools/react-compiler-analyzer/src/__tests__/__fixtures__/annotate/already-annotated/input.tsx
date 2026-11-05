import { useMemo } from 'react';

export function AlreadyAnnotated({ items }: { items: string[] }) {
  'use memo';
  const sorted = useMemo(() => items.sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
}
