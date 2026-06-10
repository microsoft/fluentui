import { useEffect, useMemo, useState } from 'react';

// None of these should be flagged:
// - useState with an inline object initializer (React builtin)
// - useEffect with an inline arrow (React builtin)
// - useMemo with inline arrow (React builtin)
// - a custom hook receiving a stable identifier argument
export function SafeComponent({ items }: { items: string[] }) {
  const [state, setState] = useState({ open: false });
  const sorted = useMemo(() => [...items].sort(), [items]);

  useEffect(() => {
    setState({ open: true });
  }, []);

  return (
    <div>
      {sorted.join(', ')} {String(state.open)}
    </div>
  );
}
