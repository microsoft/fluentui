/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';

import type { NavItemState, NavItemSlots } from './NavItem.types';

/**
 * Render the final JSX of NavItem
 */
export const renderNavItem_unstable = (state: NavItemState) => {
  assertSlots<NavItemSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
    </state.root>
  );
};
