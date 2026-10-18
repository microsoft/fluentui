import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import styles from './date-picker.module.css';

export const Disabled = (): React.ReactNode => (
  <DatePicker
    aria-label="Unavailable date"
    className={styles.input}
    disabled
    trigger={{ children: 'Choose', className: styles.trigger }}
  />
);
