import type { NavItemState as NavItemHeadlessState } from '@fluentui/react-headless-components-preview/nav';

import type { NavDensity } from '../Nav.types';

export type { NavItemProps, NavItemSlots } from '@fluentui/react-headless-components-preview/nav';

/** Windmod NavItem state: headless state plus the density resolved from the nav context. */
export type NavItemState = NavItemHeadlessState & {
  density: NavDensity;
  root: { 'data-density'?: NavDensity };
};
