import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarWeekNumbers = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showWeekNumbers showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
    </>
  );
};

CalendarWeekNumbers.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to show the week numbers next to the day grid for their respective week.',
    },
  },
};
