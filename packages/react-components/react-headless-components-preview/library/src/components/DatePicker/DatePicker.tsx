'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDatePicker } from './useDatePicker';
import { renderDatePicker } from './renderDatePicker';
import type { DatePickerProps } from './DatePicker.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * DatePicker lets someone choose one calendar date from a field that opens a non-modal Calendar dialog, and
 * optionally type a date they already know.
 *
 * The field needs an accessible name from a Field label, `aria-labelledby` or `aria-label`.
 */
export const DatePicker: ForwardRefComponent<DatePickerProps> = /*#__PURE__*/ composeComponent(
  'DatePicker',
  useDatePicker,
  renderDatePicker,
);
