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
import type { CalendarDayStyles, CalendarDayStyleProps } from './CalendarDay.types';

import styles from './CalendarDay.module.css';

/**
 * CalendarDay's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<CalendarDayStyles>` to `{ root: string }` — the
 * `header`, `monthAndYear`, `monthComponents`, `headerIconButton` and `disabledStyle` keys
 * went with the BEM statics (D16.1) — and the value is no longer the `fui-CalendarDay` static.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + calendarDayClassNames.root` is invalid CSS.
 * Use `fuiSelector(calendarDayClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol, and `@typescript-eslint/no-deprecated` then errors on each of those re-export
 * specifiers. The narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
      'group/fui-calendar-day',
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
