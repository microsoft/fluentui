import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */
export const renderSplitButton = (state: SplitButtonState) => {
  const { slots, slotProps } = getSlots<SplitButtonSlots>(state, ['root', 'menuButton', 'primaryActionButton']);

  return (
    <slots.root {...slotProps.root}>
      <slots.primaryActionButton {...slotProps.primaryActionButton} />
      <slots.menuButton {...slotProps.menuButton} />
    </slots.root>
  );
};
