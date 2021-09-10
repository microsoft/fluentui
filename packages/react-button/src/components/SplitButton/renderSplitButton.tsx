import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { splitButtonShorthandProps } from './useSplitButton';
import type { SplitButtonState } from './SplitButton.types';

/**
 * Redefine the render function to add slots. Reuse the button structure but add
 * slots to children.
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
