// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Calendar,
  CalendarDay,
  CalendarMonth,
  CalendarProvider,
  CalendarYear,
  calendarFormatters,
  createCalendarDateTimeFormatter,
  renderCalendar,
  renderCalendarDay,
  renderCalendarMonth,
  renderCalendarYear,
  useCalendar,
  useCalendarContext,
  useCalendarContextValues,
  useCalendarDay,
  useCalendarMonth,
  useCalendarYear,
} from '@fluentui/react-headless-components-preview/calendar';

console.log(
  Calendar,
  CalendarDay,
  CalendarMonth,
  CalendarProvider,
  CalendarYear,
  calendarFormatters,
  createCalendarDateTimeFormatter,
  renderCalendar,
  renderCalendarDay,
  renderCalendarMonth,
  renderCalendarYear,
  useCalendar,
  useCalendarContext,
  useCalendarContextValues,
  useCalendarDay,
  useCalendarMonth,
  useCalendarYear,
);

export default {
  name: 'react-headless-components-preview: Calendar',
};
