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
 */
type SwitchRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size': SwitchState['size'];
  'data-label-position'?: SwitchState['labelPosition'];
};

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles_unstable = (state: SwitchState): SwitchState => {
  const { label, labelPosition, size } = state;

  const root = state.root as SwitchState['root'] & SwitchRootDataAttributes;

  root['data-orientation'] = labelPosition === 'above' ? 'vertical' : 'horizontal';
  root['data-size'] = size;
  root['data-label-position'] = label ? labelPosition : undefined;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Switch.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's
  // own hook output).
  state.root.className = clsx(switchClassNames.root, styles.root, state.root.className);

  state.indicator.className = clsx(switchClassNames.indicator, styles.indicator, state.indicator.className);

  state.input.className = clsx(switchClassNames.input, styles.input, state.input.className);

  if (state.label) {
    state.label.className = clsx(switchClassNames.label, styles.label, state.label.className);
  }

  return state;
};
