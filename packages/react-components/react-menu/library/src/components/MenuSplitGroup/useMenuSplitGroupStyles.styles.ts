import { clsx } from 'clsx';
import type { MenuSplitGroupState } from './MenuSplitGroup.types';

import styles from './MenuSplitGroup.module.css';

/**
 * Presence attribute this component's root carries while a child MenuItem reports multiline
 * layout. Written imperatively by `useMenuSplitGroup.ts` (`toggleAttribute`), because the
 * child that knows can mount before the parent that renders it; read from CSS through the
 * shared `multiline` custom variant. Package-internal — not exported from the package index.
 */
export const menuSplitGroupMultilineAttr = 'data-multiline';

/**
 * Public identity class for MenuSplitGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuSplitGroupClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuSplitGroupClassNames: { root: string } = {
  root: 'group/fui-menu-split-group',
};

/**
 * Apply styling to the MenuSplitGroup slots based on the state
 *
 * The `> MenuItem` rules this component owns live at `fui.components.l2` and select the
 * children through `:global(.group\/fui-menu-item)` — MenuSplitGroup does not render its
 * items, so it never holds their slot objects and the marker is the only handle (D16.3).
 * See MenuSplitGroup.module.css for the full mapping.
 */
export const useMenuSplitGroupStyles_unstable = (state: MenuSplitGroupState): MenuSplitGroupState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, menuSplitGroupClassNames.root, state.root.className);
  return state;
};
