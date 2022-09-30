import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ProgressState, ProgressSlots } from './Progress.types';

/**
 * Render the final JSX of Progress
 */
export const renderProgress_unstable = (state: ProgressState) => {
  const { slots, slotProps } = getSlots<ProgressSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slots.label && <slots.label {...slotProps.label} />}
      {slots.track && <slots.track {...slotProps.track} />}
      {slots.bar && <slots.bar {...slotProps.bar} />}
      {slots.description && <slots.description {...slotProps.description} />}
    </slots.root>
  );
};
