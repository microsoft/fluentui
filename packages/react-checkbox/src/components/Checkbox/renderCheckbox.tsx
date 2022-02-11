import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxSlots, CheckboxRender } from './Checkbox.types';

export const renderCheckbox_unstable: CheckboxRender = state => {
  const { slots, slotProps } = getSlots<CheckboxSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'before' && slots.label && <slots.label {...slotProps.label} />}
      <slots.indicator {...slotProps.indicator} />
      <slots.input {...slotProps.input} />
      {state.labelPosition === 'after' && slots.label && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
