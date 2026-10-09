'use client';

import { useComboboxContextValues } from '@fluentui/react-combobox';
import type { TimePickerBaseState, TimePickerContextValues, TimePickerState } from './TimePicker.types';

/**
 * Create the context values provided by TimePicker to its listbox and options.
 */
export const useTimePickerContextValues_unstable = (state: TimePickerBaseState): TimePickerContextValues => {
  // useComboboxContextValues requires appearance and size in its parameter type, but only forwards them to the
  // context, where undefined falls back to the Listbox and Option defaults. The base state omits them on purpose.
  return useComboboxContextValues(state as TimePickerState);
};
