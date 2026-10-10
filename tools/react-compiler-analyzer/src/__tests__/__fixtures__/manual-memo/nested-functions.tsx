import { useMemo, useCallback } from 'react';

export function OuterComponent({ items }: { items: string[] }) {
  const sorted = useMemo(() => items.sort(), [items]);

  const InnerComponent = () => {
    const handleClick = useCallback(() => void 0, []);
    return <button onClick={handleClick}>inner</button>;
  };

  return (
    <div>
      {sorted.join(', ')}
      <InnerComponent />
    </div>
  );
}
