import { clsx } from 'clsx';
import type { MenuGridItemState } from './MenuGridItem.types';

import styles from './MenuGridItem.module.css';

/**
 * Public identity class for MenuGridItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. `useValidateNesting` (this package's and react-menu's) reads it
 * with `classList.contains`, which takes a TOKEN and needs no escaping.
 *
 * The `icon` / `content` / `subText` / `firstSubAction` / `secondSubAction` keys were removed
 * with the BEM statics (DECISIONS.md D16.1 / D16.5): there is no public class-name handle on
 * component internals. Those slots are `MenuGridCell`s, so `group/fui-menu-grid-cell`
 * addresses them structurally; this hook styles them through hashed module classes it
 * composes onto the slot objects it owns (the D16.3 M2 mechanism).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuGridItemClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuGridItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridItemClassNames: { root: string } = {
  root: 'group/fui-menu-grid-item',
};

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, menuGridItemClassNames.root, state.root.className);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  if (state.content) {
    state.content.className = clsx(styles.content, state.content.className);
  }

  if (state.firstSubAction) {
    state.firstSubAction.className = clsx(styles['first-sub-action'], state.firstSubAction.className);
  }

  if (state.secondSubAction) {
    state.secondSubAction.className = clsx(styles['second-sub-action'], state.secondSubAction.className);
  }

  return state;
};
