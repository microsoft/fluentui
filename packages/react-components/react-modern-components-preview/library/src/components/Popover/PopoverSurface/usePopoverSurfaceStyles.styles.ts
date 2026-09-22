import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import styles from './PopoverSurface.module.css';

export const popoverSurfaceClassNames: SlotClassNames<PopoverSurfaceSlots> = {
  root: 'fui-PopoverSurface',
};

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/** Apply styling to the PopoverSurface slots based on the state. */
export const usePopoverSurfaceStyles = (state: PopoverSurfaceState): PopoverSurfaceState => {
  state.root.className = clsx(popoverSurfaceClassNames.root, styles.root, state.root.className);

  return state;
};
