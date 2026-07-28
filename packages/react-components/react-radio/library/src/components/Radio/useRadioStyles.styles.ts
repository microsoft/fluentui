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
import type { RadioSlots, RadioState } from './Radio.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Radio.module.css';

export const radioClassNames: SlotClassNames<RadioSlots> = {
  root: 'fui-Radio',
  indicator: 'fui-Radio__indicator',
  input: 'fui-Radio__input',
  label: 'fui-Radio__label',
};

/**
 * Data attributes rendered on the Radio slots and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md).
 *
 * `data-orientation` vs `data-label-position` — the two are NOT redundant, they encode the
 * two different gates the Griffel hook used (identical split to react-switch):
 *   • `rootStyles.vertical` and `inputStyles.below` are applied for
 *     `labelPosition === 'below'` with NO label gate, so their selectors must match even
 *     when the Radio has no label → `data-orientation`, always stamped, reusing the
 *     catalog's existing `vertical` / `horizontal` pair.
 *   • `labelStyles[labelPosition]` is applied inside `if (state.label)`, so it rides
 *     `data-label-position`, written ONLY when the label slot exists. Its presence carries
 *     the `label &&` half of the condition and its value carries the position.
 * Hence `data-label-position` is optional and written `label ? labelPosition : undefined`:
 * React omits an attribute whose value is `undefined`.
 *
 * `data-empty` lives on the INDICATOR, not the root. It replaces the Griffel hook's
 * `state.indicator.children ? inputStyles.customIndicator : inputStyles.defaultIndicator`
 * branch, whose condition is literally "the indicator slot has no children" — which is also
 * what the catalog variant's `:empty` fallback means for that exact element. It is a
 * *presence* selector, so it is written `|| undefined`: `false` would render
 * `data-empty="false"` and still match `[data-empty]`.
 *
 * ── `data-checked` / `data-disabled` are MIRRORS, not new state (DECISIONS.md D15) ────────
 *
 * Neither drives a rule in Radio.module.css: every checked/disabled rule there is anchored
 * on `.input` and reaches the indicator and label through sibling combinators. They exist so
 * that a DESCENDANT can read the Radio's primary state through the `group/fui-radio` marker
 * on this same element — `.input` is a sibling of every such descendant, not an ancestor, so
 * CSS alone cannot reach it. Identical shape and rationale to react-switch's pair; the
 * worked reference for both is `react-checkbox` (useCheckboxStyles.styles.ts).
 *
 * Presence flags, written `value || undefined`: the catalog's `checked` /
 * `disabled-control` variants are attribute-presence selectors, so `data-checked="false"`
 * would falsely match `[data-checked]`.
 *
 * ⚠ `data-checked` reflects the CONTROLLED value only. useRadio.tsx derives it as
 * `group.value === props.value`, which is `undefined` whenever the enclosing RadioGroup is
 * uncontrolled (`defaultValue`), and the DOM then owns the state. For an uncontrolled group
 * the attribute is absent and descendants see "not checked"; `defaultChecked` is
 * deliberately not used as a fallback, because it is correct only until the first change and
 * a stale mirror is worse than an absent one. Same limitation, same cause, as react-switch.
 */
type RadioRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-label-position'?: RadioState['labelPosition'];
  'data-checked'?: true;
  'data-disabled'?: true;
};

type RadioIndicatorDataAttributes = {
  'data-empty'?: true;
};

/**
 * Apply styling to the Radio slots based on the state
 */
export const useRadioStyles_unstable = (state: RadioState): RadioState => {
  const { label, labelPosition } = state;

  const root = state.root as RadioState['root'] & RadioRootDataAttributes;
  const indicator = state.indicator as RadioState['indicator'] & RadioIndicatorDataAttributes;

  const ariaDisabled = state.input['aria-disabled'];

  root['data-orientation'] = labelPosition === 'below' ? 'vertical' : 'horizontal';
  root['data-label-position'] = label ? labelPosition : undefined;
  root['data-checked'] = state.input.checked === true || undefined;
  root['data-disabled'] =
    state.input.disabled === true || ariaDisabled === true || ariaDisabled === 'true' || undefined;

  indicator['data-empty'] = !state.indicator.children || undefined;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this Radio's state, because `styles.root` is hashed and unaddressable from outside
  // this file. Read it as `@variant group-checked/fui-radio { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Radio.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's
  // own hook output).
  state.root.className = clsx('group/fui-radio', radioClassNames.root, styles.root, state.root.className);

  state.input.className = clsx(radioClassNames.input, styles.input, state.input.className);

  state.indicator.className = clsx(radioClassNames.indicator, styles.indicator, state.indicator.className);

  if (state.label) {
    state.label.className = clsx(radioClassNames.label, styles.label, state.label.className);
  }

  return state;
};
