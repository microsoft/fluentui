import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleSelectedDate = () => (
  <Datepicker today={new Date(2020, 9, 5, 0, 0, 0, 0)} defaultSelectedDate={new Date(2020, 9, 1, 0, 0, 0, 0)} />
);

export default DatepickerExampleSelectedDate;
