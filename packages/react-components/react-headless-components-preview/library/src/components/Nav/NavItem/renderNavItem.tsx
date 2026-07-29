import { renderNavItem_unstable } from '@fluentui/react-nav';
import type { JSXElement } from '@fluentui/react-utilities';

import type { NavItemState } from './NavItem.types';

export const renderNavItem = renderNavItem_unstable as (state: NavItemState) => JSXElement;
