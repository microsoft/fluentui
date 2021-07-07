import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState } from './Checkbox.types';
import { checkboxShorthandProps } from './useCheckbox';

/**
 * Render the final JSX of Checkbox
 */
export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots(state, checkboxShorthandProps);

  //TODO: find a way to simplify state.children.children check
  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'start' && state.children.children && <slots.children {...slotProps.children} />}
      <div className={state.checkboxClassName}>
        <div className={state.iconClassName}>{state.checked === 'mixed' ? state.mixedIcon : state.checkmarkIcon}</div>
        <input {...state.inputProps} />
      </div>
      {state.labelPosition === 'end' && state.children.children && <slots.children {...slotProps.children} />}
    </slots.root>
  );
};
