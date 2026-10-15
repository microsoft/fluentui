import { useMemo, useCallback, memo } from 'react';

export function UseMemoComponent({ items }: { items: string[] }) {
  const sorted = useMemo(() => items.sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
}

export function UseCallbackComponent({ onClick }: { onClick: () => void }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return <button onClick={handleClick}>click</button>;
}

function InnerComponent({ value }: { value: number }) {
  return <span>{value}</span>;
}

export const MemoComponent = memo(InnerComponent);

export const InlineMemoComponent = memo(({ label }: { label: string }) => {
  return <span>{label}</span>;
});
