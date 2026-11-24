'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverSurfaceSlots, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';
import styles from './TeachingPopoverSurface.module.css';

export const teachingPopoverSurfaceClassNames: SlotClassNames<TeachingPopoverSurfaceSlots> = {
  root: 'fui-TeachingPopoverSurface',
};

/**
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useTeachingPopoverSurfaceStyles_unstable = (
  state: TeachingPopoverSurfaceState,
): TeachingPopoverSurfaceState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(teachingPopoverSurfaceClassNames.root, styles.root, state.root.className);

  const updatedState = usePopoverSurfaceStyles_unstable(state);

  return updatedState;
};
