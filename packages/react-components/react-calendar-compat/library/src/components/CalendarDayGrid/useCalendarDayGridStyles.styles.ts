'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

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
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<CalendarDayGridStyles>` to `{ root: string }` — the
 * fifteen sub-slot keys went with the BEM statics (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + calendarDayGridClassNames.root` is invalid
 * CSS. Use `fuiSelector(calendarDayGridClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol, and `@typescript-eslint/no-deprecated` then errors on each of those re-export
 * specifiers. The narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
    table: clsx(styles.table, 'group/fui-calendar-day-grid', showWeekNumbers && styles['table-show-week-numbers']),
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
