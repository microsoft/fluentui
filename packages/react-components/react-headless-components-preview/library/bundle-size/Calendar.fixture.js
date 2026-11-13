// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Calendar,
  calendarFormatters,
  createCalendarDateTimeFormatter,
  renderCalendar,
  useCalendar,
} from '@fluentui/react-headless-components-preview/calendar';

console.log(Calendar, calendarFormatters, createCalendarDateTimeFormatter, renderCalendar, useCalendar);

export default {
  name: 'react-headless-components-preview: Calendar',
};
