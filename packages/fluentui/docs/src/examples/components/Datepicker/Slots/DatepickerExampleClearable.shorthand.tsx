import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleClearable = () => (
  <Datepicker input={{ clearable: true }} today={new Date(2020, 9, 1, 0, 0, 0, 0)} />
);

export default DatepickerExampleClearable;
