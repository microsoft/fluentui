import { clsx } from 'clsx';
import type { MenuGridState } from './MenuGrid.types';

import styles from './MenuGrid.module.css';

/**
 * Public identity class for MenuGrid.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. `useValidateNesting` (this package's and react-menu's) reads it
 * with `classList.contains`, which takes a TOKEN and needs no escaping.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuGridClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuGridClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridClassNames: { root: string } = {
  root: 'group/fui-menu-grid',
};

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuGridStyles_unstable = (state: MenuGridState): MenuGridState => {
  // Unconditional module class FIRST, then the named group marker, with the consumer
  // className last (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's
  // `:scope` polyfill throws on it under jsdom (DECISIONS.md D15.1) — and `styles.root` is
  // the token that guarantees it. The BEM static that used to hold that position is gone
  // (DECISIONS.md D16.1).
  state.root.className = clsx(styles.root, 'group/fui-menu-grid', state.root.className);
  return state;
};
