import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps, DayOfWeek } from '@fluentui/react-calendar-preview';

const workWeekDays: DayOfWeek[] = ['tuesday', 'saturday', 'wednesday', 'friday'];

export const CalendarNonContiguousWorkWeekDays = (): JSXElement => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
    setSelectedDateRange(data.selectedDateRangeArray);
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
        dateRangeType={'workWeek'}
        workWeekDays={workWeekDays}
        firstDayOfWeek="monday"
        highlightSelectedMonth
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarNonContiguousWorkWeekDays.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a non contiguous (7 day) week.',
    },
  },
};
