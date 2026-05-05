import React from 'react';

export function UseMemoComponent({ items }: { items: string[] }) {
  const sorted = React.useMemo(() => items.sort(), [items]);
  return <div>{sorted.join(', ')}</div>;
}

export function UseCallbackComponent({ onClick }: { onClick: () => void }) {
  const handleClick = React.useCallback(() => {
    onClick();
  }, [onClick]);
  return <button onClick={handleClick}>click</button>;
}

function InnerComponent({ value }: { value: number }) {
  return <span>{value}</span>;
}

export const MemoComponent = React.memo(InnerComponent);

export const InlineMemoComponent = React.memo(({ label }: { label: string }) => {
  return <span>{label}</span>;
});
