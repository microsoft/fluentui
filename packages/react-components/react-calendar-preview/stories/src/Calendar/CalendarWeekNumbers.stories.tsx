import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';

export const CalendarWeekNumbers = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showWeekNumbers onSelectDate={onSelectDate} value={selectedDate} />
    </>
  );
};

CalendarWeekNumbers.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to show the week numbers next to the day grid for their respective week.',
    },
  },
};
