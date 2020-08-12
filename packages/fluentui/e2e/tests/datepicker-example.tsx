import * as React from 'react';
import {
  Datepicker,
  datepickerCalendarClassName,
  datepickerCalendarCellClassName,
  datepickerClassName,
} from '@fluentui/react-northstar';

export const selectors = {
  DatepickerClassName: datepickerClassName,
  CalendarClassName: datepickerCalendarClassName,
  CellClassName: datepickerCalendarCellClassName,
};

const DatepickerExample = () => <Datepicker today={new Date(2020, 6, 23, 0, 0, 0, 0)} />;

export default DatepickerExample;
