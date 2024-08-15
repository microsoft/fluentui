import * as React from 'react';
import { Calendar, DateRangeType, DayOfWeek } from '@fluentui/react-calendar-compat';

const workWeekDays = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday];

export const CalendarContiguousWorkWeekDays = () => {
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
    <>
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
    </>
  );
};

CalendarContiguousWorkWeekDays.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
