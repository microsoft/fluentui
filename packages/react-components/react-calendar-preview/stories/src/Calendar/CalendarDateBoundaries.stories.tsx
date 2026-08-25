import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addMonths, addYears, addDays, Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';

export const CalendarDateBoundaries = (): JSXElement => {
  const today = new Date();
  const minDate = addMonths(today, -1);
  const maxDate = addYears(today, 1);
  const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
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
        goToTodayButton={null}
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
