import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonRender } from './SplitButton.types';

/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */
export const renderSplitButton_unstable: SplitButtonRender = state => {
  const { slots, slotProps } = getSlots<SplitButtonSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.primaryActionButton && <slots.primaryActionButton {...slotProps.primaryActionButton} />}
      {slots.menuButton && <slots.menuButton {...slotProps.menuButton} />}
    </slots.root>
  );
};
