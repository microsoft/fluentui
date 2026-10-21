/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DatePickerState, DatePickerSlots } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState): JSXElement => {
  assertSlots<DatePickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
