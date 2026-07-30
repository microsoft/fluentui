'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * converted styles files normally carry a trailing
 * `// eslint-disable-line @fluentui/react-components/enforce-use-client` — once `makeStyles`
 * is gone they call no React hook and no RSC-unsafe function, so the rule correctly reports
 * the directive as unnecessary and the suppression keeps it anyway (dropping directives is a
 * Phase 3 sweep, not a per-conversion change; CONVERSION_GUIDE.md §3).
 *
 * This file is one of the exceptions and needs NO suppression: it still delegates to
 * `useComboboxStyles_unstable`, so `enforce-use-client` sees a hook call, never reports, and
 * a disable comment here would itself be flagged as unused. Same outcome, one fewer comment.
 * (react-search's `useSearchBoxStyles.styles.ts` carries the same note for the same reason.)
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
  // Unconditional module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1 /
  // D16.2) — with the consumer className last. `styles.root` is the identity-only `.root` local
  // minted in TimePicker.module.css for exactly this purpose: TimePicker declares nothing on
  // its root, so without it the marker would lead. (`useComboboxStyles_unstable`
  // then PREPENDS Combobox's own composition to the same element, so the rendered
  // `classList[0]` is Combobox's hashed `.root` — but this hook does not rely on that, and
  // must not: the guarantee has to hold from this hook's own arguments alone.)
  //
  // The name is the COMPONENT's, kebab-cased — `fui-time-picker`. It was NOT derived from the
  // (now removed) `fui-TimePicker` root static, which was PascalCase; D15.1 fixes the marker
  // alphabet independently of what the statics used to be.
  //
  // TimePicker needs no data attributes and no state mirrors: it has exactly one CSS rule and
  // that rule is unconditional (DECISIONS.md D15.6 — attributes are a fallback, not a
  // requirement).
  //
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, 'group/fui-time-picker', state.root.className) },
  };

  // The `input`, `expandIcon` and `clearIcon` slots deliberately get NO assignment. Their only
  // library token was the `fui-TimePicker__<slot>` static; TimePicker has no module class for
  // any of them (`useComboboxStyles_unstable` is what styles them). Keeping
  // `clsx(state.x.className)` would be an identity on the consumer's own string and would
  // imply this hook styles slots it does not (statics-removal design §4d). The `if (state.x)`
  // guards went with them.

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
