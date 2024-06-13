export {
  DatePicker,
  datePickerClassNames,
  defaultDatePickerErrorStrings,
  defaultDatePickerStrings,
  renderDatePicker_unstable,
  useDatePicker_unstable,
  useDatePickerStyles_unstable,
} from './DatePicker';
export type { DatePickerErrorType, DatePickerProps, DatePickerValidationResultData } from './DatePicker';
// Re-exporting so there's no need to add @fluentui/react-calendar-compat to dependencies just to localize.
export type { CalendarStrings } from '@fluentui/react-calendar-compat';
