// Zustand-style selectors accessed via property chain: `store.use.field()`.
// `.use.field()` calls a real hook (useStore) internally but is not `useXxx()`-named at
// the call site, so the compiler treats it as an ordinary function and may memoize around it.
declare const appStore: { use: { isPrivate(): boolean; theme(): string } };

export function ShareButton() {
  const isPrivate = appStore.use.isPrivate();
  const theme = appStore.use.theme();
  return <div className={theme}>{String(isPrivate)}</div>;
}
