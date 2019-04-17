import { styled } from '../../Utilities';
import { IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import { DatePickerBase } from './DatePicker.base';
import { styles } from './DatePicker.styles';

/**
 * DatePicker description
 */
export const DatePicker: React.StatelessComponent<IDatePickerProps> = styled<IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles>(
  DatePickerBase,
  styles,
  undefined,
  {
    scope: 'DatePicker'
  }
);
