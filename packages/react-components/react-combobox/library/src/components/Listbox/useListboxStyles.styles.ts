import { clsx } from 'clsx';
import type { ListboxState } from './Listbox.types';

import styles from './Listbox.module.css';

/**
 * Public identity class for Listbox.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `fui-Listbox` BEM static is no longer rendered
 * (DECISIONS.md D16.1/D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const listboxClassNames: { root: string } = {
  root: 'group/fui-listbox',
};

/**
 * Apply styling to the Listbox slots based on the state
 */
export const useListboxStyles_unstable = (state: ListboxState): ListboxState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, listboxClassNames.root, state.root.className);

  return state;
};
