import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import styles from './date-picker.module.css';

export const Default = (): React.ReactNode => (
  <DatePicker
    aria-label="Start date"
    className={styles.input}
    placeholder="Choose a date"
    trigger={{ children: 'Choose', className: styles.trigger }}
    popupSurface={{ className: styles.popup }}
    calendar={{ className: styles.calendar, monthPicker: null }}
  />
);
