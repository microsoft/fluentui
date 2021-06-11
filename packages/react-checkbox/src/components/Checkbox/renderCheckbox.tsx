import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState } from './Checkbox.types';
import { checkboxShorthandProps } from './useCheckbox';

/**
 * Render the final JSX of Checkbox
 */
export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots(state, checkboxShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};
