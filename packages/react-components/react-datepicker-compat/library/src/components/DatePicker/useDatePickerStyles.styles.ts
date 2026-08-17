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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return state;
};
