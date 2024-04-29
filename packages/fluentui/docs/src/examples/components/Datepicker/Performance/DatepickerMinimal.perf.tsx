import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerMinimalPerf = () => <Datepicker calendarOpenState={true} today={new Date(2020, 8, 12, 0, 0, 0, 0)} />;

DatepickerMinimalPerf.iterations = 200;
DatepickerMinimalPerf.filename = 'DatepickerMinimal.perf.tsx';

export default DatepickerMinimalPerf;
