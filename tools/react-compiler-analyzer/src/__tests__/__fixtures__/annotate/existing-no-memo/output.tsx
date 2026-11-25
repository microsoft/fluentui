import { useMemo } from 'react';

export function AlreadyOptedOut({ items }: { items: string[] }) {
  'use no memo';
  const sorted = useMemo(() => [...items].sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
}
