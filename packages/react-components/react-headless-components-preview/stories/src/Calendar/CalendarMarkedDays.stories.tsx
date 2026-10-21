import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance.stories';

export const MarkedDays = (): React.ReactNode => (
  <>
    <p>October 8, 14 and 22 have appointments. Marking a date does not restrict selection.</p>
    <Calendar
      {...calendarAppearance}
      today={new Date(2025, 9, 14)}
      defaultValue={new Date(2025, 9, 14)}
      monthPicker={null}
      dayPicker={{
        ...calendarAppearance.dayPicker,
        markedDays: [new Date(2025, 9, 8), new Date(2025, 9, 14), new Date(2025, 9, 22)],
        getDayCellProps: date =>
          date.getMonth() === 9 && date.getFullYear() === 2025 && [8, 14, 22].includes(date.getDate())
            ? { title: 'Appointment' }
            : {},
      }}
    />
  </>
);

MarkedDays.parameters = {
  docs: {
    description: {
      story:
        'Style data-marked and the marker slot with consumer CSS. getDayCellProps adds per-date metadata without replacing Calendar keyboard or selection handlers.',
    },
  },
};
