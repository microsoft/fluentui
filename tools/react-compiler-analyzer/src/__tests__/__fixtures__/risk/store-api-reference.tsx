import * as React from 'react';

// `createStore` matches a `Store$` accessor pattern, so the binding below is tracked.
declare function createStore<T>(init: T): {
  getState(): T;
  setState(next: Partial<T>): void;
  subscribe(fn: () => void): () => void;
  destroy(): void;
};
declare function getChatStore(): { sendingData: boolean; currentId: string };
declare function useSyncExternalStore<T>(subscribe: unknown, getSnapshot: () => T): T;
declare function log(value: unknown): void;

const promptLabConfigStore = createStore({ enabled: false });

// `.subscribe` / `.getState` are passed as references and never invoked during render.
export const usePromptLabConfigSnapshot = () =>
  React.useSyncExternalStore(promptLabConfigStore.subscribe, promptLabConfigStore.getState);

export function BareSyncExternalStore() {
  const snap = useSyncExternalStore(promptLabConfigStore.subscribe, promptLabConfigStore.getState);
  return <div>{String(snap.enabled)}</div>;
}

// A read inside the getSnapshot callback is driven by useSyncExternalStore, so it is reactive.
export function SnapshotCallbackRead() {
  const enabled = useSyncExternalStore(promptLabConfigStore.subscribe, () => promptLabConfigStore.getState().enabled);
  return <div>{String(enabled)}</div>;
}

// Outside useSyncExternalStore there is no type info to prove this is a method, so it is reported.
export function ApiMethodReference() {
  const store = createStore({ enabled: false });
  const unsubscribe = store.subscribe;
  return <div>{typeof unsubscribe}</div>;
}

// Still a genuine stale read: a state *value* read during render.
export function RealSnapshotRead() {
  const s = getChatStore();
  return <div>{String(s.sendingData)}</div>;
}

// Also genuine: passing a state value as an argument still reads it now.
export function RealReadPassedAsArgument() {
  const s = getChatStore();
  log(s.currentId);
  return <div />;
}
