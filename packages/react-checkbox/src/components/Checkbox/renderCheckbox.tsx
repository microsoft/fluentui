import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState } from './Checkbox.types';
import { checkboxShorthandProps } from './useCheckbox';

/**
 * Render the final JSX of Checkbox
 */
export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots(state, checkboxShorthandProps);

  const ariaChecked = state.checked === 'indeterminate' ? 'mixed' : state.checked ? 'true' : 'false';

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'start' && <slots.label {...slotProps.label} />}
      <div className={state.checkboxClassName}>
        <div className={state.iconClassName}>{state.checkmarkIcon}</div>
        <input
          type="checkbox"
          aria-checked={ariaChecked}
          onChange={state.inputOnChange}
          ref={state.inputRef}
          className={state.inputClassName}
          id={state.inputId}
        />
      </div>
      {state.labelPosition === 'end' && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
