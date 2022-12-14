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

// TODO #25997: Remove deprecated export before ProgressBar is released as stable
/** @deprecated renamed to renderProgressBar_unstable */
export const renderProgress_unstable = renderProgressBar_unstable;
