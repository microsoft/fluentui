import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { addMonths, addYears, addDays, Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';

export const CalendarDateBoundaries = (): JSXElement => {
  const today = new Date();
  const minDate = addMonths(today, -1);
  const maxDate = addYears(today, 1);
  const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [allFocusable, setAllFocusable] = React.useState(false);

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
      <Checkbox
        label="Unavailable dates focusable"
        checked={allFocusable}
        onChange={(_event, data) => setAllFocusable(data.checked === true)}
      />
      <Calendar
        allFocusable={allFocusable}
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
        'A Calendar can be modified to set a minDate and maxDate in order to restrict ' +
        'the dates that can be selected.',
    },
  },
};
