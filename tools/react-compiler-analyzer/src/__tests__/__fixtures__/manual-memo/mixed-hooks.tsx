import { useMemo, useCallback, useState } from 'react';

export function MixedComponent({ items }: { items: string[] }) {
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => items.filter(i => i.includes(filter)), [items, filter]);
  const sorted = useMemo(() => [...filtered].sort(), [filtered]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  return (
    <div>
      <input onChange={handleChange} />
      <ul>
        {sorted.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
