import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerMinimalPerf = () => <Datepicker calendarOpenState={true} />;

DatepickerMinimalPerf.iterations = 1000;
DatepickerMinimalPerf.filename = 'DatepickerMinimal.perf.tsx';

export default DatepickerMinimalPerf;
