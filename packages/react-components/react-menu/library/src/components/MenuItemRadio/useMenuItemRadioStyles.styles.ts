'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useMenuItemStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks are `clsx` plus a CSS-Modules import, call nothing, and carry no
 * directive at all; see useMenuListStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemRadioState } from './MenuItemRadio.types';

/**
 * Public identity class for MenuItemRadio.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1). The per-slot `icon` / `checkmark` /
 * `content` / `secondaryContent` / `subText` keys were removed with the BEM statics
 * (DECISIONS.md D16.1 / D16.5); every one of them only ever carried a static, so the hook no
 * longer touches those slots at all — MenuItem's hook styles them.
 *
 * `'.' + menuItemRadioClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuItemRadioClassNames: { root: string } = {
  root: 'group/fui-menu-item-radio',
};

export const useMenuItemRadioStyles_unstable = (state: MenuItemRadioState): MenuItemRadioState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, root: { ...state.root, className: clsx(menuItemRadioClassNames.root, state.root.className) } };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, ...useMenuItemStyles_unstable(state) };

  return state;
};
