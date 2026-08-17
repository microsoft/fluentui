import { clsx } from 'clsx';
import type { OptionState } from './Option.types';

import styles from './Option.module.css';

/**
 * Public identity class for Option.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `checkIcon` key was removed together with the
 * `fui-Option__checkIcon` BEM static (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const optionClassNames: { root: string } = {
  root: 'group/fui-option',
};

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles_unstable = (state: OptionState): OptionState => {
  const { disabled, multiselect, selected } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, optionClassNames.root, state.root.className);

  if (state.checkIcon) {
    state.checkIcon.className = clsx(
      styles['check-icon'],
      multiselect && styles['multiselect-check'],
      selected && styles['selected-check'],
      selected && multiselect && styles['selected-multiselect-check'],
      disabled && styles['check-disabled'],
      disabled && multiselect && styles['multiselect-check-disabled'],
      state.checkIcon.className,
    );
  }

  return state;
};
