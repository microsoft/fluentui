import { clsx } from 'clsx';
import type { CalendarDayGridStyles, CalendarDayGridStyleProps } from './CalendarDayGrid.types';

import styles from './CalendarDayGrid.module.css';

/**
 * CalendarDayGrid's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * CalendarDayGrid renders no wrapper of its own — its `<table>` is its outermost node — so
 * the marker is stamped there, exactly where the `fui-CalendarDayGrid__table` static used to
 * sit. (Same shape as react-tooltip, whose outermost node is its `content` element.)
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
export const calendarDayGridClassNames: { root: string } = {
  root: 'group/fui-calendar-day-grid',
};

/**
 * The two class names `CalendarGridDayCell` adds and removes IMPERATIVELY
 * (`dayRef.classList.add(...)`): the grid highlights arbitrary blobs of days on hover, which
 * no CSS `:hover` can express, so the hover/pressed look is driven from mouse callbacks.
 *
 * The shape is unchanged — only the values moved, from `fui-CalendarDayGrid__hoverStyle` /
 * `…__pressedStyle` statics to the hashed module classes that back them (DECISIONS.md D16.1).
 * They are declared as identity-only locals in `CalendarDayGrid.module.css`; every rule that
 * reads them is a compound (`&.hover-style`).
 *
 * `classList.add` / `.remove` take class TOKENS, not selectors, so these need no escaping
 * (unlike the `group/…` marker above).
 *
 * @internal
 */
export const extraCalendarDayGridClassNames = {
  hoverStyle: styles['hover-style'],
  pressedStyle: styles['pressed-style'],
};

/**
 * Apply styling to the CalendarDayGrid slots based on the state
 *
 * @internal
 */
export const useCalendarDayGridStyles_unstable = (props: CalendarDayGridStyleProps): CalendarDayGridStyles => {
  'use no memo'; // justified: compiler would optimize useCalendarDayGridStyles_unstable — manual opt-out to preserve runtime behavior

  const { lightenDaysOutsideNavigatedMonth, showWeekNumbers } = props;

  return {
    wrapper: styles.wrapper,
    // Unconditional module class FIRST, then the named group marker, then the conditional
    // module class (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's
    // `:scope` polyfill throws on it under jsdom (DECISIONS.md D15.1) — and `styles.table` is
    // the token that guarantees it, since clsx never drops an unconditional argument. The BEM
    // static that used to hold that position is gone (DECISIONS.md D16.1).
    //
    // Cascade priority is decided by the `@layer fui.*` order in CalendarDayGrid.module.css,
    // not by the order of these arguments — see that file's header for the mapping back to
    // the mergeClasses() argument order this replaces.
    table: clsx(styles.table, calendarDayGridClassNames.root, showWeekNumbers && styles['table-show-week-numbers']),
    dayCell: clsx(styles['day-cell'], styles['day-cell-focus-indicator'], styles.corners),
    daySelected: styles['day-selected'],
    daySingleSelected: styles['day-single-selected'],
    weekRow: styles['week-row'],
    weekDayLabelCell: styles['week-day-label-cell'],
    weekNumberCell: styles['week-number-cell'],
    dayOutsideBounds: styles['day-outside-bounds'],
    // Carries ONLY its conditional slice — the BEM static that used to sit alongside it is
    // gone (D16.1), so this is the empty string when `lightenDaysOutsideNavigatedMonth` is
    // false. It is always composed onto the day cell, never used alone.
    dayOutsideNavigatedMonth: clsx(lightenDaysOutsideNavigatedMonth && styles['lighten-days-outside-navigated-month']),
    dayButton: styles['day-button'],
    dayIsToday: styles['day-is-today'],
    firstTransitionWeek: styles['first-transition-week'],
    lastTransitionWeek: styles['last-transition-week'],
    dayMarker: styles['day-marker'],
    dayTodayMarker: styles['day-today-marker'],
  };
};
