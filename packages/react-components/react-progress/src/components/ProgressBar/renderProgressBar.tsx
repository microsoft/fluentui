import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ProgressBarState, ProgressBarSlots } from './ProgressBar.types';

/**
 * Render the final JSX of ProgressBar
 */
export const renderProgressBar_unstable = (state: ProgressBarState) => {
  const { slots, slotProps } = getSlots<ProgressBarSlots>(state);
  return <slots.root {...slotProps.root}>{slots.bar && <slots.bar {...slotProps.bar} />}</slots.root>;
};
