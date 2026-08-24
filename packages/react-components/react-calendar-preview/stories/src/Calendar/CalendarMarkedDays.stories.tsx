import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, addDays } from '@fluentui/react-calendar-preview';
import type { CalendarDayProps, CalendarProps } from '@fluentui/react-calendar-preview';

const dayPicker: Partial<CalendarDayProps> = {
  getMarkedDays: (startingDate, _) => [addDays(startingDate, 3), addDays(startingDate, 4)],
};

export const CalendarMarkedDays = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <Calendar
        onSelectDate={onSelectDate}
        value={selectedDate}
        // Add the marked days
        dayPicker={dayPicker}
      />
    </>
  );
};

CalendarMarkedDays.parameters = {
  docs: {
    description: {
      story:
        'A Calendar Compat allows you to pass a callback that returns an array of number that should be' +
        'marked. This callback provides a starting date and an ending date.',
    },
  },
};
