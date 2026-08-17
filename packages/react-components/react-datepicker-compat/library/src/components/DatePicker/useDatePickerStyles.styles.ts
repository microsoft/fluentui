import { clsx } from 'clsx';
import type { DatePickerState } from './DatePicker.types';

import styles from './DatePicker.module.css';

/**
 * Public identity class for DatePicker.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-DatePicker`,
 * `fui-DatePicker__calendar`, `fui-DatePicker__popupSurface`) are no longer rendered and the
 * per-slot keys are gone; there is no public class-name handle on component internals.
 *
 * Note this root ALSO carries `inputClassNames.root` (`group/fui-input`), because a
 * DatePicker's root slot IS an `<Input>` — `useInputStyles_unstable` stamps its marker on
 * this same element while Input renders. `group/fui-date-picker` narrows to this subtype.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + datePickerClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(datePickerClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const datePickerClassNames: { root: string } = {
  root: 'group/fui-date-picker',
};

/**
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  const { disabled, inlinePopup } = state;

  // Unconditional module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1 /
  // D16.2) — with the consumer className last. `styles.root` is unconditional and clsx never
  // drops it, so this hook's own contribution always leads with a hashed, selector-safe token
  // now that the `fui-DatePicker` static is gone. (This string is then handed to `<Input>` as
  // a plain `className` prop, and `useInputStyles_unstable` PREPENDS Input's own composition
  // to the same element, so the rendered `classList[0]` is Input's leading token — but this
  // hook does not rely on that.) The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an element
  // from this DatePicker's state, because `styles.root` is hashed and unaddressable from
  // outside this file (DECISIONS.md D15).
  //
  // DatePicker needs no data attributes and no state mirrors. Its two stateful style branches
  // both live on an element the branching hook itself writes to: `disabled` selects a module
  // class on this very root, and `inlinePopup` selects one on the `popupSurface` slot object
  // this hook holds. Nothing on a descendant has to read root state through a `group-*`
  // variant (DECISIONS.md D15.6 — data attributes are a fallback, not a requirement).
  //
  // Cascade priority is decided by the `@layer fui.*` order in DatePicker.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for why every rule that lands on an
  // Input-owned element (the root `<span>` and the inner `<input>`) is authored in
  // `fui.components.l2` while the DatePicker-owned `popupSurface` stays in `fui.base` +
  // `fui.components.l1`.
  //
  // The `react-hooks/immutability` suppressions the Griffel version carried on these two
  // assignments are gone: the rule no longer reports them, and an unused disable directive is
  // itself a lint warning. The state-MUTATION pattern stays exactly as it was — the mixed-mode
  // sibling seam and the customStyleHooks contract depend on the shared object, and its removal
  // is a single committed Phase 3 sweep (DECISIONS.md D14), not a per-conversion change.
  state.root.className = clsx(
    styles.root,
    datePickerClassNames.root,
    disabled && styles.disabled,
    state.root.className,
  );

  if (state.popupSurface) {
    // `state.popupSurface.className` moves to LAST. Griffel put `inlinePopup && styles.inline`
    // AFTER the consumer's className, so `z-index: 1` beat a consumer's own `z-index`; under
    // the layer system consumer CSS is unlayered and wins over every `fui.*` layer no matter
    // where its class sits in this list, so the D9 / `classname-overrides-win` shape applies
    // here too (see DatePicker.module.css for the full note).
    state.popupSurface.className = clsx(
      styles['popup-surface'],
      inlinePopup && styles['popup-surface-inline'],
      state.popupSurface.className,
    );
  }

  // The `calendar` slot deliberately gets NO assignment. Its only library token was the
  // `fui-DatePicker__calendar` static; DatePicker has no module class for it (the still-Griffel
  // `@fluentui/react-calendar-compat` is what styles it). Keeping
  // `clsx(state.calendar.className)` would be an identity on the consumer's own string and
  // would imply this hook styles a slot it does not (statics-removal design §4d).

  return state;
};
