import type { NavSubItemState as NavSubItemHeadlessState } from '@fluentui/react-headless-components-preview/nav';

import type { NavDensity } from '../Nav.types';

export type { NavSubItemProps, NavSubItemSlots } from '@fluentui/react-headless-components-preview/nav';

/** Windmod NavSubItem state: headless state plus the density resolved from the nav context. */
export type NavSubItemState = NavSubItemHeadlessState & {
  density: NavDensity;
  root: { 'data-density'?: NavDensity };
};
