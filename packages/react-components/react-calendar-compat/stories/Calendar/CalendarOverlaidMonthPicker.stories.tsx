import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarOverlaidMonth = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar
        showMonthPickerAsOverlay
        highlightSelectedMonth
        showGoToToday={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarOverlaidMonth.parameters = {
  docs: {
    description: {
      story:
        'A Calendar Compat allows you to render the month picker over the day picker. This is useful' +
        ' when there are width constraints and the month picker is needed.',
    },
  },
};
