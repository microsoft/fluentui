import { useMemo, useCallback, useState } from 'react';

export function FirstComponent({ items }: { items: string[] }) {
  'use memo';
  const sorted = useMemo(() => items.sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
}

export function SecondComponent() {
  'use memo';
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => setCount(c => c + 1), []);
  return <button onClick={handleClick}>{count}</button>;
}
