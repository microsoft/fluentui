import { clsx } from 'clsx';
import type { CalendarPickerStyles, CalendarPickerStyleProps } from './CalendarPicker.types';

import styles from './CalendarPicker.module.css';

/**
 * CalendarPicker's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5), and therefore the
 * shared root identity of CalendarMonth and CalendarYear, both of which render their root
 * through this hook exactly as they both carried `fui-CalendarPicker` before.
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<CalendarPickerStyles>` to `{ root: string }` — the
 * ten sub-slot keys went with the BEM statics (D16.1) — and the value is no longer the
 * `fui-CalendarPicker` static.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + calendarPickerClassNames.root` is invalid
 * CSS. Use `fuiSelector(calendarPickerClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol, and `@typescript-eslint/no-deprecated` then errors on each of those re-export
 * specifiers. The narrowed type is what enforces D16.5; the tag would only buy lint noise.
 *
 * @internal
 */
export const calendarPickerClassNames: { root: string } = {
  root: 'group/fui-calendar-picker',
};

/**
 * Apply styling to the CalendarPicker slots based on the state
 *
 * @internal
 */
export const useCalendarPickerStyles_unstable = (props: CalendarPickerStyleProps): CalendarPickerStyles => {
  'use no memo'; // justified: compiler would optimize useCalendarPickerStyles_unstable — manual opt-out to preserve runtime behavior

  const { className, hasHeaderClickCallback, highlightCurrent, highlightSelected } = props;

  return {
    // Unconditional module class FIRST, then the named group marker, then the consumer
    // className last (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's
    // `:scope` polyfill throws on it under jsdom (DECISIONS.md D15.1) — and `styles.normalize`
    // is the token that guarantees it, since clsx never drops an unconditional argument. The
    // BEM static that used to hold that position is gone (DECISIONS.md D16.1).
    //
    // The lead token is `normalize` rather than `root` because these arguments stay in the
    // mergeClasses() order they replace, and `normalize` was passed first. Argument order
    // carries no cascade meaning — the `@layer fui.*` order in CalendarPicker.module.css
    // decides every tie, and that file reproduces this same order, INCLUDING the documented
    // `normalize`-before-`base` inversion.
    root: clsx(styles.normalize, calendarPickerClassNames.root, styles.root, className),
    headerContainer: styles['header-container'],
    currentItemButton: clsx(
      styles['current-item-button'],
      hasHeaderClickCallback && styles['has-header-click-callback'],
    ),
    navigationButtonsContainer: styles['navigation-buttons-container'],
    navigationButton: styles['navigation-button'],
    gridContainer: styles['grid-container'],
    buttonRow: styles['button-row'],
    itemButton: styles['item-button'],
    // `selected` / `current` carry ONLY their conditional slice — the BEM static that used to
    // sit alongside it is gone (D16.1), so these are the empty string when the flag is false.
    // Both are composed onto the item button by CalendarMonth/CalendarYear, never used alone.
    selected: clsx(highlightSelected && styles['highlight-selected']),
    current: clsx(highlightCurrent && styles['highlight-current']),
    disabled: styles.disabled,
  };
};
