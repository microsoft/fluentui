import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { VanillaButtonSlots, VanillaButtonState } from './VanillaButton.types';

/**
 * Renders a VanillaButton component by passing the state defined props to the appropriate slots.
 */
export const renderVanillaButton = (state: VanillaButtonState) => {
  const { slots, slotProps } = getSlots<VanillaButtonSlots>(state, ['root', 'icon']);

  return (
    <slots.root {...slotProps.root}>
      {state.root.children}
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};
