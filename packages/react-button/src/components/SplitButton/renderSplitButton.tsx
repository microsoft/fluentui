import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { SplitButtonState } from './SplitButton.types';
import { splitButtonShorthandProps } from './useSplitButton';

/**
 * Redefine the render function to add slots. Reuse the button structure but add
 * slots to children.
 * @param state
 */
export const renderSplitButton = (state: SplitButtonState) => {
  const { slots, slotProps } = getSlots(state, splitButtonShorthandProps);
  const { menuButtonRef, children } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button}>{children}</slots.button>
      <slots.divider {...slotProps.divider} />
      <slots.menuButton ref={menuButtonRef} {...slotProps.menuButton} />
    </slots.root>
  );
};
