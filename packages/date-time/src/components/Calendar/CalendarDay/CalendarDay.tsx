import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { CalendarDayBase } from './CalendarDay.base';
import { styles } from './CalendarDay.styles';
import { styled } from 'office-ui-fabric-react/lib/Utilities';

/**
 * CalendarDay description
 */
export const CalendarDay: (props: ICalendarDayProps) => JSX.Element = styled<ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles>(
  CalendarDayBase,
  styles,
  undefined,
  { scope: 'CalendarDay' }
);
