import {
  Calendar,
  CalendarOptions,
  CalendarTitleTemplate,
  calendarTemplate as template,
} from '@microsoft/fast-foundation';
import { calendarStyles as styles } from './calendar.styles';

export const fluentCalendar = Calendar.compose<CalendarOptions>({
  baseName: 'calendar',
  template,
  styles,
  title: CalendarTitleTemplate,
});

export const calendarStyles = styles;
