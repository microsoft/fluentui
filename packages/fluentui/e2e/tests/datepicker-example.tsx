import * as React from 'react';
import {
  Datepicker,
  datepickerCalendarClassName,
  datepickerCalendarCellClassName,
  datepickerCalendarCellButtonClassName,
  datepickerCalendarGridRowClassName,
  datepickerClassName,
} from '@fluentui/react-northstar';

export const selectors = {
  DatepickerClassName: datepickerClassName,
  CalendarClassName: datepickerCalendarClassName,
  CalendarGridRowClassName: datepickerCalendarGridRowClassName,
  CellClassName: datepickerCalendarCellClassName,
  CellButtonClassName: datepickerCalendarCellButtonClassName,
};

const DatepickerExample = () => (
  // TODO: remove defaultSelectedDate once the changes are propagated from date-time-utilities.
  <Datepicker today={new Date(2020, 6, 23, 0, 0, 0, 0)} defaultSelectedDate={new Date(2020, 6, 23, 0, 0, 0, 0)} />
);

export default DatepickerExample;
