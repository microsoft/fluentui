import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const SampleCalendarCompatMultiDayView = ({ daysToSelectInDayView }: { daysToSelectInDayView: number }) => {
  return <Calendar highlightSelectedMonth showGoToToday calendarDayProps={{ daysToSelectInDayView }} />;
};
