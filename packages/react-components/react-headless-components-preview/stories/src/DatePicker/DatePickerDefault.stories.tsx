import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import { datePickerAppearance } from './datePickerAppearance';
import styles from './date-picker.module.css';

export const Default = (): React.ReactNode => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <div className={styles.story}>
      <span id="due-date-label" className={styles.label}>
        Due date
      </span>
      <DatePicker
        {...datePickerAppearance}
        aria-labelledby="due-date-label"
        today={new Date(2026, 7, 12)}
        value={value}
        onDateChange={(_event, data) => setValue(data.value)}
      />
      <output className={styles.status}>Selected: {value ? value.toDateString() : 'none'}</output>
    </div>
  );
};
