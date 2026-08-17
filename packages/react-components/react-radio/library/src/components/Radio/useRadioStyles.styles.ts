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
 * Data attributes rendered on the Radio slots and matched by the shared `@custom-variant` catalog
 * in `@fluentui/react-tailwind-theme` (`css/variants.css`).
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
