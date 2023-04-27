/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import { DividerSlots, DividerState } from './Divider.types';

/**
 * Renders a Divider component by passing the slot props (defined in `state`) to the appropriate slots.
 */
export const renderDivider_unstable = (state: DividerState) => {
  const { slots, slotProps } = getSlotsNext<DividerSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children !== undefined && (
        <slots.wrapper {...slotProps.wrapper}>{slotProps.root.children}</slots.wrapper>
      )}
    </slots.root>
  );
};
