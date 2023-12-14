import * as React from 'react';
import type { TeachingPopoverActionsState } from './TeachingPopoverActions.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingPopoverActionsSlots } from './TeachingPopoverActions.types';

/**
 * Render the final JSX of TeachingPopoverActions
 */
export const renderTeachingPopoverActions_unstable = (state: TeachingPopoverActionsState) => {
  const { slots, slotProps } = getSlotsNext<TeachingPopoverActionsSlots>(state);

  return <slots.root {...slotProps.root} />;
};
