import {
  Calendar,
  CalendarOptions,
  CalendarTitleTemplate,
  calendarTemplate as template,
} from '@microsoft/fast-foundation';
import { calendarStyles as styles } from './calendar.styles';

/**
 * The Fluent Calendar Element. Implements {@link @microsoft/fast-foundation#Calendar},
 * {@link @microsoft/fast-foundation#calendarTemplate}
 *
 * @public
 * @remarks
 * HTML Element \<fluent-calendar\>
 */
export const fluentCalendar = Calendar.compose<CalendarOptions>({
  baseName: 'calendar',
  template,
  styles,
  title: CalendarTitleTemplate,
});

/**
 * Styles for fluent-calendar
 * @public
 */
export const calendarStyles = styles;
