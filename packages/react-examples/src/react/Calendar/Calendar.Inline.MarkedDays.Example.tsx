import * as React from 'react';
import { Calendar, ICalendarDayProps } from '@fluentui/react-date-time';
import { addDays } from '@fluentui/date-time-utilities';

const calendarDayProps: Partial<ICalendarDayProps> = {
  getMarkedDays: (startingDate, endingDate) => [addDays(startingDate, 3), addDays(startingDate, 4)],
};

export const CalendarInlineMarkedDaysExample = () => {
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
