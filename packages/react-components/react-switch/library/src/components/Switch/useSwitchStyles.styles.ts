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
import type { SwitchSlots, SwitchState } from './Switch.types';

import styles from './Switch.module.css';

export const switchClassNames: SlotClassNames<SwitchSlots> = {
  root: 'fui-Switch',
  indicator: 'fui-Switch__indicator',
  input: 'fui-Switch__input',
  label: 'fui-Switch__label',
};

/**
 * @deprecated Use `switchClassNames.root` instead.
 */
export const switchClassName = switchClassNames.root;

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md).
 *
 * All three live on the ROOT even though they select styles for the indicator, input and
 * label slots: those slots are the root's children, so one stamp drives every descendant
 * rule (same approach as react-button's `data-size` → `.root … & .icon`).
 *
 * `data-orientation` vs `data-label-position` — the two are NOT redundant, they encode the
 * two different gates the Griffel hook used:
 *   • `rootStyles.vertical` is applied for `labelPosition === 'above'` with NO label gate,
 *     so its selector must match even when the Switch has no label → `data-orientation`,
 *     always stamped, reusing the catalog's existing `vertical` / `horizontal` pair.
 *   • `indicatorStyles.labelAbove`, `inputStyles[labelPosition]` and `labelStyles[...]`
 *     are all gated on `label && …`, so they ride `data-label-position`, which is written
 *     ONLY when the label slot exists. Its presence carries the `label &&` half of the
 *     condition and its value carries the position — exactly how react-button's
 *     `data-icon-position` encodes `icon && iconPosition`.
 * Hence `data-label-position` is optional and written `label ? labelPosition : undefined`:
 * React omits an attribute whose value is `undefined`.
 *
 * ── `data-checked` / `data-disabled` are MIRRORS, not new state (DECISIONS.md D15) ────────
 *
 * Neither drives a single rule in Switch.module.css: every checked/disabled rule there is
 * anchored on `.input` and reaches the indicator through sibling combinators
 * (`.input:where(…) ~ .indicator`). They exist so that a DESCENDANT — a child component, or
 * a consumer's icon inside the label — can read the Switch's primary state through the
 * `group/fui-switch` marker, which sits on this same element. A state that is invisible at
 * the group element cannot be read by anything below it, and `.input` is a sibling of every
 * such descendant rather than an ancestor, so CSS alone cannot reach it.
 *
 * Both are PRESENCE flags written `value || undefined`, following `react-checkbox`
 * (useCheckboxStyles.styles.ts): the catalog's `checked` / `disabled-control` variants are
 * attribute-presence selectors, so `data-checked="false"` would falsely match `[data-checked]`.
 * React omits an attribute whose value is `undefined`.
 *
 * `data-disabled` reproduces the module's own `.input` gate exactly — `disabled-control`
 * matches `[disabled], [data-disabled], :disabled, [aria-disabled='true']`, and
 * useSwitch.tsx writes `disabled && !disabledFocusable` to `input.disabled` and
 * `aria-disabled` for the focusable-disabled case. Reading both is what keeps the mirror and
 * the sibling rules in agreement.
 *
 * ⚠ `data-checked` reflects the CONTROLLED `checked` prop only. Unlike Checkbox — which runs
 * its value through `useControllableState` and therefore always knows it — Switch hands
 * `checked` / `defaultChecked` straight to the `<input>` and lets the DOM own the state
 * (useSwitch.tsx). For an UNCONTROLLED Switch React never learns the current value, so the
 * attribute is simply absent and descendants see "not checked". `defaultChecked` is
 * deliberately NOT used as a fallback: it is correct only until the first toggle, and a
 * stale mirror is worse than an absent one. Making this complete requires moving Switch to
 * controllable state, which is a behaviour change and out of scope here.
 */
type SwitchRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size': SwitchState['size'];
  'data-label-position'?: SwitchState['labelPosition'];
  'data-checked'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles_unstable = (state: SwitchState): SwitchState => {
  const { label, labelPosition, size } = state;

  const root = state.root as SwitchState['root'] & SwitchRootDataAttributes;

  const ariaDisabled = state.input['aria-disabled'];

  root['data-orientation'] = labelPosition === 'above' ? 'vertical' : 'horizontal';
  root['data-size'] = size;
  root['data-label-position'] = label ? labelPosition : undefined;
  root['data-checked'] = state.input.checked === true || undefined;
  root['data-disabled'] =
    state.input.disabled === true || ariaDisabled === true || ariaDisabled === 'true' || undefined;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this Switch's state, because `styles.root` is hashed and unaddressable from outside
  // this file. Read it as `@variant group-checked/fui-switch { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Switch.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's
  // own hook output).
  state.root.className = clsx('group/fui-switch', switchClassNames.root, styles.root, state.root.className);

  state.indicator.className = clsx(switchClassNames.indicator, styles.indicator, state.indicator.className);

  state.input.className = clsx(switchClassNames.input, styles.input, state.input.className);

  if (state.label) {
    state.label.className = clsx(switchClassNames.label, styles.label, state.label.className);
  }

  return state;
};
