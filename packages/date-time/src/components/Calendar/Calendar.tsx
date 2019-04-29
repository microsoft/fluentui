import { styled } from '@uifabric/utilities';
import { ICalendarProps, ICalendarStyleProps, ICalendarStyles } from './Calendar.types';
import { CalendarBase } from './Calendar.base';
import { styles } from './Calendar.styles';

/**
 * Calendar description
 */
export const Calendar: React.StatelessComponent<ICalendarProps> = styled<ICalendarProps, ICalendarStyleProps, ICalendarStyles>(
  CalendarBase,
  styles,
  undefined,
  {
    scope: 'Calendar'
  }
);
