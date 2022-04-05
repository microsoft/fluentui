import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboButtonState, ComboButtonSlots } from './ComboButton.types';

/**
 * Render the final JSX of ComboButton
 */
export const renderComboButton_unstable = (state: ComboButtonState) => {
  const { slots, slotProps } = getSlots<ComboButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
