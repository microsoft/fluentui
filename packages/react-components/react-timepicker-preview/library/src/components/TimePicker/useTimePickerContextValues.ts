'use client';

import { useComboboxContextValues } from '@fluentui/react-combobox';
import type { TimePickerBaseState, TimePickerContextValues, TimePickerState } from './TimePicker.types';

/**
 * Create the context values provided by TimePicker to its listbox and options.
 */
export const useTimePickerContextValues_unstable = (state: TimePickerBaseState): TimePickerContextValues => {
  // Combobox context values accept a missing appearance and size, which fall back to the Listbox and Option defaults.
  return useComboboxContextValues(state as TimePickerState);
};
