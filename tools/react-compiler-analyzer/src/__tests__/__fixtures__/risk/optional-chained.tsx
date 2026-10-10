import { useState } from 'react';

// Optional-chained receivers. Babel parses these as OptionalCallExpression /
// OptionalMemberExpression, which are distinct node types from their non-optional counterparts.
declare function useAppStoreSafe(): { use: { source(): string; hostContext(): { surface: string } } } | undefined;
declare const itemStore: { getState(): { activeId: string } } | undefined;
declare function getChatStore(): { sendingData: boolean; draft: string } | undefined;
declare function isEdgeNtp(source: string, surface?: string): boolean;

export function OptionalHiddenHook() {
  const store = useAppStoreSafe();
  const edge = isEdgeNtp(store?.use.source() ?? '', store?.use.hostContext().surface);
  return <div>{String(edge)}</div>;
}

export function OptionalMarkerProperty() {
  const store = useAppStoreSafe();
  return <div>{store?.use?.source()}</div>;
}

export function OptionalGetState() {
  const snapshot = itemStore?.getState();
  return <div>{snapshot?.activeId}</div>;
}

export function OptionalAccessorRead() {
  const [n, setN] = useState(0);
  const flag = getChatStore()?.sendingData;
  return (
    <div onClick={() => setN(c => c + 1)}>
      {String(flag)}
      {n}
    </div>
  );
}

export function OptionalBoundRead() {
  const s = getChatStore();
  return <div>{s?.draft}</div>;
}
