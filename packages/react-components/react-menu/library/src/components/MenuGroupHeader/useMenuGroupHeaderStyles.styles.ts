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
  // Unconditional module class FIRST, then the named group marker, consumer className last
  // (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's `:scope`
  // polyfill throws on it under jsdom (DECISIONS.md D15.1). The BEM static that used to hold
  // that position is gone (DECISIONS.md D16.1).
  state.root.className = clsx(styles.root, 'group/fui-menu-group-header', state.root.className);

  return state;
};
