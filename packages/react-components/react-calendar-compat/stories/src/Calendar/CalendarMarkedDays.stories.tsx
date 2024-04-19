import * as React from 'react';
import { Calendar, addDays } from '@fluentui/react-calendar-compat';
import type { CalendarDayProps } from '@fluentui/react-calendar-compat';

const calendarDayProps: Partial<CalendarDayProps> = {
  getMarkedDays: (startingDate, _) => [addDays(startingDate, 3), addDays(startingDate, 4)],
};

export const CalendarMarkedDays = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <Calendar
        showGoToToday
        onSelectDate={setSelectedDate}
        value={selectedDate}
        // Add the marked days
        calendarDayProps={calendarDayProps}
      />
    </>
  );
};

CalendarMarkedDays.parameters = {
  docs: {
    description: {
      story:
        'A Calendar Compat allows you to pass a callback that returns an array of number that should be' +
        'marked. This callback provides a starting date and an ending date.',
    },
  },
};
