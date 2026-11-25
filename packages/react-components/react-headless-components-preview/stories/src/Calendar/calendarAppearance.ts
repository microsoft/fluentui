// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';
import type { CalendarProps } from '@fluentui/react-headless-components-preview/calendar';
import styles from './calendar.module.css';

/**
 * Shared story styling. Header and grid slots apply to every visible panel; panel-specific styles use the
 * `dayPicker`/`monthPicker` classes or the panel's `data-view` attribute.
 */
export const calendarAppearance = {
  className: styles.calendar,
  liveRegion: { className: styles.liveRegion },
  divider: { className: styles.divider },
  goToTodayButton: { className: styles.todayButton },
  dayPicker: { className: styles.dayPicker },
  monthPicker: { className: styles.monthPicker },
  header: { className: styles.header },
  heading: { className: styles.heading },
  navigation: { className: styles.navigation },
  previousButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
  nextButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
  grid: { className: styles.grid },
} satisfies CalendarProps;
