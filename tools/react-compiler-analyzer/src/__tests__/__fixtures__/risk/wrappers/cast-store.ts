// Wrapper module using an angle-bracket type assertion — legal in `.ts`, but unparseable if
// the analyzer enables JSX for this extension.
declare function getCastStore(): { getState(): { activeId: string } };

interface Snapshot {
  activeId: string;
}

export function readCastActiveId(): string {
  const raw: unknown = getCastStore().getState();
  const snapshot = <Snapshot>raw;
  return snapshot.activeId;
}
