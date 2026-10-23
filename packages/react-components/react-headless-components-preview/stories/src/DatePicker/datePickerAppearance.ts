// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CalendarLtrRegular } from '@fluentui/react-icons';
import type { DatePickerProps } from '@fluentui/react-headless-components-preview/date-picker';
import { calendarAppearance } from '../Calendar/calendarAppearance';
import styles from './date-picker.module.css';

/**
 * Shared story styling. The headless DatePicker ships no styles, icons or layout.
 */
export const datePickerAppearance = {
  className: styles.field,
  trigger: { className: styles.trigger },
  input: { className: styles.input },
  displayValue: { className: styles.displayValue },
  icon: { className: styles.icon, children: React.createElement(CalendarLtrRegular) },
  errorMessage: { className: styles.errorMessage },
  popupSurface: { className: styles.surface },
  calendar: {
    ...calendarAppearance,
    className: styles.calendar,
    divider: { className: styles.divider },
    goToTodayButton: { className: `${calendarAppearance.goToTodayButton.className} ${styles.todayButton}` },
  },
} satisfies Partial<DatePickerProps>;
