import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarSixWeeks = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showSixWeeksByDefault showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
    </>
  );
};

CalendarSixWeeks.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to set a six week month.',
    },
  },
};
