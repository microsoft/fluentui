import { useMemo } from 'react';

export const ArrowComponent = ({ items }: { items: string[] }) => {
  const sorted = useMemo(() => items.sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
};
