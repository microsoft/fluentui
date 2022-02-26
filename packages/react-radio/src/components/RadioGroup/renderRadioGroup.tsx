import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';
import { RadioGroupSlots, RadioGroupState } from './RadioGroup.types';

/**
 * Render the final JSX of RadioGroup
 */
export const renderRadioGroup_unstable = (state: RadioGroupState) => {
  const { slots, slotProps } = getSlots<RadioGroupSlots>(state);

  return (
    <RadioGroupContext.Provider value={state.context}>
      <slots.root {...slotProps.root} />
    </RadioGroupContext.Provider>
  );
};
