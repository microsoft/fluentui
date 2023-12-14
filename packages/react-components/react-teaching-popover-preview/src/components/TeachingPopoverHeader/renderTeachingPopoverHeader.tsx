import * as React from 'react';
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingPopoverHeaderSlots } from './TeachingPopoverHeader.types';

/**
 * Render the final JSX of TeachingPopoverHeader
 */
export const renderTeachingPopoverHeader_unstable = (state: TeachingPopoverHeaderState) => {
  const { slots, slotProps } = getSlotsNext<TeachingPopoverHeaderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slotProps.root.children}
      {slots.dismissButton && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
