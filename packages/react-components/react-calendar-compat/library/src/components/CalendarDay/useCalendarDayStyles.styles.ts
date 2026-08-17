import { clsx } from 'clsx';
import type { CalendarDayStyles, CalendarDayStyleProps } from './CalendarDay.types';

import styles from './CalendarDay.module.css';

/**
 * CalendarDay's public identity class — the Tailwind named-group marker
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
    // Unconditional module class FIRST, then the named group marker, then the conditional
    // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
    // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
    // (DECISIONS.md D15.1) — and `styles.normalize` is the token that guarantees it, since
    // clsx never drops an unconditional argument. The BEM static that used to hold that
    // position is gone (DECISIONS.md D16.1).
    //
    // The lead token is `normalize` rather than `root` because these arguments stay in the
    // mergeClasses() order they replace, and `normalize` was passed first. Argument order
    // carries no cascade meaning — the `@layer fui.*` order in CalendarDay.module.css decides
    // every tie, and that file reproduces this same order, INCLUDING the documented
    // `normalize`-before-`base` inversion.
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
