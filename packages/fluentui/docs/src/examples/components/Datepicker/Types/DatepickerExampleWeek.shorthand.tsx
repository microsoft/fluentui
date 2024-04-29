import { Datepicker, DateRangeType } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleWeek = () => (
  <Datepicker allowManualInput={false} dateRangeType={DateRangeType.Week} today={new Date(2020, 9, 1, 0, 0, 0, 0)} />
);

export default DatepickerExampleWeek;
