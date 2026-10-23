/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

/**
 * Renders the final JSX of DatePicker. The popup surface follows the field in the DOM, so Tab and Shift+Tab move
 * between the field and the calendar in their natural order.
 */
export const renderDatePicker = (state: DatePickerState): JSXElement => {
  assertSlots<DatePickerSlots>(state);

  return (
    <>
      <state.root>
        {state.input && <state.input />}
        {state.trigger && (
          <state.trigger>
            <state.displayValue />
            {state.icon && <state.icon />}
          </state.trigger>
        )}
        {state.input && state.icon && <state.icon />}
      </state.root>
      {state.errorMessage && <state.errorMessage />}
      {state.open && (
        <state.popupSurface>
          <state.calendar />
        </state.popupSurface>
      )}
    </>
  );
};
