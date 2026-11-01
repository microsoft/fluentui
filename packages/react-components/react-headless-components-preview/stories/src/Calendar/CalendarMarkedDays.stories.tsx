import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

export const MarkedDays = (): React.ReactNode => (
  <div className={styles.story}>
    <p>October 8, 14 and 22 have appointments. Marking a date does not restrict selection.</p>
    <Calendar
      {...calendarAppearance}
      today={new Date(2025, 9, 14)}
      defaultValue={new Date(2025, 9, 14)}
      monthPicker={null}
      dayPicker={{
        ...calendarAppearance.dayPicker,
        getMarkedDays: () => [new Date(2025, 9, 8), new Date(2025, 9, 14), new Date(2025, 9, 22)],
        getCellProps: day => ({
          root: day.isMarked ? { title: 'Appointment' } : {},
        }),
      }}
    />
  </div>
);

MarkedDays.parameters = {
  docs: {
    description: {
      story:
        'Style data-marked and the marker element with consumer CSS. getCellProps returns structured element overrides without replacing Calendar keyboard or selection handlers.',
    },
  },
};
