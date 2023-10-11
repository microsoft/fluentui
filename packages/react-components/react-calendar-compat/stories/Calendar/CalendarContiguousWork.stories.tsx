import * as React from 'react';
import { Calendar, DateRangeType, DayOfWeek } from '@fluentui/react-calendar-compat';

const workWeekDays = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday];

export const CalendarContiguousWorkWeekDays: React.FunctionComponent = () => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + '-' + rangeEnd.toDateString();
  }

  return (
    <div style={{ height: 'auto' }}>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>
      <Calendar
        dateRangeType={DateRangeType.WorkWeek}
        highlightSelectedMonth
        showGoToToday
        workWeekDays={workWeekDays}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </div>
  );
};
