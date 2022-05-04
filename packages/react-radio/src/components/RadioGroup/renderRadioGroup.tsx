import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';
import { RadioGroupContextValues, RadioGroupSlots, RadioGroupState } from './RadioGroup.types';

/**
 * Render the final JSX of RadioGroup
 */
export const renderRadioGroup_unstable = (state: RadioGroupState, contextValues: RadioGroupContextValues) => {
  const { slots, slotProps } = getSlots<RadioGroupSlots>(state);

  return (
    <RadioGroupContext.Provider value={contextValues.radioGroup}>
      <slots.root {...slotProps.root} />
    </RadioGroupContext.Provider>
  );
};
