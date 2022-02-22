import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioGroupState, RadioGroupSlots } from './RadioGroup.types';

/**
 * Render the final JSX of RadioGroup
 */
export const renderRadioGroup_unstable = (state: RadioGroupState) => {
  const { slots, slotProps } = getSlots<RadioGroupSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.root.children}
    </slots.root>
  );
};
