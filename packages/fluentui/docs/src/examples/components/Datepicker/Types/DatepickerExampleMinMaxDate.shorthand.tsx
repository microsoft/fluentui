import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleMinMaxDate = () => (
  <Datepicker
    today={new Date(2020, 8, 12, 0, 0, 0, 0)}
    minDate={new Date(2020, 8, 8, 0, 0, 0, 0)}
    maxDate={new Date(2020, 9, 1, 0, 0, 0, 0)}
  />
);

export default DatepickerExampleMinMaxDate;
