import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarSixWeeks = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showSixWeeksByDefault showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
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
