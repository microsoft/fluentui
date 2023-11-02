import * as React from 'react';
import type { TeachingBubbleTitleState } from './TeachingBubbleTitle.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingBubbleTitleSlots } from './TeachingBubbleTitle.types';

/**
 * Render the final JSX of TeachingBubbleTitle
 */
export const renderTeachingBubbleTitle_unstable = (state: TeachingBubbleTitleState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubbleTitleSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children}
      {state.showDismiss && slots.dismissButton && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
