/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DatePickerState, DatePickerSlots } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState): JSXElement => {
  assertSlots<DatePickerSlots>(state);

  const popup = state.popupSurface ? (
    <state.popupSurface>
      <state.calendar />
    </state.popupSurface>
  ) : null;

  return (
    <>
      <state.root />
      {state.inlinePopup ? popup : popup && <Portal mountNode={state.mountNode}>{popup}</Portal>}
    </>
  );
};
