/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';
import type { JSXElement } from '@fluentui/react-utilities';

/** Render the unstyled input, trigger, and native dialog without a Portal. */
export const renderDatePicker = (state: DatePickerState): JSXElement => {
  assertSlots<DatePickerSlots>(state);
  return (
    <>
      <state.root />
      {state.renderSurface && (
        <state.popupSurface>
          <state.calendar />
        </state.popupSurface>
      )}
    </>
  );
};
