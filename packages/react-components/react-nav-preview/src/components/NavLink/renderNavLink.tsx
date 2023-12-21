/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import type { NavLinkState, NavLinkSlots } from './NavLink.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of NavLink
 */
export const renderNavLink_unstable = (state: NavLinkState) => {
  assertSlots<NavLinkSlots>(state);
  return <state.root />;
};
