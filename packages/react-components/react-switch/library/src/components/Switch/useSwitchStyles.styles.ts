import { clsx } from 'clsx';
import type { SwitchState } from './Switch.types';

import styles from './Switch.module.css';

/**
 * Public identity class for Switch.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`indicator`, `input`, `label`) were removed
 * together with the `fui-Switch__*` BEM statics (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const switchClassNames: { root: string } = {
  root: 'group/fui-switch',
};

/**
 * @deprecated Use `switchClassNames.root` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const switchClassName = switchClassNames.root;

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, switchClassNames.root, state.root.className);

  state.indicator.className = clsx(styles.indicator, state.indicator.className);

  state.input.className = clsx(styles.input, state.input.className);

  if (state.label) {
    state.label.className = clsx(styles.label, state.label.className);
  }

  return state;
};
