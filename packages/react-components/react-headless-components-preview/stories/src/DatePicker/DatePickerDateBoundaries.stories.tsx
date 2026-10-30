import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import { datePickerAppearance } from './datePickerAppearance';
import styles from './date-picker.module.css';

const today = new Date(2026, 7, 12);

export const DateBoundaries = (): React.ReactNode => (
  <div className={styles.story}>
    <label htmlFor="appointment-date" className={styles.label}>
      Appointment
    </label>
    <DatePicker
      {...datePickerAppearance}
      id="appointment-date"
      allowTextInput
      showGoToToday
      required
      today={today}
      minDate={new Date(2026, 7, 3)}
      maxDate={new Date(2026, 9, 30)}
      calendar={{
        ...datePickerAppearance.calendar,
        restrictedDates: [today, new Date(2026, 7, 13), new Date(2026, 7, 14)],
      }}
    />
  </div>
);

DateBoundaries.parameters = {
  docs: {
    description: {
      story:
        'Calendar choices and typed dates share the inclusive `minDate`/`maxDate` range and the calendar ' +
        "`restrictedDates`. When today is unavailable, opening focuses the first available day of today's month.",
    },
  },
};
