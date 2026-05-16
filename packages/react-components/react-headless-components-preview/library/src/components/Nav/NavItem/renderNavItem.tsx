import { renderNavItem_unstable } from '@fluentui/react-nav';
import type { NavItemState } from './NavItem.types';

export const renderNavItem = (state: NavItemState) =>
  renderNavItem_unstable(state as unknown as Parameters<typeof renderNavItem_unstable>[0]);
