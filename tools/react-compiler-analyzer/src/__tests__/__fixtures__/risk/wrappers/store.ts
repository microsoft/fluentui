// First-party "store" module with plain (non-hook) helpers that read non-reactive snapshots.
declare function getAppStore(): { getState(): { activeId: string }; currentId: string };

// Plain helper (NOT a useXxx hook) — does a `.getState()` snapshot read.
export function readActiveId(): string {
  return getAppStore().getState().activeId;
}

// Wrapper that calls the first helper (chain depth 2).
export function readActiveIdIndirect(): string {
  return readActiveId();
}

// A properly `useXxx`-named hook that also reads a snapshot. The compiler recognizes this as a
// hook and flags it at its own definition — callers must NOT be flagged for calling it.
export function useActiveId(): string {
  return getAppStore().getState().activeId;
}

// A safe helper that touches no store.
export function readLabel(label: string): string {
  return label.trim();
}
