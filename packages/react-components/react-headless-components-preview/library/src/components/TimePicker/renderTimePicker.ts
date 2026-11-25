import type { JSXElement } from '@fluentui/react-utilities';
import { renderCombobox } from '../Combobox/renderCombobox';
import type { TimePickerContextValues, TimePickerState } from './TimePicker.types';

/**
 * Renders the TimePicker slots from the state returned by `useTimePicker`. TimePicker renders like a Combobox.
 */
export const renderTimePicker: (state: TimePickerState, contextValues: TimePickerContextValues) => JSXElement =
  renderCombobox;
