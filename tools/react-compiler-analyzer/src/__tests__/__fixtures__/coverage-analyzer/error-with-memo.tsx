import { useMemo } from 'react';

// This function has a pattern that causes a compiler error (mutating input)
export function ErrorWithMemo({ items }: { items: string[] }) {
  const sorted = useMemo(() => {
    items.sort(); // Mutating the input — compiler will bail out
    return items;
  }, [items]);
  return <div>{sorted.join(', ')}</div>;
}
