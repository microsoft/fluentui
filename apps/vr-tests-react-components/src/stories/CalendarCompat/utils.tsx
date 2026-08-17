import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const SampleCalendarCompatMultiDayView = ({ daysToSelectInDayView }: { daysToSelectInDayView: number }) => {
  // Pin `today` so VR baselines do not depend on the capture date.
  const today = new Date('3/15/2023');

  return <Calendar today={today} highlightSelectedMonth showGoToToday calendarDayProps={{ daysToSelectInDayView }} />;
};
