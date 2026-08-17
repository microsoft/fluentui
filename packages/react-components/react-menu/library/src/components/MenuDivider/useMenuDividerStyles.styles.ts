import { clsx } from 'clsx';
import type { MenuDividerState } from './MenuDivider.types';

import styles from './MenuDivider.module.css';

/**
 * Public identity class for MenuDivider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuDividerClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuDividerClassNames: { root: string } = {
  root: 'group/fui-menu-divider',
};

export const useMenuDividerStyles_unstable = (state: MenuDividerState): MenuDividerState => {
  // Unconditional module class FIRST, then the named group marker, consumer className last
  // (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's `:scope`
  // polyfill throws on it under jsdom (DECISIONS.md D15.1). The BEM static that used to hold
  // that position is gone (DECISIONS.md D16.1).
  state.root.className = clsx(styles.root, menuDividerClassNames.root, state.root.className);

  return state;
};
