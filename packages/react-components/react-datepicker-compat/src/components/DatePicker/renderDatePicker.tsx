/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState) => {
  assertSlots<DatePickerSlots>(state);
  const { inlinePopup } = state;

  return (
    <>
      <state.root />
      {state.popupSurface &&
        (inlinePopup ? (
          <state.popupSurface>
            <state.calendar />
          </state.popupSurface>
        ) : (
          <Portal mountNode={state.mountNode}>
            <state.popupSurface>
              <state.calendar />
            </state.popupSurface>
          </Portal>
        ))}
    </>
  );
};
