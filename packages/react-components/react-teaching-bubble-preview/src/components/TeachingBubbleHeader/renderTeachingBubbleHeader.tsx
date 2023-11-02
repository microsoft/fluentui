import * as React from 'react';
import type { TeachingBubbleHeaderState } from './TeachingBubbleHeader.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingBubbleHeaderSlots } from './TeachingBubbleHeader.types';

/**
 * Render the final JSX of TeachingBubbleHeader
 */
export const renderTeachingBubbleHeader_unstable = (state: TeachingBubbleHeaderState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubbleHeaderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slotProps.root.children}
      {slots.dismissButton && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
