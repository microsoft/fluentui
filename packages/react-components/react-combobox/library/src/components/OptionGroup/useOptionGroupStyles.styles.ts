import { clsx } from 'clsx';
import type { OptionGroupState } from './OptionGroup.types';

import styles from './OptionGroup.module.css';

/**
 * Public identity class for OptionGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `label` key was removed together with the
 * `fui-OptionGroup__label` BEM static (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const optionGroupClassNames: { root: string } = {
  root: 'group/fui-option-group',
};

/**
 * Apply styling to the OptionGroup slots based on the state
 */
export const useOptionGroupStyles_unstable = (state: OptionGroupState): OptionGroupState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, optionGroupClassNames.root, state.root.className);

  if (state.label) {
    state.label.className = clsx(styles.label, state.label.className);
  }

  return state;
};
