'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useMenuItemStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useMenuListStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemLinkState } from './MenuItemLink.types';
import type { MenuItemState } from '../MenuItem/MenuItem.types';

import styles from './MenuItemLink.module.css';

/**
 * Public identity class for MenuItemLink.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1). The per-slot `icon` / `checkmark` /
 * `content` / `secondaryContent` keys were removed with the BEM statics (DECISIONS.md D16.1 /
 * D16.5); every one of them only ever carried a static, so the hook no longer touches those
 * slots at all — MenuItem's hook styles them.
 *
 * `'.' + menuItemLinkClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuItemLinkClassNames: { root: string } = {
  root: 'group/fui-menu-item-link',
};

/**
 * Apply styling to the MenuItemLink slots based on the state
 */
export const useMenuItemLinkStyles_unstable = (state: MenuItemLinkState): MenuItemLinkState => {
  // Called FIRST, exactly as before — this hook then PREPENDS its own classes to the string
  // MenuItem produced, so the rendered order is `.reset-link`, this component's marker,
  // MenuItem's hashed root + marker, …, consumer className last.
  useMenuItemStyles_unstable(state as MenuItemState);

  // Unconditional module class FIRST, then the named group marker, consumer className last
  // (DECISIONS.md D16.2). `styles['reset-link']` is unconditional, so it is the selector-safe
  // `classList[0]` the marker must never occupy — nwsapi's `:scope` polyfill throws on the
  // `/` under jsdom (D15.1). Before D16.1 the `fui-MenuItemLink` static held that position.
  //
  // The element legitimately carries TWO markers — `group/fui-menu-item-link` and MenuItem's
  // `group/fui-menu-item` — because it genuinely is both. Both are declared to
  // react-conformance's `component-has-group-marker` through
  // `testOptions['has-group-marker'].markers` in MenuItemLink.test.tsx (D16.3).
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles['reset-link'], 'group/fui-menu-item-link', state.root.className);

  return state;
};
