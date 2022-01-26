import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DividerSlots, DividerState } from './Divider.types';

/**
 * Renders a Divider component by passing the slot props (defined in `state`) to the appropriate slots.
 */
export const renderDivider_unstable = (state: DividerState) => {
  const { slots, slotProps } = getSlots<DividerSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children !== undefined && (
        <slots.wrapper {...slotProps.wrapper}>{slotProps.root.children}</slots.wrapper>
      )}
    </slots.root>
  );
};
