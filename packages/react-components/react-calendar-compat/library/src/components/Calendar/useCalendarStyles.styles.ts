import { clsx } from 'clsx';
import type { CalendarStyles, CalendarStyleProps } from './Calendar.types';

import styles from './Calendar.module.css';

/**
 * Calendar's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
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
    // Unconditional module class FIRST, then the named group marker, then the conditional
    // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
    // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
    // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
    // never drops an unconditional argument. The BEM static that used to hold that position
    // is gone (DECISIONS.md D16.1).
    //
    // Cascade priority is decided by the `@layer fui.*` order in Calendar.module.css, not by
    // the order of these arguments — see that file's header for the mapping back to the
    // mergeClasses() argument order this replaces.
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
