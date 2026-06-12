import { readActiveIdIndirect, useActiveId, readLabel } from './index';

// Reached indirectly through a plain wrapper chain: readActiveIdIndirect → readActiveId →
// getAppStore().getState() — should be flagged at this component.
export function WidgetIndirect({ label }: { label: string }) {
  const id = readActiveIdIndirect();
  const text = readLabel(label);
  return (
    <div>
      {id} {text}
    </div>
  );
}

// Calls a properly useXxx-named hook — the compiler recognizes it, so this caller must NOT be
// flagged (the snapshot read is reported at useActiveId's own definition instead).
export function WidgetViaHook() {
  const id = useActiveId();
  return <div>{id}</div>;
}
