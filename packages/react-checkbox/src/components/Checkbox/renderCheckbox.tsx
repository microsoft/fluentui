import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CheckboxState } from './Checkbox.types';
import { checkboxShorthandProps } from './useCheckbox';
import { CheckMarkIcon } from '@fluentui/react-icons-mdl2';

/**
 * Render the final JSX of Checkbox
 */
export const renderCheckbox = (state: CheckboxState) => {
  const { slots, slotProps } = getSlots(state, checkboxShorthandProps);

  const ariaChecked = state.indeterminate ? 'mixed' : state.checked ? 'true' : 'false';

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'start' && (
        <slots.label {...slotProps.label}>
          {slotProps.label.children}
          <div className={state.checkboxClassName}>
            <CheckMarkIcon className={state.iconClassName} />
          </div>
        </slots.label>
      )}
      <input
        type="checkbox"
        aria-checked={ariaChecked}
        onChange={state.inputOnChange}
        ref={state.inputRef}
        className={state.inputClassName}
        id={state.inputId}
      />
      {state.labelPosition === 'end' && (
        <slots.label {...slotProps.label}>
          <div className={state.checkboxClassName}>
            <CheckMarkIcon className={state.iconClassName} />
          </div>
          {slotProps.label.children}
        </slots.label>
      )}
    </slots.root>
  );
};
