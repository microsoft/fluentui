import { styled } from '../../Utilities';
import { IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import { DatePickerBase } from './DatePicker.base';
import { getStyles } from './DatePicker.styles';

/**
 * DatePicker description
 */
export const DatePicker = styled<IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles>(
  DatePickerBase,
  getStyles,
  undefined,
  { scope: 'DatePicker' }
);
