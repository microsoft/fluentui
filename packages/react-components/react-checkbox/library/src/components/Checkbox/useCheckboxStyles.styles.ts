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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
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
