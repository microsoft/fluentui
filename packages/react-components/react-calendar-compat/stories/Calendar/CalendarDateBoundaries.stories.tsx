import * as React from 'react';
import { addMonths, addYears, addDays, Calendar } from '@fluentui/react-calendar-compat';

export const CalendarDateBoundaries: React.FunctionComponent = () => {
  const today = new Date();
  const minDate = addMonths(today, -1);
  const maxDate = addYears(today, 1);
  const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  return (
    <div style={{ height: 'auto' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <div>
        Date boundary: {minDate.toLocaleDateString()}-{maxDate.toLocaleDateString()}
      </div>
      <div>Disabled dates: {restrictedDates.map(d => d.toLocaleDateString()).join(', ')}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday={false}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </div>
  );
};
