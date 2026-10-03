import { useState } from 'react';

// `storeAccessorPattern: "Store$"` matches these hook names too, but a hook result is never
// hoisted into a compute-once cache slot (that would break the Rules of Hooks), so it is
// re-read every render and cannot go stale.
declare function useStore<T>(store: unknown, selector: (s: unknown) => T): T;
declare function useToastStore(): { count: number };
declare function useSyncExternalStore<T>(subscribe: unknown, getSnapshot: () => T): T;
declare function useStoreApi(): { getState(): { activeId: string } };

declare function getChatStore(): { sendingData: boolean };
declare const externals: { subscribe: unknown; snapshot(): { total: number } };

export function HookBoundRead() {
  const gptSelection = useStore(gptStore, (s: { gptSelection?: { selectedGptId: string } }) => s.gptSelection);
  return <div>{gptSelection?.selectedGptId}</div>;
}
declare const gptStore: unknown;

export function HookDirectRead() {
  return <div>{useToastStore().count}</div>;
}

export function HookBoundNoArgs() {
  const toast = useToastStore();
  return <div>{toast.count}</div>;
}

export function SyncExternalStoreRead() {
  const snap = useSyncExternalStore(externals.subscribe, () => externals.snapshot());
  return <div>{snap.total}</div>;
}

// `.getState()` on a hook-returned store API is still a genuine non-reactive read.
export function HookStoreApiGetState() {
  const activeId = useStoreApi().getState().activeId;
  return <div>{activeId}</div>;
}

// The real hazard, for contrast — must keep firing.
export function AccessorBoundRead() {
  const [n, setN] = useState(0);
  const s = getChatStore();
  return (
    <div onClick={() => setN(c => c + 1)}>
      {String(s.sendingData)}
      {n}
    </div>
  );
}
