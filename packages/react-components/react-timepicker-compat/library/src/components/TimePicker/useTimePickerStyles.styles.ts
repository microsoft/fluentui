'use client';

/*
 * NOTE on the directive above:
 * once `makeStyles` is gone a converted styles file calls no React hook and no RSC-unsafe
 * function, so the directive is unnecessary and those files carry none at all.
 *
 * This file is one of the exceptions: it still delegates to `useComboboxStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports, and a disable comment here would
 * itself be flagged as unused. (react-search's `useSearchBoxStyles.styles.ts` carries the
 * same note for the same reason.)
 */

import { clsx } from 'clsx';
import type { TimePickerState } from './TimePicker.types';
import { useComboboxStyles_unstable } from '@fluentui/react-combobox';

import styles from './TimePicker.module.css';

/**
 * Public identity classes for TimePicker.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-TimePicker`,
 * `fui-TimePicker__*`) are no longer rendered and the per-slot keys are gone; there is no
 * public class-name handle on component internals.
 *
 * Note this root ALSO carries `comboboxClassNames.root` (`group/fui-combobox`), because a
 * TimePicker IS a Combobox — the delegation to `useComboboxStyles_unstable` below stamps it
 * on this same element. `group/fui-time-picker` narrows to this subtype. Both are declared to
 * `component-has-group-marker` in TimePicker.test.tsx, which compares the set exactly.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + timePickerClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(timePickerClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const timePickerClassNames: { root: string } = {
  root: 'group/fui-time-picker',
};

/**
 * Apply styling to the TimePicker slots based on the state
 */
export const useTimePickerStyles_unstable = (state: TimePickerState): TimePickerState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, timePickerClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  // The listbox slot is react-combobox's `<Listbox>`; this rule sits in `fui.components.l2`
  // (D2 amendment 2) — the same layer Combobox's own listbox rules sit in, because Combobox
  // is decorating that component's output too. See TimePicker.module.css for why the tie
  // that creates is broken with specificity rather than with an altitude.
  if (state.listbox) {
    state = { ...state, listbox: { ...state.listbox, className: clsx(styles.listbox, state.listbox.className) } };
  }

  // TimePickerState widens ComboboxState with `freeform` / `parseTimeStringToDate` /
  // `submittedText`, so the delegate's narrower return is re-merged onto this component's own
  // shape (F1 of the D14 mutation removal — thread the composed result, do not discard it).
  state = { ...state, ...useComboboxStyles_unstable(state) };

  return state;
};
