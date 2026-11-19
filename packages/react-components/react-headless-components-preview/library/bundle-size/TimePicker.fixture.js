// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  TimePicker,
  createTimeFormat,
  formatDateToTimeString,
  getDateEndAnchor,
  getDateFromTimeString,
  getDateStartAnchor,
  getTimesBetween,
  renderTimePicker,
  useTimePicker,
  useTimePickerContextValues,
} from '@fluentui/react-headless-components-preview/time-picker';

console.log(
  TimePicker,
  createTimeFormat,
  formatDateToTimeString,
  getDateEndAnchor,
  getDateFromTimeString,
  getDateStartAnchor,
  getTimesBetween,
  renderTimePicker,
  useTimePicker,
  useTimePickerContextValues,
);

export default {
  name: '@fluentui/react-headless-components-preview/time-picker',
};
