import { ICalendarMonthProps, ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';
import { CalendarMonthBase } from './CalendarMonth.base';
import { getStyles } from './CalendarMonth.styles';
import { styled } from 'office-ui-fabric-react/lib/Utilities';

/**
 * CalendarMonth description
 */
export const CalendarMonth: React.StatelessComponent<ICalendarMonthProps> = styled<
  ICalendarMonthProps,
  ICalendarMonthStyleProps,
  ICalendarMonthStyles
>(CalendarMonthBase, getStyles, undefined, { scope: 'CalendarMonth' });
