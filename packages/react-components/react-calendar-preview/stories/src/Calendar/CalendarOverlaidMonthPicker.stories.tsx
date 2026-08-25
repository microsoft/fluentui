import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';

export const CalendarOverlaidMonth = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar
        showMonthPickerAsOverlay
        highlightSelectedMonth
        goToTodayButton={null}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarOverlaidMonth.parameters = {
  docs: {
    description: {
      story:
        'A Calendar Compat allows you to render the month picker over the day picker. This is useful' +
        ' when there are width constraints and the month picker is needed.',
    },
  },
};
