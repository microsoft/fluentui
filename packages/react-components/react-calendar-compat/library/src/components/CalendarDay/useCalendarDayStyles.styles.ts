import { clsx } from 'clsx';
import type { CalendarDayStyles, CalendarDayStyleProps } from './CalendarDay.types';

import styles from './CalendarDay.module.css';

/**
 * CalendarDay's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * @internal
 */
export const calendarDayClassNames: { root: string } = {
  root: 'group/fui-calendar-day',
};

/**
 * Apply styling to the CalendarDay slots based on the state
 *
 * @internal
 */
export const useCalendarDayStyles_unstable = (props: CalendarDayStyleProps): CalendarDayStyles => {
  'use no memo'; // justified: compiler would optimize useCalendarDayStyles_unstable — manual opt-out to preserve runtime behavior

  const { className, headerIsClickable, showWeekNumbers } = props;

  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(
      styles.normalize,
      calendarDayClassNames.root,
      styles.root,
      showWeekNumbers && styles['show-week-numbers'],
      className,
    ),
    header: styles.header,
    monthAndYear: clsx(styles['month-and-year'], headerIsClickable && styles['header-is-clickable']),
    monthComponents: styles['month-components'],
    headerIconButton: styles['header-icon-button'],
    disabledStyle: styles['disabled-style'],
  };
};
