import * as React from 'react';
import { useDatePicker_unstable } from './useDatePicker';
import { renderDatePicker_unstable } from './renderDatePicker';
import { useDatePickerStyles_unstable } from './useDatePickerStyles';
import type { DatePickerProps } from './DatePicker.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DatePicker component - TODO: add more docs
 */
export const DatePicker: ForwardRefComponent<DatePickerProps> = React.forwardRef((props, ref) => {
  const state = useDatePicker_unstable(props, ref);

  useDatePickerStyles_unstable(state);
  return renderDatePicker_unstable(state);
});

DatePicker.displayName = 'DatePicker';
