import { clsx } from 'clsx';
import type { CalendarStyles, CalendarStyleProps } from './Calendar.types';

import styles from './Calendar.module.css';

/**
 * Calendar's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * @internal
 */
export const calendarClassNames: { root: string } = {
  root: 'group/fui-calendar',
};

/**
 * Apply styling to the Calendar slots based on the state
 *
 * @internal
 */
export const useCalendarStyles_unstable = (props: CalendarStyleProps): CalendarStyles => {
  'use no memo'; // justified: compiler would optimize useCalendarStyles_unstable — manual opt-out to preserve runtime behavior

  const { className, isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = props;

  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(
      styles.root,
      calendarClassNames.root,
      styles.normalize,
      !isMonthPickerVisible && styles['month-picker-not-visible'],
      isDayPickerVisible && isMonthPickerVisible && !showWeekNumbers && styles['day-and-month-pickers-visible'],
      isDayPickerVisible &&
        !isMonthPickerVisible &&
        showWeekNumbers &&
        styles['day-picker-visible-and-week-numbers-shown'],
      isDayPickerVisible &&
        isMonthPickerVisible &&
        showWeekNumbers &&
        styles['day-and-month-pickers-visible-and-week-numbers-shown'],
      className,
    ),
    divider: styles.divider,
    monthPickerWrapper: styles['month-picker-wrapper'],
    goTodayButton: styles['go-today-button'],
    liveRegion: styles['live-region'],
  };
};
