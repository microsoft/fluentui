import { renderCombobox_unstable } from '@fluentui/react-combobox';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TimePickerBaseState, TimePickerContextValues } from './TimePicker.types';

/**
 * Render the final JSX of TimePicker
 */
export const renderTimePicker_unstable = (
  state: TimePickerBaseState,
  contextValues: TimePickerContextValues,
): JSXElement => {
  return renderCombobox_unstable(state, contextValues);
};
