import { clsx } from 'clsx';
import type { CheckboxState } from './Checkbox.types';

import styles from './Checkbox.module.css';

/**
 * Checkbox's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const checkboxClassNames: { root: string } = {
  root: 'group/fui-checkbox',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Every name comes from
 * the existing catalog vocabulary (reports/headless-precedent.md for `data-size` /
 * `data-label-position` / `data-disabled`; `data-checked` and `data-indeterminate` are the
 * catalog's generic state pair).
 *
 * All of them live on the ROOT even though they select styles for the input, indicator and
 * label slots: those slots are the root's children, so one stamp drives every descendant
 * rule (same approach as react-button's `data-size` → `.root … & .icon`).
 *
 * `checked` is TRI-state (`true | false | 'mixed'`), so it needs two presence attributes
 * rather than one: `data-checked` for the boolean-true branch and `data-indeterminate` for
 * `'mixed'`. Presence flags are written `flag || undefined` — React omits an attribute
 * whose value is `undefined`, whereas `false` would render `data-checked="false"` and still
 * match `[data-checked]`. The unchecked branch is therefore the `not-checked` AND
 * `not-indeterminate` complement in the module, not a third attribute.
 *
 * Both flags reflect the CHECKED state alone and are stamped even while disabled; the
 * module gates the checked/mixed/unchecked rule blocks on `enabled` instead, which is what
 * reproduces the Griffel hook's `disabled ? … : mixed ? … : checked ? … : unchecked`
 * ternary chain (see Checkbox.module.css's header for why that gate is load-bearing).
 *
 * `data-label-position` is stamped UNCONDITIONALLY here, unlike react-switch's. Checkbox's
 * `inputStyles[labelPosition]` slice is applied with no `label &&` gate, so the attribute
 * has to be present even on a label-less Checkbox; the label-slot rules that also read it
 * are inert without a `.label` element to match.
 */
type CheckboxRootDataAttributes = {
  'data-size': CheckboxState['size'];
  'data-label-position': CheckboxState['labelPosition'];
  'data-checked'?: true;
  'data-indeterminate'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
  const { checked, disabled, labelPosition, shape, size } = state;

  const root = state.root as CheckboxState['root'] & CheckboxRootDataAttributes;

  root['data-size'] = size;
  root['data-label-position'] = labelPosition;
  root['data-checked'] = checked === true || undefined;
  root['data-indeterminate'] = checked === 'mixed' || undefined;
  root['data-disabled'] = disabled || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, checkboxClassNames.root, state.root.className);

  state.input.className = clsx(styles.input, state.input.className);

  if (state.indicator) {
    state.indicator.className = clsx(
      styles.indicator,
      shape === 'circular' && styles.circular,
      state.indicator.className,
    );
  }

  if (state.label) {
    state.label.className = clsx(styles.label, state.label.className);
  }

  return state;
};
