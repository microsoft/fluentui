import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { comboButtonShorthandProps } from './useComboButton';
import type { ComboButtonState, ComboButtonSlots } from './ComboButton.types';

/**
 * Render the final JSX of ComboButton
 */
export const renderComboButton = (state: ComboButtonState) => {
  const { slots, slotProps } = getSlots<ComboButtonSlots>(state, comboButtonShorthandProps);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <slots.content {...slotProps.content}>{slotProps.content.children}</slots.content>
      <slots.dropdownIcon {...slotProps.dropdownIcon} />
    </slots.root>
  );
};
