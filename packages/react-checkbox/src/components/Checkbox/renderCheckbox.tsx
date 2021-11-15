import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState, CheckboxSlots } from './Checkbox.types';

export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots<CheckboxSlots>(state, ['root', 'indicator', 'input']);

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'before' && state.children}
      <div className={state.containerClassName}>
        <slots.indicator {...slotProps.indicator} />
        <slots.input {...slotProps.input} />
      </div>
      {state.labelPosition === 'after' && state.children}
    </slots.root>
  );
};
