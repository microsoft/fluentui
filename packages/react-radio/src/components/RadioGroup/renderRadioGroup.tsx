import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioGroupState, RadioGroupSlots } from './RadioGroup.types';
import { RadioContext } from '../../contexts/RadioContext';

/**
 * Render the final JSX of RadioGroup
 */
export const renderRadioGroup_unstable = (state: RadioGroupState) => {
  const { slots, slotProps } = getSlots<RadioGroupSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.label && <slots.label {...slotProps.label} />}
      <RadioContext.Provider value={state.context}>{state.root.children}</RadioContext.Provider>
    </slots.root>
  );
};
