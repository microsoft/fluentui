'use client';

import { useComboboxContextValues } from '../Combobox/useComboboxContextValues';
import type { TimePickerContextValues, TimePickerState } from './TimePicker.types';

/**
 * Returns the context values passed to `renderTimePicker`. TimePicker provides the same contexts as Combobox.
 */
export const useTimePickerContextValues: (state: TimePickerState) => TimePickerContextValues = useComboboxContextValues;
