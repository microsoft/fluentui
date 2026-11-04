'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTimePicker } from './useTimePicker';
import { renderTimePicker } from './renderTimePicker';
import { useTimePickerContextValues } from './useTimePickerContextValues';
import type { TimePickerProps } from './TimePicker.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A TimePicker lets a user pick a time of day from a list of options, or type a custom time in freeform mode.
 */
export const TimePicker: ForwardRefComponent<TimePickerProps> = /*#__PURE__*/ composeComponent(
  'TimePicker',
  useTimePicker,
  useTimePickerContextValues,
  renderTimePicker,
);
