import * as React from 'react';
import type { TeachingBubbleActionsState } from './TeachingBubbleActions.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingBubbleActionsSlots } from './TeachingBubbleActions.types';

/**
 * Render the final JSX of TeachingBubbleActions
 */
export const renderTeachingBubbleActions_unstable = (state: TeachingBubbleActionsState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubbleActionsSlots>(state);

  return <slots.root {...slotProps.root} />;
};
