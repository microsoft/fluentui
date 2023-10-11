import * as React from 'react';
import { Calendar, DateRangeType } from '@fluentui/react-calendar-compat';

export const CalendarMonthOnly = () => {
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
        dateRangeType={DateRangeType.Month}
        showGoToToday
        highlightSelectedMonth
        isDayPickerVisible={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarMonthOnly.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to only show the month and year picker leaving the day picker hidden.',
    },
  },
};
