'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DatePickerProps } from './DatePicker.types';
import { useDatePicker } from './useDatePicker';
import { renderDatePicker } from './renderDatePicker';

/** Unstyled date input with an accessible, native modal Calendar dialog. */
export const DatePicker: ForwardRefComponent<DatePickerProps> = React.forwardRef((props, ref) =>
  renderDatePicker(useDatePicker(props, ref)),
);

DatePicker.displayName = 'DatePicker';
