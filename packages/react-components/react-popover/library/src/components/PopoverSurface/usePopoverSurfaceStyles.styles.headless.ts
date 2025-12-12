'use client';

import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';

export const popoverSurfaceClassNames: SlotClassNames<PopoverSurfaceSlots> = {
  root: 'fui-PopoverSurface',
};

const popoverArrowClassName = 'fui-PopoverSurface__arrow';

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles_unstable = (state: PopoverSurfaceState): PopoverSurfaceState => {
  'use no memo';

  const { mountNode: _, ...componentState } = state;

  state.root.className = getComponentSlotClassName(popoverSurfaceClassNames.root, state.root, componentState);

  state.arrowClassName = popoverArrowClassName;

  return state;
};
