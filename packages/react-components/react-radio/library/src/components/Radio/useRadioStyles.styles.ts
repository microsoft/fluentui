import { clsx } from 'clsx';
import type { RadioState } from './Radio.types';

import styles from './Radio.module.css';

/**
 * Public identity class for Radio.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`indicator`, `input`, `label`) were removed
 * together with the `fui-Radio__*` BEM statics (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const radioClassNames: { root: string } = {
  root: 'group/fui-radio',
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, radioClassNames.root, state.root.className);

  state.input.className = clsx(styles.input, state.input.className);

  state.indicator.className = clsx(styles.indicator, state.indicator.className);

  if (state.label) {
    state.label.className = clsx(styles.label, state.label.className);
  }

  return state;
};
