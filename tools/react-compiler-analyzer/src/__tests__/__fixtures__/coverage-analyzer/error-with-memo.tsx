import { useMemo, useRef } from 'react';

// Writing a ref during render is rejected even when manual memoization is present.
export function ErrorWithMemo({ items }: { items: string[] }) {
  const valueRef = useRef(0);
  valueRef.current = 42;
  const sorted = useMemo(() => [...items].sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
}
