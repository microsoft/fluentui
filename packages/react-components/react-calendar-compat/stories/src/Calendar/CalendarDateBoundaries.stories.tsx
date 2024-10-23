import * as React from 'react';
import { addMonths, addYears, addDays, Calendar } from '@fluentui/react-calendar-compat';

export const CalendarDateBoundaries = () => {
  const today = new Date();
  const minDate = addMonths(today, -1);
  const maxDate = addYears(today, 1);
  const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>
        Date boundary: {minDate.toDateString()}-{maxDate.toDateString()}
      </div>
      <div>Disabled dates: {restrictedDates.map(d => d.toDateString()).join(', ')}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday={false}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarDateBoundaries.parameters = {
  docs: {
    description: {
      story:
        'A Calendar Compat can be modified to set a minDate and maxDate in order to restrict ' +
        'the dates that can be selected.',
    },
  },
};
