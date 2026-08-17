import { clsx } from 'clsx';

import type { DialogSurfaceState } from './DialogSurface.types';

import styles from './DialogSurface.module.css';

/**
 * DialogSurface's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const dialogSurfaceClassNames: { root: string } = {
  root: 'group/fui-dialog-surface',
};

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const { root, backdrop, open, unmountOnClose, treatBackdropAsNested, backdropAppearance } = state;

  const isBackdropTransparent = backdropAppearance ? backdropAppearance === 'transparent' : treatBackdropAsNested;
  const mountedAndClosed = !unmountOnClose && !open;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  root.className = clsx(
    styles.root,
    dialogSurfaceClassNames.root,
    mountedAndClosed && styles['dialog-hidden'],
    root.className,
  );

  if (backdrop) {
    // No marker on the backdrop: one marker per component, on the outermost slot only
    // (D15.1). `styles.backdrop` is unconditional and leads for the same reason as above.
    backdrop.className = clsx(
      styles.backdrop,
      mountedAndClosed && styles['dialog-hidden'],
      isBackdropTransparent && styles['nested-dialog-backdrop'],
      backdrop.className,
    );
  }

  return state;
};
