import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioGroupState, RadioGroupSlots } from './RadioGroup.types';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';

/**
 * Render the final JSX of RadioGroup
 */
export const renderRadioGroup_unstable = (state: RadioGroupState) => {
  const { slots, slotProps } = getSlots<RadioGroupSlots>(state);

  return (
    <RadioGroupContext.Provider value={state.context}>
      <slots.root {...slotProps.root}>
        {slots.label && <slots.label {...slotProps.label} />}
        {state.root.children}
      </slots.root>
    </RadioGroupContext.Provider>
  );
};
