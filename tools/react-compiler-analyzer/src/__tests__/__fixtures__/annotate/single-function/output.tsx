import { useMemo, useState } from 'react';

export function SingleFunction({ items }: { items: string[] }) {
  'use memo';
  const [count, setCount] = useState(0);
  const sorted = useMemo(() => items.sort(), [items]);
  return (
    <div>
      {sorted.join(', ')} {count}
    </div>
  );
}
