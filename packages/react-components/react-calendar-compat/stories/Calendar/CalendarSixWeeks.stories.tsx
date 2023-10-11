import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarSixWeeks: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  return (
    <div style={{ height: '360px' }}>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showSixWeeksByDefault showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
    </div>
  );
};
