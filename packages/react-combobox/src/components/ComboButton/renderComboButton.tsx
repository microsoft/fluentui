import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboButtonState, ComboButtonSlots } from './ComboButton.types';

/**
 * Render the final JSX of ComboButton
 */
export const renderComboButton_unstable = (state: ComboButtonState) => {
  const { slots, slotProps } = getSlots<ComboButtonSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.content {...slotProps.content} />
      <slots.expandIcon {...slotProps.expandIcon} />
    </slots.root>
  );
};
