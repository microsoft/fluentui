import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './PopoverSurface.module.css';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';

export const popoverSurfaceClassNames: SlotClassNames<PopoverSurfaceSlots> = {
  root: 'fui-PopoverSurface',
};

export const arrowHeights = { small: 6, medium: 8, large: 8 };

export const usePopoverSurfaceStyles_unstable = (state: PopoverSurfaceState): PopoverSurfaceState => {
  state.root.className = clsx(
    popoverSurfaceClassNames.root,
    styles.root,
    styles[state.size],
    state.inline && styles.inline,
    state.appearance && styles[state.appearance],
    state.root.className,
  );
  state.arrowClassName = styles.arrow;
  return state;
};
