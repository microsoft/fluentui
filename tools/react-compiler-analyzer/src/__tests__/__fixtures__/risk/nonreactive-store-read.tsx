import { useState } from 'react';

// Imperative store accessors (not subscribing hooks).
declare function getItemStore(): { getState(): { activeId: string } };
declare function getAppStore(): { currentId: string; flag: boolean };

export function ItemView({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  // `.getState()` snapshot read — non-reactive.
  const activeId = getItemStore().getState().activeId;
  // direct `getXStore().field` read — non-reactive.
  const currentId = getAppStore().currentId;
  // destructured `getXStore()` read — non-reactive.
  const { flag } = getAppStore();
  return (
    <div onClick={() => setCount(c => c + 1)}>
      {label} {activeId} {currentId} {String(flag)} {count}
    </div>
  );
}
