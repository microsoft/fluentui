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
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CheckboxSlots, CheckboxState } from './Checkbox.types';

import styles from './Checkbox.module.css';

export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
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

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Checkbox's state, because `styles.root` is
  // hashed and unaddressable from outside this file (DECISIONS.md D15).
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
  state.root.className = clsx(checkboxClassNames.root, 'group/fui-checkbox', styles.root, state.root.className);

  state.input.className = clsx(checkboxClassNames.input, styles.input, state.input.className);

  if (state.indicator) {
    state.indicator.className = clsx(
      checkboxClassNames.indicator,
      styles.indicator,
      shape === 'circular' && styles.circular,
      state.indicator.className,
    );
  }

  if (state.label) {
    state.label.className = clsx(checkboxClassNames.label, styles.label, state.label.className);
  }

  return state;
};
