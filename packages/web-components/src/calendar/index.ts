import { attr, booleanConverter } from '@microsoft/fast-element';
import {
  CalendarOptions,
  CalendarTitleTemplate,
  Calendar as FoundationCalendar,
  calendarTemplate as template,
} from '@microsoft/fast-foundation';
import { calendarStyles as styles } from './calendar.styles';

/**
 * Updated Calendar class that is readonly by default
 */
export class Calendar extends FoundationCalendar {
  @attr({ converter: booleanConverter })
  public readonly: boolean = true;
}

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

export { styles as calendarStyles };
