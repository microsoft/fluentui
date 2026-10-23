import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import { datePickerAppearance } from './datePickerAppearance';
import styles from './date-picker.module.css';

export const Disabled = (): React.ReactNode => (
  <div className={styles.story}>
    <span id="disabled-date-label" className={styles.label}>
      Renewal date
    </span>
    <DatePicker
      {...datePickerAppearance}
      aria-labelledby="disabled-date-label"
      disabled
      defaultValue={new Date(2026, 7, 12)}
    />
  </div>
);
