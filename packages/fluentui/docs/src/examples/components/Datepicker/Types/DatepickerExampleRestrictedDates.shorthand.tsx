import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleRestrictedDates = () => (
  <Datepicker
    today={new Date(2020, 8, 12, 0, 0, 0, 0)}
    restrictedDates={[new Date(2020, 8, 8, 0, 0, 0, 0), new Date(2020, 8, 20, 0, 0, 0, 0)]}
  />
);

export default DatepickerExampleRestrictedDates;
