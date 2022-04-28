import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState, CheckboxSlots } from './Checkbox.types';

export const renderCheckbox_unstable = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots<CheckboxSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      {state.labelPosition === 'before' && slots.label && <slots.label {...slotProps.label} />}
      <slots.indicator {...slotProps.indicator} />
      {state.labelPosition === 'after' && slots.label && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
