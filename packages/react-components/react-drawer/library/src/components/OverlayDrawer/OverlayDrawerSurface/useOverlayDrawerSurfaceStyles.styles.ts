import { clsx } from 'clsx';
import type { DialogSurfaceState } from '@fluentui/react-dialog';

import styles from './OverlayDrawerSurface.module.css';

/**
 * Apply styling to the OverlayDrawerSurface slots based on the state
 */
export const useOverlayDrawerSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const { treatBackdropAsNested, backdrop, open, unmountOnClose } = state;

  const mountedAndClosed = !unmountOnClose && !open;

  // OverlayDrawerSurface is an `@internal` proxy for DialogSurface and declares no root slot
  // of its own — the element it decorates a backdrop for IS OverlayDrawer's root, which
  // already carries `group/fui-overlay-drawer`. So there is no marker and no
  // `…ClassNames` export here, and the D16.2 `classList[0]` invariant is not in play: this
  // slot's leading token is simply the hashed module class, with the consumer className last
  // (DECISIONS.md D16.1 — no public class-name handle on component internals).
  //
  // `backdrop.className` already carries OverlayDrawer's own `.backdrop-absolute` (l2) when
  // the drawer is portalled into a consumer `mountNode`, which is why it stays last: l2 beats
  // this file's `fui.base` reset, reproducing the Griffel winner.
  if (backdrop) {
    backdrop.className = clsx(
      styles.backdrop,
      treatBackdropAsNested && styles.nested,
      mountedAndClosed && styles['drawer-hidden'],
      backdrop.className,
    );
  }

  return state;
};
