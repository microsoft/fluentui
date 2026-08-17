import { clsx } from 'clsx';
import type { MenuGridGroupHeaderState } from './MenuGridGroupHeader.types';

import styles from './MenuGridGroupHeader.module.css';

/**
 * Public identity class for MenuGridGroupHeader.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuGridGroupHeaderClassNames.root` is an invalid *selector* — the `/` terminates
 * the class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridGroupHeaderClassNames: { root: string } = {
  root: 'group/fui-menu-grid-group-header',
};

export const useMenuGridGroupHeaderStyles_unstable = (state: MenuGridGroupHeaderState): MenuGridGroupHeaderState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, menuGridGroupHeaderClassNames.root, state.root.className);

  return state;
};
