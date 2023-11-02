import * as React from 'react';
import type { TeachingBubbleBodyState } from './TeachingBubbleBody.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingBubbleBodySlots } from './TeachingBubbleBody.types';

/**
 * Render the final JSX of TeachingBubbleBody
 */
export const renderTeachingBubbleBody_unstable = (state: TeachingBubbleBodyState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubbleBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.media.src && slots.media && <slots.media {...slotProps.media} />}
      {slotProps.root.children}
    </slots.root>
  );
};
