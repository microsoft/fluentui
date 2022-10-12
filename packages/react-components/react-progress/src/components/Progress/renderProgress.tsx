import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ProgressState, ProgressSlots } from './Progress.types';

/**
 * Render the final JSX of Progress
 */
export const renderProgress_unstable = (state: ProgressState) => {
  const { slots, slotProps } = getSlots<ProgressSlots>(state);
  return <slots.root {...slotProps.root}>{slots.bar && <slots.bar {...slotProps.bar} />}</slots.root>;
};
