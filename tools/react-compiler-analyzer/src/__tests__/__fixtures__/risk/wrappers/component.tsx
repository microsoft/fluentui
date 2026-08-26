import { readActiveIdIndirect, useActiveId, readLabel, readCurrentIdViaBinding } from './index';
import { readCastActiveId } from './cast-store';

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

// Reached through a wrapper whose risky read goes through a local binding rather than a
// direct `getAppStore().field` call.
export function WidgetViaBinding() {
  const id = readCurrentIdViaBinding();
  return <div>{id}</div>;
}

// Reached through a wrapper that lives in a `.ts` file using an angle-bracket type assertion.
export function WidgetViaCast() {
  const id = readCastActiveId();
  return <div>{id}</div>;
}
