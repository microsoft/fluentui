import * as React from 'react';
import { addMonths, addYears, addDays } from '@fluentui/date-time-utilities';
import { Calendar, DateRangeType, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';

const today = new Date();
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);
const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

export const CalendarInlineDateBoundariesExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
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
        dateRangeType={DateRangeType.Day}
        highlightCurrentMonth={false}
        highlightSelectedMonth
        showGoToToday={false}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        onSelectDate={onSelectDate}
        value={selectedDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={defaultDayPickerStrings}
      />
    </div>
  );
};
