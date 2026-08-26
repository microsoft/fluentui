import { useMemo } from 'react';

declare function getAppStore(): { currentId: string };

// Compiles cleanly and carries a risk — hazardous today.
export function CompiledRisky() {
  const id = getAppStore().currentId;
  return <div>{id}</div>;
}

// Same risky read, but the function fails to compile (hook called conditionally), so it is
// not memoized today. The risk becomes live once the compile error is fixed.
export function ErroredRisky({ items, flag }: { items: string[]; flag: boolean }) {
  const id = getAppStore().currentId;
  if (flag) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const n = useMemo(() => items.length, [items]);
    return <div>{n}</div>;
  }
  return <div>{id}</div>;
}

// Opted out, so also not memoized today.
export function SkippedRisky() {
  'use no memo';
  const id = getAppStore().currentId;
  return <div>{id}</div>;
}
