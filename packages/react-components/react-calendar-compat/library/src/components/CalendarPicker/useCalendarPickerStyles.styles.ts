import { clsx } from 'clsx';
import type { CalendarPickerStyles, CalendarPickerStyleProps } from './CalendarPicker.types';

import styles from './CalendarPicker.module.css';

/**
 * CalendarPicker's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5), and therefore the
 * shared root identity of CalendarMonth and CalendarYear, both of which render their root
 * through this hook exactly as they both carried `fui-CalendarPicker` before.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
