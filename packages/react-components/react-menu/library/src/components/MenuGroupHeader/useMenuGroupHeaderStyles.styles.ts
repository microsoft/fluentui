import { clsx } from 'clsx';
import type { MenuGroupHeaderState } from './MenuGroupHeader.types';

import styles from './MenuGroupHeader.module.css';

/**
 * Public identity class for MenuGroupHeader.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuGroupHeaderClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGroupHeaderClassNames: { root: string } = {
  root: 'group/fui-menu-group-header',
};

export const useMenuGroupHeaderStyles_unstable = (state: MenuGroupHeaderState): MenuGroupHeaderState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, menuGroupHeaderClassNames.root, state.root.className);

  return state;
};
