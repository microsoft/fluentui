import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { splitButtonShorthandProps } from './useSplitButton';
import type { SplitButtonState } from './SplitButton.types';

/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */
export const renderSplitButton = (state: SplitButtonState) => {
  const { slots, slotProps } = getSlotsCompat(state, splitButtonShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button} />
      <slots.menuButton {...slotProps.menuButton} />
    </slots.root>
  );
};
