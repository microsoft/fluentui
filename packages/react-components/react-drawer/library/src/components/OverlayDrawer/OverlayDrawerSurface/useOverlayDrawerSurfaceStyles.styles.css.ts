import { clsx } from 'clsx';
import type { DialogSurfaceState } from '@fluentui/react-dialog';
import styles from './OverlayDrawerSurface.module.css';

export const useOverlayDrawerSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  if (state.backdrop) {
    state.backdrop.className = clsx(
      styles.backdrop,
      state.treatBackdropAsNested && styles.nested,
      !state.unmountOnClose && !state.open && styles.hidden,
      state.backdrop.className,
    );
  }
  return state;
};
