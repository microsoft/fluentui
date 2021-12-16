import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState, CheckboxSlots } from './Checkbox.types';

export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots<CheckboxSlots>(state, ['root', 'indicator', 'input', 'label']);

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'before' && <slots.label {...slotProps.label} />}
      <slots.indicator {...slotProps.indicator} />
      <slots.input {...slotProps.input} />
      {state.labelPosition === 'after' && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
