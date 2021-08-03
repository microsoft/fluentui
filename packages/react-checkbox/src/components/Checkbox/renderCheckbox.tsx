import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState, CheckboxSlots } from './Checkbox.types';
import { checkboxShorthandProps } from './useCheckbox';

export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots<CheckboxSlots>(state, checkboxShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'before' && state.children}
      <div className={state.checkboxClassName}>
        <slots.indicator {...slotProps.indicator} />
        <slots.input {...slotProps.input} />
      </div>
      {state.labelPosition === 'after' && state.children}
    </slots.root>
  );
};
