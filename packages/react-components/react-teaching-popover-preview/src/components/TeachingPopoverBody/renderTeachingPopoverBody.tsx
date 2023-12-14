import * as React from 'react';
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingPopoverBodySlots } from './TeachingPopoverBody.types';

/**
 * Render the final JSX of TeachingPopoverBody
 */
export const renderTeachingPopoverBody_unstable = (state: TeachingPopoverBodyState) => {
  const { slots, slotProps } = getSlotsNext<TeachingPopoverBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && <slots.media {...slotProps.media} />}
      {slotProps.root.children}
    </slots.root>
  );
};
