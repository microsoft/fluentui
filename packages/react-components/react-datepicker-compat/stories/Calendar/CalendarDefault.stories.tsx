import * as React from 'react';
import { Calendar, CalendarProps, DateRangeType } from '@fluentui/react-datepicker-compat';
import { tokens } from '@fluentui/react-components';
import { makeResetStyles } from '@griffel/react';

const useStyles = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground1,
  padding: '30px',
});

export const Default = (props: Partial<CalendarProps>) => (
  <div className={useStyles()}>
    {/* <Calendar {...props} /> */}
    <Calendar dateRangeType={DateRangeType.Month} highlightSelectedMonth showGoToToday {...props} />
  </div>
);
