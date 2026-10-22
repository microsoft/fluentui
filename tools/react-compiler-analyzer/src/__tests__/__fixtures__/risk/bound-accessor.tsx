import { useState } from 'react';

// The accessor result bound to a local variable, then read — one step of dataflow past
// the direct `getXStore().field` form.
declare function getChatStore(): { sendingData: boolean; draft: string; getState(): { id: string } };
declare const itemStore: { getState(): { activeId: string } };
declare function makeThing(): { field: string };

export function BoundAccessorRead({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  const s = getChatStore();
  return (
    <div onClick={() => setCount(c => c + 1)}>
      {label} {String(s.sendingData)} {count}
    </div>
  );
}

export function BoundGetStateRead() {
  const snapshot = itemStore.getState();
  return <div>{snapshot.activeId}</div>;
}

export function BoundReadInNestedCallback({ onPick }: { onPick: (v: boolean) => void }) {
  const s = getChatStore();
  const handleClick = () => onPick(s.sendingData);
  return <button onClick={handleClick}>go</button>;
}

export function ShadowedBinding({ items }: { items: { sendingData: string }[] }) {
  const s = getChatStore();
  const draft = s.draft;
  // The `s` below is a different binding — shadowed by the callback parameter.
  const names = items.map(s => s.sendingData);
  return (
    <div>
      {draft}
      {names.join(',')}
    </div>
  );
}

export function BindingNeverRead() {
  const s = getChatStore();
  return <div>{typeof s}</div>;
}

export function BindingGetStateCall() {
  const s = getChatStore();
  return <div>{s.getState().id}</div>;
}

export function NonMatchingInit() {
  const thing = makeThing();
  return <div>{thing.field}</div>;
}
