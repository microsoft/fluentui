import { getStyles as getPickerStyles } from '../CalendarPicker/CalendarPicker.styles';
import type { ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types';

export const getStyles = (props: ICalendarYearStyleProps): ICalendarYearStyles => {
  /*  Return styles from the base class.
   *  If this component has extra styles not in the base, apply them here i.e.:
   *  const myStyle: IStyle = {
   *    display: "block"
   *  };
   *  return {...getPickerStyles(props), myStyle};
   */

  return getPickerStyles(props);
};
