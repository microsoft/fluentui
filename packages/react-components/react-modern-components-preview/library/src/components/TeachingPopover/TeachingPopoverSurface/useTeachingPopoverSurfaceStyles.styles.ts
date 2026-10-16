'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { usePopoverSurfaceStyles } from '../../Popover/PopoverSurface/usePopoverSurfaceStyles.styles';
import type { TeachingPopoverSurfaceSlots, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';
import styles from './TeachingPopoverSurface.module.css';

export const teachingPopoverSurfaceClassNames: SlotClassNames<TeachingPopoverSurfaceSlots> = {
  root: 'fui-TeachingPopoverSurface',
};

export const useTeachingPopoverSurfaceStyles = (state: TeachingPopoverSurfaceState): TeachingPopoverSurfaceState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(teachingPopoverSurfaceClassNames.root, styles.root, state.root.className);
  return usePopoverSurfaceStyles(state);
};
