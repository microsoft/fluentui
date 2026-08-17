import { clsx } from 'clsx';
import type { DialogSurfaceState } from '@fluentui/react-dialog';

import styles from './OverlayDrawerSurface.module.css';

/**
 * Apply styling to the OverlayDrawerSurface slots based on the state
 */
export const useOverlayDrawerSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const { treatBackdropAsNested, backdrop, open, unmountOnClose } = state;

  const mountedAndClosed = !unmountOnClose && !open;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
