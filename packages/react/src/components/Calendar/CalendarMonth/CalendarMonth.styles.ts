import { getStyles as getPickerStyles } from '../CalendarPicker/CalendarPicker.styles';
import type { ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';

export const getStyles = (props: ICalendarMonthStyleProps): ICalendarMonthStyles => {
  /*  Return styles from the base class.
   *  If this component has extra styles not in the base, apply them here i.e.:
   *  const myStyle: IStyle = {
   *    display: "block"
   *  };     *
   *  return {...getPickerStyles(props), myStyle};
   */

  return getPickerStyles(props);
};
