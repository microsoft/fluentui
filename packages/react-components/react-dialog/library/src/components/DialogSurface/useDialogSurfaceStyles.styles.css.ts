import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogSurfaceState, DialogSurfaceSlots } from './DialogSurface.types';
import styles from './DialogSurface.module.css';

export const dialogSurfaceClassNames: SlotClassNames<Omit<DialogSurfaceSlots, 'backdropMotion'>> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const mountedAndClosed = !state.unmountOnClose && !state.open;
  const transparent = state.backdropAppearance
    ? state.backdropAppearance === 'transparent'
    : state.treatBackdropAsNested;
  state.root.className = clsx(
    dialogSurfaceClassNames.root,
    styles.root,
    mountedAndClosed && styles.hidden,
    state.root.className,
  );
  if (state.backdrop) {
    state.backdrop.className = clsx(
      dialogSurfaceClassNames.backdrop,
      styles.backdrop,
      mountedAndClosed && styles.hidden,
      transparent && styles.transparent,
      state.backdrop.className,
    );
  }
  return state;
};
