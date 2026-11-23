import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import { datePickerAppearance } from './datePickerAppearance';
import styles from './date-picker.module.css';

export const AllowTextInput = (): React.ReactNode => (
  <div className={styles.story}>
    <label htmlFor="start-date" className={styles.label}>
      Start date
    </label>
    <DatePicker
      {...datePickerAppearance}
      id="start-date"
      allowTextInput
      aria-describedby="start-date-hint"
      today={new Date(2026, 7, 12)}
      defaultValue={new Date(2026, 7, 12)}
    />
    <span id="start-date-hint" className={styles.hint}>
      Type a date, or press Alt + Arrow Down to choose one.
    </span>
  </div>
);

AllowTextInput.parameters = {
  docs: {
    description: {
      story:
        'With `allowTextInput`, the field is a text input. Enter or leaving the date picker validates typed text; ' +
        'rejected text restores the previous date and shows a politely announced correction.',
    },
  },
};
