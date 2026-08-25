import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';

export const CalendarSixWeeks = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar dayPicker={{ weeksToShow: 6 }} onSelectDate={onSelectDate} value={selectedDate} />
    </>
  );
};

CalendarSixWeeks.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to set a six week month.',
    },
  },
};
