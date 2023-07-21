import * as React from 'react';
import { renderDatePicker_unstable } from './renderDatePicker';
import { useDatePicker_unstable } from './useDatePicker';
import { useDatePickerStyles_unstable } from './useDatePickerStyles.styles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DatePickerProps } from './DatePicker.types';

export const DatePicker: ForwardRefComponent<DatePickerProps> = React.forwardRef((props, ref) => {
  const state = useDatePicker_unstable(props, ref);

  useDatePickerStyles_unstable(state);
  return renderDatePicker_unstable(state);
}) as ForwardRefComponent<DatePickerProps>;
DatePicker.displayName = 'DatePicker';
