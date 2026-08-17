import { clsx } from 'clsx';
import type { MenuGroupState } from './MenuGroup.types';

import styles from './MenuGroup.module.css';

/**
 * Public identity class for MenuGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuGroupClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGroupClassNames: { root: string } = {
  root: 'group/fui-menu-group',
};

export const useMenuGroupStyles_unstable = (state: MenuGroupState): MenuGroupState => {
  // `styles.root` is the identity-only local minted in MenuGroup.module.css: this component
  // has no styles of its own and nothing else prepends a class here, so without it the
  // marker would be `classList[0]` and nwsapi's jsdom `:scope` polyfill would throw
  // (DECISIONS.md D15.1 / D16.2). Consumer className stays last.
  state.root.className = clsx(styles.root, menuGroupClassNames.root, state.root.className);

  return state;
};
