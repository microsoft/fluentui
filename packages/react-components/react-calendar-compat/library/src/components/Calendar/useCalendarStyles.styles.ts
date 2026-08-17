import { clsx } from 'clsx';
import type { CalendarStyles, CalendarStyleProps } from './Calendar.types';

import styles from './Calendar.module.css';

/**
 * Calendar's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<CalendarStyles>` to `{ root: string }` — the
 * `divider`, `goTodayButton`, `monthPickerWrapper` and `liveRegion` keys went with the BEM
 * statics (D16.1) — and the value is no longer the `fui-Calendar` static.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + calendarClassNames.root` is invalid CSS.
 * Use `fuiSelector(calendarClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol, and `@typescript-eslint/no-deprecated` then errors on each of those re-export
 * specifiers. The narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
