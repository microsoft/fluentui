import * as React from 'react';
import { Calendar, addDays } from '@fluentui/react-calendar-compat';
import type { CalendarDayProps } from '@fluentui/react-calendar-compat';

const calendarDayProps: Partial<CalendarDayProps> = {
  getMarkedDays: (startingDate, _) => [addDays(startingDate, 3), addDays(startingDate, 4)],
};

export const CalendarMarkedDays: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div style={{ height: '360px' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <Calendar
        showGoToToday
        onSelectDate={setSelectedDate}
        value={selectedDate}
        // Add the marked days
        calendarDayProps={calendarDayProps}
      />
    </div>
  );
};
