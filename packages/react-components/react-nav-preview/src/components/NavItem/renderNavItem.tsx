/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavItemState, NavItemSlots } from './NavItem.types';

/**
 * Render the final JSX of NavItem
 */
export const renderNavItem_unstable = (state: NavItemState) => {
  assertSlots<NavItemSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      {/* TODO: light this up when we have design spec */}
      {/* {state.icon && <state.icon />} */}
      <state.content />
    </state.root>
  );
};
