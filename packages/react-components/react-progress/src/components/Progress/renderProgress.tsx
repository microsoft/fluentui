import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ProgressState, ProgressSlots } from './Progress.types';

/**
 * Render the final JSX of Spinner
 */
export const renderProgress_unstable = (state: ProgressState) => {
  const { slots, slotProps } = getSlots<ProgressSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slots.label && <slots.label {...slotProps.label} />}
      {slots.indicator && <slots.indicator {...slotProps.indicator} />}
      {slots.description && <slots.description {...slotProps.description} />}
    </slots.root>
  );
};
