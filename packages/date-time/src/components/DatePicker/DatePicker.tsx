import * as React from 'react';
import { styled } from '@uifabric/utilities';
import { IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import { DatePickerBase } from './DatePicker.base';
import { styles } from './DatePicker.styles';

/**
 * DatePicker description
 */
export const DatePicker: React.FunctionComponent<IDatePickerProps> = styled<IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles>(
  DatePickerBase,
  styles,
  undefined,
  {
    scope: 'DatePicker'
  }
);
