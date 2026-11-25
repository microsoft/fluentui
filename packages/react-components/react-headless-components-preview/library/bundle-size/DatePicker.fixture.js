// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  DatePicker,
  defaultFormatDate,
  defaultParseDate,
  renderDatePicker,
  useDatePicker,
} from '@fluentui/react-headless-components-preview/date-picker';

console.log(DatePicker, defaultFormatDate, defaultParseDate, renderDatePicker, useDatePicker);

export default {
  name: 'react-headless-components-preview: DatePicker',
};
