import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';

export const CalendarMonthOnly = (): JSXElement => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
    setSelectedDateRange(data.selectedDateRange);
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
        dateRangeType="month"
        dayPicker={null}
        highlightSelectedMonth
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarMonthOnly.parameters = {
  docs: {
    description: {
      story: 'A Calendar allows you to only show the month and year picker, leaving the day picker hidden.',
    },
  },
};
