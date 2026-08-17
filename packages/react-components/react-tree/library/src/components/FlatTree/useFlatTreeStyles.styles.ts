import { clsx } from 'clsx';
import type { FlatTreeState } from './FlatTree.types';

import styles from './FlatTree.module.css';

/**
 * Public identity class for FlatTree.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + flatTreeClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN but
 * terminates the name in selector position. Use `fuiSelector(flatTreeClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const flatTreeClassNames: { root: string } = {
  root: 'group/fui-flat-tree',
};

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, flatTreeClassNames.root, state.root.className);
  return state;
};
