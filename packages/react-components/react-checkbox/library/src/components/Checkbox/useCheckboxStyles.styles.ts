import { clsx } from 'clsx';
import type { CheckboxState } from './Checkbox.types';

import styles from './Checkbox.module.css';

/**
 * Checkbox's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
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

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1). The BEM static that used
  // to lead this call is gone (D16.1): the marker is now Checkbox's SOLE public identity
  // class, and the only handle by which another module — in this package or any other — can
  // style an element from this Checkbox's state, because `styles.root` is hashed and
  // unaddressable from outside this file (DECISIONS.md D15).
  //
  // Checkbox needs no state mirrors and is in fact D15's WORKED PRECEDENT for them: the
  // real checked/indeterminate/disabled state lives on the hidden `<input>`, and this hook
  // has always hoisted it onto the root as presence attributes (above), which is exactly
  // what a descendant needs in order to read it. `@variant group-checked/fui-checkbox`,
  // `group-disabled/fui-checkbox` and friends therefore work as-is (D15.6, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Checkbox.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's own
  // hook output).
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
