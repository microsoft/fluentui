import { DayOfWeek } from '@fluentui/date-time-utilities';
import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExample = () => <Datepicker firstDayOfWeek={DayOfWeek.Tuesday} />;

export default DatepickerExample;
