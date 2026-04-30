import { useMemo, useState } from 'react';

export function MyComponent({ items }: { items: string[] }) {
  const [count, setCount] = useState(0);
  const sorted = useMemo(() => items.sort(), [items]);
  return (
    <div>
      {sorted.join(', ')} {count}
    </div>
  );
}
