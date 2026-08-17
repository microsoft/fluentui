import { clsx } from 'clsx';
import type { MenuGridRowState } from './MenuGridRow.types';

import styles from './MenuGridRow.module.css';

/**
 * Public identity class for MenuGridRow.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. `useValidateNesting` (this package's and react-menu's) reads it
 * with `classList.contains`, which takes a TOKEN and needs no escaping.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuGridRowClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuGridRowClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridRowClassNames: { root: string } = {
  root: 'group/fui-menu-grid-row',
};

export const useMenuGridRowStyles_unstable = (state: MenuGridRowState): MenuGridRowState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, menuGridRowClassNames.root, state.root.className);

  return state;
};
