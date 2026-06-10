import { useEffect, useMemo, useState } from 'react';

// Contains no non-reactive store reads, so it should never be flagged — even with
// store-read detection fully enabled.
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
