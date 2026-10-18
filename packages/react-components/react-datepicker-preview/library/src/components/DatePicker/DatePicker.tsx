'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDatePicker_unstable } from './useDatePicker';
import { renderDatePicker_unstable } from './renderDatePicker';
import { useDatePickerStyles_unstable } from './useDatePickerStyles.styles';
import type { DatePickerProps } from './DatePicker.types';

/**
 * A date input with an accessible Calendar Preview popup.
 */
export const DatePicker: ForwardRefComponent<DatePickerProps> = React.forwardRef((props, ref) => {
  const state = useDatePicker_unstable(props, ref);

  useDatePickerStyles_unstable(state);

  return renderDatePicker_unstable(state);
});

DatePicker.displayName = 'DatePicker';
