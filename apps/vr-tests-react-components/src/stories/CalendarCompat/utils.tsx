import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const SampleCalendarCompatMultiDayView = ({ daysToSelectInDayView }: { daysToSelectInDayView: number }) => {
  return (
    <Calendar
      // Hardcoded date to avoid VR test flakes
      today={new Date('10-22-2025')}
      highlightSelectedMonth
      showGoToToday
      calendarDayProps={{ daysToSelectInDayView }}
    />
  );
};
