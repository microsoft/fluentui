import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

const referenceDate = new Date('2023-03-15T12:00:00.000Z');

export const SampleCalendarCompatMultiDayView = ({ daysToSelectInDayView }: { daysToSelectInDayView: number }) => {
  return (
    <Calendar
      highlightSelectedMonth
      showGoToToday
      today={referenceDate}
      value={referenceDate}
      calendarDayProps={{ daysToSelectInDayView }}
    />
  );
};
