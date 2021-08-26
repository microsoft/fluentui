import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CheckboxState } from './Checkbox.types';
import { checkboxShorthandProps } from './useCheckbox';

export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlotsCompat(state, checkboxShorthandProps);

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
